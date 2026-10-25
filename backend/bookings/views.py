from django.db import IntegrityError
from rest_framework import generics, serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Event
from .serializers import AvailabilityQuerySerializer, EventBookingSerializer


class EventBookingCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventBookingSerializer

    def perform_create(self, serializer):
        try:
            serializer.save()
        except IntegrityError as exc:
            if 'event_booking_overlap' in str(exc):
                raise serializers.ValidationError(
                    {'non_field_errors': 'This session overlaps an existing reservation.'}
                ) from exc
            if 'event_starts_before_ends' in str(exc):
                raise serializers.ValidationError(
                    {'ends_at': 'End time must be after start time.'}
                ) from exc
            raise


class EventAvailabilityView(APIView):
    def get(self, request):
        query = AvailabilityQuerySerializer(data=request.query_params)
        query.is_valid(raise_exception=True)
        start = query.validated_data['window_start']
        end = query.validated_data['window_end']
        bookings = Event.objects.filter(
            status__in=(Event.Status.RESERVED, Event.Status.ACTIVE),
            starts_at__lt=end,
            ends_at__gt=start,
        ).order_by('starts_at').values('starts_at', 'ends_at')
        return Response({'booked_intervals': list(bookings)})
