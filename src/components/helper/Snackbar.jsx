import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

function Toaster({ shouldOpen, message }) {
  const [open, setOpen] = useState(shouldOpen);
  useEffect(() => {
    setOpen(shouldOpen);
  }, [shouldOpen]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ width: 700 }}>
      <Snackbar
        ContentProps={{
          sx: {
            background: '#4BB543'
          }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={1200}
        onClose={handleClose}
        message={message}
      />
    </Box>
  );
}

export default Toaster;
