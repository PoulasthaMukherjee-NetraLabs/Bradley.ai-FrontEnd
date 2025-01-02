import React, { createContext, useContext, useState } from 'react';

interface Priority {
  rank: number;
  value: string;
}

interface Prioritization {
  priorities: Priority[];
}

interface PrioritizationContextType {
  prioritization: Prioritization;
  updatePriority: (rank: number, value: string) => void;
}

const PrioritizationContext = createContext<PrioritizationContextType | undefined>(undefined);

export const usePrioritization = () => {
  const context = useContext(PrioritizationContext);
  if (!context) {
    throw new Error('usePrioritization must be used within a PrioritizationProvider');
  }
  return context;
};

export const PrioritizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prioritization, setPrioritization] = useState<Prioritization>({
    priorities: [
      { rank: 1, value: 'Decarbonization' },
      { rank: 2, value: 'Cost Reduction' },
      { rank: 3, value: 'Increased Resiliency' },
      { rank: 4, value: 'Maximize Renewable Generation' },
    ],
  });

  const updatePriority = (rank: number, value: string) => {
    setPrioritization((prev) => ({
      ...prev,
      priorities: prev.priorities.map((priority) =>
        priority.rank === rank ? { ...priority, value } : priority
      ),
    }));
  };

  return (
    <PrioritizationContext.Provider value={{ prioritization, updatePriority }}>
      {children}
    </PrioritizationContext.Provider>
  );
};
