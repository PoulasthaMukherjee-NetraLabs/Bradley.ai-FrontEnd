import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, IconButton, ToggleButtonGroup, ToggleButton, Tooltip, Fade } from '@mui/material';
import { 
  Add as AddIcon, 
  LocationOn as LocationIcon, 
  SquareFoot as AreaIcon, 
  AccessTime as TimeIcon, 
  Business as BusinessIcon,
  Edit as EditIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  Bolt as ElectricIcon,
  LocalFireDepartment as GasIcon,
  WaterDrop as WaterIcon,
} from '@mui/icons-material';
import { useFacilityAddress } from '../../Context/Organizational Profile/SubStep2/Facility Address Context';
import { useBillAddress } from '../../Context/Energy Profile/BillAddressContext';

const FacilityAddressSelector: React.FC = () => {
  const { facilityAddressState, toggleAddressSelection, setSelectedAddress, getCompactAddress } = useFacilityAddress();
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
      address: `${getCompactAddress(a.id)}, ${a.city}, ${a.state} ${a.zipCode}`
    })));
  }, [addresses, selectedFacilityIds, setBillAddresses, getCompactAddress]);

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
            : 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', 
          gap: 3,
          pb: 2
        }}
      >
        {addresses.map((address) => {
          const isSelected = selectedFacilityIds.includes(address.id);
          const hasElectric = address.billType?.includes('electric');
          const hasGas = address.billType?.includes('natural_gas');
          const hasWater = address.billType?.includes('water');
          
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
                  flexDirection: 'column',
                  minHeight: viewMode === 'list' ? 'auto' : '280px',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                    borderColor: isSelected ? '#1976d2' : '#b0c4de'
                  }
                }}
              >
                  <Box sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                  }}>
                      {/* Electric Icon - Always Visible */}
                      <Tooltip title={hasElectric ? "Electric Bill Type Selected" : "Electric Bill Type Not Selected"}>
                          <Box sx={{
                              bgcolor: 'rgba(255,255,255,0.9)',
                              borderRadius: '50%',
                              p: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: hasElectric ? '#fbc02d' : '#bdbdbd',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              opacity: hasElectric ? 1 : 0.5,
                              transition: 'all 0.2s'
                          }}>
                              <ElectricIcon fontSize="small" />
                          </Box>
                      </Tooltip>

                      {/* Natural Gas Icon - Always Visible */}
                      <Tooltip title={hasGas ? "Natural Gas Bill Type Selected" : "Natural Gas Bill Type Not Selected"}>
                          <Box sx={{
                              bgcolor: 'rgba(255,255,255,0.9)',
                              borderRadius: '50%',
                              p: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: hasGas ? '#e64a19' : '#bdbdbd',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              opacity: hasGas ? 1 : 0.5,
                              transition: 'all 0.2s'
                          }}>
                              <GasIcon fontSize="small" />
                          </Box>
                      </Tooltip>

                      {/* Water Icon - Always Visible */}
                      <Tooltip title={hasWater ? "Water Bill Type Selected" : "Water Bill Type Not Selected"}>
                          <Box sx={{
                              bgcolor: 'rgba(255,255,255,0.9)',
                              borderRadius: '50%',
                              p: 0.5,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: hasWater ? '#29b6f6' : '#bdbdbd',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              opacity: hasWater ? 1 : 0.5,
                              transition: 'all 0.2s'
                          }}>
                              <WaterIcon fontSize="small" />
                          </Box>
                      </Tooltip>

                    <Tooltip arrow title="Edit Location details on Map">
                      <IconButton 
                          size="small"
                          onClick={(e) => handleEdit(e, address.id)}
                          onMouseEnter={() => setHoveredEditId(address.id)}
                          onMouseLeave={() => setHoveredEditId(null)}
                          sx={{
                              bgcolor: 'rgba(255,255,255,0.9)',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              '&:hover': { bgcolor: 'white', color: '#1976d2' }
                          }}
                      >
                          <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                </Box>

                {/* Header Section */}
                <Box sx={{ 
                    p: 2, 
                    pb: 1.5,
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    borderBottom: '1px solid #f0f0f0'
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
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 800, fontSize: '1rem', lineHeight: 1.3, mb: 0.3, color: '#2c3e50' }}>
                      {address.houseNumber} {address.road}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#666' }}>
                      <LocationIcon sx={{ fontSize: '0.9rem', color: '#95a5a6' }} />
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#7f8c8d' }}>
                        {address.city}, {address.state} {address.zipCode}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Details Grid */}
                <Box sx={{ 
                    p: 2, 
                    pt: 1.5,
                    flex: 1, 
                    display: 'grid',
                    gridTemplateColumns: viewMode === 'list' 
                      ? 'repeat(auto-fill, minmax(115px, 1fr))' 
                      : '1fr 1fr',
                    gap: viewMode === 'list' ? 0.65 : 2,
                    fontSize: '0.75rem'
                }}>
                  
                  {/* House Number */}
                  {address.houseNumber && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.65rem', color: '#95a5a6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        House #
                      </Typography>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', color: '#2c3e50', fontWeight: 700 }}>
                        {address.houseNumber}
                      </Typography>
                    </Box>
                  )}

                  {/* Road */}
                  {address.road && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.65rem', color: '#95a5a6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Road
                      </Typography>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', color: '#2c3e50', fontWeight: 700 }}>
                        {address.road}
                      </Typography>
                    </Box>
                  )}

                  {/* City */}
                  {address.city && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.65rem', color: '#95a5a6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        City
                      </Typography>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', color: '#2c3e50', fontWeight: 700 }}>
                        {address.city}
                      </Typography>
                    </Box>
                  )}

                  {/* State */}
                  {address.state && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.65rem', color: '#95a5a6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        State
                      </Typography>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', color: '#2c3e50', fontWeight: 700 }}>
                        {address.state}
                      </Typography>
                    </Box>
                  )}

                  {/* Zip Code */}
                  {address.zipCode && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.65rem', color: '#95a5a6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Zip Code
                      </Typography>
                      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', color: '#2c3e50', fontWeight: 700 }}>
                        {address.zipCode}
                      </Typography>
                    </Box>
                  )}

                  {/* Bill Types */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
  <Typography
    sx={{
      fontFamily: 'Nunito Sans, sans-serif',
      fontSize: '0.65rem',
      color: '#95a5a6',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    }}
  >
    Bill Type(s)
  </Typography>

  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
    {address.billType.length > 0 ? (
      <Typography
        sx={{
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#2c3e50',
        }}
      >
        {address.billType
          .map((type) =>
            type === 'electric'
              ? 'E'
              : type === 'natural_gas'
              ? 'NG'
              : 'W'
          )
          .join(' / ')}
      </Typography>
    ) : (
      <Typography
        sx={{
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.8rem',
          color: '#7f8c8d',
          fontWeight: 600,
        }}
      >
        Not set
      </Typography>
    )}
  </Box>
</Box>

                  {/* Area */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.65rem', color: '#95a5a6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      <AreaIcon sx={{ fontSize: '0.8rem', mr: 0.3, verticalAlign: 'middle' }} />
                      Total Area
                    </Typography>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#2c3e50' }}>
                      {address.areaSqFt ? `${address.areaSqFt} sq ft` : "Not set"}
                    </Typography>
                  </Box>

                  {/* Operating Hours */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.65rem', color: '#95a5a6', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      <TimeIcon sx={{ fontSize: '0.8rem', mr: 0.3, verticalAlign: 'middle' }} />
                      Operating Hours
                    </Typography>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#2c3e50' }}>
                      {(address.operationalStart && address.operationalEnd) 
                        ? `${address.operationalStart} - ${address.operationalEnd}` 
                        : "Not set"}
                    </Typography>
                  </Box>

                </Box>

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
              gridColumn: (viewMode === 'grid' && addresses.length % 2 === 0) ? '1 / -1' : 'auto',
              display: 'flex',
              flexDirection: viewMode === 'list' ? 'row' : 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1.5,
              minHeight: viewMode === 'list' ? '150px' : '300px',
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