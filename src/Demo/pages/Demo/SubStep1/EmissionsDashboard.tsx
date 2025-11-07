import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import {
    Box, Typography, Card, styled, CardContent, Paper, Tabs, Tab, FormControl,
    Select, MenuItem, Slider, Button, Grid, Table, TableBody, TableCell,
    TableContainer, TableRow, TableHead, Modal, IconButton, Stack, SelectChangeEvent, Checkbox, TableFooter,
} from '@mui/material';
import { HelpOutline, Close } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, Cell } from 'recharts';
import { SRECMetrics } from '../../../../Context/DashboardDataContext'; 

// --- TYPE DEFINITIONS ---
interface DashboardDataObject {
    file_id: string;
    source: string;
    location: string;
    verdict: { /* compliance_status: string; */ status_banner: string; severity: string; penalty_risk_usd: number; time_left_months: number; limit_utilization_pct: number; };
    evidence: { metrics: { actual_emissions: number; projected_emissions: number; full_year_projection: number; actual_yoy_pct: number | string; compliance_target: number; compliance_jurisdiction: string; required_reduction_pct: number; bradley_solution?: number; bradley_reduction_pct?: number; over_by: number; bradley_savings?: number; bradley_roi_years?: number; } };
    emission_reduction_projects: {
        [key: string]: number;
    };
    srec_metrics: SRECMetrics; // Use imported type
    der_control_panel: { 
        current_mix_pct: { [key: string]: number }; 
        recommended_mix_pct: { [key: string]: number }; 
        impact_by_der: { [key: string]: number };
        insights?: string[]; 
    };
    monthly_tracking: { target_per_month: number | string | null; with_bradley_der_per_month: number | string | null; monthly_emissions: { month: string | number; year: number | string; actual: number | null; projected: number | null; }[]; };
    action_center: {
        recommended_solution: { title: string; components: { type: string; size: string; }[]; investment_usd: number; payback_years: number; eliminates_penalties: boolean; };
        alternatives?: { title: string; investment_usd: number; reduction_pct: number; estimated_penalties_remaining_usd_per_year?: number; carbon_negative_by_year?: number; }[];
        insights?: string[]; 
    };
}

// --- IMPROVED COLOR PALETTE FOR CHART ---
const colorPalette = {
    actual: '#424242',      // Dark Grey
    projected: '#BDBDBD',    // Light Grey
    target: '#d32f2f',      // Strong Red
    withBradley: '#388E3C', // Clear Green
};

// --- STYLED COMPONENTS ---
const StyledTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito Sans, sans-serif', fontSize: '2rem', fontWeight: 'bold',
    textAlign: 'center', marginBottom: theme.spacing(1),
}));

const StyledBenefitCard = styled(Card)(({ theme }) => ({
    flex: 1, padding: theme.spacing(1), position: 'relative', overflow: 'hidden', textAlign: 'center',
    backgroundColor: '#f5f5f5', boxShadow: 'none', borderRadius: theme.shape.borderRadius,
    border: '1px solid #e9ecef', transition: 'all 0.3s ease',
    '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
}));

const WatermarkIcon = styled('div')({
    position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%) rotate(-15deg)',
    fontSize: '4rem', opacity: 0.08, fontWeight: 'bold', color: '#333', zIndex: 1,
});

const AbsoluteValue = styled(Typography)({
    fontFamily: 'Nunito Sans, sans-serif', fontWeight: '900', fontSize: '1.2rem', color: '#333',
    position: 'relative', zIndex: 2, lineHeight: 2.2,
});

const BenefitDescription = styled(Typography)(({ theme }) => ({
    fontFamily: 'Nunito Sans, sans-serif', fontWeight: '600', fontSize: '0.7rem', color: theme.palette.grey[600],
    position: 'relative', zIndex: 2, lineHeight: 1.5,
}));

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: 500, backgroundColor: 'white', border: '1px solid #ddd',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)', borderRadius: '12px', padding: theme.spacing(3),
}));

const StyledTabPanelBox = styled(Box)(({ theme }) => ({ position: 'relative', padding: theme.spacing(2), backgroundColor: theme.palette.grey[100], borderRadius: theme.shape.borderRadius }));

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => ( <div role="tabpanel" hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div> );

// --- HELPER FUNCTIONS & DATA ---
const formatValue = (value?: number | string | null, type: 'number' | 'currency' | 'percent' = 'number'): string => { if (value === null || value === undefined || value === "") return 'N/A'; const num = typeof value === 'string' ? parseFloat(value) : value; if (isNaN(num)) return 'N/A'; const options: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }; if (type === 'currency') { options.style = 'currency'; options.currency = 'USD'; options.minimumFractionDigits = 2; } if (type === 'percent') { return `${num.toFixed(1)}%`; } return new Intl.NumberFormat('en-US', options).format(num); };
const derOrder = ['Solar PV', 'Battery Storage', 'CHP', 'Fuel Cells', 'Simple Turbines', 'Linear Generation', 'PLANT'];
const derNameMapping: {[key: string]: string} = { solar_pv: 'Solar PV', battery_storage: 'Battery Storage', chp: 'CHP', fuel_cells: 'Fuel Cells', simple_turbines: 'Simple Turbines', linear_generation: 'Linear Generation', grid: 'PLANT', efficiency_retrofit: 'Efficiency Retrofit' };

