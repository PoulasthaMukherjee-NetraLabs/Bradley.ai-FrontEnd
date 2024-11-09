import React, { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'white', color: 'black', zIndex: 1000, boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)' }}>
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontFamily: 'Roboto Condensed, sans-serif', display: 'inline-flex', alignItems: 'center' }}>
          Bradley.ai
          <Typography variant="h6" component="span" sx={{ ml: 0.5, position: 'relative', top: '-3px' }}>
            <sup>®</sup>
          </Typography>
        </Typography>

        
        <IconButton color="inherit">
          <DarkModeIcon fontSize='large'  />
        </IconButton>

        <IconButton color="inherit">
          <NotificationsNoneIcon fontSize='large'  />
        </IconButton>
        
        <IconButton
          onClick={handleMenuOpen}
          color="inherit"
          sx={{ fontFamily: 'Roboto Condensed, sans-serif' }}
        >
          <PersonIcon fontSize='large' />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleLogout} sx={{ fontFamily: 'Roboto Condensed, sans-serif' }}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;