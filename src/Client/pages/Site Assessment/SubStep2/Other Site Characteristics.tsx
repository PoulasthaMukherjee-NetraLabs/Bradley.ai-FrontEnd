import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useOtherSiteCharacteristics } from '../../../../Context/Site Assessment/SubStep2/Other Site Characteristics Context';

const SubStep2: React.FC = () => {
  const { otherCharacteristicsState, updateField } = useOtherSiteCharacteristics();

  const fields = [
    { name: 'topography', label: "Topography:", options: ["Flat", "Sloped", "Hilly", "Partially Tree Covered", "Tree Covered"] },
    { name: 'primaryVoltageService', label: "Primary Volt. Service To The Building / Property:", options: ["480 V", "277 V", "120 V"] },
    { name: 'primaryVoltageFacility', label: "Primary Volt. distributed at the Facility Level:", options: ["480 V", "277 V", "120 V"] },
    { name: 'secondaryVoltageService', label: "Secondary Volt. Service:", options: ["480 V", "277 V", "120 V"], hasDefault: true }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Other Site Characteristics</h2>
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.35 }}>
              <b>Please Describe Any Unique Site Features That Might Impact DER System Placement Or Installation: </b>(Optional)
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder='E.g., Historical Facades, Easements, Height Restrictions'
              multiline
              rows={2}
              value={otherCharacteristicsState.uniqueFeatures}
              onChange={(e) => updateField('uniqueFeatures', e.target.value)}
              sx={{
                flex: 0.4,
                fontSize: '0.7rem',
                fontFamily: 'Nunito Sans, sans-serif',
                '& .MuiInputBase-root': { padding: '0 6px' },
                '& textarea': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', pt: '5px', pb: '5px', pl: '1px' }
              }}
            />
          </Box>

          {fields.map((field, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 0.35 }}>
                <b>{field.label}</b>{field.hasDefault ? " (If Any)" : ""}
              </Typography>
              <Select
                fullWidth
                size="small"
                variant="outlined"
                value={otherCharacteristicsState[field.name as keyof typeof otherCharacteristicsState]}
                onChange={(e: SelectChangeEvent) => updateField(field.name as keyof typeof otherCharacteristicsState, e.target.value)}
                sx={{
                  flex: 0.4,
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  minWidth: '310px',
                  height: '40px',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& .MuiSelect-select': { padding: '4px 6px', fontSize: '0.7rem' },
                }}
              >
                {field.hasDefault && (
                  <MenuItem value="Option 0" disabled sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    Select
                  </MenuItem>
                )}
                {field.options.map((option, idx) => (
                  <MenuItem key={idx} value={`Option ${idx + 1}`} sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' }}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;