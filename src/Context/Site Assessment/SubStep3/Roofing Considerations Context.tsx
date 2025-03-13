import React, { createContext, useContext, useState } from 'react';

interface RoofingConsiderations {
  allowRoofPenetration: string;
  roofWarrantyTerm: string;
  roofCondition: string;
  insuranceProvider: string;
  policyId: string;
}

interface RoofingConsiderationsContextType {
  roofingConsiderations: RoofingConsiderations;
  updateRoofingConsiderations: (considerations: Partial<RoofingConsiderations>) => void;
}

const RoofingConsiderationsContext = createContext<RoofingConsiderationsContextType | undefined>(undefined);

export const useRoofingConsiderations = () => {
  const context = useContext(RoofingConsiderationsContext);
  if (!context) {
    throw new Error('useRoofingConsiderations must be used within a RoofingConsiderationsProvider');
  }
  return context;
};

export const RoofingConsiderationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roofingConsiderations, setRoofingConsiderations] = useState<RoofingConsiderations>({
    allowRoofPenetration: '',
    roofWarrantyTerm: '',
    roofCondition: '',
    insuranceProvider: '',
    policyId: '',
  });

  const updateRoofingConsiderations = (considerations: Partial<RoofingConsiderations>) => {
    setRoofingConsiderations((prevConsiderations) => ({ ...prevConsiderations, ...considerations }));
  };

  return (
    <RoofingConsiderationsContext.Provider value={{ roofingConsiderations, updateRoofingConsiderations }}>
      {children}
    </RoofingConsiderationsContext.Provider>
  );
};
