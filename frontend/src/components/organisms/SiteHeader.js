import { useState } from 'react';
import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import BrandMark from '../atoms/BrandMark';
import AccountNoticeButton from '../molecules/AccountNoticeButton';

const links = [
  { label: 'Home', to: '/' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Sample dashboard', to: '/dashboard' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const close = () => setOpen(false);
  const navItem = (link) => <Button key={link.label} component={RouterLink} to={link.to} onClick={close} color="inherit" sx={{ justifyContent: 'flex-start', color: 'text.primary', fontWeight: location.pathname === link.to ? 700 : 500 }}>{link.label}</Button>;

  return <>
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ bgcolor: 'rgba(247,246,242,.96)', borderBottom: '1px solid', borderColor: 'divider', backdropFilter: 'blur(12px)' }}>
      <Container maxWidth="lg"><Toolbar disableGutters sx={{ minHeight: { xs: 70, md: 82 }, justifyContent: 'space-between', gap: 2 }}>
        <Stack component={RouterLink} to="/" direction="row" spacing={1.5} sx={{ alignItems: 'center', textDecoration: 'none', color: 'text.primary', flexShrink: 0 }}><BrandMark /><Typography sx={{ fontWeight: 700, letterSpacing: '-.035em', fontSize: { xs: 17, sm: 19 } }}>Event Photo Studio</Typography></Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
          {links.map(navItem)}
          <Button component={RouterLink} to="/inquire" variant="contained" sx={{ ml: 1 }}>Inquire Now</Button>
        </Stack>
        <IconButton aria-label="Open navigation menu" onClick={() => setOpen(true)} sx={{ display: { md: 'none' } }}><MenuIcon /></IconButton>
      </Toolbar></Container>
    </AppBar>
    <Drawer anchor="right" open={open} onClose={close} PaperProps={{ sx: { width: 'min(320px, 85vw)', p: 3 } }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}><Typography sx={{ fontWeight: 700 }}>Menu</Typography><IconButton aria-label="Close navigation menu" onClick={close}><CloseIcon /></IconButton></Stack>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1} sx={{ alignItems: 'stretch' }}>{links.map(navItem)}<Button component={RouterLink} to="/inquire" variant="contained" onClick={close}>Inquire Now</Button><Box sx={{ pt: 1 }}><AccountNoticeButton fullWidth /></Box></Stack>
    </Drawer>
  </>;
}
