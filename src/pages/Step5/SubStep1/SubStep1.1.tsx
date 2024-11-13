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
        <h2>Financial Information Step</h2>
      </Typography>
      <p>
        <b>Welcome, [User Name]!</b>
      </p>
      <p>
        <b>Provide Financial Details</b>
      </p>
      <p>
        This information informs Bradley about your preferred financial outcomes and providing these inputs <br />
        enable accurate financial projections for the DER concepts(s).
      </p>
      <p>
        This will take about 10 minutes.
      </p>
      <p>
        <b>Here's what we'll cover:</b>
      </p>
      <li>
        <b>Financial Preferences & Method of DER ownership (own, finance to own, third party ESA/PPA) </b> <br />
        Provide information about your financial preferences, your preferred method of DER financial arrangement, and provide <br />
        context regarding any existing energy supply/PPA or other energy contracts.
      </li>
      <li>
        <b>Budgetary Goals </b> <br />
        Tell us about your budget and investment goals for this project.
      </li>
      </Box>
    </div>
  );
};

export default SubStep1;
