import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableRow, IconButton, TextField, Checkbox } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const SubStep1: React.FC = () => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [rowValues, setRowValues] = useState([
    `Company Name: ABC Group\nIndustry: Manufacturing\nLocation: New York, NY`,
    `Annual Energy Usage: 1,200,000 kWh\nPeak Demand: 500kW\nEnergy Source: Solar, Wind`,
    `Budget: $500,000\nROI Expectation: 5 Years`,
    `Site Size: 100,000 sq. ft\nRoof Condition: Excellent\nShading: Minimal`,
    `Down Payment: $50,000`,
  ]);

  const headers = [
    'Organizational Profile',
    'Energy Profile',
    'Goals & Priorities',
    'Site Assessment',
    'Financial Info',
  ];

  const handleEditClick = (index: number) => {
    setEditIndex(index);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newRows = [...rowValues];
    newRows[index] = event.target.value;
    setRowValues(newRows);
  };

  const handleBlur = () => {
    setEditIndex(null);
  };

  const renderEditableRow = (header: string, value: string, index: number) => (
    <Box
      sx={{
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        padding: '8px 12px',
        marginBottom: '8px',
        position: 'relative',
      }}
    >
      <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px' }}>
        {header}
      </Typography>
      {editIndex === index ? (
        <TextField
          multiline
          value={value}
          onChange={(e) => handleInputChange(e, index)}
          onBlur={handleBlur}
          autoFocus
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
          sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }}
        />
      ) : (
        <Typography
          sx={{
            fontFamily: 'Nunito Sans, sans-serif',
            fontSize: '0.75rem',
            whiteSpace: 'pre-wrap',
          }}
        >
          {value}
        </Typography>
      )}
      <IconButton
        size="small"
        onClick={() => handleEditClick(index)}
        sx={{ position: 'absolute', top: '4px', right: '4px' }}
      >
        <EditIcon sx={{ fontSize: '1rem' }} />
      </IconButton>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '0.75rem',
        p: 1,
        pr: 4,
        pl: 1,
        pt: 1,
      }}
    >
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200..1000&display=swap');
      </style>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <h2>DATA VERIFICATION AND PROCESSING</h2>
        <br />
        <h2>Processing Status & Profile Summary</h2>
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', px: '160px' }}>
        <Table
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: '#f9f9f9',
                  textAlign: 'right',
                  width: '50%',
                  borderBottom: '1px solid #ccc',
                }}
              >
                Overall Progress to Completing the DER Analysis:
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: '#036CA1',
                  textAlign: 'justify',
                  width: '50%',
                  borderBottom: '1px solid #ccc',
                }}
              >
                x% Completed
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  backgroundColor: '#f9f9f9',
                  textAlign: 'right',
                  width: '50%',
                  verticalAlign: 'middle',
                }}
              >
                Overall Profile Summary:
              </TableCell>
              <TableCell sx={{ pb: '0px' }}>
                {rowValues.map((value, index) => renderEditableRow(headers[index], value, index))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mt: 1 }}>
          <Checkbox
            sx={{
              padding: '0 0',
              '& .MuiSvgIcon-root': { fontSize: '1.1rem' },
            }}
          />
          <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem' }}>
            I have read and agreed to the terms of this Letter of Authorization.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep1;
