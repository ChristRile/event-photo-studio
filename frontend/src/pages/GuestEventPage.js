import { useState } from 'react';
import { Alert, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Stack, Typography } from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SectionLabel from '../components/atoms/SectionLabel';
import { formatDate, formatDateTime, getEventById } from '../mocks/events';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

export default function GuestEventPage() {
  const { eventId } = useParams();
  const event = getEventById(eventId);
  const [action, setAction] = useState(null);
  if (!event) return <NotFoundPage title="Event not found" />;
  const expired = new Date(event.expiresAt) < new Date();
  const used = event.uploadLimit - event.guestAllowanceRemaining;

  return <Box sx={{ py: { xs: 7, md: 11 } }}><Container maxWidth="sm">
    <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}><SectionLabel>THE GUEST EXPERIENCE · PREVIEW</SectionLabel><Typography component="h1" variant="h2" sx={{ fontSize: { xs: 43, sm: 58 }, mt: 1 }}>Be part of the story.</Typography><Typography variant="h5" sx={{ pt: 1 }}>{event.title}</Typography><Typography color="text.secondary">{formatDate(event.date)} · {event.venue}</Typography></Stack>
    <Box sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'divider', borderRadius: 4, p: { xs: 3, sm: 5 }, mt: 5 }}>
      <Typography sx={{ textAlign: 'center', fontSize: 19, lineHeight: 1.6, mb: 4 }}>{event.welcome}</Typography>
      {expired && <Alert severity="info" sx={{ mb: 3 }}>This sample event has expired. Photo sharing is closed.</Alert>}
      <Stack spacing={1.5}><Button fullWidth variant="contained" size="large" startIcon={<PhotoCameraOutlinedIcon />} disabled={expired} onClick={() => setAction('camera')}>Take a Photo</Button><Button fullWidth variant="outlined" size="large" startIcon={<FileUploadOutlinedIcon />} disabled={expired} onClick={() => setAction('upload')}>Upload a Photo</Button></Stack>
      <Box sx={{ bgcolor: '#F5F6F2', borderRadius: 2, p: 2.5, mt: 4 }}><Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}><Typography sx={{ fontWeight: 600 }}>Your photo allowance</Typography><Typography sx={{ fontWeight: 700 }}>{event.guestAllowanceRemaining} of {event.uploadLimit} remaining</Typography></Stack><LinearProgress variant="determinate" value={(used / event.uploadLimit) * 100} sx={{ mt: 2, height: 7, borderRadius: 5, bgcolor: '#DFE6DC', '& .MuiLinearProgress-bar': { bgcolor: 'secondary.main' } }} /><Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>Sample allowance for this preview guest.</Typography></Box>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start', mt: 4, color: 'text.secondary' }}><EventAvailableOutlinedIcon fontSize="small" /><Typography variant="body2">This event's guest access {expired ? 'expired' : 'expires'} on {formatDateTime(event.expiresAt)} (Manila time).</Typography></Stack>
    </Box>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 3 }}>This is a sample guest page. Camera access and file uploads are not available yet.</Typography>
    <Dialog open={Boolean(action)} onClose={() => setAction(null)} aria-labelledby="guest-action-title"><DialogTitle id="guest-action-title">{action === 'camera' ? 'Camera' : 'Photo upload'} is coming soon</DialogTitle><DialogContent><Typography color="text.secondary">This is a frontend preview. No camera access or photo upload is available yet.</Typography></DialogContent><DialogActions><Button onClick={() => setAction(null)}>Close</Button></DialogActions></Dialog>
  </Container></Box>;
}
