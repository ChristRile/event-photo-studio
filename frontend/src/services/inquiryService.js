const apiBase = process.env.REACT_APP_API_BASE_URL || '/api';

export const durationMinutes = {
  '2 hours': 120,
  '3 hours': 180,
  '4 hours': 240,
  '6 hours': 360,
  'Full day': 480,
};

export function bookingWindow(date, time, duration) {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const start = new Date(year, month - 1, day, hour, minute);
  return { start, end: new Date(start.getTime() + durationMinutes[duration] * 60000) };
}

export async function getAvailability(date, signal) {
  const [year, month, day] = date.split('-').map(Number);
  const start = new Date(year, month - 1, day);
  // Include sessions that continue after midnight, even for a late start time.
  const end = new Date(year, month - 1, day + 1, 8);
  const params = new URLSearchParams({ window_start: start.toISOString(), window_end: end.toISOString() });
  const response = await fetch(`${apiBase}/events/availability/?${params}`, { signal });
  if (!response.ok) throw new Error('Availability could not be loaded. Please try again.');
  const data = await response.json();
  if (!Array.isArray(data.booked_intervals)) throw new Error('Availability could not be loaded. Please try again.');
  return data.booked_intervals;
}

export async function submitInquiry(inquiry) {
  const { start, end } = bookingWindow(inquiry.eventDate, inquiry.startTime, inquiry.duration);
  const response = await fetch(`${apiBase}/events/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_name: inquiry.clientName.trim(),
      client_email: inquiry.email.trim(),
      event_type: inquiry.eventType,
      guest_count: Number(inquiry.guestCount),
      notes: inquiry.notes.trim(),
      starts_at: start.toISOString(),
      ends_at: end.toISOString(),
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const conflict = Boolean(data.non_field_errors);
    const firstError = Object.values(data).flat().find((value) => typeof value === 'string');
    const error = new Error(firstError || 'The reservation could not be saved. Please try again.');
    error.isConflict = conflict;
    throw error;
  }
  return { reference: data.id, name: data.client_name };
}
