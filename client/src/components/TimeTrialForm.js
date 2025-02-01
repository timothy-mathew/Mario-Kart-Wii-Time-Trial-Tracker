import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Grid,
  Paper
} from '@mui/material';
import { timeToMilliseconds, isValidTimeFormat } from '../utils/timeUtils';

const TRACKS = [
  "Luigi Circuit",
  "Moo Moo Meadows",
  "Mushroom Gorge",
  "Toad's Factory",
  "Mario Circuit",
  "Coconut Mall",
  "DK Summit",
  "Wario's Gold Mine",
  "Daisy Circuit",
  "Koopa Cape",
  "Maple Treeway",
  "Grumble Volcano",
  "Dry Dry Ruins",
  "Moonview Highway",
  "Bowser's Castle",
  "Rainbow Road"
];

const CHARACTERS = [
  "Mario",
  "Luigi",
  "Peach",
  "Yoshi",
  "Bowser",
  "Donkey Kong",
  "Wario",
  "Waluigi",
  "Toad",
  "Koopa Troopa",
  "Daisy",
  "Baby Mario",
  "Baby Luigi",
  "Baby Peach",
  "Baby Daisy",
  "Birdo",
  "Diddy Kong",
  "King Boo",
  "Bowser Jr.",
  "Dry Bones",
  "Funky Kong",
  "Dry Bowser",
  "Rosalina"
];

const VEHICLES = [
  "Standard Kart S",
  "Standard Kart M",
  "Standard Kart L",
  "Booster Seat",
  "Classic Dragster",
  "Offroader",
  "Mini Beast",
  "Wild Wing",
  "Flame Flyer",
  "Cheep Charger",
  "Super Blooper",
  "Piranha Prowler",
  "Tiny Titan",
  "Daytripper",
  "Jetsetter",
  "Blue Falcon",
  "Sprinter",
  "Honeycoupe",
  "Standard Bike S",
  "Standard Bike M",
  "Standard Bike L",
  "Bullet Bike",
  "Mach Bike",
  "Flame Runner",
  "Bit Bike",
  "Sugarscoot",
  "Wario Bike",
  "Quacker",
  "Zip Zip",
  "Shooting Star",
  "Magikruiser",
  "Sneakster",
  "Spear",
  "Jet Bubble",
  "Dolphin Dasher",
  "Phantom"
];

const TimeTrialForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    trackName: '',
    time: '',
    character: '',
    vehicle: '',
    date: new Date().toISOString().split('T')[0] // Set default to today's date
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate time format
    if (!isValidTimeFormat(formData.time)) {
      setError('Time must be in format MM:SS.mmm (e.g., 01:23.456)');
      return;
    }

    // Convert time to milliseconds before submitting
    const timeInMs = timeToMilliseconds(formData.time);
    
    onSubmit({
      ...formData,
      timeInMs,
      date: new Date(formData.date)
    });

    // Clear form
    setFormData({
      trackName: '',
      time: '',
      character: '',
      vehicle: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3,
        backgroundColor: '#13152C',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Track</InputLabel>
              <Select
                name="trackName"
                value={formData.trackName}
                onChange={handleChange}
                required
                label="Track"
              >
                {TRACKS.map(track => (
                  <MenuItem key={track} value={track}>{track}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="time"
              label="Time (MM:SS.mmm)"
              value={formData.time}
              onChange={handleChange}
              required
              placeholder="01:23.456"
              sx={{ width: '200px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Character</InputLabel>
              <Select
                name="character"
                value={formData.character}
                onChange={handleChange}
                required
                label="Character"
              >
                {CHARACTERS.map(char => (
                  <MenuItem key={char} value={char}>{char}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Vehicle</InputLabel>
              <Select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                required
                label="Vehicle"
              >
                {VEHICLES.map(vehicle => (
                  <MenuItem key={vehicle} value={vehicle}>{vehicle}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="date"
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              sx={{ width: '200px' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ minWidth: '120px' }}
            >
              Add Time
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default TimeTrialForm;
