import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(90deg, #1A1A2E 0%, #16213E 50%, #0F172A 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Mario Kart Time Trials
        </Typography>

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* <Typography
              variant="body1"
              sx={{
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Hi{user?.email ? `, ${user.email.split('@')[0]}` : ''}!
            </Typography> */}
            <Button 
              color="inherit"
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                border: '1px solid white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Logout
            </Button>
          </Box>
        ) : !isLoginPage && (
          <Button 
            color="inherit"
            onClick={() => navigate('/login')}
            sx={{
              borderRadius: 2,
              border: '1px solid white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
