import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
  initialTab?: 'profile' | 'facilities';
  OrganizationDetailsComponent: React.ComponentType;
  FacilityAddressComponent: React.ComponentType;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  open,
  onClose,
  initialTab = 'profile',
  OrganizationDetailsComponent,
  FacilityAddressComponent,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'facilities'>(initialTab);

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
    }
  }, [open, initialTab]);

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75vw',
    height: '75vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    display: 'flex',
    overflow: 'hidden',
    outline: 'none',
  };

  const sidebarStyle = {
    width: '250px',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column' as 'column',
    bgcolor: '#ffffff',
  };

  const contentStyle = {
    flexGrow: 1,
    overflowY: 'auto' as 'auto',
    p: 0,
    position: 'relative' as 'relative',
    bgcolor: '#ffffff',
    color: '#000000',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* Sidebar */}
        <Box sx={sidebarStyle}>
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center' }}>
             <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: '#000', fontSize: '1.1rem' }}>
               Settings
             </Typography>
          </Box>
          <List sx={{ p: 1 }}>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')}
                sx={{ 
                  borderRadius: '8px',
                  fontFamily: 'Nunito Sans, sans-serif',
                  '&.Mui-selected': { bgcolor: '#e6f7ff', color: '#036ca1' },
                  '&.Mui-selected:hover': { bgcolor: '#e6f7ff' },
                  '&:hover': { bgcolor: '#f5f5f5', borderRadius: '8px' }
                }}
              >
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: activeTab === 'profile' ? '#036ca1' : '#808080',
                    color: '#fff',
                  }}>
                    <PersonIcon sx={{ fontSize: '1.1rem' }} />
                  </Box>
                </ListItemIcon>
                <ListItemText 
                  primary="Profile" 
                  primaryTypographyProps={{ 
                    fontFamily: 'Nunito Sans, sans-serif', 
                    fontSize: '0.75rem',
                    fontWeight: activeTab === 'profile' ? 'bold' : 'normal',
                    color: activeTab === 'profile' ? '#036ca1' : '#555'
                  }} 
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                selected={activeTab === 'facilities'} 
                onClick={() => setActiveTab('facilities')}
                sx={{ 
                  borderRadius: '8px',
                  fontFamily: 'Nunito Sans, sans-serif',
                  '&.Mui-selected': { bgcolor: '#e6f7ff', color: '#036ca1' },
                  '&.Mui-selected:hover': { bgcolor: '#e6f7ff' },
                  '&:hover': { bgcolor: '#f5f5f5', borderRadius: '8px' }
                }}
              >
                <ListItemIcon sx={{ minWidth: '35px' }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: activeTab === 'facilities' ? '#036ca1' : '#808080',
                    color: '#fff',
                  }}>
                    <BusinessIcon sx={{ fontSize: '1.1rem' }} />
                  </Box>
                </ListItemIcon>
                <ListItemText 
                  primary="Facilities" 
                  primaryTypographyProps={{ 
                    fontFamily: 'Nunito Sans, sans-serif', 
                    fontSize: '0.75rem',
                    fontWeight: activeTab === 'facilities' ? 'bold' : 'normal',
                    color: activeTab === 'facilities' ? '#036ca1' : '#555'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Content */}
        <Box sx={contentStyle}>
           <IconButton 
            onClick={onClose} 
            sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
          >
            <CloseIcon />
          </IconButton>
          
          <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            {activeTab === 'profile' && <OrganizationDetailsComponent />}
            {activeTab === 'facilities' && <FacilityAddressComponent />}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserProfileModal;
