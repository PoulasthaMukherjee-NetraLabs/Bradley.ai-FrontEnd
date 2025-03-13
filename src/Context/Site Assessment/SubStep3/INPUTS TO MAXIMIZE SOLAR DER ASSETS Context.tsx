import React, { createContext, useContext, useState } from 'react';

interface RoofSection {
  area: string;
}

interface SolarDERInputs {
  roofSections: RoofSection[];
  roofLoadRatingCapacity: string;
  buildingClassification: string;
}

interface SolarDERInputsContextType {
  solarDERInputs: SolarDERInputs;
  updateSolarDERInputs: (inputs: Partial<SolarDERInputs>) => void;
  addRoofSection: () => void;
  removeRoofSection: (index: number) => void;
  updateRoofSectionArea: (index: number, area: string) => void;
}

const SolarDERInputsContext = createContext<SolarDERInputsContextType | undefined>(undefined);

export const useSolarDERInputs = () => {
  const context = useContext(SolarDERInputsContext);
  if (!context) {
    throw new Error('useSolarDERInputs must be used within a SolarDERInputsProvider');
  }
  return context;
};

interface SolarDERInputsProviderProps {
  children: React.ReactNode;
}

export const SolarDERInputsProvider: React.FC<SolarDERInputsProviderProps> = ({ children }) => {
  const [solarDERInputs, setSolarDERInputs] = useState<SolarDERInputs>({
    roofSections: [{ area: '' }, { area: '' }, { area: '' }],
    roofLoadRatingCapacity: '',
    buildingClassification: '',
  });

  const updateSolarDERInputs = (inputs: Partial<SolarDERInputs>) => {
    setSolarDERInputs((prevInputs) => ({ ...prevInputs, ...inputs }));
  };

  const addRoofSection = () => {
    setSolarDERInputs((prevInputs) => ({
      ...prevInputs,
      roofSections: [...prevInputs.roofSections, { area: '' }],
    }));
  };

  const removeRoofSection = (index: number) => {
    setSolarDERInputs((prevInputs) => ({
      ...prevInputs,
      roofSections: prevInputs.roofSections.filter((_, i) => i !== index),
    }));
  };

  const updateRoofSectionArea = (index: number, area: string) => {
    setSolarDERInputs((prevInputs) => ({
      ...prevInputs,
      roofSections: prevInputs.roofSections.map((section, i) =>
        i === index ? { ...section, area } : section
      ),
    }));
  };

  return (
    <SolarDERInputsContext.Provider
      value={{
        solarDERInputs,
        updateSolarDERInputs,
        addRoofSection,
        removeRoofSection,
        updateRoofSectionArea,
      }}
    >
      {children}
    </SolarDERInputsContext.Provider>
  );
};
