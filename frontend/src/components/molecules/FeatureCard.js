import { Box, Stack, Typography } from '@mui/material';

export default function FeatureCard({ icon: Icon, title, description }) {
  return <Stack spacing={2.5} sx={{ height: '100%', p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3, bgcolor: 'background.paper' }}>
    <Box sx={{ width: 48, height: 48, display: 'grid', placeItems: 'center', borderRadius: 2, color: 'secondary.main', bgcolor: '#F6EEE8' }}><Icon /></Box>
    <Typography variant="h6" sx={{ fontWeight: 500 }}>{title}</Typography>
    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{description}</Typography>
  </Stack>;
}
