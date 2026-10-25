import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

export default function AccountNoticeButton({ variant = 'outlined', color = 'primary', fullWidth = false }) {
  const [open, setOpen] = useState(false);
  return <>
    <Button variant={variant} color={color} fullWidth={fullWidth} onClick={() => setOpen(true)}>Create an Account</Button>
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="account-dialog-title">
      <DialogTitle id="account-dialog-title">Account creation is coming soon</DialogTitle>
      <DialogContent><Typography color="text.secondary">This frontend preview uses sample events. Client registration and sign in will be added with the backend integration.</Typography></DialogContent>
      <DialogActions><Button onClick={() => setOpen(false)}>Close</Button></DialogActions>
    </Dialog>
  </>;
}
