import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import L from 'leaflet';

/**
 * Interface defining the address fields.
 */
interface Address {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  otherAddress: string;
}

/**
 * Interface for the entire state managed by this context.
 */
interface FacilityAddressState {
  position: L.LatLng | null;
  address: Address;
}

interface FacilityAddressContextType {
  facilityAddress: FacilityAddressState;
  updateFacilityAddress: (newState: Partial<FacilityAddressState>) => void;
  updateAddressField: (field: keyof Address, value: string) => void;
}

const FacilityAddressContext = createContext<FacilityAddressContextType | undefined>(undefined);

export const useFacilityAddress = () => {
  const context = useContext(FacilityAddressContext);
  if (!context) {
    throw new Error('useFacilityAddress must be used within a FacilityAddressProvider');
  }
  return context;
};

interface FacilityAddressProviderProps {
  children: ReactNode;
}

const defaultState: FacilityAddressState = {
  position: null,
  address: {
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    otherAddress: '',
  },
};

export const FacilityAddressProvider: React.FC<FacilityAddressProviderProps> = ({ children }) => {
  const [facilityAddress, setFacilityAddress] = useState<FacilityAddressState>(() => {
    const savedState = Cookies.get('facilityAddressState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      // IMPORTANT: Re-hydrate the LatLng object from the plain object stored in the cookie.
      if (parsedState.position) {
        parsedState.position = new L.LatLng(parsedState.position.lat, parsedState.position.lng);
      }
      return parsedState;
    }
    return defaultState;
  });

  useEffect(() => {
    // IMPORTANT: De-hydrate the LatLng object to a plain object for JSON serialization.
    const stateToSave = {
      ...facilityAddress,
      position: facilityAddress.position
        ? { lat: facilityAddress.position.lat, lng: facilityAddress.position.lng }
        : null,
    };
    Cookies.set('facilityAddressState', JSON.stringify(stateToSave));
  }, [facilityAddress]);

  const updateFacilityAddress = (newState: Partial<FacilityAddressState>) => {
    setFacilityAddress((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  // Helper function to update a single field in the address object.
  const updateAddressField = (field: keyof Address, value: string) => {
    setFacilityAddress((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [field]: value,
      },
    }));
  };

  return (
    <FacilityAddressContext.Provider value={{ facilityAddress, updateFacilityAddress, updateAddressField }}>
      {children}
    </FacilityAddressContext.Provider>
  );
};