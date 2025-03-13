import React, { createContext, useContext, useState } from 'react';

interface SiteCharacteristics {
  uniqueFeatures: string;
  topography: string;
  primaryVoltage: string;
  secondaryVoltage: string;
}

interface SiteCharacteristicsContextType {
  siteCharacteristics: SiteCharacteristics;
  updateSiteCharacteristics: (characteristics: Partial<SiteCharacteristics>) => void;
}

const SiteCharacteristicsContext = createContext<SiteCharacteristicsContextType | undefined>(undefined);

export const useSiteCharacteristics = () => {
  const context = useContext(SiteCharacteristicsContext);
  if (!context) {
    throw new Error('useSiteCharacteristics must be used within a SiteCharacteristicsProvider');
  }
  return context;
};

interface SiteCharacteristicsProviderProps {
  children: React.ReactNode;
}

export const SiteCharacteristicsProvider: React.FC<SiteCharacteristicsProviderProps> = ({ children }) => {
  const [siteCharacteristics, setSiteCharacteristics] = useState<SiteCharacteristics>({
    uniqueFeatures: '',
    topography: 'Flat',
    primaryVoltage: '480 V',
    secondaryVoltage: '',
  });

  const updateSiteCharacteristics = (characteristics: Partial<SiteCharacteristics>) => {
    setSiteCharacteristics((prevCharacteristics) => ({ ...prevCharacteristics, ...characteristics }));
  };

  return (
    <SiteCharacteristicsContext.Provider value={{ siteCharacteristics, updateSiteCharacteristics }}>
      {children}
    </SiteCharacteristicsContext.Provider>
  );
};
