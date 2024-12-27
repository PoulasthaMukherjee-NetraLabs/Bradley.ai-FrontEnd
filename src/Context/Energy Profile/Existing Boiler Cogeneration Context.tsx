import React, { createContext, useContext, useState } from 'react';

interface BoilerCogeneration {
  type: string;
  capacity: string;
  fuelSource: string;
  efficiency: string;
  age: string;
  operatingPressure: string;
  history: string;
  utilization: string;
  volume: string;
}

interface BoilerCogenerationContextType {
  boilerCogeneration: BoilerCogeneration[];
  updateBoilerCogeneration: (boilers: BoilerCogeneration[]) => void;
  addBoilerCogeneration: () => void;
  removeBoilerCogeneration: (index: number) => void;
}

const BoilerCogenerationContext = createContext<BoilerCogenerationContextType | undefined>(undefined);

export const useBoilerCogeneration = () => {
  const context = useContext(BoilerCogenerationContext);
  if (!context) {
    throw new Error('useBoilerCogeneration must be used within a BoilerCogenerationProvider');
  }
  return context;
};

export const BoilerCogenerationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boilerCogeneration, setBoilerCogeneration] = useState<BoilerCogeneration[]>([
    { type: '', capacity: '', fuelSource: '', efficiency: '', age: '', operatingPressure: '', history: '', utilization: '', volume: '' }
  ]);

  const updateBoilerCogeneration = (boilers: BoilerCogeneration[]) => {
    setBoilerCogeneration(boilers);
  };

  const addBoilerCogeneration = () => {
    setBoilerCogeneration([...boilerCogeneration, { type: '', capacity: '', fuelSource: '', efficiency: '', age: '', operatingPressure: '', history: '', utilization: '', volume: '' }]);
  };

  const removeBoilerCogeneration = (index: number) => {
    setBoilerCogeneration(boilerCogeneration.filter((_, i) => i !== index));
  };

  return (
    <BoilerCogenerationContext.Provider value={{ boilerCogeneration, updateBoilerCogeneration, addBoilerCogeneration, removeBoilerCogeneration }}>
      {children}
    </BoilerCogenerationContext.Provider>
  );
};
