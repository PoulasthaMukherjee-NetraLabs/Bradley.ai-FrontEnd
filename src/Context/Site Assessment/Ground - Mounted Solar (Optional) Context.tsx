import React, { createContext, useContext, useState } from 'react';

interface GroundMountedSolar {
  availableLandArea: string;
  landTopography: string;
}

interface GroundMountedSolarContextType {
  groundMountedSolar: GroundMountedSolar;
  updateGroundMountedSolar: (solar: Partial<GroundMountedSolar>) => void;
}

const GroundMountedSolarContext = createContext<GroundMountedSolarContextType | undefined>(undefined);

export const useGroundMountedSolar = () => {
  const context = useContext(GroundMountedSolarContext);
  if (!context) {
    throw new Error('useGroundMountedSolar must be used within a GroundMountedSolarProvider');
  }
  return context;
};

export const GroundMountedSolarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groundMountedSolar, setGroundMountedSolar] = useState<GroundMountedSolar>({
    availableLandArea: '',
    landTopography: '',
  });

  const updateGroundMountedSolar = (solar: Partial<GroundMountedSolar>) => {
    setGroundMountedSolar((prevSolar) => ({ ...prevSolar, ...solar }));
  };

  return (
    <GroundMountedSolarContext.Provider value={{ groundMountedSolar, updateGroundMountedSolar }}>
      {children}
    </GroundMountedSolarContext.Provider>
  );
};
