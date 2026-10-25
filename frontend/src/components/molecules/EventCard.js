import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { formatDate, formatTime } from '../../mocks/events';

export default function EventCard({ event }) {
  return <Card variant="outlined" sx={{ height: '100%', borderColor: 'divider' }}>
    <CardContent sx={{ p: { xs: 3, md: 3.5 }, '&:last-child': { pb: { xs: 3, md: 3.5 } } }}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 700, letterSpacing: '.13em' }}>{event.type}</Typography>
        <Chip size="small" label={event.status} sx={{ bgcolor: event.status === 'Upcoming' ? '#E9F0E8' : '#F0EFEA', color: event.status === 'Upcoming' ? '#3E6D50' : '#69716A', fontWeight: 600 }} />
      </Stack>
      <Typography variant="h5" sx={{ mt: 2, mb: 2.5 }}>{event.title}</Typography>
      <Stack spacing={1.2} sx={{ color: 'text.secondary' }}>
        <Stack direction="row" spacing={1.3} sx={{ alignItems: 'center' }}><CalendarTodayOutlinedIcon fontSize="small" /><Typography variant="body2">{formatDate(event.date)} · {formatTime(event.time)}</Typography></Stack>
        <Stack direction="row" spacing={1.3} sx={{ alignItems: 'center' }}><PlaceOutlinedIcon fontSize="small" /><Typography variant="body2">{event.venue}</Typography></Stack>
      </Stack>
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 3, pt: 2 }}>
        <Button component={RouterLink} to={`/events/${event.id}`} endIcon={<ArrowOutwardIcon />} sx={{ px: 0 }}>View event</Button>
      </Box>
    </CardContent>
  </Card>;
}
