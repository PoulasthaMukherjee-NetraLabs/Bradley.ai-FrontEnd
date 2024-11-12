import React, { useState } from 'react';
import { Box, Button, Snackbar } from '@mui/material';
import HorizontalStepper from './components/HorizontalStepper';
import StepContent from './pages/StepContent';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const steps = [
  { label: 'Organizational Profile', subSteps: 2 },
  { label: 'Energy Profile', subSteps: 3 },
  { label: 'Goals & Priorities', subSteps: 3 },
  { label: 'Site Assessment', subSteps: 3 },
  { label: 'Financial Info', subSteps: 3 },
  { label: 'Data Verification', subSteps: 1 },
  { label: 'Onboarding', subSteps: 1 },
];
const TOTAL_STEPS = steps.length;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState(
    Array.from({ length: TOTAL_STEPS }, (_, i) =>
      Array.from({ length: steps[i].subSteps }, (_, j) => i === 0 && j === 0)
    )
  );
  const [completedSubSteps, setCompletedSubSteps] = useState(
    Array.from({ length: TOTAL_STEPS }, (_, i) =>
      Array.from({ length: steps[i].subSteps }, () => false)
    )
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleStepChange = (step: number) => {
    if (visitedSteps[step][0]) {
      setCurrentStep(step);
      setCurrentSubStep(0);
    }
  };

  const handleSubStepChange = (subStep: number) => {
    if (visitedSteps[currentStep][subStep]) {
      setCurrentSubStep(subStep);
    }
  };

  const handleNext = () => {
    const isLastSubStep = currentSubStep === steps[currentStep].subSteps - 1;
    const isLastStep = currentStep === TOTAL_STEPS - 1;

    if (isLastSubStep) {
      if (!isLastStep) {
        setCurrentStep(currentStep + 1);
        setCurrentSubStep(0);
        markVisited(currentStep + 1, 0);
      } else {
        setOpenSnackbar(true);
      }
    } else {
      setCurrentSubStep(currentSubStep + 1);
      markVisited(currentStep, currentSubStep + 1);
      markCompleted(currentStep, currentSubStep);
    }
  };

  const handleBack = () => {
    if (currentSubStep > 0) {
      setCurrentSubStep(currentSubStep - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentSubStep(steps[currentStep - 1].subSteps - 1);
    }
  };

  const markVisited = (step: number, subStep: number) => {
    setVisitedSteps((prev) => {
      const newVisited = [...prev];
      newVisited[step][subStep] = true;
      return newVisited;
    });
  };

  const markCompleted = (step: number, subStep: number) => {
    setCompletedSubSteps((prev) => {
      const newCompleted = [...prev];
      newCompleted[step][subStep] = true;
      return newCompleted;
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', zIndex: 500 }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1, mt: '64px', width: '100vw' }}>
        <Box sx={{ width: '173px', flexShrink: 0 }}>
          <Sidebar
            currentStep={currentStep}
            steps={steps}
            visitedSteps={visitedSteps}
            onStepChange={handleStepChange}
          />
        </Box>
  
        <Box component="main" sx={{ flexGrow: 1, p: 4, bgcolor: '#f5f5f5', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <HorizontalStepper
            currentSubStep={currentSubStep}
            totalSubSteps={steps[currentStep].subSteps}
            visitedSteps={visitedSteps[currentStep]}
            completedSubSteps={completedSubSteps[currentStep]}
            onSubStepChange={handleSubStepChange}
            currentStep={currentStep}
          />
          
          <Box sx={{ mt: 4, pl: 2, pb: 1, pt: 0.1, mb: 7, ml: 3, borderRadius: '8px', bgcolor: 'white', boxShadow: 1, color: 'black', }}>
            <StepContent step={currentStep} subStep={currentSubStep} />
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 4,
                mr: 1,
                ml: -1
              }}
            >
              <Button
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  padding: '2px 4px',
                  minWidth: '10px',
                  maxHeight: '25px',
                  textTransform: 'none'
                }}
                variant="outlined"
                onClick={handleBack}
                disabled={currentStep === 0 && currentSubStep === 0}
              >
                Back
              </Button>
              <Button
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  padding: '2px 4px',
                  minWidth: '10px',
                  maxHeight: '25px',
                  textTransform: 'none'
                }}
                variant="outlined"
                onClick={() => {}}
              >
                Save and Continue Later
              </Button>
              <Button
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  padding: '2px 4px',
                  minWidth: '10px',
                  maxHeight: '25px',
                  textTransform: 'none'
                }}
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {currentStep === TOTAL_STEPS - 1 && currentSubStep === steps[currentStep].subSteps - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
  
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Done!"
      />
    </Box>
  );
};

export default App;
