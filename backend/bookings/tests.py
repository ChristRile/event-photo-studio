from datetime import datetime

from django.db import IntegrityError, transaction
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Event


class EventBookingTests(APITestCase):
    url = reverse('event-booking-create')
    day = '2026-11-14'

    def at(self, time):
        return datetime.fromisoformat(f'{self.day}T{time}:00+00:00')

    def payload(self, start='10:00', end='11:00'):
        return {
            'client_name': 'Avery Cruz',
            'client_email': 'avery@example.com',
            'event_type': 'Wedding',
            'starts_at': f'{self.day}T{start}:00Z',
            'ends_at': f'{self.day}T{end}:00Z',
        }

    def existing_event(self, start='10:00', end='11:00', booking_status=Event.Status.RESERVED):
        return Event.objects.create(
            client_name='Jordan Lee',
            client_email='jordan@example.com',
            event_type='Birthday',
            starts_at=self.at(start),
            ends_at=self.at(end),
            status=booking_status,
        )

    def test_creates_free_session_reservation(self):
        payload = {**self.payload(), 'guest_count': 80, 'notes': 'Outdoor ceremony'}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['status'], Event.Status.RESERVED)
        self.assertEqual(Event.objects.get().guest_count, 80)
        self.assertEqual(Event.objects.get().notes, 'Outdoor ceremony')
        self.assertEqual(Event.objects.count(), 1)

    def test_availability_returns_only_blocking_intervals_without_client_details(self):
        url = reverse('event-availability')
        self.existing_event(start='09:00', end='10:00')
        self.existing_event(start='10:00', end='11:00', booking_status=Event.Status.ACTIVE)
        self.existing_event(start='11:00', end='12:00', booking_status=Event.Status.CANCELLED)
        self.existing_event(start='12:00', end='13:00', booking_status=Event.Status.COMPLETED)
        response = self.client.get(url, {
            'window_start': f'{self.day}T09:30:00Z',
            'window_end': f'{self.day}T12:00:00Z',
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['booked_intervals']), 2)
        self.assertEqual(response.data['booked_intervals'][0]['starts_at'], self.at('09:00'))
        self.assertEqual(set(response.data['booked_intervals'][0]), {'starts_at', 'ends_at'})

    def test_availability_rejects_invalid_or_oversized_window(self):
        url = reverse('event-availability')
        for end in (f'{self.day}T09:00:00Z', f'{self.day}T09:30:00Z', '2026-11-17T10:00:00Z'):
            with self.subTest(end=end):
                response = self.client.get(url, {
                    'window_start': f'{self.day}T10:00:00Z',
                    'window_end': end,
                })
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_rejects_equal_and_reversed_times(self):
        for start, end in (('10:00', '10:00'), ('11:00', '10:00')):
            with self.subTest(start=start, end=end):
                response = self.client.post(self.url, self.payload(start, end), format='json')
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
                self.assertIn('ends_at', response.data)
        self.assertEqual(Event.objects.count(), 0)

    def test_rejects_overlap_with_reserved_and_active_sessions(self):
        for booking_status in (Event.Status.RESERVED, Event.Status.ACTIVE):
            with self.subTest(status=booking_status):
                self.existing_event(booking_status=booking_status)
                response = self.client.post(self.url, self.payload('10:30', '11:30'), format='json')
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
                self.assertIn('non_field_errors', response.data)
                Event.objects.all().delete()

    def test_allows_back_to_back_sessions(self):
        self.existing_event()
        before = self.client.post(self.url, self.payload('09:00', '10:00'), format='json')
        after = self.client.post(self.url, self.payload('11:00', '12:00'), format='json')
        self.assertEqual(before.status_code, status.HTTP_201_CREATED)
        self.assertEqual(after.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Event.objects.count(), 3)

    def test_cancelled_and_completed_sessions_do_not_block(self):
        for booking_status in (Event.Status.CANCELLED, Event.Status.COMPLETED):
            with self.subTest(status=booking_status):
                self.existing_event(booking_status=booking_status)
                response = self.client.post(self.url, self.payload('10:30', '11:30'), format='json')
                self.assertEqual(response.status_code, status.HTTP_201_CREATED)
                Event.objects.all().delete()

    def test_database_rejects_conflicting_insert_update_and_status_change(self):
        self.existing_event()
        with self.assertRaises(IntegrityError), transaction.atomic():
            Event.objects.bulk_create([
                Event(
                    client_name='Casey Kim', client_email='casey@example.com', event_type='Party',
                    starts_at=self.at('10:30'), ends_at=self.at('11:30'),
                ),
            ])

        adjacent = self.existing_event(start='11:00', end='12:00')
        with self.assertRaises(IntegrityError), transaction.atomic():
            Event.objects.filter(pk=adjacent.pk).update(starts_at=self.at('10:30'))

        completed = self.existing_event(start='10:30', end='11:30', booking_status=Event.Status.COMPLETED)
        with self.assertRaises(IntegrityError), transaction.atomic():
            Event.objects.filter(pk=completed.pk).update(status=Event.Status.ACTIVE)

    def test_database_rejects_invalid_range(self):
        with self.assertRaises(IntegrityError), transaction.atomic():
            self.existing_event(start='11:00', end='10:00')
