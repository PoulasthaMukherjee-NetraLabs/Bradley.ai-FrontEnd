import React from 'react';
import { Stepper, Step, StepLabel, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';

const steps = [
  'Step 1: Organizational Profile',
  'Step 2: Energy Profile',
  'Step 3: Goals & Priorities',
  'Step 4: Site Assessment',
  'Step 5: Financial Info',
  'Data Verification',
  'Onboarding'
];

interface SidebarProps {
  currentStep: number;
  visitedSteps: boolean[][];
  onStepChange: (step: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, visitedSteps, onStepChange }) => {
  return (
    <Paper sx={{ width: '173px', position: 'fixed', height: '100vh', top: 0, mt: '50px', padding: '10px', paddingTop: '40px', boxShadow: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
      </style>
      <Stepper
        activeStep={currentStep}
        orientation="vertical"
        nonLinear
        sx={{
          padding: 0,
          '.MuiStep-root': {
            padding: 0,
          },
          '.MuiStepLabel-root': {
            padding: 0,
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={visitedSteps[index][0]}>
            <StepLabel>
              <ListItemButton
                selected={currentStep === index}
                onClick={() => visitedSteps[index][0] && onStepChange(index)}
                sx={{
                  padding: '3px 4px',
                  fontFamily: 'Roboto Condensed, sans-serif',
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                  },
                  color: visitedSteps[index][0] ? '#036ca1' : 'gray',
                  '&:hover': {
                    borderRadius: '8px',
                  },
                }}
              >
                <ListItemText
                  primary={<Typography sx={{ fontSize: '0.800rem', fontFamily: 'Roboto Condensed, sans-serif' }}>{label}</Typography>}
                />
              </ListItemButton>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default Sidebar;
