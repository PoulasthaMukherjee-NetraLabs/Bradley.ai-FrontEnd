import React, { createContext, useContext, useState } from 'react';

interface SiteCharacteristicsII {
  humidificationIssues: string;
  hotColdSpots: string;
  outdoorAirSupplyIssues: string;
  numberOfShiftsPerDay: string;
  hvacSystemOperation: string;
}

interface SiteCharacteristicsIIContextType {
  siteCharacteristicsII: SiteCharacteristicsII;
  updateSiteCharacteristicsII: (characteristics: Partial<SiteCharacteristicsII>) => void;
}

const SiteCharacteristicsIIContext = createContext<SiteCharacteristicsIIContextType | undefined>(undefined);

export const useSiteCharacteristicsII = () => {
  const context = useContext(SiteCharacteristicsIIContext);
  if (!context) {
    throw new Error('useSiteCharacteristicsII must be used within a SiteCharacteristicsIIProvider');
  }
  return context;
};

interface SiteCharacteristicsIIProviderProps {
  children: React.ReactNode;
}

export const SiteCharacteristicsIIProvider: React.FC<SiteCharacteristicsIIProviderProps> = ({ children }) => {
  const [siteCharacteristicsII, setSiteCharacteristicsII] = useState<SiteCharacteristicsII>({
    humidificationIssues: '',
    hotColdSpots: '',
    outdoorAirSupplyIssues: '',
    numberOfShiftsPerDay: '',
    hvacSystemOperation: '',
  });

  const updateSiteCharacteristicsII = (characteristics: Partial<SiteCharacteristicsII>) => {
    setSiteCharacteristicsII((prevCharacteristics) => ({ ...prevCharacteristics, ...characteristics }));
  };

  return (
    <SiteCharacteristicsIIContext.Provider value={{ siteCharacteristicsII, updateSiteCharacteristicsII }}>
      {children}
    </SiteCharacteristicsIIContext.Provider>
  );
};
