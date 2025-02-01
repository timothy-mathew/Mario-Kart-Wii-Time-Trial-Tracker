import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

const tracks = [
  'Luigi Circuit',
  'Moo Moo Meadows',
  'Mushroom Gorge',
  'Toad\'s Factory',
  'Mario Circuit',
  'Coconut Mall',
  'DK Summit',
  'Wario\'s Gold Mine',
  'Daisy Circuit',
  'Koopa Cape',
  'Maple Treeway',
  'Grumble Volcano',
  'Dry Dry Ruins',
  'Moonview Highway',
  'Bowser\'s Castle',
  'Rainbow Road'
];

const characters = [
  'Mario', 'Luigi', 'Peach', 'Yoshi', 'Bowser', 'Donkey Kong',
  'Wario', 'Waluigi', 'Toad', 'Koopa Troopa', 'Daisy', 'Baby Mario',
  'Baby Luigi', 'Baby Peach', 'Baby Daisy', 'Birdo', 'Diddy Kong',
  'King Boo', 'Bowser Jr.', 'Dry Bones', 'Funky Kong', 'Rosalina',
  'Dry Bowser', 'Baby Daisy'
];

const vehicles = [
  'Standard Kart S', 'Standard Kart M', 'Standard Kart L',
  'Baby Booster', 'Classic Dragster', 'Wild Wing',
  'Super Blooper', 'Daytripper', 'Sprinter',
  'Standard Bike S', 'Standard Bike M', 'Standard Bike L',
  'Bullet Bike', 'Mach Bike', 'Flame Runner',
  'Bit Bike', 'Sugarscoot', 'Wario Bike',
  'Quacker', 'Zip Zip', 'Shooting Star',
  'Magikruiser', 'Sneakster', 'Spear'
];

const TimeTrialForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    trackName: '',
    time: '',
    character: '',
    vehicle: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      trackName: '',
      time: '',
      character: '',
      vehicle: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Track</InputLabel>
            <Select
              name="trackName"
              value={formData.trackName}
              onChange={handleChange}
              required
            >
              {tracks.map((track) => (
                <MenuItem key={track} value={track}>
                  {track}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Time (MM:SS.mmm)"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="01:23.456"
            required
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
            >
              {characters.map((character) => (
                <MenuItem key={character} value={character}>
                  {character}
                </MenuItem>
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
            >
              {vehicles.map((vehicle) => (
                <MenuItem key={vehicle} value={vehicle}>
                  {vehicle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Add Time Trial
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TimeTrialForm;