// --- CHILD COMPONENTS ---
interface BenefitData { value: string; title: ReactNode; description: React.ReactNode; watermark: string; }
const EnhancedBenefitCard: React.FC<{ benefit: BenefitData }> = ({ benefit }) => (
    <StyledBenefitCard>
        <WatermarkIcon>{benefit.watermark}</WatermarkIcon>
        <CardContent sx={{ position: 'relative', zIndex: 2, py: 0.1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography sx={{fontFamily:'Nunito Sans, sans-serif', fontWeight:'bold', fontSize:'1rem', mb: 0.5}}>{benefit.title}</Typography>
            <AbsoluteValue>{benefit.value}</AbsoluteValue>
            <BenefitDescription>{benefit.description}</BenefitDescription>
        </CardContent>
    </StyledBenefitCard>
);

// --- MAIN DASHBOARD COMPONENT ---
interface EmissionsDashboardProps { 
    allData: DashboardDataObject[]; 
    onConfirmChanges: (userMix: {[key: string]: number}, location: string, source: string) => void;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: (changed: boolean) => void;
    selectedLocation: string;
    onLocationChange: (location: string) => void;
    selectedSource: string;
    onSourceChange: (source: string) => void;
    selectedYear: number | string;
    onYearChange: (year: number | string) => void;
    srecPercentage: number;
    onSrecPercentageChange: (value: number) => void;
    onSrecChangeCommitted: (value: number) => void;
    calculatedSrecMetrics: SRECMetrics | null;
}

const EmissionsDashboard: React.FC<EmissionsDashboardProps> = ({ 
    allData, onConfirmChanges, setHasUnsavedChanges,
    selectedLocation, onLocationChange,
    selectedSource, onSourceChange,
    selectedYear, onYearChange,
    srecPercentage,
    onSrecPercentageChange,
    onSrecChangeCommitted,
    calculatedSrecMetrics
}) => {
    const [tabValue, setTabValue] = useState(0);
    const [userDerAllocation, setUserDerAllocation] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContentId, setModalContentId] = useState<number | null>(null);

    const [projectSelections, setProjectSelections] = useState<{ [key: string]: boolean }>({});

    const handleOpenModal = (id: number) => { setModalContentId(id); setModalOpen(true); };
    const handleCloseModal = () => { setModalOpen(false); setModalContentId(null); };

    const availableLocations = useMemo(() => {
        if (!allData) return [];
        return Array.from(new Set(allData.map(d => d.location)));
    }, [allData]);

    const availableSources = useMemo(() => {
        if (!allData || !selectedLocation) return [];
        return Array.from(new Set(
            allData.filter(d => d.location === selectedLocation).map(d => d.source)
        ));
    }, [allData, selectedLocation]);

    const data = useMemo(() => {
        return allData?.find(d => d.location === selectedLocation && d.source === selectedSource);
    }, [allData, selectedLocation, selectedSource]);
    
    const initialState = useMemo(() => {
        const current = data?.der_control_panel?.current_mix_pct;
        return {
            'Solar PV': current?.solar_pv ?? 0, 'Battery Storage': current?.battery_storage ?? 0, 'CHP': current?.chp ?? 0,
            'Fuel Cells': current?.fuel_cells ?? 0, 'Simple Turbines': current?.simple_turbines ?? 0,
            'Linear Generation': current?.linear_generation ?? 0, 'PLANT': current?.grid ?? 100,
        };
    }, [data]);

    useEffect(() => {
        setUserDerAllocation(initialState);
        setHasUnsavedChanges(false);
        setProjectSelections({});
    }, [initialState, setHasUnsavedChanges]); 

    const isChanged = useMemo(() => JSON.stringify(userDerAllocation) !== JSON.stringify(initialState), [userDerAllocation, initialState]);
    
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

    const handleSliderChange = (name: string, value: number) => {
        const otherDersTotal = Object.entries(userDerAllocation).filter(([key]) => key !== 'PLANT' && key !== name).reduce((acc, [, val]) => acc + (val as number), 0);
        const newTotal = otherDersTotal + value;
        if (newTotal > 100) return;
        setUserDerAllocation(prev => ({ ...prev, [name]: value, PLANT: 100 - newTotal }));
    };
    
    const handleReset = () => setUserDerAllocation(initialState);
    
    const handleApplyRecommendation = () => {
        const recommended = data?.der_control_panel?.recommended_mix_pct;
        if (!recommended) return;
        setUserDerAllocation({
            'Solar PV': recommended.solar_pv ?? 0, 'Battery Storage': recommended.battery_storage ?? 0, 'CHP': recommended.chp ?? 0,
            'Fuel Cells': recommended.fuel_cells ?? 0, 'Simple Turbines': recommended.simple_turbines ?? 0,
            'Linear Generation': recommended.linear_generation ?? 0, 'PLANT': recommended.grid ?? 0,
        });
    };

    const handleConfirm = () => {
        const payloadMix = {
            grid: (userDerAllocation as any)['PLANT'] ?? 0, solar_pv: (userDerAllocation as any)['Solar PV'] ?? 0,
            battery_storage: (userDerAllocation as any)['Battery Storage'] ?? 0, chp: (userDerAllocation as any)['CHP'] ?? 0,
            fuel_cells: (userDerAllocation as any)['Fuel Cells'] ?? 0, simple_turbines: (userDerAllocation as any)['Simple Turbines'] ?? 0,
            linear_generation: (userDerAllocation as any)['Linear Generation'] ?? 0,
        };
        onConfirmChanges(payloadMix, selectedLocation, selectedSource);
    };
    
    const availableYears = useMemo(() => {
        const years = new Set(data?.monthly_tracking?.monthly_emissions?.map(em => em.year as number));
        return Array.from(years).sort((a, b) => b - a);
    }, [data]);

    const staticProjectKeys: { [key: string]: string } = {
        'Lighting': 'Lighting',
        'Ventilation': 'Ventilation',
        'Cooling': 'Cooling',
        'Other (Pumps, Small Motors, Common Areas)': 'Other (pumps, small motors, common areas)',
        'Refrigeration': 'Refrigeration',
        'Computing/IT': 'Computing/IT',
        'Space Heating (Electric)': 'space heating (electric)',
    };

    const cumulativeReduction = useMemo(() => {
        if (!data?.emission_reduction_projects) return 0;

        return Object.entries(projectSelections).reduce((sum, [formattedKey, isSelected]) => {
            if (isSelected) {
                const backendKey = staticProjectKeys[formattedKey];
                return sum + (data.emission_reduction_projects[backendKey] || 0);
            }
            return sum;
        }, 0);
    }, [projectSelections, data?.emission_reduction_projects]);

    const handleProjectSelectChange = (formattedKey: string) => {
        setProjectSelections(prev => ({
            ...prev,
            [formattedKey]: !prev[formattedKey],
        }));
    };
    
    const filteredAndSortedChartData = useMemo(() => {
        if (!data || !selectedYear) return [];
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const filtered = data.monthly_tracking.monthly_emissions.filter(em => em.year == selectedYear);
        
        const processed = filtered.map(em => {
            const monthIndex = Number(em.month) - 1;
            const monthName = (typeof em.month === 'number' && monthIndex >= 0 && monthIndex < 12)
                ? monthOrder[monthIndex]
                : String(em.month);

            return {
                ...em,
                month: monthName,
                emissions: em.actual ?? em.projected,
                fill: em.actual !== null ? colorPalette.actual : colorPalette.projected
            };
        });
        
        return processed.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
    }, [data, selectedYear]);

    const yAxisMax = useMemo(() => {
        if (!data || !filteredAndSortedChartData || filteredAndSortedChartData.length === 0) {
            return 'auto'; 
        }

        const maxBarValue = Math.max(...filteredAndSortedChartData.map(entry => entry.emissions ?? 0));
        
        const targetValue = (data.monthly_tracking?.target_per_month !== null && 
                             data.monthly_tracking?.target_per_month !== undefined &&
                             isFinite(Number(data.monthly_tracking.target_per_month)))
                             ? Number(data.monthly_tracking.target_per_month)
                             : 0; 

        const dataMax = Math.max(maxBarValue, targetValue);

        if (dataMax === 0) return 100; 

        return Math.ceil((dataMax * 1.1) / 10) * 10; 
    
    }, [data, filteredAndSortedChartData]);

    const evidenceCards: BenefitData[] = [
        { value: `${formatValue(data?.evidence?.metrics?.full_year_projection)} MT`, title: (<>Annual Emissions<br />(YTD + Projected)</>), description: <>YTD: <b>{formatValue(data?.evidence?.metrics?.actual_emissions)} MT</b><br />Projected: <b>{formatValue(data?.evidence?.metrics?.projected_emissions)} MT</b><br/><b>+{formatValue(data?.evidence?.metrics?.actual_yoy_pct, 'percent')}</b> YoY | Over by: <b>{formatValue(data?.evidence?.metrics?.over_by)} MT</b><br/></>, watermark: '🔥' },
        { value: `${formatValue(data?.evidence?.metrics?.compliance_target)} MT`, title: (<>Compliance Target<br />by 2030</>), description: <>State: <b>{data?.evidence?.metrics?.compliance_jurisdiction}</b><br/>Required by law<br/><b>{formatValue(data?.evidence?.metrics?.required_reduction_pct, 'percent')}</b> reduction</>, watermark: '⚖️' },
        { value: `${formatValue(data?.evidence?.metrics?.bradley_solution)} MT`, title: 'Emission Compliance Energy Supply Configuration', description: <><b>{formatValue(data?.evidence?.metrics?.bradley_reduction_pct, 'percent')}</b> Reduction<br/>Saves: <b>{formatValue(data?.evidence?.metrics?.bradley_savings, 'currency')}/yr</b><br/>ROI: <b>{formatValue(data?.evidence?.metrics?.bradley_roi_years)} years</b></>, watermark: '💡' },
    ];

    const renderModalContent = () => {
        const content: { title: React.ReactNode; body: React.ReactNode } = {
            title: '',
            body: <></>
        }
        
        switch (modalContentId) {
    case 0: 
        content.title = (
            <Typography variant="h6" sx={{ color: 'black' }}>
                How to Optimize Your Energy Mix
            </Typography>
        );
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555', fontSize: '0.9rem' }}>
                    CarbonCheckIQ+ enables you to select various types of energy supply to evaluate the GHG emission reductions related to having energy generation on premise. This evaluation output enables you to drive compliance through energy innovation. Should you want to further evaluate the practicality of having your own generation systems on your property to attain GHG emission compliance, 8XEnergy’s AI Energy Agent (Bradley.AI) provides a deep dive evaluation, equal to a 30% conceptual design that will confirm pricing, material, contractors, financing, constructability and/or third party ownership for your consideration
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="body1"><strong>Key Insights:</strong></Typography>
                    {data?.der_control_panel?.insights && data.der_control_panel.insights.length > 0 ? (
                         <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                            {data.der_control_panel.insights.map((insight, index) => (
                                <li key={index} style={{ marginTop: '4px' }}>{insight}</li>
                            ))}
                        </ul>
                    ) : (
                        <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
                            No specific insights available for this configuration.
                        </Typography>
                    )}
                </Paper>
            </>
        );
        break;

    case 1: 
        content.title = (
            <Typography variant="h6" sx={{ color: 'black' }}>
                Reading Your Performance Chart
            </Typography>
        );
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                    This chart visualizes your monthly progress, comparing your actual emissions to critical benchmarks. Use it to track trends and validate your strategy.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li><b><span style={{ color: colorPalette.actual }}>Dark Grey bars</span></b> show your recorded historical emissions.</li>
                        <li style={{ marginTop: '8px' }}><b><span style={{ color: colorPalette.projected }}>Light Grey bars</span></b> are our AI-powered forecasts for the upcoming months.</li>
                        <li style={{ marginTop: '8px' }}>The <b style={{ color: colorPalette.target }}>Red Target Line</b> represents your monthly compliance limit. Staying below this is key to avoiding penalties.</li>
                        <li style={{ marginTop: '8px' }}>The <b style={{ color: colorPalette.withBradley }}>Green CarbonCheckIQ+ Line</b> shows your projected emissions if you adopt our recommended solution, keeping you safely under target.</li>
                    </ul>
                </Paper>
            </>
        );
        break;

    case 2:
        content.title = (
            <Typography variant="h6" sx={{ color: 'black' }}>
                Understanding Your Action Plan
            </Typography>
        );
        content.body = (
            <>
                <Typography sx={{ mt: 1.5, mb: 2, color: '#555' }}>
                    Here, we turn data into a clear, actionable roadmap. Our goal is to provide a comprehensive solution that not only solves your compliance problem but also delivers long-term value.
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="body1"><strong>Key Insights:</strong></Typography>
                     {data?.action_center?.insights && data.action_center.insights.length > 0 ? (
                         <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '0.9rem' }}>
                            {data.action_center.insights.map((insight, index) => (
                                <li key={index} style={{ marginTop: '4px' }}>{insight}</li>
                            ))}
                        </ul>
                    ) : (
                        <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 1 }}>
                            No specific insights available for this action plan.
                        </Typography>
                    )}
                </Paper>
            </>
        );
        break;

    default: 
        return null;
}


        return (
            <>
                <IconButton onClick={handleCloseModal} sx={{position: 'absolute', top: 8, right: 8}}><Close /></IconButton>
                <Typography variant="h6" component="h2" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>{content.title}</Typography>
                <Box sx={{ fontFamily: 'Nunito Sans, sans-serif' }}>{content.body}</Box>
            </>
        );
    };

    const utilizationPct = data?.verdict?.limit_utilization_pct ?? 0;
    const severity = data?.verdict?.severity || 'INFO';
    const status_banner = data?.verdict?.status_banner || 'Status not available';

    let complianceBannerBg: string;
    let complianceBannerBorder: string;
    let complianceBannerColor: string;
    let complianceIcon: string;
    let progressBarColor: string;
    let statusColor: string;
    let statusIcon: string;

    switch (severity) {
        case 'INFO':
            complianceBannerBg = '#e8f5e9'; // Light Green
            complianceBannerBorder = '#4caf50'; // Green
            complianceBannerColor = '#1b5e20'; // Dark Green
            complianceIcon = '✅';
            progressBarColor = '#388E3C'; // Strong Green
            statusColor = '#388E3C';
            statusIcon = '🟢';
            break;
        
        case 'WARNING':
            complianceBannerBg = '#fffde7'; // Light Yellow
            complianceBannerBorder = '#fdd835'; // Yellow
            complianceBannerColor = '#f57f17'; // Dark Yellow
            complianceIcon = '⚠️';
            progressBarColor = '#fdd835'; // Yellow
            statusColor = '#f57f17';
            statusIcon = '🟡';
            break;

        case 'CRITICAL':
            complianceBannerBg = '#fff3e0'; // Light Orange
            complianceBannerBorder = '#ff9800'; // Orange
            complianceBannerColor = '#e65100'; // Dark Orange
            complianceIcon = '❗';
            progressBarColor = '#ff9800'; // Orange
            statusColor = '#e65100';
            statusIcon = '🟠';
            break;

        case 'OVERLOAD':
        default:
            complianceBannerBg = '#ffebee'; // Light Red
            complianceBannerBorder = '#d32f2f'; // Red
            complianceBannerColor = '#b71c1c'; // Dark Red
            complianceIcon = '☠️';
            progressBarColor = '#d32f2f'; // Red
            statusColor = '#d32f2f';
            statusIcon = '🔴';
            break;
    } 


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;900&display=swap');
                
                .ref-line-target .recharts-reference-line-line,
                .ref-line-bradley .recharts-reference-line-line {
                    transition: all 0.2s ease-in-out;
                }
                
                .ref-line-target .recharts-reference-line-line:hover,
                .ref-line-bradley .recharts-reference-line-line:hover {
                    stroke-width: 2.5;
                    stroke-opacity: 1;
                }
            `}</style>
            
            <Modal open={modalOpen} onClose={handleCloseModal}><ModalBox>{renderModalContent()}</ModalBox></Modal>

            <StyledTitle variant="h6">CarbonCheckIQ+ Emissions Dashboard</StyledTitle>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: { xs: '20px', md: '80px' } }}>
                <Paper variant="outlined" sx={{ p: 2, position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 16, right: 24, display: 'flex', gap: 2 }}>
                        <FormControl size="small">
                            <Select
                                value={selectedLocation}
                                onChange={(e: SelectChangeEvent<string>) => onLocationChange(e.target.value)}
                                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }} 
                                MenuProps={{ //
                                    // sx: { 
                                    //     '& .MuiMenu-paper': { 
                                    //         minWidth: 'auto !important', 
                                    //     },
                                    //     anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                    //     transformOrigin: { vertical: "top", horizontal: "left" },
                                    //     getContentAnchorEl: null,
                                    // },
                                    // PaperProps: {
                                    //     style: {
                                    //     },
                                    // },
                                }}
                            >
                                {availableLocations.map(loc => <MenuItem 
                                    key={loc} 
                                    value={loc} 
                                    sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }} // ---
                                >
                                    {loc}
                                </MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl size="small">
                            <Select
                                value={selectedSource}
                                onChange={(e: SelectChangeEvent<string>) => onSourceChange(e.target.value)}
                                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }} 
                                MenuProps={{ //
                                    // sx: { 
                                    //     '& .MuiMenu-paper': { 
                                    //         minWidth: 'auto !important', 
                                    //     },
                                    //     anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                    //     transformOrigin: { vertical: "top", horizontal: "left" },
                                    //     getContentAnchorEl: null,
                                    // },
                                    // PaperProps: {
                                    //     style: {
                                    //     },
                                    // },
                                }}
                            >
                                {availableSources.map(src => <MenuItem 
                                    key={src} 
                                    value={src} 
                                    sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif'}} // ---
                                >
                                    {src.charAt(0).toUpperCase() + src.slice(1)}
                                </MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl size="small">
                            <Select 
                                value={selectedYear} 
                                onChange={(e: SelectChangeEvent<string | number>) => onYearChange(e.target.value)}
                                sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }}
                                MenuProps={{ //
                                    // sx: { 
                                    //     '& .MuiMenu-paper': { 
                                    //         minWidth: 'auto !important',
                                    //     },
                                    //     anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                    //     transformOrigin: { vertical: "top", horizontal: "left" },
                                    //     getContentAnchorEl: null,
                                    // },
                                    // PaperProps: {
                                    //     style: {
                                    //     },
                                    // },
                                }}
                            >
                                {availableYears.map(year => <MenuItem 
                                    key={year} 
                                    value={year} 
                                    sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif' }} // ---
                                >
                                    {year}
                                </MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    <Typography sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '1rem' }}>COMPLIANCE STATUS</Typography>
                    
                    <Paper variant="outlined" sx={{ mt: 3, backgroundColor: complianceBannerBg, textAlign: 'center', p:1, borderColor: complianceBannerBorder }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: complianceBannerColor }}>
                            {complianceIcon} {status_banner}
                        </Typography>
                    </Paper>

                    <Box sx={{ position: 'relative', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', margin: '16px auto', maxWidth: '100%' }}>
                        <Box sx={{ 
                            width: `${utilizationPct > 100 ? 100 : utilizationPct}%`, 
                            height: '100%', 
                            backgroundColor: progressBarColor,
                            transition: 'width 0.4s ease-in-out'
                        }} />
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography sx={{
                                color: utilizationPct > 40 ? '#fff' : '#000', 
                                textShadow: utilizationPct > 40 ? '0px 0px 3px rgba(0,0,0,0.5)' : 'none',
                                fontFamily: 'Nunito Sans, sans-serif',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                lineHeight: '20px'
                            }}>
                                {formatValue(utilizationPct, 'percent')} Utilization
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Grid container spacing={1} sx={{ textAlign: 'center' }}>
                        <Grid item xs={4}><Typography sx={{fontSize: '0.8rem'}}>STATUS: <b style={{ color: statusColor }}>{statusIcon} {severity}</b></Typography></Grid>
                        <Grid item xs={4}><Typography sx={{fontSize: '0.8rem'}}>PENALTY RISK: <b>{formatValue(data?.verdict?.penalty_risk_usd, 'currency')}</b></Typography></Grid>
                        <Grid item xs={4}><Typography sx={{fontSize: '0.8rem'}}>TIME LEFT: <b>{data?.verdict?.time_left_months} MONTHS</b></Typography></Grid>
                    </Grid>
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>{evidenceCards.map((benefit, index) => <EnhancedBenefitCard key={index} benefit={benefit} />)}</Box>
                <Paper elevation={0} sx={{ width: '100%', mt: 4, backgroundColor: 'transparent' }}>
                    <Box sx={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e0e0e0', backgroundColor: 'white' }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            centered
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                '& .MuiTab-root': { fontFamily: 'Nunito Sans, sans-serif', margin: '0 18px', textTransform: 'none' },
                            }}
                        >
                            <Tab label={<span>Interactive Emission<br />Modelling Dashboard</span>} />
                            <Tab label={<span>Simulated Emissions from<br />Alternate Energy Source(s)</span>} />
                            <Tab label={<span>Immediate Emission<br />Compliance Configuration</span>} />
                            <Tab label={<span>Energy Conservation &<br />Reduction Measures</span>} />
                        </Tabs>

                        
                        <TabPanel value={tabValue} index={0}>
                            <StyledTabPanelBox>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>VISUALIZE YOUR FUTURE ENERGY SUPPLY AND EMISSIONS</Typography>
                                    <IconButton size="small" onClick={() => handleOpenModal(0)}><HelpOutline sx={{fontSize: '1.1rem'}} /></IconButton>
                                </Box>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small">
                                        <TableHead sx={{ backgroundColor: '#fafafa' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>DER System</TableCell>
                                                <TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Preferred Gen. % to achieve<br />GHG Emission Compliance</TableCell>
                                                <TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', width: '30%' }}>Your Allocation</TableCell>
                                                <TableCell align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Impact (MT)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{derOrder.map(name => {
                                            const backendKey = Object.keys(derNameMapping).find(key => derNameMapping[key] === name) || '';
                                            const recMix = data?.der_control_panel?.recommended_mix_pct;
                                            const impactValue = data?.der_control_panel?.impact_by_der?.[backendKey] ?? 0;
                                            const bradleyValue = recMix?.[backendKey] ?? 0;
                                            const userValue = (userDerAllocation as any)[name] ?? 0;
                                            const isPlant = name === 'PLANT';
                                            return (<TableRow key={name} sx={{ backgroundColor: isPlant ? '#f5f5f5' : '#fff' }}><TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600 }}>{name}</TableCell><TableCell align="center" sx={{ fontFamily: 'Nunito Sans, sans-serif' }}>{formatValue(bradleyValue, 'percent')}</TableCell><TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Slider value={userValue} onChange={(_, v) => handleSliderChange(name, v as number)} disabled={isPlant} /><Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', width: '40px' }}>{formatValue(userValue, 'percent')}</Typography></Box></TableCell><TableCell align="right"><Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', color: impactValue < 0 ? '#34c759' : '#ff3b30' }}>{formatValue(impactValue)}</Typography></TableCell></TableRow>);
                                        })}</TableBody>
                                    </Table>
                                </TableContainer>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
                                    <Button sx={{ fontFamily: 'Nunito Sans, sans-serif' }} size="small" variant="outlined" onClick={handleReset}>Reset to Current</Button>
                                    <Button sx={{ fontFamily: 'Nunito Sans, sans-serif' }} size="small" variant="contained" onClick={handleApplyRecommendation}>Apply desired configuration of power generation</Button>
                                    <Button sx={{ fontFamily: 'Nunito Sans, sans-serif' }} size="small" variant="outlined" onClick={handleConfirm} disabled={!isChanged}>Confirm Changes</Button>
                                </Box>
                            </StyledTabPanelBox>
                        </TabPanel>

                        <TabPanel value={tabValue} index={1}>
                            <StyledTabPanelBox>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>MONTHLY PERFORMANCE & FORECASTING</Typography>
                                    <IconButton size="small" onClick={() => handleOpenModal(1)}><HelpOutline sx={{fontSize: '1.1rem'}} /></IconButton>
                                </Box>
                                <Box sx={{ height: 350 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={filteredAndSortedChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }} />
                                            <YAxis 
                                                tick={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }} 
                                                domain={[0, yAxisMax]}
                                            />
                                            <Tooltip cursor={{fill: 'rgba(230, 230, 230, 0.4)'}} contentStyle={{ fontFamily: 'Nunito Sans, sans-serif' }}/>
                                            
                                            <Legend
                                                wrapperStyle={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }}
                                                payload={[
                                                    { value: 'Actual', type: 'square', color: colorPalette.actual },
                                                    { value: 'Projected', type: 'square', color: colorPalette.projected },
                                                    { value: 'Target', type: 'line', color: colorPalette.target },
                                                    { value: 'With CarbonCheckIQ+', type: 'line', color: colorPalette.withBradley },
                                                ]}
                                            />
                                            
                                            <Bar dataKey="emissions" name="Emissions">
                                                {filteredAndSortedChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                            
                                            { (data?.monthly_tracking?.target_per_month !== null && 
                                               data?.monthly_tracking?.target_per_month !== undefined &&
                                               data?.monthly_tracking?.target_per_month !== '' && 
                                               isFinite(Number(data.monthly_tracking.target_per_month))) &&
                                                <ReferenceLine
                                                    ifOverflow="extendDomain"
                                                    y={Number(data.monthly_tracking.target_per_month)}
                                                    stroke={colorPalette.target}
                                                    strokeDasharray="3 3"
                                                    strokeWidth={1.5}
                                                    label={{
                                                        value: `Target: ${formatValue(data.monthly_tracking.target_per_month)}`,
                                                        position: 'insideBottomRight',
                                                        fill: colorPalette.target,
                                                        fontFamily: 'Nunito Sans, sans-serif',
                                                        fontSize: 12,
                                                    }}
                                                    className="ref-line-target"
                                                />
                                            }
                                            
                                            { (data?.monthly_tracking?.with_bradley_der_per_month !== null && 
                                               data?.monthly_tracking?.with_bradley_der_per_month !== undefined &&
                                               data?.monthly_tracking?.with_bradley_der_per_month !== '' && 
                                               isFinite(Number(data.monthly_tracking.with_bradley_der_per_month))) &&
                                                <ReferenceLine
                                                    ifOverflow="extendDomain"
                                                    y={Number(data.monthly_tracking.with_bradley_der_per_month)}
                                                    stroke={colorPalette.withBradley}
                                                    strokeDasharray="3 3"
                                                    strokeWidth={1.5}
                                                    label={{
                                                        value: `With CarbonCheckIQ+: ${formatValue(data.monthly_tracking.with_bradley_der_per_month)}`,
                                                        position: 'insideTopRight',
                                                        fill: colorPalette.withBradley,
                                                        fontFamily: 'Nunito Sans, sans-serif',
                                                        fontSize: 12,
                                                    }}
                                                    className="ref-line-bradley"
                                                />
                                            }
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </StyledTabPanelBox>
                        </TabPanel>

                        <TabPanel value={tabValue} index={2}>
                            <StyledTabPanelBox sx={{minHeight: 360}}>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2}}>
                                    <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif',  textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>YOUR ACTION PLAN</Typography>
                                    <IconButton size="small" onClick={() => handleOpenModal(2)}><HelpOutline sx={{fontSize: '1.1rem'}} /></IconButton>
                                </Box>
                                <Grid container spacing={3} alignItems="stretch">
                                    <Grid item xs={12} md={7}>
                                        <Paper variant="outlined" sx={{ p: 2.5, height: '87%', display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1rem', mb: 1.5 }}>RECOMMENDED SOLUTION</Typography>
                                            <Card variant="outlined" sx={{ flexGrow: 1 }}>
                                                <CardContent sx={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>
                                                    <div>
                                                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>📋 {data?.action_center?.recommended_solution?.title}</Typography>
                                                        <ul style={{ fontSize: '0.9rem', margin: '12px 0', paddingLeft: '20px' }}>
                                                            {data?.action_center?.recommended_solution?.components?.map(c => <li key={c.type}>{`${c.size} ${derNameMapping[c.type] || c.type}`}</li>)}
                                                        </ul>
                                                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif' }}><b>Investment:</b> {formatValue(data?.action_center?.recommended_solution?.investment_usd, 'currency')} | <b>Payback:</b> {data?.action_center?.recommended_solution?.payback_years} years</Typography>
                                                    
                                                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}><Button sx={{fontFamily: 'Nunito Sans, sans-serif'}} variant="contained" size="small">Schedule Consultation</Button><Button sx={{fontFamily: 'Nunito Sans, sans-serif'}} variant="outlined" size="small">Email Proposal</Button></Box>
                                                </div></CardContent>
                                            </Card>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Paper variant="outlined" sx={{ p: 2.5, height: '87%', display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1rem', mb: 1.5 }}>ALTERNATIVE OPTIONS</Typography>
                                            <Stack spacing={2}>
                                                {data?.action_center?.alternatives?.map(alt => (
                                                    <Card key={alt.title} variant="outlined">
                                                        <CardContent sx={{py: 1.5, '&:last-child': { pb: 1.5 }}}>
                                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>{alt.title.includes("Quick") || alt.title.includes("Solar") ? '💡' : '🚀'} {alt.title}</Typography>
                                                            <Typography sx={{fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem'}}><b>Investment:</b> {formatValue(alt.investment_usd, 'currency')}<br /><b>Reduction:</b> {formatValue(alt.reduction_pct, 'percent')}</Typography>
                                                            {alt.estimated_penalties_remaining_usd_per_year != null && <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '0.85rem', color: alt.estimated_penalties_remaining_usd_per_year > 0 ? '#ff3b30' : '#34c759' }}>Penalties: {formatValue(alt.estimated_penalties_remaining_usd_per_year, 'currency')}/yr</Typography>}
                                                            {alt.carbon_negative_by_year != null && <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem' }}><b>Carbon -ve by year:</b> {alt.carbon_negative_by_year}</Typography>}
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </StyledTabPanelBox>
                        </TabPanel>

                        <TabPanel value={tabValue} index={3}>
                            <StyledTabPanelBox sx={{minHeight: 360, fontFamily: 'Nunito Sans, sans-serif'}}>
                                
                                {/* Table 1: Emission Reduction Projects */}
                                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1rem', mb: 1.5, textAlign:'center' }}>
                                    Emission Reduction Projects
                                </Typography>
                                <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
                                    <Table size="small">
                                        <TableHead sx={{ backgroundColor: '#fafafa' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Emission Reduction Projects</TableCell>
                                                {/* --- FIX: Header text corrected --- */}
                                                <TableCell align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Estimated Reduction</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.entries(staticProjectKeys).map(([formattedKey, backendKey]) => {
                                                const isSelected = !!projectSelections[formattedKey];
                                                return (
                                                    <TableRow 
                                                        key={formattedKey} 
                                                        hover 
                                                        onClick={() => handleProjectSelectChange(formattedKey)} 
                                                        sx={{ 
                                                            cursor: 'pointer',
                                                            backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                                                        }}
                                                    >
                                                        <TableCell sx={{ 
                                                            fontFamily: 'Nunito Sans, sans-serif',
                                                            fontWeight: isSelected ? 700 : 400,
                                                        }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Checkbox 
                                                                    checked={isSelected}
                                                                    size="small"
                                                                    sx={{ mr: 1, p: 0.5 }}
                                                                />
                                                                {formattedKey}
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="right" sx={{ 
                                                            fontFamily: 'Nunito Sans, sans-serif',
                                                            fontWeight: isSelected ? 700 : 400,
                                                            color: isSelected ? '#1976d2' : 'inherit',
                                                        }}>
                                                            {/* --- FIX: Added "MT" suffix --- */}
                                                            {formatValue(data?.emission_reduction_projects?.[backendKey])} MT
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                        <TableFooter sx={{ backgroundColor: cumulativeReduction > 0 ? '#e8f5e9' : '#ffebee', borderTop: '2px solid', borderColor: cumulativeReduction > 0 ? '#1b5e20' : '#d32f2f' }}>
                                            <TableRow sx={{ height: '40px' }}>
                                                <TableCell colSpan={2} align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '1rem' }}>
                                                    <span style={{ fontWeight: 700, marginRight: 8 }}>Cumulative Reduction:</span>
                                                    <span style={{ fontWeight: 700, color: cumulativeReduction > 0 ? '#1b5e20' : '#d32f2f' }}>{formatValue(cumulativeReduction)} MT</span>
                                                </TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </TableContainer>

                                {/* Table layout for SRECs --- */}
                                <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1rem', mb: 1.5, textAlign:'center' }}>
                                    Renewable Energy Credits (RECs)
                                </Typography>
                                <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                                    <Table size="small">
                                        <TableHead sx={{ backgroundColor: '#fafafa' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold' }}>Renewable Energy Credits</TableCell>
                                                <TableCell align="right" sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold'/* , width: '60%' */ }}>Purchase Percentage</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 600 }}>Solar RECs</TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2/* , px: 1 */ }}>
                                                        <Slider
                                                            value={srecPercentage}
                                                            onChange={(_, newValue) => onSrecPercentageChange(newValue as number)} // Visual update
                                                            onChangeCommitted={(_, newValue) => onSrecChangeCommitted(newValue as number)} // API call
                                                            aria-labelledby="srec-slider"
                                                        />
                                                        <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', width: '50px' }}>
                                                            {srecPercentage}%
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                
                                {/* SREC Metrics: Read from calculatedSrecMetrics prop (and check if null) */}
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item xs={12} md={4}>
                                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'white' }}>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'grey.700' }}>Reduced Emissions (MT/yr)</Typography>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.25rem', color: '#1b5e20' }}>
                                                {formatValue(calculatedSrecMetrics?.reduced_emissions_mtpy)}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'white' }}>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'grey.700' }}>SREC Needed (MWh)</Typography>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                                {formatValue(calculatedSrecMetrics?.srec_needed_mwh)}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', backgroundColor: 'white' }}>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: 'grey.700' }}>Total SREC Cost (USD)</Typography>
                                            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                                {formatValue(calculatedSrecMetrics?.total_srec_cost_usd, 'currency')}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </StyledTabPanelBox>
                        </TabPanel>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default EmissionsDashboard;

