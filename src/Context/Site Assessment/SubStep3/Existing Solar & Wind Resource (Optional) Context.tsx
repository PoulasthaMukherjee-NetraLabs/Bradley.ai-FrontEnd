import React, { createContext, useContext, useState } from 'react';

interface SolarWindResource {
  existingSolarInstallation: string;
  existingWindInstallation: string;
  considerWindRecommendation: string;
}

interface SolarWindResourceContextType {
  solarWindResource: SolarWindResource;
  updateSolarWindResource: (resource: Partial<SolarWindResource>) => void;
}

const SolarWindResourceContext = createContext<SolarWindResourceContextType | undefined>(undefined);

export const useSolarWindResource = () => {
  const context = useContext(SolarWindResourceContext);
  if (!context) {
    throw new Error('useSolarWindResource must be used within a SolarWindResourceProvider');
  }
  return context;
};

interface SolarWindResourceProviderProps {
  children: React.ReactNode;
}

export const SolarWindResourceProvider: React.FC<SolarWindResourceProviderProps> = ({ children }) => {
  const [solarWindResource, setSolarWindResource] = useState<SolarWindResource>({
    existingSolarInstallation: '',
    existingWindInstallation: '',
    considerWindRecommendation: '',
  });

  const updateSolarWindResource = (resource: Partial<SolarWindResource>) => {
    setSolarWindResource((prevResource) => ({ ...prevResource, ...resource }));
  };

  return (
    <SolarWindResourceContext.Provider value={{ solarWindResource, updateSolarWindResource }}>
      {children}
    </SolarWindResourceContext.Provider>
  );
};
