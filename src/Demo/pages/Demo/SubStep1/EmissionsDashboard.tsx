import React, { useMemo } from 'react';
import {
    Box, Card, CardContent, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Slider, Select, MenuItem, FormControl, Grid, Container, styled, createTheme, ThemeProvider, CssBaseline, Modal, Fade, IconButton, Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { LocationData } from '../../../../Context/DashboardDataContext';

// --- INTERFACES & STYLING ---
interface ChartDataRow {
    month: string;
    [key: string]: string | number;
}
const nunitoSansUrl = 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap';
const theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#424242' },
        background: { default: '#f4f6f8' }
    },
    typography: {
        fontFamily: '"Nunito Sans", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 700 },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 600 },
        subtitle1: { fontWeight: 600 },
        subtitle2: { fontWeight: 600, fontSize: '0.875rem' },
        body2: { fontSize: '0.875rem' },
        caption: { fontSize: '0.75rem', color: '#616161' }
    }
});

const StyledCard = styled(Card)(({ /* theme */ }) => ({
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.08)',
    borderRadius: '12px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    backgroundColor: '#fafafa',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '12px 16px',
    '& .MuiCardHeader-title': {
        fontSize: '1rem',
        fontWeight: 700,
        color: theme.palette.secondary.main
    }
}));

const RedCell = styled(TableCell)(() => ({ backgroundColor: '#ffebee', color: '#c62828', fontWeight: 'bold', textAlign: 'center', fontSize: '0.8rem' }));
const LabelCell = styled(TableCell)(() => ({ backgroundColor: '#fafafa', fontWeight: 600, textAlign: 'left', fontSize: '0.8rem', width: '40%' }));
const StyledTableCell = styled(TableCell)({ fontSize: '0.8rem', textAlign: 'center', padding: '8px' });
const SubHeaderCell = styled(TableCell)(() => ({ backgroundColor: '#f5f5f5', fontWeight: 600, textAlign: 'center', fontSize: '0.8rem', padding: '8px' }));
const HeaderCell = styled(TableCell)(() => ({ backgroundColor: '#e0e0e0', fontWeight: 'bold', textAlign: 'center', fontSize: '0.875rem', padding: '8px' }));

export interface DashboardState {
    selectedLocationName: string;
    selectedSource: 'electric' | 'gas' | '';
    selectedYear: number | string;
    co2eGoal: number;
    derAllocation: { [key: string]: number; };
}

