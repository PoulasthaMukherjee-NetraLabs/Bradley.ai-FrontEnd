import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import L from 'leaflet';

interface Address {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  otherAddress: string;
}

interface SiteLocationState {
  position: L.LatLng | null;
  address: Address;
}

interface SiteLocationContextType {
  siteLocationState: SiteLocationState;
  updateSiteLocation: (newState: Partial<SiteLocationState>) => void;
  updateAddressField: (field: keyof Address, value: string) => void;
}

const SiteLocationContext = createContext<SiteLocationContextType | undefined>(undefined);

export const useSiteLocation = () => {
  const context = useContext(SiteLocationContext);
  if (!context) {
    throw new Error('useSiteLocation must be used within a SiteLocationProvider');
  }
  return context;
};

const defaultState: SiteLocationState = {
  position: null,
  address: {
    streetAddress: 'Southwark Bridge Road',
    city: 'London',
    state: 'England',
    zipCode: 'SE1 1UN',
    otherAddress: '',
  },
};

export const SiteLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteLocationState, setSiteLocationState] = useState<SiteLocationState>(() => {
    const savedState = Cookies.get('siteLocationState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState.position) {
        parsedState.position = new L.LatLng(parsedState.position.lat, parsedState.position.lng);
      }
      return parsedState;
    }
    return defaultState;
  });

  useEffect(() => {
    const stateToSave = {
      ...siteLocationState,
      position: siteLocationState.position
        ? { lat: siteLocationState.position.lat, lng: siteLocationState.position.lng }
        : null,
    };
    Cookies.set('siteLocationState', JSON.stringify(stateToSave));
  }, [siteLocationState]);

  const updateSiteLocation = (newState: Partial<SiteLocationState>) => {
    setSiteLocationState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const updateAddressField = (field: keyof Address, value: string) => {
    setSiteLocationState((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [field]: value,
      },
    }));
  };

  return (
    <SiteLocationContext.Provider value={{ siteLocationState, updateSiteLocation, updateAddressField }}>
      {children}
    </SiteLocationContext.Provider>
  );
};