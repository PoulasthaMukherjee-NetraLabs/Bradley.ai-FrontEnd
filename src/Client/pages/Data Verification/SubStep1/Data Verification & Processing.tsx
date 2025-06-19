import React, { useState } from 'react';
import { Box, Typography, Collapse, Paper, Checkbox, FormControlLabel, Chip } from '@mui/material';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BusinessIcon from '@mui/icons-material/Business';
import BoltIcon from '@mui/icons-material/Bolt';
import FlagIcon from '@mui/icons-material/Flag';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { IoEnterOutline } from "react-icons/io5";

import { useAppContext } from '../../../../Context/AppContext';
import { useOrganizationDetails } from '../../../../Context/Organizational Profile/SubStep2/Organization Details Context';
import { useAnnualEnergySpend } from '../../../../Context/Organizational Profile/SubStep2/Annual Energy Spend Context';
import { usePrioritizationI } from '../../../../Context/Goals & Priorities/SubStep2/Prioritization - I Context';
import { useBudgetGoals } from '../../../../Context/Financial Info/SubStep2/Own/What Are Your Budget & Investment Goals Context';
import { useSiteCharacteristicsI } from '../../../../Context/Site Assessment/SubStep2/Site Characteristics - I Context';
import { useSolarAssets } from '../../../../Context/Site Assessment/SubStep3/INPUTS TO MAXIMIZE SOLAR DER ASSETS Context';
import { useOwnershipPreference } from '../../../../Context/Financial Info/SubStep1/Ownership Preference Context';
import { useFinancialsI } from '../../../../Context/Goals & Priorities/SubStep3/Financials & Investment Information - I Context';

