import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFoundPage({ title = 'Page not found' }) {
  return <Box sx={{ py: { xs: 12, md: 18 }, textAlign: 'center' }}><Container maxWidth="sm"><Typography component="h1" variant="h2" sx={{ fontSize: { xs: 42, md: 56 } }}>{title}</Typography><Typography color="text.secondary" sx={{ mt: 2, mb: 4 }}>This page is not available in the frontend preview.</Typography><Button component={RouterLink} to="/" variant="contained">Back to home</Button></Container></Box>;
}
