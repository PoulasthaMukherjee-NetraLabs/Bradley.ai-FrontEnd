import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface LOATextFields {
  day: string;
  month: string;
  customerName: string;
  address: string;
  contactName: string;
}

interface LOAContactDetails {
  name: string;
  serviceAddress: string;
  fullAddress: string;
  cityState: string;
  phoneNo: string;
  zip: string;
  email: string;
  serviceAccountNo: string;
}

interface LOAState {
  utilityCompanyName: string;
  textFields: LOATextFields;
  contactDetails: LOAContactDetails;
  signature: string;
  agreed: boolean;
}

interface LOAContextType {
  loaState: LOAState;
  updateField: (field: keyof LOAState, value: string | boolean) => void;
  updateNestedField: <K extends 'textFields' | 'contactDetails'>(
    section: K,
    field: keyof LOAState[K],
    value: string
  ) => void;
}

const LOAContext = createContext<LOAContextType | undefined>(undefined);

export const useLOA = () => {
  const context = useContext(LOAContext);
  if (!context) {
    throw new Error('useLOA must be used within an LOAProvider');
  }
  return context;
};

const defaultState: LOAState = {
  utilityCompanyName: '',
  textFields: { day: '', month: '', customerName: '', address: '', contactName: '' },
  contactDetails: { name: '', serviceAddress: '', fullAddress: '', cityState: '', phoneNo: '', zip: '', email: '', serviceAccountNo: '' },
  signature: '',
  agreed: false,
};

export const LOAProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loaState, setLoaState] = useState<LOAState>(() => {
    const savedState = Cookies.get('loaState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('loaState', JSON.stringify(loaState));
  }, [loaState]);

  const updateField = (field: keyof LOAState, value: string | boolean) => {
    setLoaState(prevState => ({ ...prevState, [field]: value }));
  };
  
  const updateNestedField = <K extends 'textFields' | 'contactDetails'>(
    section: K,
    field: keyof LOAState[K],
    value: string
  ) => {
    setLoaState(prevState => ({
      ...prevState,
      [section]: { ...prevState[section] as object, [field]: value },
    }));
  };

  return (
    <LOAContext.Provider value={{ loaState, updateField, updateNestedField }}>
      {children}
    </LOAContext.Provider>
  );
};