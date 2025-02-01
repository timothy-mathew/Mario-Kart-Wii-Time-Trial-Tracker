import { useState, useEffect } from 'react';
import { Container, Typography, Alert, Snackbar } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import TimeTrialForm from './TimeTrialForm';
import TimeTrialsList from './TimeTrialsList';

const Dashboard = () => {
  const { user } = useAuth();
  const [timeTrials, setTimeTrials] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const fetchTimeTrials = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/timetrials`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch time trials');
      const data = await response.json();
      setTimeTrials(data);
    } catch (error) {
      console.error('Error fetching time trials:', error);
      showAlert('Failed to load time trials', 'error');
    }
  };

  useEffect(() => {
    if (user) {
      fetchTimeTrials();
    }
  }, [user]);

  const handleSubmit = async (formData) => {
    try {
      console.log('Submitting time trial:', formData); // Debug log
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/timetrials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          trackName: formData.trackName,
          timeInMs: formData.timeInMs,
          character: formData.character,
          vehicle: formData.vehicle,
          date: formData.date
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add time trial');
      }
      
      showAlert('Time trial added successfully!', 'success');
      fetchTimeTrials();
    } catch (error) {
      console.error('Error adding time trial:', error);
      showAlert('Failed to add time trial: ' + error.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/timetrials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete time trial');
      }
      
      showAlert('Time trial deleted successfully!', 'success');
      fetchTimeTrials();
    } catch (error) {
      console.error('Error deleting time trial:', error);
      showAlert('Failed to delete time trial: ' + error.message, 'error');
    }
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Time Trials
      </Typography>
      
      <TimeTrialForm onSubmit={handleSubmit} />
      <TimeTrialsList timeTrials={timeTrials} onDelete={handleDelete} />

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
