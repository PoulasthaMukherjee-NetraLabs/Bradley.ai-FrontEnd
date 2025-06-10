import React, { useState, useRef } from 'react';
import { Box, TextField, Typography, Tooltip, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const SubStep2: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleUploadBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', p: 1, pr: 4, pl: 1, pt: 1 }}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
      </style>
      <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
        <h2>Electric Bill Upload</h2>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, pt: '10px', pb: '10px', pl: '160px', pr: '160px' }}>
          <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'center' }}><b>Bradley will extract the expense, usage (kW demand and kWh usage), tax, tariff and other data from your uploaded utility bills for the technical and financial modeling algorithms.</b></Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
            <Typography sx={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '150px', flex: 0.25 }}><b>Data Range (Optional):</b></Typography>
            <Tooltip title="Start date" placement='top-start' arrow>
              <TextField
                variant="outlined"
                size="small"
                type="date"
                sx={{
                  flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
                }}
              />
            </Tooltip>
            to
            <Tooltip title="End date" placement='top-end' arrow>
              <TextField
                variant="outlined"
                size="small"
                type="date"
                sx={{
                  flex: 0.75, fontFamily: 'Nunito Sans, sans-serif',
                  fontSize: '0.7rem',
                  '& .MuiInputBase-root': { height: '40px', padding: '0 6px' },
                  '& input': { padding: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.8rem' }
                }}
              />
            </Tooltip>
          </Box>
          <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Minimum of 12 months of data/24+ months for optimal results.</Typography>

          <input
            type="file"
            multiple
            accept=".pdf,.xls,.xlsx,.csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />

          <Tooltip title="Click to upload files here." placement='top-start' arrow>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px dashed grey',
                borderRadius: 2,
                p: 2,
                mb: 0,
                mt: 1.5,
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
              onClick={handleUploadBoxClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <CloudUploadIcon fontSize='medium' />
              <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', ml: 1 }}>Drag and drop files here or click to upload (PDF, Excel, CSV)</Typography>
            </Box>
          </Tooltip>

          <Typography sx={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif', mb: 0, textAlign: 'right' }}><b>*</b>Accepted File Formats: .xls, .xlsx, .csv</Typography>

          {selectedFiles.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: '0.8rem', fontFamily: 'Nunito Sans, sans-serif', mb: 1, fontWeight: 'bold' }}>Uploaded Files:</Typography>
              <List dense>
                {selectedFiles.map((file, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(file.name)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={file.name}
                      secondary={formatFileSize(file.size)}
                      primaryTypographyProps={{ fontSize: '0.75rem', fontFamily: 'Nunito Sans, sans-serif' }}
                      secondaryTypographyProps={{ fontSize: '0.65rem', fontFamily: 'Nunito Sans, sans-serif' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Typography sx={{ mt: 0, fontFamily: 'Nunito Sans, sans-serif', fontSize: '0.75rem', minWidth: '200px', flex: 1 }}><i><b>*</b>To accurately develop the <b>DER</b>, <b>Bradley</b> will need you to approve the <b>LOA</b>. The <b>LOA</b> allows <b>Bradley</b> to directly pull the demand/usage data of your <b>Electric Load Profile</b>, providing critical energy use details that will increase the accuracy of the <b>DER</b> solution.</i></Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SubStep2;