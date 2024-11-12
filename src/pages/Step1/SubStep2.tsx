import React from 'react'; 
import { Box, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 2, pt: 2 }}> 
      <Typography variant="h6" sx={{ mb: 1, fontSize: '0.85rem', fontWeight: 'bold' }}>
        Organization Details
      </Typography> 
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        {/* Column 1 */}
        <Box sx={{ flex: 0.48, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography sx={{ fontSize: '0.75rem' }}>*Organization Name:</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ fontSize: '0.7rem' }}
              select
              placeholder="Lookup your Organization"
            />
            <Button 
              variant="contained" 
              sx={{ minWidth: '60px', fontSize: '0.65rem', padding: '2px 4px', alignSelf: 'flex-end' }}
            >
              Lookup
            </Button>
          </Box>

          <Typography sx={{ fontSize: '0.75rem' }}>*Organization Type:</Typography>
          <TextField fullWidth variant="outlined" size="small" select sx={{ fontSize: '0.7rem' }} />

          <Typography sx={{ fontSize: '0.75rem' }}>Industry Selection:</Typography>
          <TextField fullWidth variant="outlined" size="small" select sx={{ fontSize: '0.7rem' }} />

          <Typography sx={{ fontSize: '0.75rem' }}>*IRS Category:</Typography>
          <TextField fullWidth variant="outlined" size="small" select sx={{ fontSize: '0.7rem' }} />

          <Typography sx={{ fontSize: '0.75rem' }}>Number of Employees at Facility:</Typography>
          <TextField fullWidth variant="outlined" size="small" type="number" sx={{ fontSize: '0.7rem' }} />

          <Box sx={{ border: '1px solid lightgrey', p: 0.5, borderRadius: 1, mt: 1 }}>
  <Typography variant="subtitle2" sx={{ fontSize: '0.75rem', fontWeight: 'bold', mb: 0.5 }}>
    Annual Energy Spend
  </Typography>

  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
  {/* Electricity */}
  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
  <Typography sx={{ fontSize: '0.75rem', width: '150px', flex: 0.5 }}>Electricity</Typography>
  <TextField 
    variant="outlined" 
    size="small" 
    type="number" 
    sx={{ 
      flex: 0.75,
      fontSize: '0.7rem', 
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0 }
    }} 
  />
</Box>

{/* Natural Gas */}
<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
  <Typography sx={{ fontSize: '0.75rem', width: '150px', flex: 0.5 }}>Natural Gas</Typography>
  <TextField 
    variant="outlined" 
    size="small" 
    type="number" 
    sx={{ 
      flex: 0.75,
      fontSize: '0.7rem', 
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0 }
    }} 
  />
</Box>

{/* Water */}
<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
  <Typography sx={{ fontSize: '0.75rem', width: '150px', flex: 0.5 }}>Water</Typography>
  <TextField 
    variant="outlined" 
    size="small" 
    type="number" 
    sx={{ 
      flex: 0.75,
      fontSize: '0.7rem', 
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0 }
    }} 
  />
</Box>

{/* Other */}
<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
  <Typography sx={{ fontSize: '0.75rem', width: '150px', flex: 0.5 }}>
    Other (Oil, Propane, PPAs, Steam, etc...)
  </Typography>
  <TextField 
    variant="outlined" 
    size="small" 
    type="number" 
    sx={{ 
      flex: 0.75,
      fontSize: '0.7rem', 
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0 }
    }} 
  />
</Box></Box>

</Box>


          <Typography sx={{ mt: 1, fontSize: '0.75rem' }}><b>Facility Operation Description:</b></Typography>
          <TextField fullWidth multiline rows={3} variant="outlined" sx={{ fontSize: '0.7rem' }} />
        </Box>

        {/* Column 2 */}
        <Box sx={{ flex: 0.48, display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Google Maps Embed */}
          <Box sx={{ height: '280px', border: '1px solid lightgrey', mb: 0.5 }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086238560343!2d-122.41941548468154!3d37.77492977975966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c2e5b1bff%3A0xdbf30509b4e22a90!2sGoogle!5e0!3m2!1sen!2sus!4v1666474302084!5m2!1sen!2sus" 
              width="100%" height="100%" style={{ border: 0 }} 
              allowFullScreen={false} loading="lazy"
            ></iframe>
          </Box>

          <Box sx={{ border: '1px solid lightgrey', p: 1, borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <b>Facility Address</b>
              <Button size="small" sx={{ fontSize: '0.6rem', minWidth: '60px', padding: '2px 4px' }}>
                Confirm Location
              </Button>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
  <Typography sx={{ fontSize: '0.75rem', width: '150px', flex: 0.5 }}>Street Address</Typography>
  <TextField 
    variant="outlined" 
    size="small" 
    type="text" 
    sx={{ 
      flex: 0.75,
      fontSize: '0.7rem', 
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0 }
    }} 
  />
</Box>

<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
  <Typography sx={{ fontSize: '0.75rem', width: '150px', flex: 0.5 }}>City</Typography>
  <TextField 
    variant="outlined" 
    size="small" 
    type="text" 
    sx={{ 
      flex: 0.75,
      fontSize: '0.7rem', 
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0 }
    }} 
  />
</Box>

<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
  <Typography sx={{ fontSize: '0.75rem', width: '150px', flex: 0.5 }}>State</Typography>
  <TextField 
    variant="outlined" 
    size="small" 
    type="text" 
    sx={{ 
      flex: 0.75,
      fontSize: '0.7rem', 
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0 }
    }} 
  />
</Box>

<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
  <Typography sx={{ fontSize: '0.75rem', width: '150px', flex: 0.5 }}>
    Zip Code
  </Typography>
  <TextField 
    variant="outlined" 
    size="small" 
    type="text" 
    sx={{ 
      flex: 0.75,
      fontSize: '0.7rem', 
      '& .MuiInputBase-root': { height: '24px', padding: '0 6px' },
      '& input': { padding: 0 }
    }} 
  />
</Box></Box>
          </Box>

          {/* Property Ownership */}
          <Typography variant="subtitle2" sx={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
          <b>Property Ownership</b> </Typography>
          <Typography sx={{ mt: 1, fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  Do you own the property?
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0 }}>
    <FormControlLabel value="own" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="own" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>

<Typography sx={{ mt: 1,mb: 1, fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  Do you lease space?
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0 }}>
    <FormControlLabel value="lease" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="lease" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>

{/* Long-Term Site Occupancy */}
<Typography variant="subtitle2" sx={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
<b>Long - Term Site Occupancy</b> </Typography>
<Typography sx={{ mt: 1, fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
Do you plan to occupy this site for the next 15-20 years?
  <RadioGroup row sx={{ fontSize: '0.7rem', m: 0 }}>
    <FormControlLabel value="yes" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontSize: '0.7rem' }}>Yes</Typography>} />
    <FormControlLabel value="no" control={<Radio sx={{ padding: '2px' }} />} label={<Typography sx={{ fontSize: '0.7rem' }}>No</Typography>} />
  </RadioGroup>
</Typography>

        </Box>
      </Box>
    </Box> 
  ); 
};

export default SubStep2;
