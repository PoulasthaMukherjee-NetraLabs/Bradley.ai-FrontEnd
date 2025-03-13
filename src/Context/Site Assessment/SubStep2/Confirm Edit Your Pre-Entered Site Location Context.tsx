import React, { createContext, useContext, useState } from 'react';
import L from 'leaflet';

interface FacilityAddress {
  position: L.LatLng | null;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FacilityAddressContextType {
  facilityAddress: FacilityAddress;
  updateFacilityAddress: (address: Partial<FacilityAddress>) => void;
  updatePosition: (position: L.LatLng | null) => void;
}

const FacilityAddressContext = createContext<FacilityAddressContextType | undefined>(undefined);

export const useFacilityAddress = () => {
  const context = useContext(FacilityAddressContext);
  if (!context) {
    throw new Error('useFacilityAddress must be used within a FacilityAddressProvider');
  }
  return context;
};

export const FacilityAddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [facilityAddress, setFacilityAddress] = useState<FacilityAddress>({
    position: null,
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const updateFacilityAddress = (address: Partial<FacilityAddress>) => {
    setFacilityAddress((prevAddress) => ({ ...prevAddress, ...address }));
  };

  const updatePosition = (position: L.LatLng | null) => {
    setFacilityAddress((prevAddress) => ({ ...prevAddress, position }));
  };

  return (
    <FacilityAddressContext.Provider value={{ facilityAddress, updateFacilityAddress, updatePosition }}>
      {children}
    </FacilityAddressContext.Provider>
  );
};
