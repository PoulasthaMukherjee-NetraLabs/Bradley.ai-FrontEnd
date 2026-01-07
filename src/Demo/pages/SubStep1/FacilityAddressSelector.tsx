import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Chip, Divider, IconButton, ToggleButtonGroup, ToggleButton, Tooltip, Fade } from '@mui/material';
import { 
  Add as AddIcon, 
  LocationOn as LocationIcon, 
  SquareFoot as AreaIcon, 
  AccessTime as TimeIcon, 
  Business as BusinessIcon,
  Edit as EditIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon
} from '@mui/icons-material';
import { useFacilityAddress } from '../../Context/Organizational Profile/SubStep2/Facility Address Context';
import { useBillAddress } from '../../Context/Energy Profile/BillAddressContext';

const FacilityAddressSelector: React.FC = () => {
  const { facilityAddressState, toggleAddressSelection, setSelectedAddress } = useFacilityAddress();
  const { setAddresses: setBillAddresses } = useBillAddress();

  const { addresses, selectedFacilityIds } = facilityAddressState;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [hoveredEditId, setHoveredEditId] = useState<string | null>(null);

  useEffect(() => {
    const selectedAddresses = addresses.filter(addr =>
      selectedFacilityIds.includes(addr.id)
    );

    setBillAddresses(selectedAddresses.map(a => ({
      id: a.id,
      address: `${a.streetAddress}, ${a.city}, ${a.state} ${a.zipCode}`
    })));
  }, [addresses, selectedFacilityIds, setBillAddresses]);

  const handleOpenModal = () => {
    window.dispatchEvent(new CustomEvent('open-facility-modal'));
  };

  const handleEdit = (e: React.MouseEvent, addressId: string) => {
    e.stopPropagation();
    setSelectedAddress(addressId);
    handleOpenModal();
  };

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, nextView: 'grid' | 'list') => {
    if (nextView !== null) {
      setViewMode(nextView);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, px: 6, pt: 3 }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
        `}
      </style>
      
      {/* Header Section */}
      <Box sx={{ mb: 4, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px' }}>
        
        {/* Centered Heading */}
        <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
          <h2>Select Facilities</h2>
        </Typography>

        {/* Right-Aligned Toggle */}
        <Box sx={{ position: 'absolute', right: 0 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewChange}
            aria-label="view mode"
            size="small"
            sx={{ 
              height: '32px',
              '& .MuiToggleButton-root': { 
                  fontFamily: 'Nunito Sans, sans-serif',
                  px: 1.5,
                  borderColor: '#e0e0e0',
                  '&.Mui-selected': {
                      bgcolor: '#e3f2fd',
                      color: '#1976d2',
                      '&:hover': { bgcolor: '#bbdefb' }
                  }
              } 
            }}
          >
            <Tooltip placement='left' title="Grid View" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
            <Tooltip placement='right' title="List View" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
              <ToggleButton value="list" aria-label="list view">
                <ListViewIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: viewMode === 'list' 
            ? '1fr' 
            : 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))', 
          gap: 3,
          pb: 2
        }}
      >
        {addresses.map((address) => {
          const isSelected = selectedFacilityIds.includes(address.id);
          
          return (
            <Tooltip 
              key={address.id} 
              title={hoveredEditId === address.id ? "" : (isSelected ? "Click to remove" : "Click to select")}
              arrow 
              placement="bottom"
              TransitionComponent={Fade}
              enterDelay={500}
            >
              <Paper
                elevation={isSelected ? 3 : 1}
                onClick={() => toggleAddressSelection(address.id)}
                sx={{
                  position: 'relative',
                  p: 0,
                  borderRadius: 3,
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #1976d2' : '1px solid #eaeff5',
                  bgcolor: isSelected ? '#f5f9ff' : 'white',
                  transition: 'all 0.2s ease-in-out',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: viewMode === 'list' ? 'row' : 'column',
                  alignItems: viewMode === 'list' ? 'center' : 'stretch',
                  minHeight: viewMode === 'list' ? 'auto' : '220px',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    borderColor: isSelected ? '#1976d2' : '#b0c4de'
                  }
                }}
              >
                <Tooltip arrow title="Edit Location details on Map">
                  <IconButton 
                      size="small"
                      onClick={(e) => handleEdit(e, address.id)}
                      onMouseEnter={() => setHoveredEditId(address.id)}
                      onMouseLeave={() => setHoveredEditId(null)}
                      sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          zIndex: 3,
                          bgcolor: 'rgba(255,255,255,0.8)',
                          '&:hover': { bgcolor: 'white', color: '#1976d2' }
                      }}
                  >
                      <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Box sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    width: viewMode === 'list' ? '40%' : 'auto',
                    borderRight: viewMode === 'list' ? '1px solid #f0f0f0' : 'none'
                }}>
                  <Box 
                    sx={{ 
                      p: 1.2, 
                      borderRadius: 2.5, 
                      bgcolor: isSelected ? 'rgba(25, 118, 210, 0.1)' : '#f5f5f5',
                      color: isSelected ? '#1976d2' : '#757575',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    <BusinessIcon />
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 800, fontSize: '1rem', lineHeight: 1.3, mb: 0.5, color: '#2c3e50' }}>
                      {address.streetAddress || "Unnamed Facility"}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
                      <LocationIcon sx={{ fontSize: '0.9rem', color: '#95a5a6' }} />
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#7f8c8d' }}>
                        {address.city}, {address.state} {address.zipCode}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {!isSelected && viewMode === 'grid' && <Divider sx={{ borderColor: '#f0f0f0' }} />}

                <Box sx={{ 
                    p: 2, 
                    pt: viewMode === 'list' ? 2 : 1.5, 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: viewMode === 'list' ? 'row' : 'column', 
                    justifyContent: viewMode === 'list' ? 'space-around' : 'flex-start',
                    gap: viewMode === 'list' ? 4 : 1.5 
                }}>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: viewMode === 'list' ? '150px' : 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AreaIcon sx={{ fontSize: '1.1rem', color: '#95a5a6' }} />
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', color: '#7f8c8d', fontWeight: 600 }}>
                        Total Area: &nbsp;
                      </Typography>
                    </Box>
                    <Chip 
                      label={address.areaSqFt ? `${Number(address.areaSqFt).toLocaleString()} sq ft` : "N/A"} 
                      size="small" 
                      sx={{ 
                        height: '24px', 
                        fontSize: '0.75rem', 
                        fontFamily: 'Nunito Sans, sans-serif',
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e9ecef',
                        fontWeight: 700,
                        color: '#495057'
                      }} 
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: viewMode === 'list' ? '200px' : 'auto' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TimeIcon sx={{ fontSize: '1.1rem', color: '#95a5a6' }} />
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', color: '#7f8c8d', fontWeight: 600 }}>
                        Operating Hours: &nbsp;
                      </Typography>
                    </Box>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#2c3e50' }}>
                      {(address.operationalStart && address.operationalEnd) 
                        ? `${address.operationalStart} - ${address.operationalEnd}` 
                        : "Not set"}
                    </Typography>
                  </Box>

                </Box>

                {viewMode === 'grid' && (
                  <Box 
                      sx={{ 
                      bgcolor: isSelected ? '#1976d2' : '#f8f9fa', 
                      color: isSelected ? 'white' : '#adb5bd',
                      p: 1, 
                      textAlign: 'center',
                      transition: 'background-color 0.2s',
                      borderTop: isSelected ? 'none' : '1px solid #f1f3f5'
                      }}
                  >
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase' }}>
                      {isSelected ? "Selected" : "Click to Select"}
                      </Typography>
                  </Box>
                )}
              </Paper>
            </Tooltip>
          );
        })}

        <Tooltip title="Open map to add new location" arrow placement="bottom" TransitionComponent={Fade}>
          <Button
            onClick={handleOpenModal}
            variant="outlined"
            sx={{
              border: '2px dashed #cfd8dc',
              borderRadius: 3,
              display: 'flex',
              flexDirection: viewMode === 'list' ? 'row' : 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1.5,
              minHeight: viewMode === 'list' ? '80px' : '220px',
              textTransform: 'none',
              color: '#78909c',
              bgcolor: 'transparent',
              transition: 'all 0.2s',
              '&:hover': {
                border: '2px dashed #1976d2',
                bgcolor: 'rgba(25, 118, 210, 0.04)',
                color: '#1976d2',
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Box 
              sx={{ 
                width: 44, 
                height: 44, 
                borderRadius: '50%', 
                bgcolor: '#eceff1', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'inherit'
              }}
            >
              <AddIcon sx={{ fontSize: 26 }} />
            </Box>
            <Box sx={{ textAlign: viewMode === 'list' ? 'left' : 'center' }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.95rem', fontWeight: 800 }}>
                  Add New Facility
              </Typography>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', opacity: 0.8, fontWeight: 500 }}>
                  Open map to set a new location
              </Typography>
            </Box>
          </Button>
        </Tooltip>

      </Box>
    </Box>
  );
};

export default FacilityAddressSelector;