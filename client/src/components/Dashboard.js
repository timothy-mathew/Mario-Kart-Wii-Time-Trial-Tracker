import { useState, useEffect, useCallback } from 'react';
import { Container, Box, Button, Dialog, Snackbar, Alert, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TimeTrialForm from './TimeTrialForm';
import TimeTrialsList from './TimeTrialsList';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [timeTrials, setTimeTrials] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const { user } = useAuth();

  const showAlert = useCallback((message, severity) => {
    setAlert({ open: true, message, severity });
  }, []);

  const handleCloseAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, open: false }));
  }, []);

  const fetchTimeTrials = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/timetrials`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch time trials');
      }
      const data = await response.json();
      setTimeTrials(data);
    } catch (error) {
      console.error('Error fetching time trials:', error);
      showAlert('Failed to fetch time trials', 'error');
    }
  }, [user, showAlert]);

  useEffect(() => {
    if (user) {
      fetchTimeTrials();
    }
  }, [user, fetchTimeTrials]);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/timetrials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add time trial');
      }

      const newTimeTrial = await response.json();
      setTimeTrials(prev => [...prev, newTimeTrial]);
      setIsDialogOpen(false);
      showAlert('Time trial added successfully!', 'success');
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
        throw new Error('Failed to delete time trial');
      }

      setTimeTrials(prev => prev.filter(trial => trial._id !== id));
      showAlert('Time trial deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting time trial:', error);
      showAlert('Failed to delete time trial', 'error');
    }
  };

  const handleUpdate = async (updatedTrial) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/timetrials/${updatedTrial._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedTrial),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update time trial');
      }
      
      setTimeTrials(prev => 
        prev.map(trial => 
          trial._id === updatedTrial._id ? updatedTrial : trial
        )
      );
      showAlert('Time trial updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating time trial:', error);
      showAlert('Failed to update time trial: ' + error.message, 'error');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ 
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmojiEventsIcon 
              sx={{ 
                fontSize: 48, 
                color: 'primary.main',
                mr: 2
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              Your Time Trials
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsDialogOpen(true)}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Add Time Trial
          </Button>
        </Box>

        <TimeTrialsList 
          timeTrials={timeTrials} 
          onDelete={handleDelete} 
          onUpdate={handleUpdate}
        />

        <Dialog 
          open={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <TimeTrialForm 
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
            isEditing={false}
          />
        </Dialog>

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
      </Box>
    </Container>
  );
};

export default Dashboard;
