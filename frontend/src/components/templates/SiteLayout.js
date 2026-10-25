import { Box } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SiteHeader from '../organisms/SiteHeader';
import SiteFooter from '../organisms/SiteFooter';

export default function SiteLayout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}><SiteHeader /><Box component="main" sx={{ flex: 1 }}><Outlet /></Box><SiteFooter /></Box>;
}
