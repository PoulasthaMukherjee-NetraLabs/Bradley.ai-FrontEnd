import React, { useState } from 'react';
import {
  Box, Typography, TextField, Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, ToggleButton, ToggleButtonGroup, Card, CardContent, Grid, Pagination, Checkbox
} from '@mui/material';
import { Search, TableChart, ViewModule, Edit, Delete } from '@mui/icons-material';

const projects = [
  { id: 1, name: 'Project A', client: 'John Doe', status: 'Onboarding', remarks: 'Initial setup for stakeholders.' },
  { id: 2, name: 'Project B', client: 'Jane Smith', status: 'Analysis in Progress', remarks: 'Data collection ongoing.' },
  { id: 3, name: 'Project C', client: 'Alice Johnson', status: 'Analyst Review', remarks: 'Metrics review initiated.' },
  { id: 4, name: 'Project D', client: 'Bob Brown', status: 'Ready for Recommendation', remarks: 'Final review before submission.' },
  { id: 5, name: 'Project E', client: 'Charlie Davis', status: 'Completed', remarks: 'Documentation finalized.' },
];

const Projects: React.FC = () => {
  const [view, setView] = useState<'table' | 'card'>('table');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof typeof projects[0] | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: 'table' | 'card') => {
    if (newView) setView(newView);
  };

  const handleSort = (column: keyof typeof projects[0]) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setSelectedProjects(checked ? filteredProjects.map(p => p.id) : []);
  };

  const handleSelectProject = (projectId: number) => {
    setSelectedProjects(prev => {
      const newSelection = prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId];
      setSelectAll(newSelection.length === filteredProjects.length);
      return newSelection;
    });
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase()) ||
    project.client.toLowerCase().includes(search.toLowerCase()) ||
    project.status.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortColumn) {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(sortedProjects.length / pageSize);
  const paginatedProjects = sortedProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <Box sx={{ p: 2, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Project List
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <Search fontSize="small" /> }}
          />
          <ToggleButtonGroup value={view} exclusive onChange={handleViewChange} size="small">
            <ToggleButton value="table"><TableChart fontSize="small" /></ToggleButton>
            <ToggleButton value="card"><ViewModule fontSize="small" /></ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {view === 'table' ? (
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectAll}
                    indeterminate={selectedProjects.length > 0 && selectedProjects.length < sortedProjects.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                {['name', 'client', 'status', 'remarks'].map((column) => (
                  <TableCell
                    key={column}
                    onClick={() => handleSort(column as keyof typeof projects[0])}
                    sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                    {sortColumn === column && (
                      <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                    )}
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProjects.includes(project.id)}
                      onChange={() => handleSelectProject(project.id)}
                    />
                  </TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>{project.remarks}</TableCell>
                  <TableCell>
                    <IconButton size="small"><Edit fontSize="small" /></IconButton>
                    <IconButton size="small"><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {paginatedProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{project.name}</Typography>
                  <Typography color="textSecondary">Client: {project.client}</Typography>
                  <Typography color="textSecondary">Status: {project.status}</Typography>
                  <Typography variant="body2">{project.remarks}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton size="small"><Edit fontSize="small" /></IconButton>
                    <IconButton size="small"><Delete fontSize="small" /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default Projects;
