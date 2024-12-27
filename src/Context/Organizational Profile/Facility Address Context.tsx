import React, { createContext, useContext, useState } from 'react';
import L from 'leaflet';

interface FacilityAddress {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  position: L.LatLng | null;
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

export const FacilityAddressProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [facilityAddress, setFacilityAddress] = useState<FacilityAddress>({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    position: null,
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
