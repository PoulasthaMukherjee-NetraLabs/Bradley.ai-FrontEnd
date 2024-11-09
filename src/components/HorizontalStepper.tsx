import React from 'react';
import { Stepper, Step, StepLabel, StepConnector, styled } from '@mui/material';
import './HorizontalStepper.css';

interface HorizontalStepperProps {
  currentSubStep: number;
  totalSubSteps: number;
  visitedSteps: boolean[];
  onSubStepChange: (subStep: number) => void;
  currentStep: number;
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

const HorizontalStepper: React.FC<HorizontalStepperProps> = ({
  currentSubStep,
  totalSubSteps,
  visitedSteps,
  onSubStepChange,
  currentStep,
}) => {
  if (totalSubSteps === 1) {
    return null;
  }
  
  const subSteps = Array.from({ length: totalSubSteps }, (_, index) => `Step ${currentStep + 1}.${index + 1}`);

  return (
    <Stepper
      activeStep={currentSubStep}
      alternativeLabel
      connector={<CustomStepConnector />}
    >
      {subSteps.map((label, index) => (
        <Step key={label} completed={visitedSteps[index]}>
          <StepLabel
            onClick={() => visitedSteps[index] && onSubStepChange(index)}
            sx={{
              cursor: visitedSteps[index] ? 'pointer' : 'default',
              color: visitedSteps[index] ? '#036ca1' : 'gray',
              '& .MuiStepLabel-label': {
                fontFamily: 'Roboto Condensed, sans-serif',
              },
            }}
          >
            <span className="roboto-condensed">{label}</span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default HorizontalStepper;
