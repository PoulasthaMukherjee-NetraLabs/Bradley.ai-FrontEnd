import React, { createContext, useContext, useState } from 'react';

interface FacilityUsageOperations {
  facilityUsage: string[];
  facilityDetails: string;
  daysOfOperation: string[];
  hoursOfOperation: string;
}

interface FacilityUsageOperationsContextType {
  facilityUsageOperations: FacilityUsageOperations;
  updateFacilityUsageOperations: (operations: Partial<FacilityUsageOperations>) => void;
}

const FacilityUsageOperationsContext = createContext<FacilityUsageOperationsContextType | undefined>(undefined);

export const useFacilityUsageOperations = () => {
  const context = useContext(FacilityUsageOperationsContext);
  if (!context) {
    throw new Error('useFacilityUsageOperations must be used within a FacilityUsageOperationsProvider');
  }
  return context;
};

export const FacilityUsageOperationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [facilityUsageOperations, setFacilityUsageOperations] = useState<FacilityUsageOperations>({
    facilityUsage: [],
    facilityDetails: '',
    daysOfOperation: [],
    hoursOfOperation: '',
  });

  const updateFacilityUsageOperations = (operations: Partial<FacilityUsageOperations>) => {
    setFacilityUsageOperations((prevOperations) => ({ ...prevOperations, ...operations }));
  };

  return (
    <FacilityUsageOperationsContext.Provider value={{ facilityUsageOperations, updateFacilityUsageOperations }}>
      {children}
    </FacilityUsageOperationsContext.Provider>
  );
};
