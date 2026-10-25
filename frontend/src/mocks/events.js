export const events = [
  {
    id: 'golden-hour-gala', title: 'Golden Hour Gala', type: 'Corporate celebration', venue: 'The Glasshouse, Manila',
    date: '2026-11-14', time: '17:00', sessionDates: ['2026-11-14'], duration: '4 hours', status: 'Upcoming',
    guestLimit: 150, uploadLimit: 10, photoCount: 0, guestAllowanceRemaining: 10,
    expiresAt: '2026-11-21T23:59:00+08:00',
    welcome: 'Welcome to the Golden Hour Gala. Capture the moments that make tonight yours.',
  },
  {
    id: 'garden-wedding', title: 'A Garden Wedding', type: 'Wedding', venue: 'The Fern Pavilion, Tagaytay',
    date: '2026-12-05', time: '15:30', sessionDates: ['2026-12-05', '2026-12-06'], duration: '6 hours', status: 'Upcoming',
    guestLimit: 200, uploadLimit: 15, photoCount: 0, guestAllowanceRemaining: 15,
    expiresAt: '2026-12-13T23:59:00+08:00',
    welcome: 'Welcome to our garden celebration. We would love to see the day through your eyes.',
  },
  {
    id: 'summer-social', title: 'Summer Social', type: 'Private party', venue: 'Casa del Sol, Batangas',
    date: '2026-09-12', time: '16:00', sessionDates: ['2026-09-12'], duration: '3 hours', status: 'Completed',
    guestLimit: 80, uploadLimit: 10, photoCount: 236, guestAllowanceRemaining: 0,
    expiresAt: '2026-09-20T23:59:00+08:00', welcome: 'Thanks for celebrating with us.',
  },
];

export const featuredEvent = events[0];
export const getEventById = (id) => events.find((event) => event.id === id);
export const formatDate = (date) => new Intl.DateTimeFormat('en-PH', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Manila' }).format(new Date(`${date}T12:00:00+08:00`));
export const formatTime = (time) => new Intl.DateTimeFormat('en-PH', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' }).format(new Date(`2026-01-01T${time}:00+08:00`));
export const formatDateTime = (dateTime) => new Intl.DateTimeFormat('en-PH', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' }).format(new Date(dateTime));
