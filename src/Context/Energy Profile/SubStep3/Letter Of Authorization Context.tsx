import React, { createContext, useContext, useState } from 'react';

interface AuthorizationLetter {
  day: string;
  month: string;
  customerName: string;
  address: string;
  contactName: string;
  name: string;
  serviceAddress: string;
  fullAddress: string;
  cityState: string;
  phoneNumber: string;
  zip: string;
  emailAddress: string;
  serviceAccountNumber: string;
  signature: string;
  agreedToTerms: boolean;
}

interface AuthorizationLetterContextType {
  authorizationLetter: AuthorizationLetter;
  updateAuthorizationLetter: (letter: Partial<AuthorizationLetter>) => void;
}

const AuthorizationLetterContext = createContext<AuthorizationLetterContextType | undefined>(undefined);

export const useAuthorizationLetter = () => {
  const context = useContext(AuthorizationLetterContext);
  if (!context) {
    throw new Error('useAuthorizationLetter must be used within an AuthorizationLetterProvider');
  }
  return context;
};

export const AuthorizationLetterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authorizationLetter, setAuthorizationLetter] = useState<AuthorizationLetter>({
    day: '',
    month: '',
    customerName: '',
    address: '',
    contactName: '',
    name: '',
    serviceAddress: '',
    fullAddress: '',
    cityState: '',
    phoneNumber: '',
    zip: '',
    emailAddress: '',
    serviceAccountNumber: '',
    signature: '',
    agreedToTerms: false,
  });

  const updateAuthorizationLetter = (letter: Partial<AuthorizationLetter>) => {
    setAuthorizationLetter((prevLetter) => ({ ...prevLetter, ...letter }));
  };

  return (
    <AuthorizationLetterContext.Provider value={{ authorizationLetter, updateAuthorizationLetter }}>
      {children}
    </AuthorizationLetterContext.Provider>
  );
};
