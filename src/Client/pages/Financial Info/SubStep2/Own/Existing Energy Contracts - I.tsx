import React, { useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch } from '@mui/material';

const SubStep2: React.FC = () => {
  const [showSteam, setShowSteam] = useState(false);
  const [terminationFee, setTerminationFee] = useState('');
  const [electricityTake, setElectricityTake] = useState('');

  const handleTerminationFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^0-9.]/g, '');
    const parts = input.split('.');
    if (parts.length > 2) return;

    if (parts[1]?.length > 2) return; 

    let [whole, decimal] = parts;
    let formatted = Number(whole).toLocaleString();
    if (decimal !== undefined) {
      formatted += `.${decimal}`;
    }

    setTerminationFee(formatted);
  };

  const handleElectricityTakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setElectricityTake(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');`}
      </style>

      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Existing Energy Contracts - I</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControlLabel
              control={<Switch checked={showSteam} onChange={() => setShowSteam(!showSteam)} size="small" />}
              label="Do you have an existing electricity supply contract with a Third Party Supplier?"
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

                  {/* Name of Supplier */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}>
                      <b>Name of 3rd Party Supplier: </b>(Optional)
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      placeholder='Input'
                      sx={textFieldStyle}
                    />
                  </Box>

                  {/* Contract End Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}>
                      <b>Contract End Date:</b>
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="date"
                      sx={textFieldStyle}
                    />
                  </Box>

                  {/* Early Termination Fee */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}>
                      <b>Early Termination Fee: </b>(If any, in $)
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      value={terminationFee ? `$${terminationFee}` : ''}
                      onChange={handleTerminationFeeChange}
                      placeholder='Input or Leave Blank if None'
                      sx={textFieldStyle}
                    />
                  </Box>

                  {/* Electricity Take or Pay */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.5 }}>
                      <b>Annual Electricity Take or Pay Amt.:</b> (In kWh)
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      value={electricityTake}
                      onChange={handleElectricityTakeChange}
                      placeholder='Enter Amount in kWh'
                      sx={textFieldStyle}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* Info Note */}
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
              <i><b>** </b>If <b>No</b>, Bradley will assume you are on the standard offer rate from the regulated electric utility and will gather data from the utility tariff.</i>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const textFieldStyle = {
  flex: 0.5,
  fontFamily: 'Nunito Sans, sans-serif',
  fontSize: '0.7rem',
  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' },
  '& .MuiInputBase-input::placeholder': {
    fontFamily: 'Nunito Sans, sans-serif',
    fontSize: '0.7rem',
  }
};

export default SubStep2;
