import React, { createContext, useContext, useState } from 'react';

interface FacilityOperationDescription {
  description: string;
}

interface FacilityOperationDescriptionContextType {
  facilityOperationDescription: FacilityOperationDescription;
  updateFacilityOperationDescription: (description: string) => void;
}

const FacilityOperationDescriptionContext = createContext<FacilityOperationDescriptionContextType | undefined>(undefined);

export const useFacilityOperationDescription = () => {
  const context = useContext(FacilityOperationDescriptionContext);
  if (!context) {
    throw new Error('useFacilityOperationDescription must be used within a FacilityOperationDescriptionProvider');
  }
  return context;
};

interface Props {
  children: React.ReactNode;
}

export const FacilityOperationDescriptionProvider: React.FC<Props> = ({ children }) => {
  const [facilityOperationDescription, setFacilityOperationDescription] = useState<FacilityOperationDescription>({
    description: '',
  });

  const updateFacilityOperationDescription = (description: string) => {
    setFacilityOperationDescription({ description });
  };

  return (
    <FacilityOperationDescriptionContext.Provider value={{ facilityOperationDescription, updateFacilityOperationDescription }}>
      {children}
    </FacilityOperationDescriptionContext.Provider>
  );
};
