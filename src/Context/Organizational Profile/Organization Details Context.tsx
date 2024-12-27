import { createContext, useContext, useState } from 'react';

interface OrganizationDetails {
  organizationName: string;
  organizationType: string;
  industry: string;
  irsCategory: string;
  employeeCount: number;
}

interface OrganizationDetailsContextType {
  organizationDetails: OrganizationDetails;
  updateOrganizationDetails: (details: Partial<OrganizationDetails>) => void;
}

const OrganizationDetailsContext = createContext<OrganizationDetailsContextType | undefined>(undefined);

export const useOrganizationDetails = () => {
  const context = useContext(OrganizationDetailsContext);
  if (!context) {
    throw new Error('useOrganizationDetails must be used within an OrganizationDetailsProvider');
  }
  return context;
};

interface OrganizationDetailsProviderProps {
  children: React.ReactNode;
}

export const OrganizationDetailsProvider: React.FC<OrganizationDetailsProviderProps> = ({ children }) => {
  const [organizationDetails, setOrganizationDetails] = useState<OrganizationDetails>({
    organizationName: '',
    organizationType: '',
    industry: '',
    irsCategory: '',
    employeeCount: 0,
  });

  const updateOrganizationDetails = (details: Partial<OrganizationDetails>) => {
    setOrganizationDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  return (
    <OrganizationDetailsContext.Provider value={{ organizationDetails, updateOrganizationDetails }}>
      {children}
    </OrganizationDetailsContext.Provider>
  );
};
