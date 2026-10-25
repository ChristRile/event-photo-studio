import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';
import EventCard from '../components/molecules/EventCard';
import SectionLabel from '../components/atoms/SectionLabel';
import { events } from '../mocks/events';

const upcoming = events.filter((event) => event.status === 'Upcoming');
const previous = events.filter((event) => event.status === 'Completed');

export default function DashboardPage() {
  return <Box sx={{ py: { xs: 7, md: 10 } }}><Container maxWidth="lg">
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: 'space-between', alignItems: { sm: 'end' } }}>
      <Box><SectionLabel>CLIENT SPACE · SAMPLE DATA</SectionLabel><Typography component="h1" variant="h2" sx={{ fontSize: { xs: 42, md: 56 }, mt: 1.5 }}>Welcome back.</Typography><Typography color="text.secondary" sx={{ mt: 2, fontSize: 17 }}>A look at the celebrations in your studio.</Typography></Box>
      <Button component={RouterLink} to="/inquire" variant="contained" startIcon={<AddIcon />}>Create Event</Button>
    </Stack>
    <Box sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 4, p: { xs: 3, md: 4 }, mt: 6, mb: 7 }}>
      <Typography variant="overline" sx={{ color: '#D7BEA9', fontWeight: 700, letterSpacing: '.15em' }}>EVENT SUMMARY · MOCK</Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>{[
        { value: events.length, label: 'Total events' }, { value: upcoming.length, label: 'Upcoming' },
        { value: previous.length, label: 'Completed' }, { value: events.reduce((sum, event) => sum + event.photoCount, 0), label: 'Photos collected' },
      ].map((item) => <Grid key={item.label} size={{ xs: 6, md: 3 }}><Typography sx={{ fontSize: { xs: 32, md: 42 }, fontWeight: 300 }}>{item.value}</Typography><Typography sx={{ color: '#C8D2CA' }}>{item.label}</Typography></Grid>)}</Grid>
    </Box>
    <Stack spacing={7}>
      <Box><Typography variant="h4" sx={{ mb: 3 }}>Upcoming events</Typography><Grid container spacing={2}>{upcoming.map((event) => <Grid key={event.id} size={{ xs: 12, md: 6 }}><EventCard event={event} /></Grid>)}</Grid></Box>
      <Box><Typography variant="h4" sx={{ mb: 3 }}>Previous events</Typography><Grid container spacing={2}>{previous.map((event) => <Grid key={event.id} size={{ xs: 12, md: 6 }}><EventCard event={event} /></Grid>)}</Grid></Box>
    </Stack>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 5 }}>This dashboard is a preview. Events and counts are sample data, and Create Event opens the inquiry form.</Typography>
  </Container></Box>;
}
