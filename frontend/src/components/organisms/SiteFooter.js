import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BrandMark from '../atoms/BrandMark';

export default function SiteFooter() {
  return <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', mt: 'auto', pt: 7, pb: 3 }}>
    <Container maxWidth="lg">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ justifyContent: 'space-between', pb: 6 }}>
        <Box><Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}><BrandMark light /><Typography sx={{ fontWeight: 700, fontSize: 19 }}>Event Photo Studio</Typography></Stack><Typography sx={{ color: '#C8D2CA', mt: 2, maxWidth: 330 }}>Every celebration deserves to be seen from every angle.</Typography></Box>
        <Stack direction="row" spacing={4} sx={{ '& a': { color: '#E9EDE8', textDecoration: 'none', fontSize: 14, '&:hover': { textDecoration: 'underline' } } }}><RouterLink to="/inquire">Inquire</RouterLink><RouterLink to="/dashboard">Sample dashboard</RouterLink><RouterLink to="/">Home</RouterLink></Stack>
      </Stack>
      <Divider sx={{ borderColor: 'rgba(255,255,255,.18)' }} />
      <Typography variant="caption" sx={{ display: 'block', color: '#AEBEB1', pt: 2.5 }}>© {new Date().getFullYear()} Event Photo Studio · Frontend preview</Typography>
    </Container>
  </Box>;
}
