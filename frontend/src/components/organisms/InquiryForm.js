import { Alert, Box, Button, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useInquiryForm from '../../hooks/useInquiryForm';

const eventTypes = ['Wedding', 'Birthday', 'Corporate event', 'Private party', 'Other'];
const durations = ['2 hours', '3 hours', '4 hours', '6 hours', 'Full day'];

export default function InquiryForm() {
  const { values, errors, loading, confirmation, setField, submit, minDate, timeSlots, availabilityReady, checkingAvailability, availabilityError } = useInquiryForm();
  const field = (name) => ({ value: values[name], onChange: (event) => setField(name, event.target.value), error: Boolean(errors[name]), helperText: errors[name] || ' ' });

  return <Box component="form" onSubmit={submit} noValidate sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'divider', borderRadius: 4, p: { xs: 3, sm: 4, md: 5 } }}>
    <Stack spacing={1} sx={{ mb: 3 }}><Typography variant="h5">Reserve a Free Session</Typography><Typography color="text.secondary">Share your event details and preferred session time. Fields marked * are required.</Typography></Stack>
    <Alert severity="info" sx={{ mb: 3 }}>Free sessions depend on availability. Available times are checked again when you reserve. Times shown are in your device's local time zone.</Alert>
    {confirmation && <Alert severity="success" role="status" sx={{ mb: 3 }}>Thanks, {confirmation.name}! Your free session is reserved. Booking reference: {confirmation.reference}. No confirmation email is sent yet.</Alert>}
    {availabilityError && <Alert severity="error" sx={{ mb: 3 }}>{availabilityError}</Alert>}
    {errors.form && <Alert severity="error" sx={{ mb: 3 }}>{errors.form}</Alert>}
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Client name *" autoComplete="name" {...field('clientName')} /></Grid>
      <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Email *" type="email" autoComplete="email" {...field('email')} /></Grid>
      <Grid size={{ xs: 12, sm: 6 }}><TextField select fullWidth label="Event type *" {...field('eventType')}>{eventTypes.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}</TextField></Grid>
      <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Event date *" type="date" slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: minDate } }} {...field('eventDate')} /></Grid>
      <Grid size={{ xs: 12, sm: 6 }}><TextField select fullWidth label="Preferred session duration *" {...field('duration')}>{durations.map((duration) => <MenuItem key={duration} value={duration}>{duration === 'Full day' ? 'Full day (8 hours)' : duration}</MenuItem>)}</TextField></Grid>
      <Grid size={{ xs: 12, sm: 6 }}><TextField select fullWidth label="Start time *" disabled={!availabilityReady || !values.duration} {...field('startTime')} helperText={errors.startTime || (checkingAvailability ? 'Checking availability…' : 'Choose a date and duration to see available times.')}>
        {timeSlots.map((slot) => <MenuItem key={slot.value} value={slot.value} disabled={slot.disabled}>{slot.label}</MenuItem>)}
      </TextField></Grid>
      <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Expected guest count *" type="number" slotProps={{ htmlInput: { min: 1, step: 1 } }} {...field('guestCount')} /></Grid>
      <Grid size={{ xs: 12 }}><TextField fullWidth multiline minRows={4} label="Additional notes" placeholder="Tell us anything else we should know." {...field('notes')} /></Grid>
    </Grid>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, mt: 3 }}>
      <Typography variant="caption" color="text.secondary" sx={{ maxWidth: 390 }}>Your reservation is saved when an available session is confirmed. No email is sent yet.</Typography>
      <Button type="submit" disabled={loading} variant="contained" size="large" endIcon={loading ? <CircularProgress size={17} color="inherit" /> : <ArrowForwardIcon />}>Reserve free session</Button>
    </Stack>
  </Box>;
}
