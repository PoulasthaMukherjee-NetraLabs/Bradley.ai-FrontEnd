import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

interface ElectricBillUploadState {
  files: File[];
  fileMetadata: FileMetadata[];
  dateRange: {
    start: string;
    end: string;
  };
}

interface ElectricBillUploadContextType {
  electricBillUploadState: ElectricBillUploadState;
  addFiles: (newFiles: File[]) => void;
  removeFile: (fileName: string) => void;
  updateDateRange: (range: Partial<ElectricBillUploadState['dateRange']>) => void;
}

const ElectricBillUploadContext = createContext<ElectricBillUploadContextType | undefined>(undefined);

export const useElectricBillUploadProvider = () => {
  const context = useContext(ElectricBillUploadContext);
  if (!context) {
    throw new Error('useElectricBillUpload must be used within an ElectricBillUploadProvider');
  }
  return context;
};

const defaultState: ElectricBillUploadState = {
  files: [],
  fileMetadata: [],
  dateRange: { start: '', end: '' },
};

export const ElectricBillUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [electricBillUploadState, setElectricBillUploadState] = useState<ElectricBillUploadState>(() => {
    const savedState = Cookies.get('electricBillUploadState');
    if (savedState) {
      const { fileMetadata, dateRange } = JSON.parse(savedState);
      return { files: [], fileMetadata, dateRange };
    }
    return defaultState;
  });

  useEffect(() => {
    const stateToSave = {
      fileMetadata: electricBillUploadState.fileMetadata,
      dateRange: electricBillUploadState.dateRange,
    };
    Cookies.set('electricBillUploadState', JSON.stringify(stateToSave));
  }, [electricBillUploadState.fileMetadata, electricBillUploadState.dateRange]);

  const addFiles = (newFiles: File[]) => {
    setElectricBillUploadState(prevState => {
      const newMetadata = newFiles.map(file => ({ name: file.name, size: file.size, type: file.type }));
      const uniqueNewFiles = newFiles.filter(nf => !prevState.files.some(ef => ef.name === nf.name));
      const uniqueNewMetadata = newMetadata.filter(nm => !prevState.fileMetadata.some(em => em.name === nm.name));
      
      return {
        ...prevState,
        files: [...prevState.files, ...uniqueNewFiles],
        fileMetadata: [...prevState.fileMetadata, ...uniqueNewMetadata],
      };
    });
  };

  const removeFile = (fileName: string) => {
    setElectricBillUploadState(prevState => ({
      ...prevState,
      files: prevState.files.filter(file => file.name !== fileName),
      fileMetadata: prevState.fileMetadata.filter(meta => meta.name !== fileName),
    }));
  };
  
  const updateDateRange = (range: Partial<ElectricBillUploadState['dateRange']>) => {
    setElectricBillUploadState(prevState => ({
      ...prevState,
      dateRange: { ...prevState.dateRange, ...range },
    }));
  };

  return (
    <ElectricBillUploadContext.Provider value={{ electricBillUploadState, addFiles, removeFile, updateDateRange }}>
      {children}
    </ElectricBillUploadContext.Provider>
  );
};