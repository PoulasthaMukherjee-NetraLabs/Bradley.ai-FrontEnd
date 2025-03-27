import React, { useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, InputAdornment, Tooltip } from '@mui/material';

const SubStep2: React.FC = () => { 

  const [showSteam, setShowSteam] = useState(false);
  const [ratekWh, setRatekWh] = useState('');
  const [rateMMBTu, setRateMMBTu] = useState('');
  const [escalator, setEscalator] = useState('');
  const [termkWh, setTermkWh] = useState('');
  const [termMMBTu, setTermMMBTu] = useState('');

  const handleRatekWhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      if (/^(0(\.\d{0,2})?)?$/.test(value)) {
        setRatekWh(value);
      }
    };

  const handleRateMMBTuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (/^(0(\.\d{0,2})?)?$/.test(value)) {
      setRateMMBTu(value);
    }
  };

  const handleEscalatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;
      if (/^[1-9]?$/.test(value)) {
        setEscalator(value);
      }
    };

  const handleTermkWhChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (/^(?:[1-9]|[1-2][0-9]|30)?$/.test(value)) {
      setTermkWh(value);
    }
  };

  const handleTermMMBTuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (/^(?:[1-9]|[1-2][0-9]|30)?$/.test(value)) {
      setTermMMBTu(value);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Power Purchase Agreement (PPA) for Combined Heat and/or Power (CHP) Contracts – III</h2>
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControlLabel
            control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} size="small" />}
            label="Do you have any existing PPAs for thermal energy or Combined Heat and Power (CHP)?"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.9rem'
              }
            }}
          />

          </Box>
          

          {showSteam && (
            <Box sx={{ mb: 0, pl: 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px' }}>

				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Rate: </b>(In $/kWh and $/MMBTu)</Typography>
          <Tooltip title="Enter rate in $/kWh" placement='left' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="text"
            placeholder='0.01 - 0.99 ($/kWh)'
            value={ratekWh}
            onChange={handleRatekWhChange} 
            sx={{
              flex: 0.25, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
          /></Tooltip>
          <Tooltip title="Enter rate in $/MMBTu" placement='right' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="text"
            placeholder='0.01 - 0.99 ($/MMBTu)'
            value={rateMMBTu}
            onChange={handleRateMMBTuChange} 
            sx={{
              flex: 0.25, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
          /></Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Escalator: </b>(in %)</Typography>
          <Tooltip title="Escalator for kWh" placement='left' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="text"
            placeholder='1 - 9% (for kWh)'
            value={escalator}
            onChange={handleEscalatorChange} 
            inputProps={{
              onBlur: () => {
                if (escalator && !escalator.includes('%')) {
                  setEscalator(escalator + '%');
                }
              }
            }}
            sx={{
              flex: 0.25, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          /></Tooltip>
          <Tooltip title="Escalator for MMBTu" placement='right' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="text"
            placeholder='1 - 9% (for MMBTu)'
            value={escalator}
            onChange={handleEscalatorChange} 
            inputProps={{
              onBlur: () => {
                if (escalator && !escalator.includes('%')) {
                  setEscalator(escalator + '%');
                }
              }
            }}
            sx={{
              flex: 0.25, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          /></Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}><b>Term: </b>(In Years)</Typography>
          <Tooltip title="Term for kWh PPA" placement='left' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='0 - 30y (kWh PPA)' 
            value={termkWh}
            onChange={handleTermkWhChange}
            sx={{
              flex: 0.25, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          /></Tooltip>
          <Tooltip title="Term for MMBTu PPA" placement='right' arrow>
          <TextField
            variant="outlined" 
            size="small" 
            type="number"
            placeholder='0 - 30y (MMBTu PPA)' 
            value={termMMBTu}
            onChange={handleTermMMBTuChange}
            sx={{
              flex: 0.25, fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.7rem',
              '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
              '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
              '& .MuiInputBase-input::placeholder': {
                fontFamily: 'Nunito Sans, sans-serif',
                fontSize: '0.7rem',
              }
            }}
          /></Tooltip>
        </Box>
        </Box>
      </Box>
              
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
							mt: 1,
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: '0.75rem',
              minWidth: '200px',
              flex: 1,
            }}
          >
            <i><b>* </b>If <b>Yes</b>, please provide details in the fields or upload the agreement and Bradley will autopopulate the fields for you.</i><br />
            {/* <i><b>** </b>If <b>No</b>, Bradley will assume you are on the standard offer rate from the regulated electric utility and will gather data from the utility tariff.</i> */}
          </Typography>
        </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;