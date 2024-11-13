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
        <h2>Organization Profile Setup</h2>
      </Typography>
      <p>
        <b>Welcome, [User Name]!</b>
      </p>
      <p>
        <b>Tell Us About Your Organization</b>
      </p>
      <p>
        This is the first step in setting up your site-specific and personalized DER analysis with Bradley. <br />
        I will ask you a series of questions around the use of your facility, gather some key information <br />
        about your energy use in order to conceptually design the ideal distributed energy resource, <br />
        identify potential incentives (rebates, grants, tax benefits), and deliver accurate results.
      </p>
      <p>
        This will take about 5 minutes.
      </p>
      <p>
        <b>Here's what we'll cover:</b>
      </p>
      <li>
        <b>Organizational Details</b> <br />
        Your input helps us understand your organization's structure and <br />
        operations, which influence how Bradley will generate DER <br />
        concepts that best fit your prioritization.
      </li>
      </Box>
    </div>
  );
};

export default SubStep1;
