import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: '#f5f5f5',
        color: '#333333',
        top: 'auto',
        height: '30px',
        boxShadow: 0,
        bottom: 0,
        width: 'calc(100% - 210px)',
        left: '232.5px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography
          variant="body2"
          sx={{ fontFamily: 'Nunito Sans, sans-serif', pb: '30px', fontSize: '0.800rem' }}
        >
          <p>Powered by <strong>8x Energy™</strong></p>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;