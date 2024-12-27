import React, { createContext, useContext, useState } from 'react';

interface ThermalEnergyNeeds {
  requiresSteam: boolean;
  annualSteamUsage: string;
  annualSteamUsageUnit: string;
  steamPressure: string;
  steamUsageConsistency: string;
  condensateReturn: string;
}

interface ThermalEnergyNeedsContextType {
  thermalEnergyNeeds: ThermalEnergyNeeds;
  updateThermalEnergyNeeds: (needs: Partial<ThermalEnergyNeeds>) => void;
}

const ThermalEnergyNeedsContext = createContext<ThermalEnergyNeedsContextType | undefined>(undefined);

export const useThermalEnergyNeeds = () => {
  const context = useContext(ThermalEnergyNeedsContext);
  if (!context) {
    throw new Error('useThermalEnergyNeeds must be used within a ThermalEnergyNeedsProvider');
  }
  return context;
};

interface ThermalEnergyNeedsProviderProps {
  children: React.ReactNode;
}

export const ThermalEnergyNeedsProvider: React.FC<ThermalEnergyNeedsProviderProps> = ({ children }) => {
  const [thermalEnergyNeeds, setThermalEnergyNeeds] = useState<ThermalEnergyNeeds>({
    requiresSteam: false,
    annualSteamUsage: '',
    annualSteamUsageUnit: 'Tons',
    steamPressure: '15 PSIG',
    steamUsageConsistency: '',
    condensateReturn: '',
  });

  const updateThermalEnergyNeeds = (needs: Partial<ThermalEnergyNeeds>) => {
    setThermalEnergyNeeds((prevNeeds) => ({ ...prevNeeds, ...needs }));
  };

  return (
    <ThermalEnergyNeedsContext.Provider value={{ thermalEnergyNeeds, updateThermalEnergyNeeds }}>
      {children}
    </ThermalEnergyNeedsContext.Provider>
  );
};
