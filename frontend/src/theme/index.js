import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#26352F', contrastText: '#FFFFFF' },
    secondary: { main: '#BB7658', contrastText: '#FFFFFF' },
    background: { default: '#F7F6F2', paper: '#FFFFFF' },
    text: { primary: '#24312C', secondary: '#68716B' },
    divider: '#E6E9E1',
    success: { main: '#547B62' },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontWeight: 300, letterSpacing: '-0.055em', lineHeight: 1.06 },
    h2: { fontWeight: 300, letterSpacing: '-0.045em', lineHeight: 1.12 },
    h3: { fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 1.18 },
    h4: { fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.22 },
    h5: { fontWeight: 500, letterSpacing: '-0.02em' },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true }, styleOverrides: { root: { borderRadius: 9, padding: '11px 20px' } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 16, boxShadow: 'none' } } },
  },
});

export default theme;
