import React, { useContext } from 'react'
import CardWraper from './Wrapper'
import FlexBetween from './FlexBetween'
import { GlobalContext } from '../context'
import { Box, Typography } from '@mui/material'
import { AirOutlined, CompressOutlined, Thermostat, WaterDrop, WbSunnyOutlined } from '@mui/icons-material'

const WeatherCard = () => {
    const { weatherData, isCelsius } = useContext(GlobalContext)
    const isWeatherData = Object.keys(weatherData).length > 0;
    console.log(weatherData)

    return (
        <CardWraper sx={{ boxShadow: "5px 10px skyblue" }}>
            <FlexBetween gap='2rem' pb='1rem'>
                <FlexBetween gap='1rem'>
                    <AirOutlined sx={{ color: 'skyblue' }} />
                    <Box >
                        <Typography fontWeight={500}>Wind</Typography>
                        {isWeatherData && <Typography fontSize={12}>{weatherData?.wind.speed} m/s</Typography>}

                    </Box>
                </FlexBetween>
                <FlexBetween gap='1rem'>
                    <CompressOutlined sx={{ color: 'skyblue' }} />
                    <Box >
                        <Typography fontWeight={500}>Pressure</Typography>
                        {isWeatherData && <Typography fontSize={12}>{weatherData?.main.pressure} atm</Typography>}

                    </Box>
                </FlexBetween>
            </FlexBetween>
            <FlexBetween gap='2rem' pb='1rem'>
                <FlexBetween gap='1rem'>
                    <WaterDrop sx={{ color: 'skyblue' }} />
                    <Box >
                        <Typography fontWeight={500}>Humidity</Typography>
                        {isWeatherData && <Typography fontSize={12}>{weatherData.main.humidity} {isCelsius ? '°C' : '°F'}</Typography>}

                    </Box>
                </FlexBetween>
                <FlexBetween gap='1rem'>
                    <WbSunnyOutlined sx={{ color: 'skyblue' }} />
                    <Box >
                        <Typography fontWeight={500}>Feels Like</Typography>
                        {isWeatherData && <Typography fontSize={12}>{weatherData.main.feels_like} {isCelsius ? '°C' : '°F'} </Typography>}

                    </Box>
                </FlexBetween>
            </FlexBetween>
            <FlexBetween gap='2rem'>
                <FlexBetween gap='1rem'>
                    <Thermostat sx={{ color: 'orange' }} />
                    <Box>
                        <Typography fontWeight={500}>Min Temp</Typography>
                        {isWeatherData && <Typography fontSize={12}>{weatherData.main.temp_min} {isCelsius ? '°C' : '°F'} </Typography>}
                    </Box>
                </FlexBetween>
                <FlexBetween gap='1rem'>
                    <Thermostat sx={{ color: 'red' }} />
                    <Box>
                        <Typography fontWeight={500}>Max Temp</Typography>
                        {isWeatherData && <Typography fontSize={12}>{weatherData.main.temp_max} {isCelsius ? '°C' : '°F'}</Typography>}

                    </Box>
                </FlexBetween>
            </FlexBetween>
        </CardWraper>
    )
}

export default WeatherCard