from rest_framework import serializers

from .models import Event


class EventBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'client_name', 'client_email', 'event_type', 'guest_count', 'notes', 'starts_at', 'ends_at', 'status', 'created_at')
        read_only_fields = ('id', 'status', 'created_at')

    def validate(self, attrs):
        starts_at = attrs['starts_at']
        ends_at = attrs['ends_at']
        if starts_at >= ends_at:
            raise serializers.ValidationError({'ends_at': 'End time must be after start time.'})

        overlapping = Event.objects.filter(
            status__in=(Event.Status.RESERVED, Event.Status.ACTIVE),
            starts_at__lt=ends_at,
            ends_at__gt=starts_at,
        )
        if self.instance is not None:
            overlapping = overlapping.exclude(pk=self.instance.pk)
        if overlapping.exists():
            raise serializers.ValidationError({'non_field_errors': 'This session overlaps an existing reservation.'})
        return attrs


class AvailabilityQuerySerializer(serializers.Serializer):
    window_start = serializers.DateTimeField()
    window_end = serializers.DateTimeField()

    def validate(self, attrs):
        from datetime import timedelta

        if attrs['window_start'] >= attrs['window_end']:
            raise serializers.ValidationError({'window_end': 'End must be after start.'})
        if attrs['window_end'] - attrs['window_start'] > timedelta(days=2):
            raise serializers.ValidationError({'window_end': 'Availability window cannot exceed two days.'})
        return attrs
