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
        <h2>User Insights: Sight Assessment Inputs</h2>
      </Typography>
      <p>
        <b>Welcome, [User Name]!</b>
      </p>
      <p>
        <b>Access Your Site's DER Potential</b>
      </p>
      <p>
        In this step, you will provide more granular details abour your use of energy across various systems. Bradley will analyze your inputs to <br />
        determine its suitability for alternate Distributed Energy Resources system arrangements. This part of the assessment will consider <br />
        factors such as solar potential, wind resources, geothermal feasibility, grid connection, space constraints, interconnect limitations and <br />
        local regulations.
      </p>
      <p>
        This will take about 20 minutes.
      </p>
      <p>
        <b>Here's what we'll cover:</b>
      </p>
      <li>
        <b>Site Location & Characteristics </b> <br />
        Confirm your site location and provide details about its characteristics.
      </li>
      <li>
        <b>DER Potential </b> <br />
        Assess your site's potential for solar and wind energy generation.
      </li>
      </Box>
    </div>
  );
};

export default SubStep1;
