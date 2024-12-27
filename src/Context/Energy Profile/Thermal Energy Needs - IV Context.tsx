import React, { createContext, useContext, useState } from 'react';

interface WasteHeatSource {
  type: string;
  temperature: string;
  flowRate: string;
  utilization: string;
}

interface ThermalEnergyNeedsIV {
  generateWasteHeat: boolean;
  wasteHeatSources: WasteHeatSource[];
}

interface ThermalEnergyNeedsIVContextType {
  thermalEnergyNeedsIV: ThermalEnergyNeedsIV;
  updateThermalEnergyNeedsIV: (needs: Partial<ThermalEnergyNeedsIV>) => void;
  addWasteHeatSource: () => void;
  updateWasteHeatSource: (index: number, source: Partial<WasteHeatSource>) => void;
  removeWasteHeatSource: (index: number) => void;
}

const ThermalEnergyNeedsIVContext = createContext<ThermalEnergyNeedsIVContextType | undefined>(undefined);

export const useThermalEnergyNeedsIV = () => {
  const context = useContext(ThermalEnergyNeedsIVContext);
  if (!context) {
    throw new Error('useThermalEnergyNeedsIV must be used within a ThermalEnergyNeedsIVProvider');
  }
  return context;
};

export const ThermalEnergyNeedsIVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [thermalEnergyNeedsIV, setThermalEnergyNeedsIV] = useState<ThermalEnergyNeedsIV>({
    generateWasteHeat: false,
    wasteHeatSources: [{ type: '', temperature: '', flowRate: '', utilization: '' }],
  });

  const updateThermalEnergyNeedsIV = (needs: Partial<ThermalEnergyNeedsIV>) => {
    setThermalEnergyNeedsIV((prevNeeds) => ({ ...prevNeeds, ...needs }));
  };

  const addWasteHeatSource = () => {
    setThermalEnergyNeedsIV((prevNeeds) => ({
      ...prevNeeds,
      wasteHeatSources: [...prevNeeds.wasteHeatSources, { type: '', temperature: '', flowRate: '', utilization: '' }],
    }));
  };

  const updateWasteHeatSource = (index: number, source: Partial<WasteHeatSource>) => {
    setThermalEnergyNeedsIV((prevNeeds) => ({
      ...prevNeeds,
      wasteHeatSources: prevNeeds.wasteHeatSources.map((s, i) => (i === index ? { ...s, ...source } : s)),
    }));
  };

  const removeWasteHeatSource = (index: number) => {
    setThermalEnergyNeedsIV((prevNeeds) => ({
      ...prevNeeds,
      wasteHeatSources: prevNeeds.wasteHeatSources.filter((_, i) => i !== index),
    }));
  };

  return (
    <ThermalEnergyNeedsIVContext.Provider
      value={{
        thermalEnergyNeedsIV,
        updateThermalEnergyNeedsIV,
        addWasteHeatSource,
        updateWasteHeatSource,
        removeWasteHeatSource,
      }}
    >
      {children}
    </ThermalEnergyNeedsIVContext.Provider>
  );
};
