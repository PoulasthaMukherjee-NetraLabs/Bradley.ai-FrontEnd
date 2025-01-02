import React, { createContext, useContext, useState } from 'react';

interface FinancialsInvestmentInfo {
  desiredIRR: string;
  desiredROI: string;
  minimumPaybackPeriod: string;
}

interface FinancialsInvestmentInfoContextType {
  financialsInvestmentInfo: FinancialsInvestmentInfo;
  updateFinancialsInvestmentInfo: (info: Partial<FinancialsInvestmentInfo>) => void;
}

const FinancialsInvestmentInfoContext = createContext<FinancialsInvestmentInfoContextType | undefined>(undefined);

export const useFinancialsInvestmentInfo = () => {
  const context = useContext(FinancialsInvestmentInfoContext);
  if (!context) {
    throw new Error('useFinancialsInvestmentInfo must be used within a FinancialsInvestmentInfoProvider');
  }
  return context;
};

export const FinancialsInvestmentInfoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [financialsInvestmentInfo, setFinancialsInvestmentInfo] = useState<FinancialsInvestmentInfo>({
    desiredIRR: '',
    desiredROI: '',
    minimumPaybackPeriod: '',
  });

  const updateFinancialsInvestmentInfo = (info: Partial<FinancialsInvestmentInfo>) => {
    setFinancialsInvestmentInfo((prevInfo) => ({ ...prevInfo, ...info }));
  };

  return (
    <FinancialsInvestmentInfoContext.Provider value={{ financialsInvestmentInfo, updateFinancialsInvestmentInfo }}>
      {children}
    </FinancialsInvestmentInfoContext.Provider>
  );
};