interface EmissionsDashboardProps {
    data: LocationData[];
    onUpdate: (payload: DashboardState) => void;
    dashboardState: DashboardState;
    setDashboardState: React.Dispatch<React.SetStateAction<DashboardState | null>>;
    hasUnsavedChanges: boolean;
    setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmissionsDashboard: React.FC<EmissionsDashboardProps> = ({
    data,
    onUpdate,
    dashboardState,
    setDashboardState,
    hasUnsavedChanges,
    setHasUnsavedChanges,
}) => {
    const [expandedChart, setExpandedChart] = React.useState<{ key: string, title: string } | null>(null);

    // --- DATA DERIVATION ---
    const uniqueLocations = useMemo(() => {
        if (!Array.isArray(data) || data.length === 0) return [];
        return Array.from(new Set(data.map(d => d.location)));
    }, [data]);

    const uniqueYears = useMemo(() => {
        if (!Array.isArray(data) || data.length === 0) return [];
        const years = new Set<number>();
        data.forEach(loc => { loc.emissions?.forEach(em => { if (typeof em.Year === 'number') { years.add(em.Year); } }); });
        return Array.from(years).sort((a, b) => b - a);
    }, [data]);

    const availableSources = useMemo(() => {
        if (!Array.isArray(data) || !dashboardState.selectedLocationName) return [];
        return data.filter(d => d.location === dashboardState.selectedLocationName).map(d => d.source);
    }, [data, dashboardState.selectedLocationName]);

    // --- EVENT HANDLERS ---
    const handleFilterChange = (event: { target: { value: any } }, filterName: 'selectedLocationName' | 'selectedSource' | 'selectedYear') => {
        const value = event.target.value;
        const newState = { ...dashboardState };
        (newState as any)[filterName] = value;
        if (filterName === 'selectedLocationName') {
            const newSources = data.filter(d => d.location === value).map(d => d.source);
            newState.selectedSource = newSources[0] || '';
        }
        setDashboardState(newState);
    };

    const initialDerAllocationRef = React.useRef<{ [key: string]: number }>({ ...dashboardState.derAllocation });
    const initialCo2eGoalRef = React.useRef<number>(dashboardState.co2eGoal);

    React.useEffect(() => {
        if (!hasUnsavedChanges) {
            initialDerAllocationRef.current = { ...dashboardState.derAllocation };
            initialCo2eGoalRef.current = dashboardState.co2eGoal;
        }
    }, [hasUnsavedChanges, dashboardState.derAllocation, dashboardState.co2eGoal]);

    const handleSliderChange = (newValue: number, sliderName: 'co2eGoal' | string) => {
        const newState = { ...dashboardState };
        if (sliderName === 'co2eGoal') {
            newState.co2eGoal = newValue;
        } else {
            const oldAllocation = newState.derAllocation;
            const oldValue = oldAllocation[sliderName];
            const difference = newValue - oldValue;
            const currentPlantValue = oldAllocation.PLANT;
            if (difference > 0 && currentPlantValue < difference) return;
            newState.derAllocation = { ...oldAllocation, [sliderName]: newValue, PLANT: currentPlantValue - difference };
        }

        const allocationChanged = Object.entries(newState.derAllocation).some(
            ([key, val]) => initialDerAllocationRef.current[key] !== val
        );
        const co2eGoalChanged = initialCo2eGoalRef.current !== newState.co2eGoal;
        setHasUnsavedChanges(allocationChanged || co2eGoalChanged);

        setDashboardState(newState);
    };

    const handleConfirmChanges = () => {
        onUpdate(dashboardState);
        setHasUnsavedChanges(false);
    };

    // --- RENDER LOGIC ---
    const selectedLocationData = useMemo(() => {
        if (!Array.isArray(data)) return null;
        return data.find(d => d.location === dashboardState.selectedLocationName && d.source === dashboardState.selectedSource) || null;
    }, [data, dashboardState.selectedLocationName, dashboardState.selectedSource]);

    const chartData = useMemo(() => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (!Array.isArray(data) || !selectedLocationData) {
            return { all: monthNames.map(m => ({ month: m })), electric: [], gas: [] };
        }
        const monthlyAggregates: { [key: string]: { [locationSource: string]: number } } = {};
        const electricLocations = data.filter(d => d.source === 'electric');
        const gasLocations = data.filter(d => d.source === 'gas');
        data.forEach(loc => {
            if (!loc.emissions) return;
            const locationSourceKey = `${loc.location} (${loc.source})`;
            const yearlyEmissions = loc.emissions.filter(em => em.Year === dashboardState.selectedYear);
            yearlyEmissions.forEach(em => {
                if (typeof em.Month !== 'number' || typeof em.emissions !== 'number' || em.Month < 1 || em.Month > 12) return;
                const monthName = monthNames[em.Month - 1];
                if (!monthName) return;
                if (!monthlyAggregates[monthName]) { monthlyAggregates[monthName] = {}; }
                monthlyAggregates[monthName][locationSourceKey] = (monthlyAggregates[monthName][locationSourceKey] || 0) + em.emissions;
            });
        });
        const finalChartData: ChartDataRow[] = monthNames.map(monthName => ({ month: monthName, ...(monthlyAggregates[monthName] || {}), }));
        const selectedLocationSourceKey = `${dashboardState.selectedLocationName} (${dashboardState.selectedSource})`;
        const derFactor = 1 - (Object.values(dashboardState.derAllocation).filter((_, i) => i > 0).reduce((acc, v) => acc + v, 0) / 100);
        const dataWithDer = finalChartData.map(d => ({ ...d, 'DER': (d[selectedLocationSourceKey] as number || 0) * derFactor, }));
        return { all: dataWithDer, electric: electricLocations, gas: gasLocations };
    }, [data, dashboardState.selectedLocationName, dashboardState.selectedSource, dashboardState.derAllocation, dashboardState.selectedYear, selectedLocationData]);

