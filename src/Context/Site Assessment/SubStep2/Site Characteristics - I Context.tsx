import React, { createContext, useContext, useState } from 'react';

interface SiteCharacteristics {
  facilitySize: string;
  commonAreaSize: string;
  buildingYear: string;
  primaryElectricEntryPoint: string;
  secondaryElectricEntryPoint: string;
  isBreakerSpaceAvailable: boolean;
  numberOfOpenBreakers: string;
  breakerTypeAndAmperage: string;
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

export const SiteCharacteristicsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [siteCharacteristics, setSiteCharacteristics] = useState<SiteCharacteristics>({
    facilitySize: '',
    commonAreaSize: '',
    buildingYear: '',
    primaryElectricEntryPoint: '',
    secondaryElectricEntryPoint: '',
    isBreakerSpaceAvailable: false,
    numberOfOpenBreakers: '',
    breakerTypeAndAmperage: '',
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
