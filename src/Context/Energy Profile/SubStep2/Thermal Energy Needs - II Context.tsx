import React, { createContext, useContext, useState } from 'react';

interface ThermalEnergyNeedsII {
  requiresHotWater: boolean;
  hotWaterUsage: string;
  hotWaterUsageUnit: string;
  hotWaterTemperature: string;
  domesticHotWater: string;
  preheatForSteam: string;
  foodPreparationsWashdowns: string;
  otherHotWaterUsage: string;
}

interface ThermalEnergyNeedsIIContextType {
  thermalEnergyNeedsII: ThermalEnergyNeedsII;
  updateThermalEnergyNeedsII: (needs: Partial<ThermalEnergyNeedsII>) => void;
}

const ThermalEnergyNeedsIIContext = createContext<ThermalEnergyNeedsIIContextType | undefined>(undefined);

export const useThermalEnergyNeedsII = () => {
  const context = useContext(ThermalEnergyNeedsIIContext);
  if (!context) {
    throw new Error('useThermalEnergyNeedsII must be used within a ThermalEnergyNeedsIIProvider');
  }
  return context;
};

interface ThermalEnergyNeedsIIProviderProps {
  children: React.ReactNode;
}

export const ThermalEnergyNeedsIIProvider: React.FC<ThermalEnergyNeedsIIProviderProps> = ({ children }) => {
  const [thermalEnergyNeedsII, setThermalEnergyNeedsII] = useState<ThermalEnergyNeedsII>({
    requiresHotWater: false,
    hotWaterUsage: '',
    hotWaterUsageUnit: 'Gallons',
    hotWaterTemperature: '',
    domesticHotWater: '',
    preheatForSteam: '',
    foodPreparationsWashdowns: '',
    otherHotWaterUsage: '',
  });

  const updateThermalEnergyNeedsII = (needs: Partial<ThermalEnergyNeedsII>) => {
    setThermalEnergyNeedsII((prevNeeds) => ({ ...prevNeeds, ...needs }));
  };

  return (
    <ThermalEnergyNeedsIIContext.Provider value={{ thermalEnergyNeedsII, updateThermalEnergyNeedsII }}>
      {children}
    </ThermalEnergyNeedsIIContext.Provider>
  );
};
