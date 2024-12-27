import React, { createContext, useContext, useState } from 'react';

interface OtherDetails {
  ownsProperty: string;
  leasesSpace: string;
  longTermOccupancy: string;
}

interface OtherDetailsContextType {
  otherDetails: OtherDetails;
  updateOtherDetails: (details: Partial<OtherDetails>) => void;
}

const OtherDetailsContext = createContext<OtherDetailsContextType | undefined>(undefined);

export const useOtherDetails = () => {
  const context = useContext(OtherDetailsContext);
  if (!context) {
    throw new Error('useOtherDetails must be used within an OtherDetailsProvider');
  }
  return context;
};

interface OtherDetailsProviderProps {
  children: React.ReactNode;
}

export const OtherDetailsProvider: React.FC<OtherDetailsProviderProps> = ({ children }) => {
  const [otherDetails, setOtherDetails] = useState<OtherDetails>({
    ownsProperty: '',
    leasesSpace: '',
    longTermOccupancy: '',
  });

  const updateOtherDetails = (details: Partial<OtherDetails>) => {
    setOtherDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  return (
    <OtherDetailsContext.Provider value={{ otherDetails, updateOtherDetails }}>
      {children}
    </OtherDetailsContext.Provider>
  );
};
