import React, { createContext, useContext, useState } from 'react';

interface EnergyLoadProfile {
  startDate: string;
  endDate: string;
  uploadedFiles: File[];
}

interface EnergyLoadProfileContextType {
  energyLoadProfile: EnergyLoadProfile;
  updateEnergyLoadProfile: (profile: Partial<EnergyLoadProfile>) => void;
  addUploadedFile: (file: File) => void;
  removeUploadedFile: (fileName: string) => void;
}

const EnergyLoadProfileContext = createContext<EnergyLoadProfileContextType | undefined>(undefined);

export const useEnergyLoadProfile = () => {
  const context = useContext(EnergyLoadProfileContext);
  if (!context) {
    throw new Error('useEnergyLoadProfile must be used within an EnergyLoadProfileProvider');
  }
  return context;
};

export const EnergyLoadProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [energyLoadProfile, setEnergyLoadProfile] = useState<EnergyLoadProfile>({
    startDate: '',
    endDate: '',
    uploadedFiles: [],
  });

  const updateEnergyLoadProfile = (profile: Partial<EnergyLoadProfile>) => {
    setEnergyLoadProfile((prevProfile) => ({ ...prevProfile, ...profile }));
  };

  const addUploadedFile = (file: File) => {
    setEnergyLoadProfile((prevProfile) => ({
      ...prevProfile,
      uploadedFiles: [...prevProfile.uploadedFiles, file],
    }));
  };

  const removeUploadedFile = (fileName: string) => {
    setEnergyLoadProfile((prevProfile) => ({
      ...prevProfile,
      uploadedFiles: prevProfile.uploadedFiles.filter((file) => file.name !== fileName),
    }));
  };

  return (
    <EnergyLoadProfileContext.Provider value={{ energyLoadProfile, updateEnergyLoadProfile, addUploadedFile, removeUploadedFile }}>
      {children}
    </EnergyLoadProfileContext.Provider>
  );
};
