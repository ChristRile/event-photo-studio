import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SectionLabel from '../components/atoms/SectionLabel';
import InquiryForm from '../components/organisms/InquiryForm';

export default function InquiryPage() {
  return <Box sx={{ py: { xs: 7, md: 11 } }}><Container maxWidth="lg"><Grid container spacing={{ xs: 5, md: 8 }}>
    <Grid size={{ xs: 12, md: 4 }}><Box sx={{ position: { md: 'sticky' }, top: 120 }}><SectionLabel>FREE SESSION BOOKING</SectionLabel><Typography component="h1" variant="h2" sx={{ fontSize: { xs: 42, md: 56 }, mt: 2 }}>Let's bring your event into focus.</Typography><Typography color="text.secondary" sx={{ fontSize: 17, lineHeight: 1.7, mt: 3 }}>Tell us about your event and choose an available session. Your free booking is saved after the final availability check.</Typography><Stack spacing={3} sx={{ mt: 5 }}><Stack direction="row" spacing={2}><CalendarMonthOutlinedIcon color="secondary" /><Typography color="text.secondary">Choose an event date, session start time, and duration that fit your plans.</Typography></Stack><Stack direction="row" spacing={2}><AutoAwesomeOutlinedIcon color="secondary" /><Typography color="text.secondary">Add a note to describe the moments you want to capture.</Typography></Stack></Stack></Box></Grid>
    <Grid size={{ xs: 12, md: 8 }}><InquiryForm /></Grid>
  </Grid></Container></Box>;
}
