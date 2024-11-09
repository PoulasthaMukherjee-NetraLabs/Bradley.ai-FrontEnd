import React from 'react';
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
  visitedSteps: boolean[][];
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
}));

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
          <Step key={step.label} completed={visitedSteps[index][0]}>
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
                {React.cloneElement(step.icon, {
                  sx: { mr: 1, color: visitedSteps[index][0] ? '#036ca1' : 'gray' },
                })}
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: '0.800rem', fontFamily: 'Roboto Condensed, sans-serif' }}>
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
