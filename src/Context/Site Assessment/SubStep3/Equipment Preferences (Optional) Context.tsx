import React, { createContext, useContext, useState } from 'react';

interface EquipmentPreferences {
  primeMoverType: string;
  controlsBrand: string;
  switchgearBrand: string;
}

interface EquipmentPreferencesContextType {
  equipmentPreferences: EquipmentPreferences;
  updateEquipmentPreferences: (preferences: Partial<EquipmentPreferences>) => void;
}

const EquipmentPreferencesContext = createContext<EquipmentPreferencesContextType | undefined>(undefined);

export const useEquipmentPreferences = () => {
  const context = useContext(EquipmentPreferencesContext);
  if (!context) {
    throw new Error('useEquipmentPreferences must be used within an EquipmentPreferencesProvider');
  }
  return context;
};

interface EquipmentPreferencesProviderProps {
  children: React.ReactNode;
}

export const EquipmentPreferencesProvider: React.FC<EquipmentPreferencesProviderProps> = ({ children }) => {
  const [equipmentPreferences, setEquipmentPreferences] = useState<EquipmentPreferences>({
    primeMoverType: '',
    controlsBrand: '',
    switchgearBrand: '',
  });

  const updateEquipmentPreferences = (preferences: Partial<EquipmentPreferences>) => {
    setEquipmentPreferences((prevPreferences) => ({ ...prevPreferences, ...preferences }));
  };

  return (
    <EquipmentPreferencesContext.Provider value={{ equipmentPreferences, updateEquipmentPreferences }}>
      {children}
    </EquipmentPreferencesContext.Provider>
  );
};
