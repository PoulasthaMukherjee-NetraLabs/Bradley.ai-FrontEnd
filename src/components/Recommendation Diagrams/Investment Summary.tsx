import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Fade,
} from '@mui/material';
import {
    PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer,
    BarChart as RechartsBarChart, Bar as RechartsBar, XAxis, YAxis, CartesianGrid, LabelList, Line, ComposedChart, /* Text, */ Label
} from 'recharts';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip as ChartJsTooltip,
    Legend as ChartJsLegend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2'; 

const projectCostDataPrecise = [
    { name: 'Material', value: 2963019 },
    { name: 'Labor', value: 737586 },
    { name: 'Taxes', value: 453283 },
    { name: 'Other (Engineering & Construction)', value: 1209 },
];
const totalProjectCostCalculated = projectCostDataPrecise.reduce((sum, entry) => sum + entry.value, 0);
const projectCostColors = ['#FFA500', '#FF8C00', '#FF1493', '#DA70D6', '#48D1CC'];

const incentivesDataPrecise = [
    { name: 'Utility Rebate', value: 1813133 },
    { name: 'Investment Tax Credit', value: 775000 },
    { name: 'State Grant', value: 50000 },
];
const totalIncentivesCalculated = incentivesDataPrecise.reduce((sum, entry) => sum + entry.value, 0);

const netInvestmentData = {
    totalProjectCost: 4155097,
    totalIncentives: 2638133,
};
const netProjectCostCalculated = netInvestmentData.totalProjectCost - netInvestmentData.totalIncentives;

const macrsDataPrecise = [
    { year: 1, annualDeduction: 831019, cumulativeTaxSavings: 174514 },
    { year: 2, annualDeduction: 1329631, cumulativeTaxSavings: 453737 },
    { year: 3, annualDeduction: 797779, cumulativeTaxSavings: 621270 },
    { year: 4, annualDeduction: 478667, cumulativeTaxSavings: 721790 },
    { year: 5, annualDeduction: 478667, cumulativeTaxSavings: 822310 },
    { year: 6, annualDeduction: 239334, cumulativeTaxSavings: 872510 },
];

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartJsTooltip,
    ChartJsLegend,
    ChartDataLabels
);

const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
};
const formatCurrencyWithCents = (value: number): string => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const renderPieValueLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, isLarge }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percent * 100 < (isLarge ? 4 : 8)) return null;
    return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={isLarge ? 10 : 8} fontWeight="bold" style={{ pointerEvents: 'none' }}>
            {`${formatCurrency(value)}`}
        </text>
    );
};

