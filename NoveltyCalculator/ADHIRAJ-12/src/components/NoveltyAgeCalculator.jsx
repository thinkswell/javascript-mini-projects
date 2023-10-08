import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import './NoveltyAgeCalculator.css'; // Import your CSS file for styling

const NoveltyAgeCalculator = () => {
  const [birthDate, setBirthDate] = useState('');
  const [dogYears, setDogYears] = useState(null);
  const [marsAge, setMarsAge] = useState(null);
  const [venusAge, setVenusAge] = useState(null);
  const [jupiterAge, setJupiterAge] = useState(null);
  const [fruitAge, setFruitAge] = useState(null);

  const calculateAges = () => {
    const birthTimestamp = new Date(birthDate).getTime();
    if (!isNaN(birthTimestamp)) {
      const currentDate = new Date();
      const ageInMilliseconds = currentDate - birthTimestamp;
      const ageInSeconds = ageInMilliseconds / 1000;
      const ageInMinutes = ageInSeconds / 60;
      const ageInHours = ageInMinutes / 60;
      const ageInDays = ageInHours / 24;

      // Dog Years (7 human years for 1 dog year)
      const dogYearsAge = ageInDays / 365.25 * 7;
      setDogYears(dogYearsAge.toFixed(2));

      // Planetary Years
      const marsAge = ageInDays / 687;
      const venusAge = ageInDays / 225;
      const jupiterAge = ageInDays / 4332.59;
      setMarsAge(marsAge.toFixed(2));
      setVenusAge(venusAge.toFixed(2));
      setJupiterAge(jupiterAge.toFixed(2));

      // Fruit Years (average lifespan of a banana)
      const bananaLifespanDays = 6;
      const fruitAge = ageInDays / bananaLifespanDays;
      setFruitAge(fruitAge.toFixed(2));
    } else {
      setDogYears(null);
      setMarsAge(null);
      setVenusAge(null);
      setJupiterAge(null);
      setFruitAge(null);
    }
  };

  return (
    <div className="page-container">
      <Container maxWidth="sm">
        <Box p={3}>
          <Typography variant="h2" align="center" className="title ">
            NOVELTY AGE CALCULATOR 
          </Typography>
        </Box>
        <Box p={2}>
          <TextField
              fullWidth
              label="Enter Your Birthdate"
              variant="outlined"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
                className: 'input-label', // Apply the input-label class
              }}
              inputProps={{
                className: 'input-field', // Add this class to style the input field
          }}
          />
        </Box>
        <Box p={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={calculateAges}
            className="calculate-button"
          >
            Calculate Ages
          </Button>

        </Box>
        <Grid container spacing={2}>
          {dogYears !== null && (
            <Grid item xs={6}>
              <Typography variant="h6" className="result-label">
                Dog Years:
              </Typography>
              <Typography variant="body1" className="result-value">
                {dogYears} years
              </Typography>
            </Grid>
          )}
          {marsAge !== null && (
            <Grid item xs={6}>
              <Typography variant="h6" className="result-label">
                Mars Age:
              </Typography>
              <Typography variant="body1" className="result-value">
                {marsAge} Martian years
              </Typography>
            </Grid>
          )}
          {venusAge !== null && (
            <Grid item xs={6}>
              <Typography variant="h6" className="result-label">
                Venus Age:
              </Typography>
              <Typography variant="body1" className="result-value">
                {venusAge} Venusian years
              </Typography>
            </Grid>
          )}
          {jupiterAge !== null && (
            <Grid item xs={6}>
              <Typography variant="h6" className="result-label">
                Jupiter Age:
              </Typography>
              <Typography variant="body1" className="result-value">
                {jupiterAge} Jovian years
              </Typography>
            </Grid>
          )}
          {fruitAge !== null && (
            <Grid item xs={6}>
              <Typography variant="h6" className="result-label">
                Banana Lifespan:
              </Typography>
              <Typography variant="body1" className="result-value">
                {fruitAge} bananas
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default NoveltyAgeCalculator;
