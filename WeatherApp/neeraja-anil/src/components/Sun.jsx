import React, { useContext } from 'react'
import CardWrapper from './Wrapper'
import FlexBetween from './FlexBetween';
import { WbSunny, WbTwilight } from '@mui/icons-material'
import { Box, Typography } from '@mui/material';
import { GlobalContext } from '../context';
import moment from 'moment/moment'

const Sun = () => {
    const { weatherData } = useContext(GlobalContext)
    const isWeatherData = Object.keys(weatherData).length > 0;
    const sunriseUTC = weatherData?.sys?.sunrise
    const sunsetUTC = weatherData?.sys?.sunset
    const sunrise = (moment.unix(sunriseUTC).format("hh:mm A"))
    const sunset = (moment.unix(sunsetUTC).format("hh:mm A"))
    return (
        <CardWrapper sx={{ boxShadow: "5px 10px orange" }}>
            {isWeatherData && (<FlexBetween gap='2rem' pb='1rem'>
                <FlexBetween gap='1rem'>
                    <WbSunny sx={{ color: 'orange' }} />
                    <Box>
                        <Typography fontWeight={500}>Sunrise</Typography>
                        <Typography fontSize={12}>{sunrise}</Typography>

                    </Box>
                </FlexBetween>
                <FlexBetween gap='1rem'>
                    <WbTwilight sx={{ color: 'orange' }} />
                    <Box >
                        <Typography fontWeight={500}>Sunset</Typography>
                        <Typography fontSize={12}>{sunset}</Typography>

                    </Box>
                </FlexBetween>
            </FlexBetween>)}
        </CardWrapper>
    )
}

export default Sun