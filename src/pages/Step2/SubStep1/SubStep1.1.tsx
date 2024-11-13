import React from 'react';
import { Box, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const SubStep1: React.FC = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: -1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold' }}>
        <h2>Energy Profile Setup</h2>
      </Typography>
      <p>
        <b>Welcome, [User Name]!</b>
      </p>
      <p>
        <b>Tell Us About Your Energy Consumption</b>
      </p>
      <p>
        Provide details about your facility's energy consumption and usage patterns. <br />
        This information will help Bradley create the most accurate and effective DER concepts for you.
      </p>
      <p>
        This will take about 15 minutes.
      </p>
      <p>
        <b>Here's what we'll cover:</b>
      </p>
      <li>
        <b>Energy Load Profile</b> <br />
        Analyze your energy consumption patterns over time.
      </li>
    </Box>
    </div>
  );
};

export default SubStep1;
