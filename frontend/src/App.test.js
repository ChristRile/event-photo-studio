import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.scrollTo = jest.fn();
  window.history.pushState({}, '', '/');
});

test('navigates through the sample dashboard to event and guest pages', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /moments you/i })).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('link', { name: 'Sample dashboard' })[0]);
  expect(screen.getByRole('heading', { name: 'Welcome back.' })).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('link', { name: 'View event' })[0]);
  expect(screen.getByRole('heading', { name: 'Golden Hour Gala' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Preview guest page' }));
  expect(screen.getByRole('heading', { name: 'Be part of the story.' })).toBeInTheDocument();
  expect(screen.getByText('10 of 10 remaining')).toBeInTheDocument();
});

test('shows unavailable times and saves a free session through the API', async () => {
  const bookedStart = new Date(2099, 0, 15, 14, 0).toISOString();
  const bookedEnd = new Date(2099, 0, 15, 16, 0).toISOString();
  global.fetch = jest.fn((url, options) => Promise.resolve(options?.method === 'POST'
    ? { ok: true, json: async () => ({ id: 42, client_name: 'Avery Cruz' }) }
    : { ok: true, json: async () => ({ booked_intervals: [{ starts_at: bookedStart, ends_at: bookedEnd }] }) }));
  window.history.pushState({}, '', '/inquire');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Reserve free session' }));
  expect(screen.getByText('Enter your name.')).toBeInTheDocument();
  expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Client name *'), { target: { value: 'Avery Cruz' } });
  fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'avery@example.com' } });
  fireEvent.mouseDown(screen.getByLabelText('Event type *'));
  fireEvent.click(screen.getByRole('option', { name: 'Wedding' }));
  fireEvent.change(screen.getByLabelText('Event date *'), { target: { value: '2099-01-15' } });
  fireEvent.change(screen.getByLabelText('Expected guest count *'), { target: { value: '80' } });
  fireEvent.mouseDown(screen.getByLabelText('Preferred session duration *'));
  fireEvent.click(screen.getByRole('option', { name: '4 hours' }));
  await waitFor(() => expect(screen.getByLabelText('Start time *')).not.toHaveAttribute('aria-disabled', 'true'));
  fireEvent.mouseDown(screen.getByLabelText('Start time *'));
  expect(screen.getByRole('option', { name: '15:00 (Unavailable)' })).toHaveAttribute('aria-disabled', 'true');
  fireEvent.click(screen.getByRole('option', { name: '16:00' }));
  fireEvent.click(screen.getByRole('button', { name: 'Reserve free session' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Booking reference: 42'));
  const post = global.fetch.mock.calls.find(([, options]) => options?.method === 'POST');
  expect(JSON.parse(post[1].body)).toMatchObject({ guest_count: 80, starts_at: bookedEnd });
}, 15000);

test('refreshes availability after a server booking conflict', async () => {
  let checks = 0;
  global.fetch = jest.fn((url, options) => Promise.resolve(options?.method === 'POST'
    ? { ok: false, json: async () => ({ non_field_errors: ['This session overlaps an existing reservation.'] }) }
    : { ok: true, json: async () => {
      checks += 1;
      return { booked_intervals: checks === 1 ? [] : [{ starts_at: new Date(2099, 0, 15, 16).toISOString(), ends_at: new Date(2099, 0, 15, 18).toISOString() }] };
    } }));
  window.history.pushState({}, '', '/inquire');
  render(<App />);
  fireEvent.change(screen.getByLabelText('Client name *'), { target: { value: 'Avery Cruz' } });
  fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'avery@example.com' } });
  fireEvent.mouseDown(screen.getByLabelText('Event type *'));
  fireEvent.click(screen.getByRole('option', { name: 'Wedding' }));
  fireEvent.change(screen.getByLabelText('Event date *'), { target: { value: '2099-01-15' } });
  fireEvent.change(screen.getByLabelText('Expected guest count *'), { target: { value: '80' } });
  fireEvent.mouseDown(screen.getByLabelText('Preferred session duration *'));
  fireEvent.click(screen.getByRole('option', { name: '2 hours' }));
  await waitFor(() => expect(screen.getByLabelText('Start time *')).not.toHaveAttribute('aria-disabled', 'true'));
  fireEvent.mouseDown(screen.getByLabelText('Start time *'));
  fireEvent.click(screen.getByRole('option', { name: '16:00' }));
  fireEvent.click(screen.getByRole('button', { name: 'Reserve free session' }));
  await waitFor(() => expect(screen.getByText('That time was just reserved. Choose another available start time.')).toBeInTheDocument());
  await waitFor(() => expect(checks).toBe(2));
  fireEvent.mouseDown(screen.getByLabelText('Start time *'));
  expect(screen.getByRole('option', { name: '16:00 (Unavailable)' })).toHaveAttribute('aria-disabled', 'true');
}, 15000);

test('uses the route ID for a different event and its guest page', () => {
  window.history.pushState({}, '', '/events/garden-wedding');
  render(<App />);
  expect(screen.getByRole('heading', { name: 'A Garden Wedding' })).toBeInTheDocument();
  expect(screen.getByText('200 guests')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: 'Preview guest page' }));
  expect(screen.getByRole('heading', { name: 'A Garden Wedding' })).toBeInTheDocument();
  expect(screen.getByText('15 of 15 remaining')).toBeInTheDocument();
});
