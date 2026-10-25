import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { Link as RouterLink } from 'react-router-dom';
import SectionLabel from '../atoms/SectionLabel';
import FeatureCard from '../molecules/FeatureCard';

const steps = [
  { number: '01', title: 'Tell us about your event', text: 'Share your date, guest count, and the kind of celebration you have in mind.' },
  { number: '02', title: 'Make it your own', text: 'Plan a session and personalize the photo experience for your guests.' },
  { number: '03', title: 'Share the moments', text: 'Guests use an event QR code to contribute their photos in one place.' },
];

const features = [
  { icon: TuneOutlinedIcon, title: 'A look that feels like you', description: 'Customize an event photo template to suit your celebration.' },
  { icon: QrCode2OutlinedIcon, title: 'Easy guest access', description: 'A unique event QR code lets guests join without creating an account.' },
  { icon: CollectionsOutlinedIcon, title: 'One shared collection', description: 'Bring the best perspectives from the whole guest list together.' },
  { icon: FileDownloadOutlinedIcon, title: 'A keepsake to revisit', description: 'After the event, organizers will be able to download their compilation.' },
];

export default function LandingSections() {
  return <>
    <Box id="how-it-works" sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 9, md: 12 }, scrollMarginTop: 80 }}>
      <Container maxWidth="lg">
        <SectionLabel light>HOW IT WORKS</SectionLabel>
        <Typography variant="h2" sx={{ fontSize: { xs: 38, md: 52 }, maxWidth: 620, mt: 1.5, mb: 6 }}>A simple way to gather the whole story.</Typography>
        <Grid container spacing={4}>{steps.map((step) => <Grid key={step.number} size={{ xs: 12, md: 4 }}>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,.3)', pt: 2.5 }}><Typography sx={{ color: '#CFB49C', fontWeight: 700, letterSpacing: '.12em' }}>{step.number}</Typography><Typography variant="h5" sx={{ mt: 2, mb: 1.5 }}>{step.title}</Typography><Typography sx={{ color: '#C8D2CA', lineHeight: 1.7, maxWidth: 300 }}>{step.text}</Typography></Box>
        </Grid>)}</Grid>
      </Container>
    </Box>
    <Box sx={{ py: { xs: 9, md: 12 } }}><Container maxWidth="lg">
      <SectionLabel>WHAT YOU CAN CREATE</SectionLabel>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between', alignItems: { md: 'end' }, mt: 1, mb: 5 }}><Typography variant="h2" sx={{ fontSize: { xs: 38, md: 52 }, maxWidth: 610 }}>Made for the memories you make together.</Typography><Typography color="text.secondary" sx={{ maxWidth: 310, lineHeight: 1.7 }}>The experience is designed around your event, from the first inquiry to the final collection.</Typography></Stack>
      <Grid container spacing={2}>{features.map((feature) => <Grid key={feature.title} size={{ xs: 12, sm: 6, md: 3 }}><FeatureCard {...feature} /></Grid>)}</Grid>
    </Container></Box>
    <Box sx={{ bgcolor: '#EEEFE9', py: { xs: 9, md: 12 } }}><Container maxWidth="lg">
      <SectionLabel>FREE SESSIONS</SectionLabel>
      <Typography variant="h2" sx={{ fontSize: { xs: 38, md: 52 }, maxWidth: 690, mt: 1, mb: 5 }}>Your celebration, shared freely.</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}><Box sx={{ bgcolor: 'white', borderRadius: 3, p: { xs: 3, md: 4 }, height: '100%' }}>
          <Typography variant="overline" color="secondary.main" sx={{ fontWeight: 700, letterSpacing: '.14em' }}>BOOK A FREE SESSION</Typography>
          <Typography variant="h4" sx={{ mt: 1.5, mb: 2 }}>No package to choose. No session fee.</Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 540 }}>Tell us about your event and request a free photo session. Guests can share their moments without needing an account or making a donation.</Typography>
          <Button component={RouterLink} to="/inquire" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ mt: 3 }}>Request a Free Session</Button>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>This preview opens a sample inquiry form; it does not place a booking.</Typography>
        </Box></Grid>
        <Grid size={{ xs: 12, md: 5 }}><Box sx={{ bgcolor: 'white', borderRadius: 3, p: { xs: 3, md: 4 }, height: '100%' }}>
          <VolunteerActivismOutlinedIcon sx={{ fontSize: 38, color: 'secondary.main', mb: 2 }} />
          <Typography variant="h4" sx={{ mb: 2 }}>Support it, if you wish.</Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>Optional donations will help keep Event Photo Studio free. Giving is never required to request a session or join an event.</Typography>
          <Button variant="outlined" disabled sx={{ mt: 3 }}>Donations coming soon</Button>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>Placeholder only. No payments are collected here.</Typography>
        </Box></Grid>
      </Grid>
    </Container></Box>
    <Box sx={{ py: { xs: 9, md: 12 } }}><Container maxWidth="lg"><Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}><SectionLabel>LET'S MAKE IT MEMORABLE</SectionLabel><Typography variant="h2" sx={{ fontSize: { xs: 38, md: 56 }, maxWidth: 650 }}>Your next event deserves its own story.</Typography><Typography color="text.secondary" sx={{ maxWidth: 550, lineHeight: 1.7 }}>Tell us what you are celebrating to request a free session. Donations are always optional.</Typography><Button component={RouterLink} to="/inquire" variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ mt: '16px !important' }}>Request a Free Session</Button></Stack></Container></Box>
  </>;
}
