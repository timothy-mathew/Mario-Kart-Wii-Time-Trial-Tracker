import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Typography,
  Alert,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import TimerIcon from '@mui/icons-material/Timer';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { isValidTimeFormat, timeToMilliseconds } from '../utils/timeUtils';

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

const TimeTrialForm = ({ onSubmit, onCancel, initialData, isEditing }) => {
  const [formData, setFormData] = useState({
    trackName: '',
    formattedTime: '',
    character: '',
    vehicle: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        trackName: initialData.trackName || '',
        formattedTime: initialData.formattedTime || '',
        character: initialData.character || '',
        vehicle: initialData.vehicle || '',
        date: initialData.date ? initialData.date.split('T')[0] : new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidTimeFormat(formData.formattedTime)) {
      setError('Time must be in format MM:SS.mmm (e.g., 01:23.456)');
      return;
    }

    // Convert time to milliseconds before submitting
    const timeInMs = timeToMilliseconds(formData.formattedTime);
    onSubmit({
      ...formData,
      timeInMs
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {isEditing ? 'Edit Time Trial' : 'Add Time Trial'}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Track"
        name="trackName"
        value={formData.trackName}
        onChange={handleChange}
        required
        select
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MapIcon />
            </InputAdornment>
          ),
        }}
      >
        {TRACKS.map(track => (
          <MenuItem key={track} value={track}>{track}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Time (MM:SS.mmm)"
        name="formattedTime"
        value={formData.formattedTime}
        onChange={handleChange}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TimerIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Character"
        name="character"
        value={formData.character}
        onChange={handleChange}
        required
        select
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      >
        {CHARACTERS.map(char => (
          <MenuItem key={char} value={char}>{char}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Vehicle"
        name="vehicle"
        value={formData.vehicle}
        onChange={handleChange}
        required
        select
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DirectionsCarIcon />
            </InputAdornment>
          ),
        }}
      >
        {VEHICLES.map(vehicle => (
          <MenuItem key={vehicle} value={vehicle}>{vehicle}</MenuItem>
        ))}
      </TextField>

      <TextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
        {onCancel && (
          <Button onClick={onCancel} variant="outlined" color="inherit">
            Cancel
          </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Save Changes' : 'Add Time Trial'}
        </Button>
      </Box>
    </Box>
  );
};

export default TimeTrialForm;
