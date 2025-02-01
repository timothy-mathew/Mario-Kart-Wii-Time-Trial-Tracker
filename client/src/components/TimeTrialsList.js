import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TimeTrialsList = ({ timeTrials, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Track</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Character</TableCell>
            <TableCell>Vehicle</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeTrials.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Typography align="center">No time trials recorded yet</Typography>
              </TableCell>
            </TableRow>
          ) : (
            timeTrials.map((trial) => (
              <TableRow key={trial._id}>
                <TableCell>{trial.trackName}</TableCell>
                <TableCell>{trial.time}</TableCell>
                <TableCell>{trial.character}</TableCell>
                <TableCell>{trial.vehicle}</TableCell>
                <TableCell>
                  {new Date(trial.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(trial._id)}
                    size="small"
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
