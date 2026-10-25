from django.db import models
from django.db.models import F, Q


class Event(models.Model):
    class Status(models.TextChoices):
        RESERVED = 'reserved', 'Reserved'
        ACTIVE = 'active', 'Active'
        COMPLETED = 'completed', 'Completed'
        CANCELLED = 'cancelled', 'Cancelled'

    client_name = models.CharField(max_length=150)
    client_email = models.EmailField()
    event_type = models.CharField(max_length=100)
    guest_count = models.PositiveIntegerField(null=True, blank=True)
    notes = models.TextField(blank=True)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.RESERVED)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                condition=Q(starts_at__lt=F('ends_at')),
                name='event_starts_before_ends',
            ),
        ]
        indexes = [
            models.Index(fields=['status', 'starts_at', 'ends_at'], name='event_booking_window_idx'),
        ]
