import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TimerIcon from '@mui/icons-material/Timer';
import { millisecondsToTime } from '../utils/timeUtils';

const TimeTrialsList = ({ timeTrials, onDelete }) => {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        mt: 3
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Track</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Character</TableCell>
            <TableCell>Vehicle</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeTrials.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Box sx={{ 
                  py: 8, 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}>
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
              <TableRow 
                key={trial._id}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  }
                }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                  {trial.trackName}
                </TableCell>
                <TableCell sx={{ color: 'primary.main', fontWeight: 500 }}>
                  {trial.formattedTime || millisecondsToTime(trial.timeInMs)}
                </TableCell>
                <TableCell>{trial.character}</TableCell>
                <TableCell>{trial.vehicle}</TableCell>
                <TableCell>
                  {new Date(trial.date).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(trial._id)}
                    size="small"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(211, 47, 47, 0.04)'
                      }
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
  );
};

export default TimeTrialsList;
