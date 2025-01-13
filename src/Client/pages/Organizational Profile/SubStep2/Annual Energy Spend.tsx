import React from 'react'; 
import { Box, TextField, Typography, Tooltip } from '@mui/material'; 

const SubStep2: React.FC = () => { 
  return ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Annual Energy Spend</h2>
      </Typography> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, p: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Electricity:</b></Typography>
          <Tooltip title="Enter the total annual spend on electricity." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on electricity.'
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
        </Box>


        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Natural Gas:</b></Typography>
          <Tooltip title="Enter the total annual spend on natural gas." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on natural gas.'
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Water:</b></Typography>
          <Tooltip title="Enter the total annual spend on water." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on water.'
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  />
  </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Oil:</b></Typography>
          <Tooltip title="Enter the total annual spend on oil." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on oil.'
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Propane:</b></Typography>
          <Tooltip title="Enter the total annual spend on propane." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on propane.'
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Steam:</b></Typography>
          <Tooltip title="Enter the total annual spend on steam." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on steam.'
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Chilled Water:</b></Typography>
          <Tooltip title="Enter the total annual spend on chilled water." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on chilled water.'
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Other:</b></Typography>
          <Tooltip title="Enter the total annual spend on other energy sources." placement='top-end' arrow>
          <TextField
    fullWidth
    variant="outlined"
    placeholder='Enter the total annual spend on other energy sources.'
    size="small"
    type="text"
    sx={{
      flex: 0.5,
      fontSize: '0.7rem', fontFamily: 'Nunito Sans, sans-serif',
      '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
      '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
    }}
  /></Tooltip>
        </Box>

        </Box>
      </Box>
    </Box> 
  ); 
}; 

export default SubStep2;
