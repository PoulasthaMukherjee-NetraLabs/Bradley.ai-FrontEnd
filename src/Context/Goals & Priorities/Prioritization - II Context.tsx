import React, { createContext, useContext, useState } from 'react';

interface PrioritizationII {
  scopeReduction: number;
  energyCostReduction: number;
  backupPowerDuration: string;
  renewableSystemSize: string;
  decarbonizationTarget: {
    value: string;
    unit: string;
    date: string;
  };
  energySavingsTarget: {
    value: string;
    unit: string;
    date: string;
  };
}

interface PrioritizationIIContextType {
  prioritizationII: PrioritizationII;
  updatePrioritizationII: (priorities: Partial<PrioritizationII>) => void;
}

const PrioritizationIIContext = createContext<PrioritizationIIContextType | undefined>(undefined);

export const usePrioritizationII = () => {
  const context = useContext(PrioritizationIIContext);
  if (!context) {
    throw new Error('usePrioritizationII must be used within a PrioritizationIIProvider');
  }
  return context;
};

interface PrioritizationIIProviderProps {
  children: React.ReactNode;
}

export const PrioritizationIIProvider: React.FC<PrioritizationIIProviderProps> = ({ children }) => {
  const [prioritizationII, setPrioritizationII] = useState<PrioritizationII>({
    scopeReduction: 50,
    energyCostReduction: 50,
    backupPowerDuration: '',
    renewableSystemSize: '',
    decarbonizationTarget: {
      value: '',
      unit: '%',
      date: '',
    },
    energySavingsTarget: {
      value: '',
      unit: '%',
      date: '',
    },
  });

  const updatePrioritizationII = (priorities: Partial<PrioritizationII>) => {
    setPrioritizationII((prevPriorities) => ({ ...prevPriorities, ...priorities }));
  };

  return (
    <PrioritizationIIContext.Provider value={{ prioritizationII, updatePrioritizationII }}>
      {children}
    </PrioritizationIIContext.Provider>
  );
};
