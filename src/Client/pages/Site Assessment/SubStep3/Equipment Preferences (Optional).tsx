import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, TextField } from '@mui/material';

const SubStep3: React.FC = () => {
  const [primeMover, setPrimeMover] = useState('default');
  const [primeMoverBrand, setPrimeMoverBrand] = useState('default');
  const [controlsBrand, setControlsBrand] = useState('default');
  const [switchgearBrand, setSwitchgearBrand] = useState('default');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        p: 1,
        pr: 4,
        pl: 1,
        pt: 1,
      }}
    >
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <h2>Equipment Preferences (Optional)</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        {[
          {
            label: 'Preferred Prime Mover Type:',
            state: primeMover,
            setState: setPrimeMover,
            options: ['Reciprocating Engine', 'Micro-Turbine', 'Fuel Cell', 'Other'],
          },
          {
            label: 'Preferred Prime Mover Brand:',
            state: primeMoverBrand,
            setState: setPrimeMoverBrand,
            options: ['CAT', 'Cummins', 'GE', 'Siemens', 'Tecogen', 'MANN', 'Rolls Royce', 'Other'],
          },
          {
            label: 'Preferred Controls Brand:',
            state: controlsBrand,
            setState: setControlsBrand,
            options: ['HoneyWell', 'Johnson Controls', 'Siemens', 'Other'],
          },
          {
            label: 'Preferred Switchgear Brand:',
            state: switchgearBrand,
            setState: setSwitchgearBrand,
            options: ['Schneider Electric', 'Eaton', 'ABB', 'Other'],
          },
        ].map(({ label, state, setState, options }, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.75rem',
                minWidth: '200px',
                flex: 0.3,
              }}
            >
              <b>{label}</b>
            </Typography>
            <Select
              size="small"
              value={state}
              onChange={(e) => setState(e.target.value)}
              sx={{
                flex: state === 'Other' ? 0.35 : 0.7,
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
                height: '40px',
                '& .MuiInputBase-root': { padding: '0 6px' },
                '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
              }}
            >
              <MenuItem value="default" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                Select
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {state === 'Other' && (
              <TextField
                variant="outlined"
                size="small"
                type="text"
                placeholder="If other, please specify"
                sx={{
                  flex: 0.35,
                  marginLeft: 'auto',
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' },
                  '& .MuiInputBase-input::placeholder': {
                    fontFamily: 'Nunito Sans, sans-serif',
                    fontSize: '0.7rem',
                  },
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SubStep3;
