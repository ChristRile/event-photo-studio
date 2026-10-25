import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import SiteLayout from './components/templates/SiteLayout';
import LandingPage from './pages/LandingPage';
import InquiryPage from './pages/InquiryPage';
import DashboardPage from './pages/DashboardPage';
import EventDetailsPage from './pages/EventDetailsPage';
import GuestEventPage from './pages/GuestEventPage';
import NotFoundPage from './pages/NotFoundPage';
import { featuredEvent } from './mocks/events';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/inquire" element={<InquiryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/events" element={<Navigate to={`/events/${featuredEvent.id}`} replace />} />
            <Route path="/events/:eventId" element={<EventDetailsPage />} />
            <Route path="/e" element={<Navigate to={`/e/${featuredEvent.id}`} replace />} />
            <Route path="/e/:eventId" element={<GuestEventPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
