import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

function Toaster({ shouldOpen, message, backgroundColor }) {
  const [open, setOpen] = useState(Boolean(shouldOpen));
  const successGreen = '#4BB543';
  useEffect(() => {
    setOpen(Boolean(shouldOpen));
  }, [shouldOpen]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ width: 700 }}>
      <Snackbar
        ContentProps={{
          sx: {
            background: backgroundColor || successGreen
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
