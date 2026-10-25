import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import AccountNoticeButton from '../molecules/AccountNoticeButton';
import SectionLabel from '../atoms/SectionLabel';
import heroImage from '../../assets/celebration-hero.png';

export default function LandingHero() {
  return <Box sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 8, md: 12 }, overflow: 'hidden' }}>
    <Container maxWidth="lg">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, .9fr) minmax(0, 1.1fr)' }, alignItems: 'center', gap: { xs: 5, md: 7 } }}>
        <Box>
          <SectionLabel>YOUR EVENT, EVERY PERSPECTIVE</SectionLabel>
          <Typography component="h1" variant="h1" sx={{ fontSize: { xs: '3.4rem', sm: '4.5rem', md: '5.3rem' }, mt: 2.5, maxWidth: 600 }}>The moments you <Box component="span" sx={{ color: 'secondary.main', fontStyle: 'italic' }}>almost missed.</Box></Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: { xs: 17, md: 19 }, lineHeight: 1.65, maxWidth: 490, mt: 3 }}>Plan a free photo session for your celebration. Give guests a simple way to share their view, and keep the whole story together. Optional donations will help support the platform.</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4.5, alignItems: { sm: 'center' } }}>
            <Button component={RouterLink} to="/inquire" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>Request a Free Session</Button>
            <AccountNoticeButton />
          </Stack>
          <Stack direction="row" spacing={1.3} sx={{ alignItems: 'center', mt: 4 }}><Box sx={{ width: 24, height: 1, bgcolor: 'secondary.main' }} /><Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '.07em' }}>MADE FOR THE MOMENTS THAT MATTER</Typography></Stack>
        </Box>
        <Box sx={{ position: 'relative', pl: { md: 3 }, pb: 4 }}>
          <Box component="img" src={heroImage} alt="Friends enjoying a warmly lit celebration" sx={{ width: '100%', height: { xs: 370, sm: 500, md: 590 }, objectFit: 'cover', objectPosition: 'center', borderRadius: '180px 180px 16px 16px' }} />
          <Chip label="Captured together" sx={{ position: 'absolute', bottom: 16, left: { xs: 12, md: 0 }, bgcolor: 'white', boxShadow: '0 12px 32px rgba(32,45,36,.13)', px: 1.5, py: 2.5, fontWeight: 600 }} />
          <Box sx={{ position: 'absolute', width: 140, height: 140, border: '1px solid #C5BDB0', borderRadius: '50%', right: -47, top: 24, zIndex: -1, display: { xs: 'none', md: 'block' } }} />
        </Box>
      </Box>
    </Container>
  </Box>;
}
