import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TimerIcon from '@mui/icons-material/Timer';
import { millisecondsToTime, formatDate } from '../utils/timeUtils';
import TimeTrialForm from './TimeTrialForm';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const HeaderCell = ({ icon, children }) => (
  <TableCell>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      {children}
    </Box>
  </TableCell>
);

const TimeTrialsList = ({ timeTrials, onDelete, onUpdate }) => {
  const [editingTrial, setEditingTrial] = useState(null);

  const handleEdit = (trial) => {
    setEditingTrial(trial);
  };

  const handleEditSubmit = async (updatedData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/timetrials/${editingTrial._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update time trial');
      }

      const updatedTrial = await response.json();
      onUpdate(updatedTrial);
      setEditingTrial(null);
    } catch (error) {
      console.error('Error updating time trial:', error);
    }
  };

  const handleClose = () => {
    setEditingTrial(null);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
          mt: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell icon={<MapIcon />}>Track</HeaderCell>
              <HeaderCell icon={<TimerIcon />}>Time</HeaderCell>
              <HeaderCell icon={<PersonIcon />}>Character</HeaderCell>
              <HeaderCell icon={<DirectionsCarIcon />}>Vehicle</HeaderCell>
              <HeaderCell icon={<CalendarTodayIcon />}>Date</HeaderCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timeTrials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box
                    sx={{
                      py: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <TimerIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                    <Typography
                      align="center"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      No time trials recorded yet
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              timeTrials.map((trial) => (
                <TableRow key={trial._id}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                    {trial.trackName}
                  </TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>
                    {millisecondsToTime(trial.timeInMs)}
                  </TableCell>
                  <TableCell>{trial.character}</TableCell>
                  <TableCell>{trial.vehicle}</TableCell>
                  <TableCell>{formatDate(trial.date)}</TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleEdit(trial)} 
                      color="primary" 
                      size="small"
                      sx={{ 
                        color: 'rgba(158, 158, 158, 1)',
                        '&:hover': {
                          backgroundColor: 'rgba(144, 202, 249, 0.08)'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => onDelete(trial._id)} 
                      color="error" 
                      size="small"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(211, 47, 47, 0.04)',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={Boolean(editingTrial)} onClose={handleClose} maxWidth="sm" fullWidth>
        <TimeTrialForm
          initialData={editingTrial}
          onSubmit={handleEditSubmit}
          onCancel={handleClose}
          isEditing={true}
        />
      </Dialog>
    </>
  );
};

export default TimeTrialsList;
