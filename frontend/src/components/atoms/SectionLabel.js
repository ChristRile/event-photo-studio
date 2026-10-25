import { Typography } from '@mui/material';

export default function SectionLabel({ children, light = false }) {
  return <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: '.18em', color: light ? '#D8C0AC' : 'secondary.main' }}>{children}</Typography>;
}