interface SummarySectionProps {
  icon: React.ReactElement;
  title: string;
  completionStatus: 'complete' | 'partial' | 'empty';
  summary: string;
  isExpanded: boolean;
  onExpand: () => void;
  onEdit: () => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({ 
  icon, 
  title, 
  completionStatus, 
  summary, 
  isExpanded, 
  onExpand, 
  onEdit 
}) => {
  const getStatusColor = () => {
    switch (completionStatus) {
      case 'complete': return '#4caf50';
      case 'partial': return '#ff9800';
      case 'empty': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusLabel = () => {
    switch (completionStatus) {
      case 'complete': return 'Complete';
      case 'partial': return 'Partial';
      case 'empty': return 'Empty';
      default: return 'Unknown';
    }
  };

  return (
    <Paper elevation={2} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: '12px 16px', 
          cursor: 'pointer',
          backgroundColor: '#f8f9fa',
          borderBottom: isExpanded ? '1px solid #e0e0e0' : 'none',
          '&:hover': {
            backgroundColor: '#f0f2f5',
          }
        }} 
        onClick={onExpand}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {React.cloneElement(icon, { sx: { color: 'primary.main', mr: 1.5 }})}
          <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', fontFamily: 'Nunito Sans, sans-serif' }}>
            {title}
          </Typography>
          <Chip 
            label={getStatusLabel()}
            size="small"
            sx={{ 
              ml: 2, 
              backgroundColor: getStatusColor(),
              color: 'white',
              fontSize: '0.7rem',
              height: '20px'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={(e) => { e.stopPropagation(); onEdit(); }} 
            sx={{ 
              '&:focus': { outline: 'none' },
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
            }}
          >
            <IoEnterOutline />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={(e) => { e.stopPropagation(); onExpand(); }} 
            sx={{ 
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', 
              transition: 'transform 0.2s', 
              '&:focus': { outline: 'none' },
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={isExpanded} timeout="auto">
        <Box sx={{ p: '16px 24px', backgroundColor: '#fff' }}>
          <Typography sx={{ 
            fontFamily: 'Nunito Sans, sans-serif', 
            fontSize: '0.8rem', 
            whiteSpace: 'pre-wrap', 
            lineHeight: 1.7,
            color: '#555'
          }}
          dangerouslySetInnerHTML={{ 
            __html: (summary || 'No data provided for this section.')
              .replace(/\*\*(.*?):\*\*/g, '<strong>$1:</strong>') 
          }}
          />
        </Box>
      </Collapse>
    </Paper>
  );
};

const SubStep1: React.FC = () => {
  const { setCurrentStep, setCurrentSubStep } = useAppContext();
  const [expanded, setExpanded] = useState<number[]>([0, 1, 2, 3, 4]);

  const { organizationDetails } = useOrganizationDetails();
  const { annualEnergySpend } = useAnnualEnergySpend();
  const { prioritizationIState } = usePrioritizationI();
  const { budgetGoalsState } = useBudgetGoals();
  const { siteCharacteristicsIState } = useSiteCharacteristicsI();
  const { solarAssetsState } = useSolarAssets();
  const { ownershipPreference } = useOwnershipPreference();
  const { financialsIState } = useFinancialsI();
  
  const orgSummary = [
    `**Company Name:** ${organizationDetails.organizationName || 'Not Provided'}`,
    `**Industry:** ${organizationDetails.industry || 'Not Provided'}`,
    `**Contact Email:** ${organizationDetails.userEmail || 'Not Provided'}`
  ].join('\n');

  const totalAnnualSpend = 
    (parseFloat(String(annualEnergySpend.electricity).replace(/[^0-9.]/g, '')) || 0) +
    (parseFloat(String(annualEnergySpend.naturalGas).replace(/[^0-9.]/g, '')) || 0) +
    (parseFloat(String(annualEnergySpend.water).replace(/[^0-9.]/g, '')) || 0) +
    (parseFloat(String(annualEnergySpend.other).replace(/[^0-9.]/g, '')) || 0);

  const energySummary = [
    `**Total Annual Spend:** ${totalAnnualSpend.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
    `**Energy Source:** Primarily Grid`,
    `**LOA Status:** Pending`
  ].join('\n');

  const topPriority = prioritizationIState.selectedRanks[1] !== 'Select one' 
    ? prioritizationIState.selectedRanks[1] 
    : 'Not Set';
  
  const goalsSummary = [
    `**Top Priority:** ${topPriority}`,
    `**Desired IRR:** ${financialsIState.acceptableIRR}%`,
    `**Preferred Payback:** ${budgetGoalsState.simplePayback !== 'default' ? budgetGoalsState.simplePayback.replace('<', 'Less than ').replace('>', 'More than ') + ' Years' : 'Not Set'}`
  ].join('\n');
  
  const totalRoofSpace = solarAssetsState.roofSections.map(v => parseFloat(String(v).replace(/,/g, '')) || 0).reduce((a, b) => a + b, 0);

  const siteSummary = [
    `**Facility Size:** ${parseInt(siteCharacteristicsIState.overallFacilitySize || '0').toLocaleString()} sq. ft`,
    `**Total Roof Space:** ${totalRoofSpace.toLocaleString()} sq. ft`,
    `**Open Breaker Space:** ${siteCharacteristicsIState.isBreakerSpaceAvailable ? 'Yes' : 'No'}`
  ].join('\n');
  
  const financialSummary = [
    `**Ownership Preference:** ${ownershipPreference.preference ? (ownershipPreference.preference.charAt(0).toUpperCase() + ownershipPreference.preference.slice(1)).replace('-', ' ') : 'Not Set'}`,
    `**Budget Available:** ${budgetGoalsState.availableFunds === 'yes' ? 'Yes' : 'No'}`
  ].join('\n');

  // Helper function to determine completion status
  const getCompletionStatus = (summary: string): 'complete' | 'partial' | 'empty' => {
    const notProvidedCount = (summary.match(/Not Provided|Not Set|Pending/g) || []).length;
    const totalFields = summary.split('\n').length;
    
    if (notProvidedCount === 0) return 'complete';
    if (notProvidedCount === totalFields) return 'empty';
    return 'partial';
  };
  
  const sections = [
    { 
      title: "Organizational Profile", 
      icon: <BusinessIcon />, 
      summary: orgSummary, 
      completionStatus: getCompletionStatus(orgSummary),
      onEdit: () => { setCurrentStep(0); setCurrentSubStep(1); } 
    },
    { 
      title: "Energy Profile", 
      icon: <BoltIcon />, 
      summary: energySummary, 
      completionStatus: getCompletionStatus(energySummary),
      onEdit: () => { setCurrentStep(1); setCurrentSubStep(1); } 
    },
    { 
      title: "Goals & Priorities", 
      icon: <FlagIcon />, 
      summary: goalsSummary, 
      completionStatus: getCompletionStatus(goalsSummary),
      onEdit: () => { setCurrentStep(2); setCurrentSubStep(1); } 
    },
    { 
      title: "Site Assessment", 
      icon: <AssessmentIcon />, 
      summary: siteSummary, 
      completionStatus: getCompletionStatus(siteSummary),
      onEdit: () => { setCurrentStep(3); setCurrentSubStep(1); } 
    },
    { 
      title: "Financial Info", 
      icon: <MonetizationOnIcon />, 
      summary: financialSummary, 
      completionStatus: getCompletionStatus(financialSummary),
      onEdit: () => { setCurrentStep(4); setCurrentSubStep(0); } 
    },
  ];

  const handleExpandClick = (index: number) => {
    setExpanded(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };
  
  return (
    <Box sx={{ fontFamily: 'Nunito Sans, sans-serif', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');`}</style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>DATA VERIFICATION AND PROCESSING</h2><br />
        <h2>Overall Profile Summary</h2>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '10px', pb: '10px', px: '160px' }}>
        
        <Paper elevation={3} sx={{ p: '12px 16px', borderRadius: '12px', background: '#f0f4f8' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', color: '#01579b' }}>
            <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Processing Status</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={`${Math.round((sections.filter(s => s.completionStatus === 'complete').length / sections.length) * 100)}% Complete`}
                sx={{ 
                  backgroundColor: '#4caf50',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Box>
        </Paper>

        {sections.map((section, index) => (
          <SummarySection 
            key={index}
            title={section.title}
            icon={section.icon}
            summary={section.summary}
            completionStatus={section.completionStatus}
            isExpanded={expanded.includes(index)}
            onExpand={() => handleExpandClick(index)}
            onEdit={section.onEdit}
          />
        ))}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: '12px', bgcolor: '#fafafa' }}>
          <FormControlLabel 
            control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: '1.2rem' } }} />}
            label={
              <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600 }}>
                I have reviewed the information above and confirm it is accurate.
              </Typography>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep1;