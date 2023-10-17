import React, { useContext } from 'react'
import CardWrapper from './Wrapper'
import { styled } from '@mui/system'
import { GlobalContext } from '../context'
import { Box, Typography } from '@mui/material'


// Conditionally rendering bg Image 
const Wrapper = styled(CardWrapper)(({ background = '' }) => ({
    background: background === 'Rain' ? `linear-gradient(to right, #2b5876, #4e4376)`
        : background === 'Clouds' ? `linear-gradient(to right, #003973, #E5E5BE)`
            : background === 'Thunderstorm' ? `linear-gradient(to right, #16222A, #3A6073)`
                : background === 'Snow' ? `linear-gradient(to right, #E6DADA, #274046)`
                    : background === 'Winter' ? `linear-gradient(to right, #E6DADA, #274046)`
                        : background === 'Clear' ? `linear-gradient(to right, #00d2ff, #3a7bd5)`
                            : background === 'Mist' ? `linear-gradient(to right, #B993D6, #8CA6DB)`
                                : `linear-gradient(to right, #00d2ff, #3a7bd5)`,

}))

const WeatherDesc = () => {
    const { weatherData } = useContext(GlobalContext)
    const isWeatherData = Object.keys(weatherData).length > 0;


    return (
        <Wrapper background={isWeatherData && weatherData?.weather[0].main}>
            <Box display='flex' mt={0}>
                {isWeatherData && <Typography color='white' fontWeight={400} fontSize={12}>Today in {weatherData.name}:</Typography>}
            </Box>
            <Box display='flex' justifyContent='center'>
                {isWeatherData && <Typography color='white' fontWeight={400} variant='h4'>{weatherData.weather[0].description}</Typography>}
            </Box>
        </Wrapper>
    )
}

export default WeatherDesc