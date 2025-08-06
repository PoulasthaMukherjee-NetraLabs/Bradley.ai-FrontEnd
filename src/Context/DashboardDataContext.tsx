// src/Context/DashboardDataContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// --- Interfaces for the API Response Data Structure ---
export interface MonthlyEmission { month: string; year: number; total_emissions: number; energy_consumption: number; }
export interface TargetGoals { "Baseline CO2 (Metric Tons)": { YTD: number; Forecast: number; "Previous Year": number; }; "Reduction Amount": { YTD: number; Forecast: number; "Previous Year": number; }; "Reduction %": { county: number; state: number; corp: number; }; "Target (ON/OFF)": { county: boolean; state: boolean; corp: boolean; }; "Action Needed": { county: boolean; state: boolean; corp: boolean; }; "Penalty": { county: number | null; state: number | null; corp: number | null; }; }
export interface CurrentYearSummary { ytd_emissions: number; total_energy_consumption: number; energy_type: string; current_month: string; difference_from_last_month: number; up_down: "UP" | "DOWN"; emission_reduction_goal: number; }
export interface PenaltyDetails { location: { county: string; state: string; corp: string; }; penalty_rule: { county: string; state: string; corp: string; }; }
export interface LocationData { location: string; source: "electric" | "gas"; monthly_emissions: MonthlyEmission[]; target_goals: TargetGoals; current_year_summary: CurrentYearSummary; penalty: PenaltyDetails; }

export type DashboardData = LocationData[];

// --- Context Definition & Provider ---
interface DashboardDataContextType { dashboardData: DashboardData | null; setDashboardData: (data: DashboardData | null) => void; isLoading: boolean; setIsLoading: (loading: boolean) => void; }
const DashboardDataContext = createContext<DashboardDataContextType | undefined>(undefined);

export const DashboardDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (<DashboardDataContext.Provider value={{ dashboardData, setDashboardData, isLoading, setIsLoading }}>{children}</DashboardDataContext.Provider>);
};

// --- Custom Hook ---
export const useDashboardData = (): DashboardDataContextType => {
    const context = useContext(DashboardDataContext);
    if (context === undefined) throw new Error('useDashboardData must be used within a DashboardDataProvider');
    return context;
};