import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Paper, Alert } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import SportsScoreIcon from '@mui/icons-material/SportsScore';

const Login = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      console.log('Google login success:', credentialResponse);
      
      // Send the token to your backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Authentication failed');
      }

      const data = await response.json();
      login(data.user);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login');
    }
  };

  const handleError = () => {
    console.error('Login Failed');
    setError('Google login failed');
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)', // Subtract navbar height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <SportsScoreIcon
            sx={{
              fontSize: 64,
              color: 'text.secondary',
              mb: 2
            }}
          />
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2596be 30%, #abdbe3 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ready to Race?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to track your Mario Kart Wii time trials!
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme="filled_blue"
            shape="pill"
            size="large"
            text="continue_with"
            useOneTap
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