export const InvestmentSummary: React.FC<{ size: 'small' | 'large' }> = ({ size }) => {
    const isLarge = size === 'large';
    const chartHeight = isLarge ? 320 : 220;
    const titleFontSize = isLarge ? '1.1rem' : '0.9rem';
    const gridSpacing = isLarge ? 4 : 2;
    const paperPadding = isLarge ? 3 : 2;
    const legendIconSize = isLarge ? 10 : 8;
    const legendFontSize = isLarge ? '0.8rem' : '0.7rem';
    const axisTickFontSize = isLarge ? 11 : 9;
    const labelListFontSize = isLarge ? 10 : 8;

    const waterfallLabels = ['Total Project Cost', 'Total Incentives', 'Net Project Cost'];
    const waterfallDataValues = [
        [0, netInvestmentData.totalProjectCost],
        [netProjectCostCalculated, netInvestmentData.totalProjectCost],
        [0, netProjectCostCalculated],
    ];

    const floatingBarWaterfallData = {
        labels: waterfallLabels,
        datasets: [
            {
                data: waterfallDataValues,
                backgroundColor: ['#4682B4', '#2E8B57', '#008080'],
                barPercentage: isLarge ? 0.6 : 0.5,
                categoryPercentage: 0.7,
            },
        ],
    };

    const floatingBarWaterfallOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'x' as const,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = waterfallLabels[context.dataIndex] || context.label || '';
                        const value = context.raw as number[];
                        let displayValue;
                        let prefix = '';
                        if (label === 'Total Incentives') {
                            displayValue = value[1] - value[0];
                            prefix = '-';
                        } else {
                            displayValue = value[1];
                        }
                        return `${label}: ${prefix}${formatCurrencyWithCents(displayValue)}`;
                    },
                },
            },
            datalabels: {
                color: 'white',
                rotation: -90,
                anchor: 'center' as const,
                align: 'center' as const,
                font: { /* weight: 'bold', */ size: isLarge ? 13 : 8 },
                formatter: (value: number[], context: any) => {
                    const barLabel = waterfallLabels[context.dataIndex];
                    let displayValue;
                    let prefix = '';
                    if (barLabel === 'Total Incentives') {
                        displayValue = value[1] - value[0];
                        prefix = '-';
                        if (Math.abs(displayValue) < (netInvestmentData.totalProjectCost * 0.05) && !isLarge) return null;
                         if (Math.abs(displayValue) < (netInvestmentData.totalProjectCost * 0.03) && isLarge) return null;
                    } else {
                        displayValue = value[1];
                        if (Math.abs(displayValue) < (netInvestmentData.totalProjectCost * 0.05) && !isLarge) return null;
                         if (Math.abs(displayValue) < (netInvestmentData.totalProjectCost * 0.03) && isLarge) return null;
                    }
                    return `${barLabel}\n${prefix}${formatCurrency(displayValue)}`;
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: false },
                ticks: { font: { size: axisTickFontSize } },
            },
            y: {
                grid: { drawBorder: false, borderDash: [3, 3], color: '#e0e0e0' },
                ticks: {
                    callback: function (val: number | string) { return `$${Number(val) / 1000000}M`; },
                    font: { size: axisTickFontSize },
                },
                // suggestedMin: 0,
                // suggestedMax: netInvestmentData.totalProjectCost * 1.05,
            },
        },
    };

    return (
        <Box sx={{ width: '100%', p: isLarge ? 3 : 1 }}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: paperPadding, height: chartHeight + (isLarge ? 80 : 60), display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}>
                            Total Estimated Project Cost
                        </Typography>
                        <Box sx={{ flexGrow: 1, position: 'relative' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart margin={{ top: 0, right: 0, bottom: (isLarge ? 30 : 10), left: 0 }}>
                                    <Pie
                                        data={projectCostDataPrecise} cx="50%" cy="50%" labelLine={false}
                                        label={(props) => renderPieValueLabel({ ...props, isLarge: isLarge })}
                                        outerRadius={isLarge ? 120 : 80} innerRadius={isLarge ? 80 : 50}
                                        fill="#8884d8" dataKey="value" nameKey="name" paddingAngle={isLarge ? 4 : 2}
                                    >
                                        {projectCostDataPrecise.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={projectCostColors[index % projectCostColors.length]} stroke="white" strokeWidth={1} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip formatter={(value: number) => formatCurrencyWithCents(value)} />
                                    <RechartsLegend iconSize={legendIconSize} wrapperStyle={{ fontSize: legendFontSize, paddingTop: '15px', position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', textAlign: 'center' }} layout="horizontal" align="center" verticalAlign="bottom" />
                                </PieChart>
                            </ResponsiveContainer>
                            <Box sx={{ position: 'absolute', top: '43%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
                                <Fade in timeout={isLarge ? 4000 : 4000}>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', fontSize: isLarge ? '1.5rem' : '1rem' }}>
                                        {formatCurrency(totalProjectCostCalculated)}
                                    </Typography>
                                </Fade>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: paperPadding, height: chartHeight + (isLarge ? 80 : 60), display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}>
                            Available Financial Incentives
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2, fontSize: isLarge ? '1rem' : '0.8rem' }}>
                            Total Incentives: {formatCurrency(totalIncentivesCalculated)}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={[...incentivesDataPrecise].sort((a, b) => b.value - a.value)} layout="vertical" margin={{ top: 5, right: isLarge ? 30 : 10, left: isLarge ? 20 : 0, bottom: 5 }} barCategoryGap={isLarge ? "20%" : "30%"}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} tick={{ fontSize: axisTickFontSize }} domain={[0, 'auto']}>
                                        <Label value="Value ($)" offset={0} position="insideBottom" style={{ textAnchor: 'middle', fontSize: axisTickFontSize }} />
                                    </XAxis>
                                    <YAxis dataKey="name" type="category" width={isLarge ? 120 : 80} tick={{ fontSize: axisTickFontSize }} />
                                    <RechartsTooltip formatter={(value: number) => formatCurrencyWithCents(value)} />
                                    <RechartsBar dataKey="value" fill="#2E8B57" radius={[0, 4, 4, 0]} label={{ position: 'right', formatter: (value: number) => formatCurrency(value), fontSize: labelListFontSize }} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: paperPadding, height: chartHeight + (isLarge ? 80 : 60), display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 1.5 }}>
                            Net Project Investment After Incentives
                        </Typography>
                        <Box sx={{ flexGrow: 1, position: 'relative' }}>
                            <Bar
                                data={floatingBarWaterfallData}
                                options={floatingBarWaterfallOptions}
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: paperPadding, height: chartHeight + (isLarge ? 80 : 60), display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontSize: titleFontSize, fontWeight: 'bold', textAlign: 'center', mb: 0.5 }}>
                            MACRS Depreciation & Cumulative Tax Savings<br />(5-Year Property)
                        </Typography>
                        <Typography variant="subtitle2" sx={{ textAlign: 'center', mb: 2, mt: 1, color: 'text.secondary', fontSize: isLarge ? '0.8rem' : '0.7rem' }}>
                            *Assumes a 21% Corporate Tax Rate for savings calculation.
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={macrsDataPrecise} margin={{ top: 20, right: isLarge ? 20 : 5, left: isLarge ? 20 : 0, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="year" tickLine={false} label={{ value: 'Year', position: 'insideBottom', offset: 0, fontSize: axisTickFontSize }} />
                                    <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `$${value / 1000000}M`} tick={{ fontSize: axisTickFontSize }}>
                                        <Label value="Annual Deduction ($)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fontSize: axisTickFontSize }} />
                                    </YAxis>
                                    <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value / 1000000}M`} tick={{ fontSize: axisTickFontSize }} stroke="#2E8B57">
                                        <Label value="Cumulative Tax Savings ($)" angle={90} position="insideRight" style={{ textAnchor: 'middle', fill: '#2E8B57', fontSize: axisTickFontSize }} />
                                    </YAxis>
                                    <RechartsTooltip
                                        formatter={(value: number, name: string) => {
                                            if (name === 'annualDeduction') return [`Annual Deduction: ${formatCurrencyWithCents(value)}`];
                                            if (name === 'cumulativeTaxSavings') return [`Cumulative Tax Savings: ${formatCurrencyWithCents(value)}`];
                                            return formatCurrencyWithCents(value) as any;
                                        }}
                                    />
                                    <RechartsLegend wrapperStyle={{ fontSize: legendFontSize, paddingTop: '10px' }} />
                                    <RechartsBar yAxisId="left" dataKey="annualDeduction" fill="#4682B4" barSize={isLarge ? 40 : 25} radius={[4, 4, 0, 0]}>
                                        <LabelList dataKey="annualDeduction" position="top" formatter={(value: number) => formatCurrency(value)} style={{ fontSize: labelListFontSize, fill: '#444' }} />
                                    </RechartsBar>
                                    <Line yAxisId="right" type="monotone" dataKey="cumulativeTaxSavings" stroke="#2E8B57" strokeWidth={isLarge ? 2 : 1} dot={{ r: isLarge ? 4 : 3 }} activeDot={{ r: isLarge ? 6 : 5 }}>
                                        <LabelList dataKey="cumulativeTaxSavings" position="top" formatter={(value: number) => formatCurrency(value)} style={{ fontSize: labelListFontSize, fill: '#2E8B57' }} />
                                    </Line>
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
