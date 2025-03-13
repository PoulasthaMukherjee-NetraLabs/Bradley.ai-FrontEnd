import React, { createContext, useContext, useState } from 'react';

interface CarportSolar {
  allowRoofPenetration: string;
  totalParkingSpots: string;
  parkingGarageType: string;
}

interface CarportSolarContextType {
  carportSolar: CarportSolar;
  updateCarportSolar: (data: Partial<CarportSolar>) => void;
}

const CarportSolarContext = createContext<CarportSolarContextType | undefined>(undefined);

export const useCarportSolar = () => {
  const context = useContext(CarportSolarContext);
  if (!context) {
    throw new Error('useCarportSolar must be used within a CarportSolarProvider');
  }
  return context;
};

export const CarportSolarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carportSolar, setCarportSolar] = useState<CarportSolar>({
    allowRoofPenetration: '',
    totalParkingSpots: '',
    parkingGarageType: '',
  });

  const updateCarportSolar = (data: Partial<CarportSolar>) => {
    setCarportSolar((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <CarportSolarContext.Provider value={{ carportSolar, updateCarportSolar }}>
      {children}
    </CarportSolarContext.Provider>
  );
};
