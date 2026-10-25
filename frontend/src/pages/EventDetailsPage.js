import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { Link as RouterLink, useParams } from 'react-router-dom';
import SectionLabel from '../components/atoms/SectionLabel';
import { formatDate, formatTime, getEventById } from '../mocks/events';
import NotFoundPage from './NotFoundPage';

function Detail({ label, value }) {
  return <Box sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider' }}><Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</Typography><Typography sx={{ mt: .7, fontWeight: 500 }}>{value}</Typography></Box>;
}

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const event = getEventById(eventId);
  if (!event) return <NotFoundPage title="Event not found" />;

  return <Box sx={{ py: { xs: 6, md: 9 } }}><Container maxWidth="lg">
    <Button component={RouterLink} to="/dashboard" startIcon={<ArrowBackIcon />} sx={{ px: 0, mb: 4 }}>Back to dashboard</Button>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { sm: 'end' }, mb: 5 }}>
      <Box><SectionLabel>EVENT OVERVIEW · SAMPLE DATA</SectionLabel><Typography component="h1" variant="h2" sx={{ fontSize: { xs: 42, md: 58 }, mt: 1.5 }}>{event.title}</Typography><Typography color="text.secondary" sx={{ mt: 1.5 }}>{event.type} · {event.venue}</Typography></Box>
      <Chip label={event.status} sx={{ bgcolor: event.status === 'Upcoming' ? '#E4EEE3' : '#ECEBE6', color: 'primary.main', fontWeight: 700, px: 1 }} />
    </Stack>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 7 }}><Box sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'divider', borderRadius: 4, p: { xs: 3, md: 4 }, height: '100%' }}><Typography variant="h5" sx={{ mb: 2 }}>The details</Typography><Grid container columnSpacing={4}>
        <Grid size={{ xs: 12, sm: 6 }}><Detail label="Event date" value={`${formatDate(event.date)} at ${formatTime(event.time)}`} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><Detail label="Session duration" value={event.duration} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><Detail label="Scheduled session dates" value={event.sessionDates.map(formatDate).join(' · ')} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><Detail label="Event status" value={event.status} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><Detail label="Guest limit" value={`${event.guestLimit} guests`} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><Detail label="Upload limit" value={`${event.uploadLimit} photos per guest`} /></Grid>
      </Grid></Box></Grid>
      <Grid size={{ xs: 12, md: 5 }}><Box sx={{ bgcolor: '#E8ECE5', borderRadius: 4, p: { xs: 3, md: 4 }, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><SectionLabel>GUEST ACCESS</SectionLabel><Typography variant="h5" sx={{ mt: 1.5 }}>One scan, every perspective.</Typography><Box role="img" aria-label="QR code placeholder, not a scannable code" sx={{ width: 150, height: 150, bgcolor: 'white', borderRadius: 2, my: 3, display: 'grid', placeItems: 'center', border: '1px dashed #B5C0B5' }}><QrCode2OutlinedIcon sx={{ fontSize: 75, color: '#8B9A8B' }} /></Box><Typography variant="body2" color="text.secondary">QR code placeholder · Not scannable in this preview</Typography><Button component={RouterLink} to={`/e/${event.id}`} endIcon={<ArrowForwardIcon />} sx={{ mt: 'auto', pt: 3, px: 0 }}>Preview guest page</Button></Box></Grid>
    </Grid>
    <Box sx={{ mt: 7 }}><Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ justifyContent: 'space-between', alignItems: { sm: 'end' }, mb: 3 }}><Box><SectionLabel>GALLERY PREVIEW</SectionLabel><Typography variant="h4" sx={{ mt: 1 }}>Your collected moments</Typography></Box><Typography color="text.secondary">{event.photoCount} photos · Sample count</Typography></Stack><Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>{[1, 2, 3, 4].map((index) => <Box key={index} sx={{ aspectRatio: '4 / 3', borderRadius: 3, bgcolor: index % 2 ? '#DEE4DB' : '#ECE2DA', display: 'grid', placeItems: 'center' }}><Stack spacing={1} sx={{ alignItems: 'center', color: 'text.secondary' }}><CollectionsOutlinedIcon sx={{ fontSize: 32, opacity: .6 }} /><Typography variant="caption">Photo placeholder</Typography></Stack></Box>)}</Box><Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>Gallery images and counts are placeholders. No photos are stored.</Typography></Box>
  </Container></Box>;
}
