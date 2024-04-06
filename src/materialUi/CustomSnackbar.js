import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CustomSnackbar = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <Alert 

        severity={severity} 
        onClose={onClose} 
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
