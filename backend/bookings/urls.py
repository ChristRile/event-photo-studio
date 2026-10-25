from django.urls import path

from .views import EventAvailabilityView, EventBookingCreateView


urlpatterns = [
    path('events/availability/', EventAvailabilityView.as_view(), name='event-availability'),
    path('events/', EventBookingCreateView.as_view(), name='event-booking-create'),
]
