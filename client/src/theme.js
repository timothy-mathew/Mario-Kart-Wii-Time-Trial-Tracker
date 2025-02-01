import { createTheme } from '@mui/material/styles';

// Color schemes
const colorSchemes = {
  mario: {
    primary: {
      main: '#FF6B6B', // Soft Mario Red
      light: '#FF8585',
      dark: '#E64D4D',
    },
    secondary: {
      main: '#4CAF50', // Luigi Green
      light: '#81C784',
      dark: '#388E3C',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#607D8B',
    },
    accent1: '#FFD700', // Coin Gold
    accent2: '#4A90E2', // Blue Shell Blue
  },
  rainbow: {
    primary: {
      main: '#FF6B6B',
      light: '#FF8585',
      dark: '#E64D4D',
    },
    secondary: {
      main: '#6C5CE7', // Purple
      light: '#A8A4E3',
      dark: '#4834D4',
    },
    background: {
      default: '#F0F3FF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#607D8B',
    },
    accent1: '#00D2D3', // Cyan
    accent2: '#FFA502', // Orange
  },
  retro: {
    primary: {
      main: '#2C3E50', // Navy
      light: '#34495E',
      dark: '#2C3E50',
    },
    secondary: {
      main: '#E67E22', // Orange
      light: '#F39C12',
      dark: '#D35400',
    },
    background: {
      default: '#ECF0F1',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#607D8B',
    },
    accent1: '#16A085', // Teal
    accent2: '#8E44AD', // Purple
  },
  dark: {
    primary: {
      main: '#1A1A2E', // Deep navy blue
      light: '#16213E',
      dark: '#0F172A',
    },
    secondary: {
      main: '#4F46E5', // Indigo
      light: '#818CF8',
      dark: '#3730A3',
    },
    background: {
      default: '#0A0A0A', // Darker background
      paper: '#13152C', // Darker blue-purple that matches navbar theme
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#94A3B8',
    },
    accent1: '#3B82F6', // Bright blue
    accent2: '#6366F1', // Purple blue
  }
};

// Select active color scheme
const activeScheme = colorSchemes.dark;

const theme = createTheme({
  palette: {
    mode: activeScheme === colorSchemes.dark ? 'dark' : 'light',
    primary: {
      main: activeScheme.primary.main,
      light: activeScheme.primary.light,
      dark: activeScheme.primary.dark,
      contrastText: '#fff',
    },
    secondary: {
      main: activeScheme.secondary.main,
      light: activeScheme.secondary.light,
      dark: activeScheme.secondary.dark,
      contrastText: activeScheme === colorSchemes.dark ? '#000' : '#fff',
    },
    background: activeScheme.background,
    text: activeScheme.text,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: activeScheme.text.primary,
    },
    h4: {
      fontWeight: 600,
      color: activeScheme.text.primary,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: `linear-gradient(90deg, ${activeScheme.primary.main} 0%, ${activeScheme.primary.light} 50%, ${activeScheme.primary.dark} 100%)`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
          backgroundColor: activeScheme.background.paper,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: activeScheme === colorSchemes.dark ? '#13152C' : '#ffffff',
            '& fieldset': {
              borderColor: activeScheme === colorSchemes.dark 
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: activeScheme === colorSchemes.dark 
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.23)',
            },
            '&.Mui-focused fieldset': {
              borderColor: activeScheme === colorSchemes.dark 
                ? activeScheme.secondary.main
                : activeScheme.primary.main,
            },
          },
          '& .MuiInputLabel-root': {
            color: activeScheme === colorSchemes.dark 
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(0, 0, 0, 0.6)',
          },
          '& .MuiInputBase-input': {
            color: activeScheme === colorSchemes.dark 
              ? '#ffffff'
              : 'rgba(0, 0, 0, 0.87)',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-root': {
            color: activeScheme === colorSchemes.dark 
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(0, 0, 0, 0.6)',
          },
          '& .MuiSelect-icon': {
            color: activeScheme === colorSchemes.dark 
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(0, 0, 0, 0.54)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: activeScheme === colorSchemes.dark ? '#13152C' : '#ffffff',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: activeScheme === colorSchemes.dark 
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.04)',
          },
          '&.Mui-selected': {
            backgroundColor: activeScheme === colorSchemes.dark 
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.08)',
            '&:hover': {
              backgroundColor: activeScheme === colorSchemes.dark 
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(0, 0, 0, 0.12)',
            },
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
          backgroundColor: activeScheme === colorSchemes.dark ? '#13152C' : '#ffffff',
          '& .MuiTableCell-head': {
            backgroundColor: activeScheme === colorSchemes.dark 
              ? 'rgba(26, 26, 46, 0.6)'
              : activeScheme.background.default,
            fontWeight: 600,
            color: activeScheme.text.primary,
            borderBottom: 'none'
          },
          '& .MuiTableCell-body': {
            backgroundColor: activeScheme === colorSchemes.dark ? '#13152C' : '#ffffff',
            borderBottom: 'none'
          }
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: activeScheme === colorSchemes.dark ? '#13152C' : '#ffffff',
          '&:hover': {
            backgroundColor: activeScheme === colorSchemes.dark 
              ? 'rgba(255, 255, 255, 0.03) !important'
              : `${activeScheme.background.default} !important`,
          },
          '& .MuiTableCell-root': {
            color: activeScheme.text.primary,
          }
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: activeScheme === colorSchemes.dark ? '#13152C' : '#ffffff',
          boxShadow: activeScheme === colorSchemes.dark ? '0 4px 6px rgba(0, 0, 0, 0.5)' : 'none',
        },
      },
    },
  },
});

export default theme;
