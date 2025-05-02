import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

export const energyProductionData = [
  { 
    title: 'DER total system generation Capacity', 
    value: '2,550kW', 
    bgColorTop: '#2745ad',
    bgColorBottom: '#00b050', 
    textColor: 'white',
    type: 'capacity'
  },
  { 
    title: 'DER total system kWh annual generation', 
    value: '3,000,000 kWh', 
    bgColorTop: '#2745ad',
    bgColorBottom: '#00b050',
    textColor: 'white',
    type: 'generation'
  },
  { 
    title: 'DER Solar generation Capacity', 
    value: '250kW', 
    bgColorTop: '#2745ad',
    bgColorBottom: '#00b0f0', 
    textColor: 'white',
    type: 'capacity'
  },
  { 
    title: 'DER Solar kWh generation', 
    value: '134,000 kWh', 
    bgColorTop: '#2745ad',
    bgColorBottom: '#00b0f0', 
    textColor: 'white',
    type: 'generation'
  },
  { 
    title: 'DER Combustion Turbine gen. Capacity', 
    value: '1,550kW', 
    bgColorTop: '#2745ad',
    bgColorBottom: '#00b0f0', 
    textColor: 'white',
    type: 'capacity'
  },
  { 
    title: 'DER Combustion Turbine kWh generation', 
    value: '2,000,000 kWh', 
    bgColorTop: '#2745ad',
    bgColorBottom: '#00b0f0', 
    textColor: 'white',
    type: 'generation'
  },
  { 
    title: 'DER Fuel Cell generation Capacity', 
    value: '750kW', 
    bgColorTop: '#2745ad',
    bgColorBottom: '#00b0f0', 
    textColor: 'white',
    type: 'capacity'
  },
  { 
    title: 'DER Fuel Cell kWh generation', 
    value: '969,000 kWh', 
    bgColorTop: '#2745ad',
    bgColorBottom: '#00b0f0', 
    textColor: 'white',
    type: 'generation'
  },
];

// Energy Production Breakdown Component
export const EnergyProductionBreakdown: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
  const isLarge = size === 'large';
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%', 
      height: isLarge ? '500px' : '100%',
      overflow: 'hidden',
      pt: isLarge ? 1 : 0
    }}>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: isLarge ? 3 : 1,
        width: '100%',
        maxWidth: isLarge ? '800px' : '100%',
        mx: 'auto'
      }}>
        {energyProductionData.map((item, index) => (
          <Box key={index} sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: isLarge ? '80px' : '40px',
            borderRadius: 1,
            overflow: 'hidden',
          }}>
            <Box sx={{
              bgcolor: item.bgColorTop,
              color: item.textColor,
              width: '100%',
              p: isLarge ? 1 : 1.5,
            }}>
              <Typography 
          sx={{ 
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: isLarge ? '0.9rem' : '0.6rem',
            fontWeight: 'medium',
          }}
              >
          {item.title}
              </Typography>
            </Box>
            <Box sx={{
              bgcolor: item.bgColorBottom,
              color: item.textColor,
              width: '100%',
              p: isLarge ? 1 : 0.5,
            }}>
              <Typography 
          sx={{ 
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: isLarge ? '1.8rem' : '1rem',
            fontWeight: 'bold',
          }}
              >
          {item.value}
              </Typography>
              {/* <Typography 
          sx={{ 
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: isLarge ? '0.7rem' : '0.5rem',
            fontStyle: 'italic',
          }}
              >
          {isLarge ? "ACME ENTERPRISE SERVICES" : ""}
              </Typography> */}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};