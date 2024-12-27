import { createContext, useContext, useState } from 'react';

interface AnnualEnergySpend {
  electricity: string;
  naturalGas: string;
  water: string;
  other: string;
}

interface AnnualEnergySpendContextType {
  annualEnergySpend: AnnualEnergySpend;
  updateAnnualEnergySpend: (spend: Partial<AnnualEnergySpend>) => void;
}

const AnnualEnergySpendContext = createContext<AnnualEnergySpendContextType | undefined>(undefined);

export const useAnnualEnergySpend = () => {
  const context = useContext(AnnualEnergySpendContext);
  if (!context) {
    throw new Error('useAnnualEnergySpend must be used within an AnnualEnergySpendProvider');
  }
  return context;
};

import { ReactNode } from 'react';

interface AnnualEnergySpendProviderProps {
  children: ReactNode;
}

export const AnnualEnergySpendProvider: React.FC<AnnualEnergySpendProviderProps> = ({ children }) => {
  const [annualEnergySpend, setAnnualEnergySpend] = useState<AnnualEnergySpend>({
    electricity: '',
    naturalGas: '',
    water: '',
    other: '',
  });

  const updateAnnualEnergySpend = (spend: Partial<AnnualEnergySpend>) => {
    setAnnualEnergySpend((prevSpend) => ({ ...prevSpend, ...spend }));
  };

  return (
    <AnnualEnergySpendContext.Provider value={{ annualEnergySpend, updateAnnualEnergySpend }}>
      {children}
    </AnnualEnergySpendContext.Provider>
  );
};
