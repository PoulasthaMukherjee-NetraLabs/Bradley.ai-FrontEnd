import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, Typography, Switch, FormControlLabel } from '@mui/material';

const SubStep2: React.FC = () => {
  const [isBreakerSpaceAvailable, setIsBreakerSpaceAvailable] = useState(false);
  const [overallFacilitySize, setOverallFacilitySize] = useState('');
  const [commonAreaSquareFootage, setCommonAreaSquareFootage] = useState('');
  const [yearBuildingOperation, setYearBuildingOperation] = useState('');

  const [primaryUtilityEntry, setPrimaryUtilityEntry] = useState('Option 1');
  const [secondaryUtilityEntry, setSecondaryUtilityEntry] = useState('Option 0');

  const [numberOfOpenBreakers, setNumberOfOpenBreakers] = useState('');
  const [breakerTypeAndAmperage, setBreakerTypeAndAmperage] = useState('');

  const formatNumber = (num: string) => {
    if (!num) return '';
    const cleanNum = num.replace(/[^0-9]/g, '');
    if (cleanNum === '') return '';
    const number = parseInt(cleanNum, 10);
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('en-US').format(number);
  };

  const handleFormattedNumericInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;
    const rawValue = value.replace(/[^0-9]/g, '');
    setter(rawValue);
  };

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    // Allow input up to 4 digits for typing, but don't clear until blur
    if (value.length > 4) value = value.slice(0, 4);
    setYearBuildingOperation(value);
  };

  const handleYearInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 4) {
      const year = parseInt(value, 10);
      const minYear = 1000;
      const maxYear = new Date().getFullYear();
      if (isNaN(year) || year < minYear || year > maxYear) {
        setYearBuildingOperation(''); // Clear field if invalid year
      }
    } else if (value.length > 0 && value.length < 4) {
      setYearBuildingOperation(''); // Clear if partial year is entered and focus is lost
    }
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Site Characteristics - I</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Overall Facility Size, incl. Common Area: </b>(in Sq. Ft.)
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              type="text"
              placeholder='Input'
              value={formatNumber(overallFacilitySize)}
              onChange={(e) => handleFormattedNumericInputChange(e, setOverallFacilitySize)}
              sx={{
                flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                '& .MuiInputBase-input::placeholder': {
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Common Area Square Footage: </b>(in Sq. Ft.)
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              type="text"
              placeholder='Input'
              value={formatNumber(commonAreaSquareFootage)}
              onChange={(e) => handleFormattedNumericInputChange(e, setCommonAreaSquareFootage)}
              sx={{
                flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                '& .MuiInputBase-input::placeholder': {
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Year Building was Placed in Operation:</b>
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              type="text" // Changed to text to allow custom formatting and validation better
              placeholder='YYYY'
              value={yearBuildingOperation}
              onChange={handleYearInputChange}
              onBlur={handleYearInputBlur} // Add onBlur event
              inputProps={{
                inputMode: 'numeric',
                maxLength: 4,
                pattern: '[0-9]{4}', // Visual hint for pattern
              }}
              sx={{
                flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                '& .MuiInputBase-input::placeholder': {
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Primary Electric Utility Entry Point at Property:</b>
            </Typography>
            <Select
              size="small"
              variant="outlined"
              value={primaryUtilityEntry}
              onChange={(e) => setPrimaryUtilityEntry(e.target.value as string)}
              sx={{
                flex: 0.448,
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                height: '40px',
                '& .MuiInputBase-root': { padding: '0 6px' },
                '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
              }}
            >
              <MenuItem value="Option 1" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', }}>North</MenuItem>
              <MenuItem value="Option 2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', }}>South</MenuItem>
              <MenuItem value="Option 3" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', }}>East</MenuItem>
              <MenuItem value="Option 4" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', }}>West</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Secondary Electric Utility Entry Point: </b>(If Available)
            </Typography>
            <Select
              size="small"
              variant="outlined"
              value={secondaryUtilityEntry}
              onChange={(e) => setSecondaryUtilityEntry(e.target.value as string)}
              sx={{
                flex: 0.448,
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                height: '40px',
                '& .MuiInputBase-root': { padding: '0 6px' },
                '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
              }}
            >
              <MenuItem value="Option 0" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', }}>Select</MenuItem>
              <MenuItem value="Option 1" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', }}>North</MenuItem>
              <MenuItem value="Option 2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', }}>South</MenuItem>
              <MenuItem value="Option 3" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', }}>East</MenuItem>
              <MenuItem value="Option 4" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', }}>West</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
              <b>Open Breaker Space Available?</b>
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={isBreakerSpaceAvailable}
                  onChange={() => setIsBreakerSpaceAvailable(!isBreakerSpaceAvailable)}
                />
              }
              label=""
              sx={{
                flex: 0.448,
                justifyContent: 'flex-start',
                '& .MuiSwitch-root': { marginLeft: '5px' }
              }}
            />
          </Box>

          {isBreakerSpaceAvailable && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
                  <b>Number of Open Breakers:</b>
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  type="number"
                  placeholder='Input'
                  value={numberOfOpenBreakers}
                  onChange={(e) => setNumberOfOpenBreakers(e.target.value)}
                  sx={{
                    flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                    '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                    '& .MuiInputBase-input::placeholder': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.7rem',
                    }
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}>
                  <b>Breaker Type and Amperage:</b>
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  placeholder='Input'
                  value={breakerTypeAndAmperage}
                  onChange={(e) => setBreakerTypeAndAmperage(e.target.value)}
                  sx={{
                    flex: 0.448, fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                    '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                    '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                    '& .MuiInputBase-input::placeholder': {
                      fontFamily: 'Nunito Sans, sans-serif',
                      fontSize: '0.7rem',
                    }
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;