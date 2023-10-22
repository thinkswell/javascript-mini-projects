import React from 'react'
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import TopDiv from './components/TopDiv';
import { GlobalContextProvider } from './context';
import WeatherCard from './components/WeatherCard';
import Sun from './components/Sun';
import WeatherDesc from './components/WeatherDesc';
import ForcastWrapper from './components/ForcastWrapper';
import Chart from './components/Chart'
import { Toaster } from 'react-hot-toast';



function App() {
  const isNonMobileScreens = useMediaQuery('(min-width:768px)')


  return (
    <div className="App">
      <GlobalContextProvider>
        <CssBaseline />
        <TopDiv />
        <Box
          display={isNonMobileScreens ? 'flex' : 'block'}
          justifyContent='space-between'
          width='100%'
          gap='1rem'
          padding='2rem 5%'
        >
          <Box flexBasis={isNonMobileScreens ? '30%' : ''}>
            <WeatherCard />
            <Box gap='1rem' padding='1.5rem 0'>
              <WeatherDesc />
              <Box gap='1rem' padding='1.5rem 0'>
                <Sun />
              </Box>
            </Box>
          </Box>
          <Box flexBasis={isNonMobileScreens ? '60%' : ''}>
            <ForcastWrapper />
            <Box gap='1rem' p='1.5rem 0'>
              <Chart />
            </Box>
          </Box>
        </Box>
        <Toaster />
      </GlobalContextProvider>
    </div >
  );
}

export default App;
