import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const SubStep1: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
            </style>
            <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
                <h2>Bradley's Recommendation For Acme Manufacturing</h2>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
                <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.8rem' ,textAlign :'center'}}>
                    <b>Bradley.ai</b> recommends a hybrid system for Acme Manufacturing. This system combines solar panels, battery storage, and a natural gas generator to optimize energy costs, reduce emissions, and provide reliable backup power.
                </Typography>
                <Typography variant="h1" sx={{ mb: -1, mt: 1, fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.75rem' ,fontWeight :'bold' ,textAlign :'center'}}>
                    <h2>Key Benefits:</h2>
                </Typography>
                <Box sx={{ fontFamily :'Nunito Sans,sans-serif' ,display :'flex' ,justifyContent :'space-between' ,gap : 2 ,mt : 1 }}>
                    {[...Array(3)].map((_, index) => (
                        <Card key={index} sx={{ flex : 1,padding : 1,textAlign :'center' ,backgroundColor:'#f5f5f5' ,boxShadow : 0,borderRadius :'8px' ,pb : 0 }}>
                            <CardContent>
                                {index === 0 && (
                                    <>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontWeight :'bold' ,fontSize :'1rem' ,pb : 1 }}><b>Prorjected Annual Savings:</b><br /><span style={{ color: '#2bad31' }}>$45,000</span></Typography>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.7rem' ,color :'gray', pt: 1}}>The projected annual savings of $45,000 is a significant financial benefit.</Typography>
                                    </>
                                )}
                                {index === 1 && (
                                    <>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontWeight :'bold' ,fontSize :'1rem' ,pb : 1 }}><b>Estimated CO2 Reduction:</b><br /><span style={{ color: '#2bad31' }}>25%</span></Typography>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.7rem' ,color :'gray', pt: 1}}>A 25% reduction in CO2 emissions is a substantial environmental impact.</Typography>
                                    </>
                                )}
                                {index === 2 && (
                                    <>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontWeight :'bold' ,fontSize :'1rem' ,pb : 1 }}><b>Backup Power Capacity:</b><br /><span style={{ color: '#2bad31' }}>4 Hours</span></Typography>
                                        <Typography sx={{ fontFamily :'Nunito Sans,sans-serif' ,fontSize :'0.7rem' ,color :'gray', pt: 1}}>4 hours of backup power capacity provides a reasonable level of protectection against outages.</Typography>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SubStep1;