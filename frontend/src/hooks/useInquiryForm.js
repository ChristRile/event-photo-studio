import { useEffect, useState } from 'react';
import { bookingWindow, durationMinutes, getAvailability, submitInquiry } from '../services/inquiryService';

const initialValues = {
  clientName: '', email: '', eventType: '', eventDate: '', startTime: '',
  guestCount: '', duration: '', notes: '',
};

const localToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export default function useInquiryForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [availabilityError, setAvailabilityError] = useState('');
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availabilityVersion, setAvailabilityVersion] = useState(0);

  useEffect(() => {
    if (!values.eventDate || values.eventDate < localToday()) return undefined;
    const controller = new AbortController();
    setCheckingAvailability(true);
    setAvailabilityError('');
    getAvailability(values.eventDate, controller.signal)
      .then((intervals) => setAvailability({ date: values.eventDate, intervals }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setAvailability(null);
          setAvailabilityError(error.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setCheckingAvailability(false);
      });
    return () => controller.abort();
  }, [values.eventDate, availabilityVersion]);

  const setField = (name, value) => {
    setValues((current) => ({
      ...current,
      [name]: value,
      ...((name === 'eventDate' || name === 'duration') ? { startTime: '' } : {}),
    }));
    setErrors((current) => ({ ...current, [name]: undefined, startTime: undefined, form: undefined }));
    setConfirmation(null);
  };

  const availabilityReady = availability?.date === values.eventDate && !checkingAvailability && !availabilityError;
  const timeSlots = values.eventDate && durationMinutes[values.duration] ? Array.from({ length: 48 }, (_, index) => {
    const hour = String(Math.floor(index / 2)).padStart(2, '0');
    const minute = index % 2 ? '30' : '00';
    const value = `${hour}:${minute}`;
    const { start, end } = bookingWindow(values.eventDate, value, values.duration);
    const booked = availabilityReady && availability.intervals.some((interval) =>
      start < new Date(interval.ends_at) && end > new Date(interval.starts_at));
    const invalidLocalTime = start.getHours() !== Number(hour) || start.getMinutes() !== Number(minute);
    return { value, label: `${value}${booked || invalidLocalTime ? ' (Unavailable)' : ''}`, disabled: start <= new Date() || booked || invalidLocalTime };
  }) : [];

  const validate = () => {
    const next = {};
    if (!values.clientName.trim()) next.clientName = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (!values.eventType) next.eventType = 'Choose an event type.';
    if (!values.eventDate || values.eventDate < localToday()) next.eventDate = 'Choose today or a future date.';
    if (!values.startTime) next.startTime = 'Choose a start time.';
    if (!Number.isInteger(Number(values.guestCount)) || Number(values.guestCount) < 1) next.guestCount = 'Enter at least one guest.';
    if (!values.duration) next.duration = 'Choose a session duration.';
    if (!availabilityReady) next.form = 'Wait for availability to load before reserving.';
    if (values.startTime && !timeSlots.some((slot) => slot.value === values.startTime && !slot.disabled)) next.startTime = 'Choose an available start time.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    setConfirmation(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await submitInquiry(values);
      setConfirmation(result);
      setValues(initialValues);
      setAvailability(null);
    } catch (error) {
      setErrors({ form: error.isConflict ? 'That time was just reserved. Choose another available start time.' : error.message });
      if (error.isConflict) {
        setValues((current) => ({ ...current, startTime: '' }));
        setAvailabilityVersion((current) => current + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  return { values, errors, loading, confirmation, setField, submit, minDate: localToday(), timeSlots, availabilityReady, checkingAvailability, availabilityError };
}
