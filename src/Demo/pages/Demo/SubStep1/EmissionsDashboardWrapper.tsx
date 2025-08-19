import React, { useEffect, useState, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDashboardData, type DashboardData } from '../../../../Context/DashboardDataContext';
import EmissionsDashboard, { type DashboardState } from './EmissionsDashboard';

const EmissionsDashboardWrapper: React.FC = () => {
    const { dashboardData, setDashboardData, isLoading } = useDashboardData();
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (dashboardData && !socketRef.current) {
            console.log("Attempting to connect WebSocket...");
            
            const socketInstance = new WebSocket('ws://127.0.0.1:8000/ws');
            socketRef.current = socketInstance;

            socketInstance.onopen = () => {
                console.log('WebSocket connected successfully.');
                setSocket(socketInstance);
            };
            
            socketInstance.onmessage = (event) => {
                try {
                    const receivedData = JSON.parse(event.data);
                    
                    if (Array.isArray(receivedData)) {
                        console.log('Received dashboard data array via WebSocket:', receivedData);
                        setDashboardData(receivedData as DashboardData);
                    } else {
                        console.log('Received non-data message (e.g., welcome or error), ignoring:', receivedData);
                    }
                } catch (error) {
                    console.error("Failed to parse incoming WebSocket message:", error);
                }
            };

            socketInstance.onclose = () => {
                console.log('WebSocket disconnected.');
                socketRef.current = null;
                setSocket(null);
            };

            socketInstance.onerror = (error) => {
                console.error("WebSocket error:", error);
                socketRef.current = null;
                setSocket(null);
            };
        }

        return () => {
            if (socketRef.current) {
                console.log('Closing WebSocket connection...');
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [dashboardData, setDashboardData]);

    const handleDashboardUpdate = (payload: DashboardState) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            console.log('Sending WebSocket message with payload:', payload);
            socket.send(JSON.stringify(payload));
        } else {
            console.error('Socket is not connected or available. Cannot send update.');
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!Array.isArray(dashboardData) || dashboardData.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <Typography color="error">
                    Dashboard data is not available or in the wrong format.
                </Typography>
            </Box>
        );
    }

    return <EmissionsDashboard data={dashboardData} onUpdate={handleDashboardUpdate} />;
};

export default EmissionsDashboardWrapper;
