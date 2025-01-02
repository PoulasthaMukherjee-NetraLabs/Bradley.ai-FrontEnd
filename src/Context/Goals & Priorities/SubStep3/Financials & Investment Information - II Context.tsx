import React, { createContext, useContext, useState } from 'react';

interface InvestmentAmount {
  year: number;
  amount: string;
}

interface FinancialsInvestmentInfo {
  investmentAmounts: InvestmentAmount[];
  desiredCostReduction: string;
  termOfAgreement: string;
  financingPreference: string;
}

interface FinancialsInvestmentInfoContextType {
  financialsInvestmentInfo: FinancialsInvestmentInfo;
  updateFinancialsInvestmentInfo: (info: Partial<FinancialsInvestmentInfo>) => void;
  addInvestmentAmount: () => void;
  removeInvestmentAmount: (index: number) => void;
  updateInvestmentAmount: (index: number, amount: string) => void;
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
    investmentAmounts: [{ year: 1, amount: '' }, { year: 2, amount: '' }, { year: 3, amount: '' }],
    desiredCostReduction: '',
    termOfAgreement: '',
    financingPreference: 'Cash Purchase',
  });

  const updateFinancialsInvestmentInfo = (info: Partial<FinancialsInvestmentInfo>) => {
    setFinancialsInvestmentInfo((prevInfo) => ({ ...prevInfo, ...info }));
  };

  const addInvestmentAmount = () => {
    setFinancialsInvestmentInfo((prevInfo) => ({
      ...prevInfo,
      investmentAmounts: [...prevInfo.investmentAmounts, { year: prevInfo.investmentAmounts.length + 1, amount: '' }],
    }));
  };

  const removeInvestmentAmount = (index: number) => {
    setFinancialsInvestmentInfo((prevInfo) => ({
      ...prevInfo,
      investmentAmounts: prevInfo.investmentAmounts.filter((_, i) => i !== index),
    }));
  };

  const updateInvestmentAmount = (index: number, amount: string) => {
    setFinancialsInvestmentInfo((prevInfo) => ({
      ...prevInfo,
      investmentAmounts: prevInfo.investmentAmounts.map((item, i) => 
        i === index ? { ...item, amount } : item
      ),
    }));
  };

  return (
    <FinancialsInvestmentInfoContext.Provider 
      value={{ 
        financialsInvestmentInfo, 
        updateFinancialsInvestmentInfo, 
        addInvestmentAmount, 
        removeInvestmentAmount, 
        updateInvestmentAmount 
      }}
    >
      {children}
    </FinancialsInvestmentInfoContext.Provider>
  );
};