    const formatNumber = (num?: number | null, digits = 2) => num?.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits }) ?? 'N/A';
    const formatString = (str?: string | null) => str?.toString() || 'N/A';
    const formatPercent = (val?: number | null) => (val === null || val === undefined) ? 'N/A' : `${val.toFixed(1)}%`;
    const formatBoolean = (b?: boolean | null, yesNo = false) => b === null || b === undefined ? 'N/A' : (yesNo ? (b ? 'YES' : 'NO') : (b ? 'ON' : 'OFF'));

    const { target_goals, current_year_summary, targets_2030 } = selectedLocationData ?? {};
    const hasData = Array.isArray(data) && data.length > 0;
    const selectedLocationSourceKey = `${dashboardState.selectedLocationName} (${dashboardState.selectedSource})`;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <link href={nunitoSansUrl} rel="stylesheet" />
            <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 4 } }}>
                <Container maxWidth="xl">
                    <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold" mb={5} color="text.primary">Emissions Monitoring Dashboard</Typography>
                    
                    <Grid container spacing={4}>
                        {/* --- LEFT COLUMN --- */}
                        <Grid item xs={12} lg={6} container spacing={4} direction="column">
                            <Grid item>
                                <StyledCard>
                                    <StyledCardHeader title="FILTERS" />
                                    <CardContent sx={{ p: 3 }}>
                                        <Box display="flex" flexDirection="column" gap={3}>
                                            <FormControl fullWidth size="small">
                                                <Typography variant="subtitle2" gutterBottom>Location</Typography>
                                                <Select value={dashboardState.selectedLocationName || ''} onChange={(e) => handleFilterChange(e, 'selectedLocationName')} sx={{ fontSize: '0.8rem' }} disabled={!hasData} displayEmpty>
                                                    {hasData ? (uniqueLocations.map(location => (<MenuItem key={location} value={location}>{location}</MenuItem>))) : (<MenuItem value="" disabled>No location</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth size="small">
                                                <Typography variant="subtitle2" gutterBottom>Source</Typography>
                                                <Select value={dashboardState.selectedSource || ''} onChange={(e) => handleFilterChange(e, 'selectedSource')} sx={{ fontSize: '0.8rem' }} disabled={!hasData || availableSources.length === 0} displayEmpty>
                                                    {availableSources.length > 0 ? (availableSources.map(source => (<MenuItem key={source} value={source}>{source}</MenuItem>))) : (<MenuItem value="" disabled>No source</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth size="small">
                                                <Typography variant="subtitle2" gutterBottom>Year</Typography>
                                                <Select value={dashboardState.selectedYear || ''} onChange={(e) => handleFilterChange(e, 'selectedYear')} sx={{ fontSize: '0.8rem' }} disabled={!hasData} displayEmpty>
                                                    {uniqueYears.length > 0 ? (uniqueYears.map(year => (<MenuItem key={year} value={year}>{year}</MenuItem>))) : (<MenuItem value="" disabled>No year</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                            <Grid item><StyledCard><StyledCardHeader title="2030 TARGETS" /><CardContent sx={{p: 0, mb: -3.1}}><TableContainer><Table size="small" sx={{ tableLayout: 'fixed' }}><TableHead><TableRow><SubHeaderCell></SubHeaderCell><SubHeaderCell>COUNTY</SubHeaderCell><SubHeaderCell>STATE</SubHeaderCell><SubHeaderCell>CORP</SubHeaderCell></TableRow></TableHead><TableBody><TableRow><LabelCell>Location</LabelCell><StyledTableCell>{targets_2030?.location?.county}</StyledTableCell><StyledTableCell>{formatString(targets_2030?.location?.state)}</StyledTableCell><RedCell>{formatString(targets_2030?.location?.corp)}</RedCell></TableRow><TableRow><LabelCell>Penalty Rule ($/kg CO2e)</LabelCell><StyledTableCell>{formatString(targets_2030?.penalty_rule?.county)}</StyledTableCell><StyledTableCell>${formatString(targets_2030?.penalty_rule?.state)}kg</StyledTableCell><StyledTableCell>{formatString(targets_2030?.penalty_rule?.corp)}</StyledTableCell></TableRow><TableRow><LabelCell>Reduction %</LabelCell><StyledTableCell>{formatPercent(target_goals?.reduction_percentage?.county)}</StyledTableCell><StyledTableCell>{formatPercent(target_goals?.reduction_percentage?.state)}</StyledTableCell><RedCell>{formatPercent(target_goals?.reduction_percentage?.corp)}</RedCell></TableRow></TableBody></Table></TableContainer></CardContent></StyledCard></Grid>
                            
                            <Grid item><StyledCard><StyledCardHeader title="TARGET GOALS" /><CardContent sx={{ p: 0, mb: -5.4 }}><TableContainer><Table size="small"><TableBody><TableRow><StyledTableCell colSpan={4} sx={{ fontSize: '0.75rem', p: 1 }}>2030 Reduction kg CO2e goals by sector</StyledTableCell></TableRow><TableRow><SubHeaderCell>Baseline CO2 (Tons)</SubHeaderCell><SubHeaderCell>YTD</SubHeaderCell><SubHeaderCell>Forecast</SubHeaderCell><SubHeaderCell>Previous Year</SubHeaderCell></TableRow><TableRow><LabelCell></LabelCell><RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell><RedCell>{formatNumber(target_goals?.baseline_co2?.forecast)}</RedCell><StyledTableCell>{formatNumber(target_goals?.baseline_co2?.previous_year)}</StyledTableCell></TableRow><TableRow><SubHeaderCell></SubHeaderCell><SubHeaderCell>COUNTY</SubHeaderCell><SubHeaderCell>STATE</SubHeaderCell><SubHeaderCell>CORP</SubHeaderCell></TableRow><TableRow><LabelCell>Reduction Amount</LabelCell><StyledTableCell>{formatNumber(target_goals?.reduction_amount?.county)}</StyledTableCell><StyledTableCell>{formatNumber(target_goals?.reduction_amount?.state)}</StyledTableCell><StyledTableCell>{formatNumber(target_goals?.reduction_amount?.corp)}</StyledTableCell></TableRow><TableRow><LabelCell>Target (ON/OFF)</LabelCell><StyledTableCell>{target_goals?.target_on_off?.county}</StyledTableCell><StyledTableCell>{target_goals?.target_on_off?.state}</StyledTableCell><StyledTableCell>{target_goals?.target_on_off?.corp}</StyledTableCell></TableRow><TableRow><LabelCell>Action Needed</LabelCell><RedCell>{formatBoolean(target_goals?.action_needed?.county === 'YES', true)}</RedCell><RedCell>{formatBoolean(target_goals?.action_needed?.state === 'YES', true)}</RedCell><RedCell>{formatBoolean(target_goals?.action_needed?.corp === 'YES', true)}</RedCell></TableRow><TableRow><LabelCell>Penalty</LabelCell><StyledTableCell>${formatNumber(target_goals?.penalty?.county)}</StyledTableCell><RedCell>${formatNumber(target_goals?.penalty?.state)}</RedCell><StyledTableCell>${formatNumber(target_goals?.penalty?.corp)}</StyledTableCell></TableRow></TableBody></Table></TableContainer></CardContent></StyledCard></Grid>
                        </Grid>
                        
                        {/* --- RIGHT COLUMN --- */}
                        <Grid item xs={12} lg={6} container spacing={4} direction="column">
                            <Grid item>
                                <StyledCard>
                                    <StyledCardHeader 
                                        title="Current Year CO2e Reduction Goal (%)"
                                        action={
                                            hasUnsavedChanges && 
                                            <Button variant="contained" size="small" color="primary" onClick={handleConfirmChanges} sx={{ mr: 1, textTransform: 'none' }}>
                                                Confirm Changes
                                            </Button>
                                        }
                                    />
                                    <CardContent sx={{ p: 1.5, mb: -1.7 }}>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Slider
                                                value={dashboardState.co2eGoal}
                                                onChange={(_e, val) => handleSliderChange(val as number, 'co2eGoal')}
                                                // MODIFICATION: onChangeCommitted removed
                                                size="small"
                                                sx={{ flexGrow: 1 }}
                                            />
                                            <Typography variant="body2" color="text.secondary" minWidth="40px" textAlign="right">
                                                <b>{dashboardState.co2eGoal}%</b>
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                           <Grid item><StyledCard><StyledCardHeader title="PLANT ALLOCATION" /><CardContent sx={{ p: '0 !important', mb: -0.1 }}><TableContainer><Table size="small"><TableHead><TableRow><HeaderCell>System</HeaderCell><HeaderCell>Allocation %</HeaderCell></TableRow></TableHead><TableBody><TableRow><LabelCell>PLANT</LabelCell><StyledTableCell><Box display="flex" alignItems="center" gap={1} px={1}><Slider value={dashboardState.derAllocation.PLANT} disabled size="small" sx={{ flexGrow: 1 }} /><Typography variant="body2" fontWeight="medium" minWidth="35px">{dashboardState.derAllocation.PLANT}%</Typography></Box></StyledTableCell></TableRow></TableBody></Table></TableContainer></CardContent></StyledCard></Grid>
                           <Grid item><StyledCard><StyledCardHeader title="DER SYSTEM" /><CardContent sx={{ p: '0 !important', mb: -4.1 }}><TableContainer><Table size="small"><TableHead><TableRow><HeaderCell>DER System</HeaderCell><HeaderCell>Allocation%</HeaderCell></TableRow></TableHead><TableBody>{Object.entries(dashboardState.derAllocation).filter(([name]) => name !== 'PLANT').map(([name, value]) => (<TableRow key={name}><LabelCell>{name}</LabelCell><StyledTableCell><Box display="flex" alignItems="center" gap={1} px={1}><Slider value={value} onChange={(_e, val) => handleSliderChange(val as number, name)} size="small" sx={{ flexGrow: 1 }} /><Typography variant="body2" fontWeight="medium" minWidth="35px">{value}%</Typography></Box></StyledTableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></StyledCard></Grid>
                           <Grid item><StyledCard><StyledCardHeader title="CURRENT YEAR SUMMARY" /><CardContent sx={{ p: 0, mb: -3.1 }}><TableContainer><Table size="small"><TableBody><TableRow><StyledTableCell colSpan={3} sx={{ textAlign: 'right', py: 0.5, border: 0 }}>YTD: {formatString(current_year_summary?.current_month)}</StyledTableCell></TableRow><TableRow><LabelCell>YTD CO2e</LabelCell><RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell><StyledTableCell>Metric Tons</StyledTableCell></TableRow><TableRow><LabelCell>Current Month</LabelCell><StyledTableCell colSpan={2}>{formatString(current_year_summary?.current_month)}</StyledTableCell></TableRow><TableRow><LabelCell>Up/Down from previous month</LabelCell><RedCell colSpan={2}>{formatNumber(current_year_summary?.difference_from_last_month, 1)}% ({formatString(current_year_summary?.up_or_down)})</RedCell></TableRow><TableRow><LabelCell>Current Year CO2e Reduction Goal Amount</LabelCell><StyledTableCell>{formatNumber(current_year_summary?.emission_reduction_goal)}</StyledTableCell><StyledTableCell>Metric Tons</StyledTableCell></TableRow></TableBody></Table></TableContainer></CardContent></StyledCard></Grid>
                        </Grid>
                    </Grid>

                    {/* --- CHARTS SECTION --- */}
                    <Box mt={5}><Typography variant="h5" component="h2" textAlign="center" fontWeight="bold" mb={3} color="text.primary">Emissions Monitoring</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}><StyledCard><StyledCardHeader title={<Box display="flex" justifyContent="space-between" alignItems="center">{`CO2e - ${dashboardState.selectedLocationName || 'Location'} (${dashboardState.selectedSource || 'Source'})`}<IconButton size="small" onClick={() => setExpandedChart({ key: 'combo', title: 'Composite View' })}><Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography></IconButton></Box>} /><CardContent sx={{p: {xs: 1, sm: 2}}}><ResponsiveContainer width="100%" height={250}><ComposedChart data={chartData.all} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey={selectedLocationSourceKey} fill="#FF9F40" name="Baseline" /><Bar dataKey="DER" fill="#4BC0C0" name="With DER" /></ComposedChart></ResponsiveContainer></CardContent></StyledCard></Grid>
                            <Grid item xs={12} lg={6}><StyledCard><StyledCardHeader title={<Box display="flex" justifyContent="space-between" alignItems="center">CO2e - Electricity Only<IconButton size="small" onClick={() => setExpandedChart({ key: 'electricity', title: 'CO2e - Electricity Only' })}><Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography></IconButton></Box>} /><CardContent sx={{p: {xs: 1, sm: 2}}}><ResponsiveContainer width="100%" height={250}><BarChart data={chartData.all} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />{chartData.electric.map((loc, i) => (<Bar key={`${loc.location}-${loc.source}`} dataKey={`${loc.location} (${loc.source})`} stackId="a" fill={`hsl(${i * 60}, 70%, 50%)`} />))}</BarChart></ResponsiveContainer></CardContent></StyledCard></Grid>
                            <Grid item xs={12} lg={6}><StyledCard><StyledCardHeader title={<Box display="flex" justifyContent="space-between" alignItems="center">CO2e - All Locations<IconButton size="small" onClick={() => setExpandedChart({ key: 'allLocations', title: 'CO2e - All Locations' })}><Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography></IconButton></Box>} /><CardContent sx={{p: {xs: 1, sm: 2}}}><ResponsiveContainer width="100%" height={250}><BarChart data={chartData.all} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />{(data ?? []).map((loc, i) => (<Bar key={`${loc.location}-${loc.source}`} dataKey={`${loc.location} (${loc.source})`} stackId="a" fill={`hsl(${i * 60}, 70%, 50%)`} />))}</BarChart></ResponsiveContainer></CardContent></StyledCard></Grid>
                            <Grid item xs={12} lg={6}><StyledCard><StyledCardHeader title={<Box display="flex" justifyContent="space-between" alignItems="center">CO2e - Natural Gas Only<IconButton size="small" onClick={() => setExpandedChart({ key: 'naturalGas', title: 'CO2e - Natural Gas Only' })}><Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>⛶</Typography></IconButton></Box>} /><CardContent sx={{p: {xs: 1, sm: 2}}}><ResponsiveContainer width="100%" height={250}><BarChart data={chartData.all} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />{chartData.gas.map((loc, i) => (<Bar key={`${loc.location}-${loc.source}`} dataKey={`${loc.location} (${loc.source})`} stackId="a" fill={`hsl(${180 + i * 60}, 70%, 50%)`} />))}</BarChart></ResponsiveContainer></CardContent></StyledCard></Grid>
                        </Grid>
                    </Box>

                    <Box mt={5}><Grid item><StyledCard><StyledCardHeader title="EMISSIONS BY SCOPE" /><CardContent sx={{ p: 0, mb: -3.1, flexGrow: 1 }}><TableContainer component={Paper} elevation={0} sx={{ height: '100%' }}><Table size="small" sx={{ height: '100%' }}><TableHead><TableRow><HeaderCell>SCOPE 1</HeaderCell><HeaderCell>SCOPE 2</HeaderCell><HeaderCell>SCOPE 3</HeaderCell></TableRow></TableHead><TableBody><TableRow><StyledTableCell>{selectedLocationData?.source === 'gas' ? <RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell> : 'N/A'}</StyledTableCell><StyledTableCell>{selectedLocationData?.source === 'electric' ? <RedCell>{formatNumber(current_year_summary?.ytd_emissions)}</RedCell> : 'N/A'}</StyledTableCell><StyledTableCell>N/A</StyledTableCell></TableRow><TableRow sx={{verticalAlign: 'top'}}><StyledTableCell sx={{ fontSize: '0.75rem', p: 1, textAlign: 'left' }}>Direct Emissions that are owned or controlled by you. Ex. Company fleet vehicles</StyledTableCell><StyledTableCell sx={{ fontSize: '0.75rem', p: 1, textAlign: 'left' }}>Emissions that you directly caused. Ex. Emissions from the purchase of electricity</StyledTableCell><StyledTableCell sx={{ fontSize: '0.75rem', p: 1, textAlign: 'left' }}>Emissions products purchased by you, uses and disposes of.</StyledTableCell></TableRow></TableBody></Table></TableContainer></CardContent></StyledCard></Grid></Box>

                    {/* --- EXPANDED CHART MODAL --- */}
                    <Modal open={!!expandedChart} onClose={() => setExpandedChart(null)} closeAfterTransition sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Fade in={!!expandedChart}><Paper sx={{ width: '90vw', height: '90vh', p: 3, display: 'flex', flexDirection: 'column', borderRadius: '12px' }}><Box display="flex" justifyContent="space-between" alignItems="center" mb={2}><Typography variant="h6">{expandedChart?.title}</Typography><IconButton onClick={() => setExpandedChart(null)} aria-label="Close expanded chart"><CloseIcon /></IconButton></Box><Box sx={{ flexGrow: 1, height: 'calc(100% - 48px)' }}>{expandedChart?.key === 'combo' && <ResponsiveContainer width="100%" height="100%"><ComposedChart data={chartData.all}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey={selectedLocationSourceKey} fill="#FF9F40" /><Bar dataKey="DER" fill="#4BC0C0" /></ComposedChart></ResponsiveContainer>}{expandedChart?.key === 'electricity' && <ResponsiveContainer width="100%" height="100%"><BarChart data={chartData.all}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />{chartData.electric.map((loc, i) => (<Bar key={`${loc.location}-${loc.source}`} dataKey={`${loc.location} (${loc.source})`} stackId="a" fill={`hsl(${i * 60}, 70%, 50%)`} />))}</BarChart></ResponsiveContainer>}{expandedChart?.key === 'allLocations' && <ResponsiveContainer width="100%" height="100%"><BarChart data={chartData.all}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />{(data ?? []).map((loc, i) => (<Bar key={`${loc.location}-${loc.source}`} dataKey={`${loc.location} (${loc.source})`} stackId="a" fill={`hsl(${i * 60}, 70%, 50%)`} />))}</BarChart></ResponsiveContainer>}{expandedChart?.key === 'naturalGas' && <ResponsiveContainer width="100%" height="100%"><BarChart data={chartData.all}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />{chartData.gas.map((loc, i) => (<Bar key={`${loc.location}-${loc.source}`} dataKey={`${loc.location} (${loc.source})`} stackId="a" fill={`hsl(${180 + i * 60}, 70%, 50%)`} />))}</BarChart></ResponsiveContainer>}</Box></Paper></Fade></Modal>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default EmissionsDashboard;

