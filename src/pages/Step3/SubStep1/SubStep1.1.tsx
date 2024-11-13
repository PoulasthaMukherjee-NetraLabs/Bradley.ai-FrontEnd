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
        <h2>Your Goal(s) & Priorities Setup</h2>
      </Typography>
      <p>
        <b>Welcome, [User Name]!</b>
      </p>
      <p>
        <b>Tell Us About Your Goals & Priorities</b>
      </p>
      <p>
        Provide details about the goals you want to achieve through your customized DER System, including <br />
        your financial requirements. This information will help Bradley create the most accurate and effective <br />
        DER conceptualization based on your direction.
      </p>
      <p>
        This will take about 10 minutes, the more details you provide the better Bradley will perform.
      </p>
      <p>
        <b>Here's what we'll cover:</b>
      </p>
      <li>
        <b>Priorites (Decarbonize, Increase resiliency, maximize cost reductions) </b> <br />
        Define your priorities for DER implementation and set specific targets for your goals. Bradley creates the DER solution based <br />
        on your priorities.
      </li>
      <li>
        <b>Financial Goals & Targets (IRR, ROI, Simple Payback) </b> <br />
        Outline your financial objecives and investment preferences. Bradley can adjust how DER projects allocate cash, rebates and <br />
        grants in the financial proforma, as well as adjust depreciationbased on your tax position.
      </li>
      </Box>
    </div>
  );
};

export default SubStep1;
