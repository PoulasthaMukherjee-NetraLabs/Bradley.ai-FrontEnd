import React, { /* useState, */ useRef } from 'react';
import { Box, Typography, TextField, Button, Tooltip } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { renderToStaticMarkup } from 'react-dom/server';
import { useFacilityAddress } from '../../../../Context/Organizational Profile/SubStep2/Facility Address Context';

const createCustomIcon = (IconComponent: React.ElementType) => {
  const iconMarkup = renderToStaticMarkup(
    <IconComponent style={{ fontSize: '30px', color: '#e74c3c' }} />
  );
  return L.divIcon({
    html: iconMarkup,
    className: 'custom-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const MapMarker = ({ position, onPositionChange }: { position: L.LatLng | null; onPositionChange: (pos: L.LatLng) => void; }) => {
  const customIcon = createCustomIcon(FaMapMarkerAlt);

  useMapEvents({
    click(e) {
      onPositionChange(e.latlng);
    },
  });
  
  if (!position) {
    const defaultPosition = new L.LatLng(51.505, -0.09);
    onPositionChange(defaultPosition);
  }

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const SubStep2 = () => {
  const { facilityAddress, updateFacilityAddress, updateAddressField } = useFacilityAddress();
  const { position, address } = facilityAddress;
  
  const mapRef = useRef<L.Map | null>(null);

  const handleSavePinnedLocation = () => {
    if (position) {
      const { lat, lng } = position;
      fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
        .then(response => response.json())
        .then(data => {
          updateFacilityAddress({
            address: {
              streetAddress: data.address.road || '',
              city: data.address.city || data.address.town || '',
              state: data.address.state || '',
              zipCode: data.address.postcode || '',
              otherAddress: address.otherAddress,
            }
          });
        })
        .catch(error => console.error('Error fetching address:', error));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
          .leaflet-div-icon {
            background: transparent;
            border: none;
          }
        `}
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Facility Address</h2>
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, p: '10px', pl: '160px', pr: '160px' }}>
      <Tooltip title="Click on any desired location on the map to place the pin" placement="top" arrow>
        <Box sx={{ flex: 1, height: '268.5px', border: '1px solid lightgrey', borderRadius: 1 }}>
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }} ref={mapRef}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapMarker
                position={position}
                onPositionChange={(newPos) => updateFacilityAddress({ position: newPos })}
              />
          </MapContainer>
        </Box>
      </Tooltip>

        <Box sx={{ flex: 1, border: '1px solid lightgrey', p: 1, borderRadius: 1, height: '253px', pl: 2, pr: 2 }}>
          <Typography variant="subtitle2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
          <Tooltip title="Click to autofill below based on the pin." placement='left' arrow>
            <Button
              variant="outlined"
              size="small"
              onClick={handleSavePinnedLocation}
              sx={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                minWidth: '60px',
                padding: '2px 4px',
                textTransform: 'none',
                '&:focus': { outline: 'none' }
              }}
            >
              Save Pinned Location
            </Button></Tooltip>
          </Typography><br />
          <Box sx={{ fontFamily: 'Nunito Sans, sans-serif', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {[
              { label: "Street Address:", key: "streetAddress" as keyof typeof address, placeholder: "Enter street address" },
              { label: "City:", key: "city" as keyof typeof address, placeholder: "Enter city name" },
              { label: "State:", key: "state" as keyof typeof address, placeholder: "Enter state" },
              { label: "Zip Code:", key: "zipCode" as keyof typeof address, placeholder: "Enter zip code" }
            ].map(({ label, key, placeholder }) => (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', width: '150px', flex: 0.5 }}><b>{label}</b></Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  value={address[key as keyof typeof address]}
                  onChange={(e) => updateAddressField(key as keyof typeof address, e.target.value)}
                  placeholder={placeholder}
                  sx={{
                    flex: 1,
                    fontSize: '0.7rem',
                    fontFamily: 'Nunito Sans, sans-serif',
                    '& .MuiInputBase-root': { height: '30px', padding: '0 6px' },
                    '& input': { padding: 0, fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }
                  }}
                />
              </Box>
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', width: '150px', flex: 0.5 }}><b>Other Addresses:</b></Typography>
              <TextField
                variant="outlined"
                size="small"
                type="text"
                value={address.otherAddress}
                placeholder='Address 1; Address 2; Address 3, ...'
                onChange={(e) => updateAddressField('otherAddress', e.target.value)}
                sx={{
                  flex: 1,
                  fontSize: '0.7rem',
                  fontFamily: 'Nunito Sans, sans-serif',
                  '& .MuiInputBase-root': { height: '30px', padding: '0 6px' },
                  '& input': { padding: 0, fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;
