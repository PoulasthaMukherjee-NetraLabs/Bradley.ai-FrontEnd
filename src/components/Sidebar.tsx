import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, ListItemButton, ListItemText, Paper, Typography, StepConnector, styled } from '@mui/material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import BoltIcon from '@mui/icons-material/Bolt';
import FlagIcon from '@mui/icons-material/Flag';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const steps = [
  { label: 'Organizational Profile', icon: <CorporateFareIcon fontSize="small" /> },
  { label: 'Energy Profile', icon: <BoltIcon fontSize="small" /> },
  { label: 'Goals & Priorities', icon: <FlagIcon fontSize="small" /> },
  { label: 'Site Assessment', icon: <WarehouseIcon fontSize="small" /> },
  { label: 'Financial Info', icon: <AccountBalanceWalletIcon fontSize="small" /> },
  { label: 'Data Verification', icon: <AssignmentTurnedInIcon fontSize="small" /> },
  { label: 'Onboarding', icon: <DoneOutlineIcon fontSize="small" /> },
];

interface SidebarProps {
  currentStep: number;
  visitedSteps: boolean[];
  onStepChange: (step: number) => void;
}

const CustomStepConnector = styled(StepConnector)(() => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: 'gray',
    borderWidth: 1.5,
  },
  [`&.Mui-completed .MuiStepConnector-line`]: {
    borderColor: '#036ca1',
    borderWidth: 1.5,
  },
  [`&.Mui-active .MuiStepConnector-line`]: {
    borderColor: '#036ca1',
    borderWidth: 1.5,
  },
}));

const Sidebar: React.FC<SidebarProps> = ({ currentStep, visitedSteps, onStepChange }) => {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(steps.length).fill(false));

  useEffect(() => {
    if (currentStep > 0 && !completedSteps[currentStep - 1]) {
      markStepAsCompleted(currentStep - 1);
    }
  }, [currentStep, completedSteps]);

  const handleStepClick = (index: number) => {
    if (visitedSteps[index]) {
      onStepChange(index);
    }
  };

  const markStepAsCompleted = (step: number) => {
    setCompletedSteps((prev) => {
      const newCompleted = [...prev];
      newCompleted[step] = true;
      return newCompleted;
    });
  };

  return (
    <Paper sx={{ width: '173px', position: 'fixed', height: '100vh', top: 0, mt: '50px', padding: '10px', paddingTop: '40px', boxShadow: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Stepper
        activeStep={currentStep}
        orientation="vertical"
        nonLinear
        connector={<CustomStepConnector />}
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
        {steps.map((step, index) => (
          <Step key={step.label} completed={completedSteps[index]}>
            <StepLabel>
              <ListItemButton
                selected={currentStep === index}
                onClick={() => handleStepClick(index)}
                sx={{
                  padding: '3px 4px',
                  fontFamily: 'Nunito Sans, sans-serif',
                  '&.Mui-selected': {
                    backgroundColor: 'transparent',
                  },
                  color: completedSteps[index] ? '#036ca1' : 'gray',
                  '&:hover': {
                    borderRadius: '8px',
                  },
                }}
              >
                {React.cloneElement(step.icon, {
                  sx: { mr: 1, color: completedSteps[index] ? '#036ca1' : 'gray' },
                })}
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: '0.700rem', fontFamily: 'Nunito Sans, sans-serif' }}>
                      {step.label}
                    </Typography>
                  }
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
