import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Box, CircularProgress, Typography, Backdrop } from '@mui/material';
import { useDashboardData, type DashboardData, type DashboardDataObject } from '../../../../Context/DashboardDataContext';
import EmissionsDashboard from './EmissionsDashboard';

const loadingMessages = [
    "Recalculating emissions based on new parameters...",
    "Analyzing DER (Distributed Energy Resources) impact...",
    "Fetching updated projections from the server...",
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

    useEffect(() => {
        if (uniqueLocations.length > 0 && !selectedLocation) {
            setSelectedLocation(uniqueLocations[0]);
        }
    }, [uniqueLocations, selectedLocation]);

    useEffect(() => {
        if (selectedLocation) {
            setIsFiltering(true); 
            if (availableSources.length > 0) {
                if (!availableSources.includes(selectedSource)) {
                    setSelectedSource(availableSources[0]);
                }
            } else {
                setSelectedSource('');
            }
        }
    }, [selectedLocation, availableSources, selectedSource]);

    useEffect(() => {
        if (availableYears.length > 0 && !availableYears.includes(Number(selectedYear))) {
            setSelectedYear(availableYears[0]);
        } else if (availableYears.length === 0) {
            setSelectedYear('');
        }
        
        if (nextData) {
            setActiveData(nextData);
            setIsFiltering(false); 
        }

    }, [availableYears, selectedYear, nextData]);


    useEffect(() => {
        let connectAttempts = 0;
        const maxConnectAttempts = 4;
        const retryDelays = [3000, 6000, 10000];

        const connect = () => {
            if (socketRef.current || connectAttempts >= maxConnectAttempts) return;

            const socketInstance = new WebSocket('wss://bradley-emission.onrender.com/ws');
            socketRef.current = socketInstance;

            socketInstance.onopen = () => {
                console.log("WebSocket connected.");
                connectAttempts = 0;
            };

            socketInstance.onmessage = (event) => {
                setIsUpdating(false);
                try {
                    const receivedData = JSON.parse(event.data);
                    
                    setDashboardData((prevDashboardData) => {
                        if (!prevDashboardData) {
                            if (Array.isArray(receivedData)) {
                                return receivedData as DashboardData;
                            }
                            return null;
                        }

                        if (Array.isArray(receivedData)) {
                            return receivedData as DashboardData;
                        }
                        
                        // --- FIX: Handle partial 'der_control_panel' update ---
                        // Case 2: Response is a partial object with NO file_id, but HAS der_control_panel
                        // We assume this update is for the *currently active* dashboard data
                        if (receivedData.der_control_panel && !receivedData.file_id && activeData) {
                            console.log(`WS: Received partial 'der_control_panel' update for active file_id: ${activeData.file_id}`);

                            const updatedObject = {
                                ...activeData, // Get the full object for the active dashboard
                                der_control_panel: receivedData.der_control_panel // Overwrite just the der_control_panel part
                            };

                            // Update the activeData state immediately to re-render the dashboard
                            setActiveData(updatedObject);
                            
                            // Update the main dashboardData array
                            return prevDashboardData.map(item => {
                                if (String(item.file_id) === String(activeData.file_id)) {
                                    return updatedObject; 
                                }
                                return item;
                            });
                        }
                        // --- END FIX ---

                        // Case 3: Response is a full object (as originally expected)
                        if (receivedData.file_id && typeof receivedData === 'object' && !Array.isArray(receivedData)) {
                            console.log(`WS: Received full object update for file_id: ${receivedData.file_id}`);

                            if (String(activeData?.file_id) === String(receivedData.file_id)) {
                                setActiveData(receivedData as DashboardDataObject);
                            }
                            
                            return prevDashboardData.map(item => {
                                if (String(item.file_id) === String(receivedData.file_id)) {
                                    return receivedData as DashboardDataObject; 
                                }
                                return item;
                            });
                        }
                        
                        console.warn("Received unexpected data format from WebSocket:", receivedData);
                        return prevDashboardData;
                    });

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
    }, [setDashboardData, activeData]); // Added activeData

    useEffect(() => {
        if (isUpdating || isFiltering) { 
            const timer = setInterval(() => {
                setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [isUpdating, isFiltering]);

    const handleConfirmChanges = (newUserMix: { [key: string]: number }, location: string, source: string) => {
        const dataForPayload = dashboardData?.find(d => d.location === location && d.source === source);
        if (socketRef.current?.readyState === WebSocket.OPEN && dataForPayload) {
            const payload = {
                source: dataForPayload.source,
                zipcode: (dataForPayload as any).zipcode, 
                location: dataForPayload.location,
                file_id: String(dataForPayload.file_id),
                current_mix_pct: newUserMix
            };
            socketRef.current.send(JSON.stringify(payload));
            setIsUpdating(true);
            setHasUnsavedChanges(false);
        } else {
            console.error('Socket not connected or active data is missing.');
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
                onSourceChange={setSelectedSource}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
            />
        </Box>
    );
};

export default EmissionsDashboardWrapper;