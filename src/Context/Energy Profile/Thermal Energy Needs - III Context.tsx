import React, { createContext, useContext, useState } from 'react';

interface ThermalEnergyNeedsIII {
  requiresChilledWater: boolean;
  chilledWaterUsage: string;
  chilledWaterUsageType: string;
  chilledWaterTemperature: string;
  additionalChilledWaterDemand: string;
}

interface ThermalEnergyNeedsIIIContextType {
  thermalEnergyNeedsIII: ThermalEnergyNeedsIII;
  updateThermalEnergyNeedsIII: (needs: Partial<ThermalEnergyNeedsIII>) => void;
}

const ThermalEnergyNeedsIIIContext = createContext<ThermalEnergyNeedsIIIContextType | undefined>(undefined);

export const useThermalEnergyNeedsIII = () => {
  const context = useContext(ThermalEnergyNeedsIIIContext);
  if (!context) {
    throw new Error('useThermalEnergyNeedsIII must be used within a ThermalEnergyNeedsIIIProvider');
  }
  return context;
};

export const ThermalEnergyNeedsIIIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [thermalEnergyNeedsIII, setThermalEnergyNeedsIII] = useState<ThermalEnergyNeedsIII>({
    requiresChilledWater: false,
    chilledWaterUsage: '',
    chilledWaterUsageType: 'Process Chilled Water',
    chilledWaterTemperature: '',
    additionalChilledWaterDemand: '',
  });

  const updateThermalEnergyNeedsIII = (needs: Partial<ThermalEnergyNeedsIII>) => {
    setThermalEnergyNeedsIII((prevNeeds) => ({ ...prevNeeds, ...needs }));
  };

  return (
    <ThermalEnergyNeedsIIIContext.Provider value={{ thermalEnergyNeedsIII, updateThermalEnergyNeedsIII }}>
      {children}
    </ThermalEnergyNeedsIIIContext.Provider>
  );
};
