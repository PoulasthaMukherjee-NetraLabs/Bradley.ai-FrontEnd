import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import { useDashboardData, type DashboardData, type DashboardDataObject, type SRECMetrics } from '../../../../Context/DashboardDataContext';
import EmissionsDashboard from './EmissionsDashboard';

const loadingMessages = [
    "Recalculating emissions based on new parameters...",
    "Analyzing DER (Distributed Energy Resources) impact...",
    "Fetching updated projections from the server...",
    "Calculating SREC impact...",
];

const EmissionsDashboardWrapper: React.FC = () => {
    const { dashboardData, setDashboardData, isLoading: isInitialLoading } = useDashboardData();

    const socketRef = useRef<WebSocket | null>(null);
    const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isUpdating, setIsUpdating] = useState(false);
    
    const [isFiltering, setIsFiltering] = useState(false); 
    
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [selectedSource, setSelectedSource] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<number | string>('');

    const [activeData, setActiveData] = useState<DashboardDataObject | null>(null);

    // --- SREC state in the wrapper ---
    const [srecPercentage, setSrecPercentage] = useState(0);
    const [calculatedSrecMetrics, setCalculatedSrecMetrics] = useState<SRECMetrics | null>(null);

    const uniqueLocations = useMemo(() => {
        if (!dashboardData) return [];
        return Array.from(new Set(dashboardData.map(d => d.location)));
    }, [dashboardData]);

    const availableSources = useMemo(() => {
        if (!dashboardData || !selectedLocation) return [];
        return Array.from(new Set(
            dashboardData.filter(d => d.location === selectedLocation).map(d => d.source)
        ));
    }, [dashboardData, selectedLocation]);

    const nextData = useMemo(() => {
        if (!dashboardData || !selectedLocation || !selectedSource) return null;
        return dashboardData.find(d => d.location === selectedLocation && d.source === selectedSource) || null;
    }, [dashboardData, selectedLocation, selectedSource]);


    const availableYears = useMemo(() => {
        if (!nextData) return []; 
        const years = new Set(nextData.monthly_tracking.monthly_emissions.map(em => em.year as number));
        return Array.from(years).sort((a, b) => b - a);
    }, [nextData]);

    // Effect 1: Set initial location
    useEffect(() => {
        if (uniqueLocations.length > 0 && !selectedLocation) {
            setSelectedLocation(uniqueLocations[0]);
        }
    }, [uniqueLocations, selectedLocation]);

    // Effect 2: Set source based on location (and reset SREC)
    useEffect(() => {
        if (selectedLocation) {
            setIsFiltering(true); 
            if (availableSources.length > 0) {
                if (!availableSources.includes(selectedSource)) {
                    setSelectedSource(availableSources[0]);
                    setSrecPercentage(0);
                    setCalculatedSrecMetrics(null);
                }
            } else {
                setSelectedSource('');
            }
        }
    }, [selectedLocation, availableSources, selectedSource]);

    // Effect 3: Set year and Active Data based on filters
    useEffect(() => {
        if (availableYears.length > 0 && !availableYears.includes(Number(selectedYear))) {
            setSelectedYear(availableYears[0]);
        } else if (availableYears.length === 0) {
            setSelectedYear('');
        }
        
        if (nextData) {
            setActiveData(nextData);
            if (calculatedSrecMetrics === null) {
                setCalculatedSrecMetrics(nextData.srec_metrics);
            }
            setIsFiltering(false); 
        }

    }, [availableYears, selectedYear, nextData, calculatedSrecMetrics]);

    // Effect 4: WebSocket connection
    useEffect(() => {
        let connectAttempts = 0;
        const maxConnectAttempts = 4;
        const retryDelays = [3000, 6000, 10000];

        const connect = () => {
            if (socketRef.current || connectAttempts >= maxConnectAttempts) return;

            const socketURL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';
            const socketInstance = new WebSocket(socketURL);
            socketRef.current = socketInstance;

            socketInstance.onopen = () => {
                console.log("WebSocket connected.");
                connectAttempts = 0;
            };

            socketInstance.onmessage = (event) => {
                setIsUpdating(false);
                try {
                    const receivedData = JSON.parse(event.data);
                    
                    if (Array.isArray(receivedData)) {
                        setDashboardData(receivedData as DashboardData);
                        return;
                    }

                    if (receivedData.type && activeData) {
                        let updatedObject: DashboardDataObject | null = null;

                        switch (receivedData.type) {
                            case "pid_result":
                                console.log(`WS: Received 'pid_result' for file_id: ${activeData.file_id}`);
                                updatedObject = {
                                    ...activeData,
                                    der_control_panel: receivedData.payload.der_control_panel
                                };
                                break;
                            
                            case "srec_result":
                                console.log(`WS: Received 'srec_result' for file_id: ${activeData.file_id}`);
                                const newSrecMetrics = receivedData.payload as SRECMetrics;
                                updatedObject = {
                                    ...activeData,
                                    srec_metrics: newSrecMetrics 
                                };
                                setCalculatedSrecMetrics(newSrecMetrics);
                                break;
                            
                            default:
                                console.warn("Received unknown WS data type:", receivedData.type);
                                return;
                        }

                        if (updatedObject) {
                            setActiveData(updatedObject); // Update active view
                            
                            // Update the master list in context
                            setDashboardData((prevDashboardData) => {
                                if (!prevDashboardData) return null;
                                return prevDashboardData.map(item => 
                                    String(item.file_id) === String(activeData.file_id) ? updatedObject! : item
                                );
                            });
                        }
                    }

                } catch (error) {
                    console.error("Failed to parse WebSocket message:", error);
                }
            };

            socketInstance.onclose = () => {
                socketRef.current = null;
                if (connectAttempts < maxConnectAttempts) {
                    const delay = retryDelays[connectAttempts];
                    console.warn(`WebSocket closed. Retrying in ${delay / 1000}s...`);
                    retryTimeoutRef.current = setTimeout(connect, delay);
                    connectAttempts++;
                } else {
                    console.error("WebSocket connection failed after multiple retries.");
                }
            };

            socketInstance.onerror = (error) => {
                console.error("WebSocket error:", error);
                socketInstance.close();
            };
        };

        connect();

        return () => {
            if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
            }
            if (socketRef.current) {
                socketRef.current.onclose = null;
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [setDashboardData, activeData]); // Depends on activeData to have file_id

    // Effect 5: Loading message spinner
    useEffect(() => {
        if (isUpdating || isFiltering) { 
            const timer = setInterval(() => {
                setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isUpdating, isFiltering]);

    // DER Panel "Confirm Changes" Handler
    const handleConfirmChanges = (newUserMix: { [key: string]: number }, location: string, source: string) => {
        const dataForPayload = dashboardData?.find(d => d.location === location && d.source === source);
        if (socketRef.current?.readyState === WebSocket.OPEN && dataForPayload) {
            
            const requestPayload = {
                type: "pid_request", 
                source: dataForPayload.source,
                zipcode: (dataForPayload as any).zipcode, 
                location: dataForPayload.location,
                file_id: String(dataForPayload.file_id),
                current_mix_pct: newUserMix
            };

            socketRef.current.send(JSON.stringify(requestPayload));
            setIsUpdating(true);
            setHasUnsavedChanges(false);
        } else {
            console.error('Socket not connected or active data is missing.');
        }
    };

    // --- NEW: Handler for Source Change (to reset SREC) ---
    const handleSourceChange = (newSource: string) => {
        if (newSource !== selectedSource) {
            setSelectedSource(newSource);
            setIsFiltering(true);
            setSrecPercentage(0);
            setCalculatedSrecMetrics(null);
        }
    };

    const handleSrecChange = (percentage: number) => {
        if (socketRef.current?.readyState === WebSocket.OPEN && activeData) {
            const requestPayload = {
                type: "srec_calc",
                source: activeData.source,
                zipcode: (activeData as any).zipcode,
                location: activeData.location,
                file_id: String(activeData.file_id),
                percentage_selected: percentage
            };
            socketRef.current.send(JSON.stringify(requestPayload));
            setIsUpdating(true);
        } else {
            console.error('Socket not connected or active data is missing for SREC update.');
        }
    };

    if (isInitialLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!dashboardData || dashboardData.length === 0) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="80vh"
                flexDirection="column"
            >
                <Typography variant="h6" color="textSecondary">
                    No dashboard data available.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Please ensure that you have uploaded the necessary data files.
                </Typography>
            </Box>
        );
    }

    if (!activeData) { 
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="80vh" flexDirection="column" gap={2}>
                <CircularProgress />
                <Typography variant="h6" color="textSecondary">
                    Loading dashboard...
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
                open={isUpdating || isFiltering}
            >
                <CircularProgress color="inherit" />
                <Typography variant="h6">{loadingMessages[loadingMessageIndex]}</Typography>
            </Backdrop>
            
            <EmissionsDashboard
                allData={dashboardData} 
                onConfirmChanges={handleConfirmChanges}
                hasUnsavedChanges={hasUnsavedChanges}
                setHasUnsavedChanges={setHasUnsavedChanges}
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                selectedSource={selectedSource}
                onSourceChange={handleSourceChange}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                srecPercentage={srecPercentage}
                onSrecPercentageChange={setSrecPercentage} 
                onSrecChangeCommitted={handleSrecChange}
                calculatedSrecMetrics={calculatedSrecMetrics}
            />
        </Box>
    );
};

export default EmissionsDashboardWrapper;

