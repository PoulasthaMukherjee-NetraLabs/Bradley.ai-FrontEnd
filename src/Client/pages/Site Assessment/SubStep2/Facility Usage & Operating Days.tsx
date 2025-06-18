import React from 'react';
import { Box, TextField, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';
import { useFacilityUsage } from '../../../../Context/Site Assessment/SubStep2/Facility Usage & Operating Days Context';

const SubStep2: React.FC = () => {
  const { facilityUsageState, updateMultiSelect, updateField, updateOperatingHour } = useFacilityUsage();
  const { facilityUsage, facilityDetails, daysOfOperation, operatingHours } = facilityUsageState;

  const dayAbbreviations: { [key: string]: string } = { Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri", Saturday: "Sat", Sunday: "Sun" };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.85rem", fontWeight: "bold", textAlign: "center" }}>
        <h2>Facility Usage & Operating Days</h2>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 0 }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, p: "10px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
            <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", flex: 0.3 }}>
              <b>Select Facility Usage:</b> (Select as many descriptors as is appropriate)
            </Typography>
            <Select
              size="small"
              variant="outlined"
              value={facilityUsage}
              onChange={(e: SelectChangeEvent<string[]>) => updateMultiSelect('facilityUsage', e.target.value as string[])}
              multiple
              MenuProps={{ PaperProps: { style: { maxHeight: 5 * 37, scrollbarWidth: 'none', msOverflowStyle: 'none' }, sx: { '&::-webkit-scrollbar': { display: 'none' } } } }}
              sx={{ flex: 0.448, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem", height: "40px", "& .MuiInputBase-root": { padding: "0 6px" }, "& .MuiSelect-select": { padding: "4px 6px", fontSize: "0.7rem" } }}
              renderValue={(selected) => `${(selected as string[]).length} Selected`}
            >
              <MenuItem disabled value="Option 0" sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>Select</MenuItem>
              {["Admin", "Cold storage", "Commercial office building (Highrise)", "Commercial office building (Low-rise)", "Commercial office building (single story)", "Data center", "Elder care facility", "Food storage", "Grocery chain", "Health Care", "Hospital", "Hospitality (hotel)", "Hospitality (long term stay)", "Industrial facility", "K-12", "Manufacturing", "Manufacturing facility", "Military Base", "Office", "Others", "School", "Stadium", "Storage", "Storage facility", "University"].map((option, index) => (
              <MenuItem key={index} value={option} sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>{option}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', flex: 0.3 }}><b>Facility Details:</b></Typography>
            <TextField
              variant="outlined" size="small" type="text" placeholder='Provide any additional information regarding your facility.'
              value={facilityDetails}
              onChange={(e) => updateField('facilityDetails', e.target.value)}
              sx={{ flex: 0.448, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem', '& .MuiInputBase-root': { height: '40px', padding: '0 6px' }, '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }, '& .MuiInputBase-input::placeholder': { fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.7rem' } }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
            <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", flex: 0.3 }}><b>Days of Operation:</b>  (Select as many days as is appropriate)</Typography>
            <Select
              size="small"
              variant="outlined"
              value={daysOfOperation}
              onChange={(e: SelectChangeEvent<string[]>) => updateMultiSelect('daysOfOperation', e.target.value as string[])}
              multiple
              sx={{ flex: 0.448, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem", height: "40px", "& .MuiInputBase-root": { padding: "0 6px" }, "& .MuiSelect-select": { padding: "4px 6px", fontSize: "0.7rem" } }}
              renderValue={(selected) => (selected as string[]).join(", ")}
            >
              <MenuItem disabled value="Option 0" sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>Select the days on which the building is occupied.</MenuItem>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                <MenuItem key={index} value={day} sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" }}>{day}</MenuItem>
              ))}
            </Select>
          </Box>
          {daysOfOperation.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
              <Typography sx={{ fontFamily: "Nunito Sans, sans-serif", fontSize: "0.75rem", flex: 0.3 }}><b>Enter the time of each day that the building begins conditioning for occupancy and when the buildings conditioning stops (or when it setsback):</b></Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'nowrap', justifyContent: 'center', flex: 0.448 }}>
                {daysOfOperation.sort((a, b) => {
                  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                  return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
                }).map((day) => (
                  <TextField
                    key={day}
                    variant="outlined"
                    size="small"
                    type="number"
                    placeholder={dayAbbreviations[day]}
                    value={operatingHours[day] || ''}
                    inputProps={{ min: 0, max: 24 }}
                    onChange={(e) => {
                      let value = parseInt(e.target.value, 10);
                      if (isNaN(value)) { updateOperatingHour(day, ''); return; }
                      if (value < 0) value = 0;
                      if (value > 24) value = 24;
                      updateOperatingHour(day, value.toString());
                    }}
                    sx={{ flex: `calc(${1 / daysOfOperation.length})`, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem", "& .MuiInputBase-root": { height: "40px", padding: "0 6px" }, "& input": { padding: 0, fontFamily: "Nunito Sans, sans-serif", fontSize: "0.8rem" }, "& .MuiInputBase-input::placeholder": { fontFamily: "Nunito Sans, sans-serif", fontSize: "0.7rem" } }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;