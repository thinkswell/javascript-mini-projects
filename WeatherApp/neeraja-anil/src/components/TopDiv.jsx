import React, { useContext, useEffect } from 'react'
import { styled } from '@mui/system'
import { Box, IconButton, InputBase, Typography } from '@mui/material'
import FlexBetween from './FlexBetween'
import { Search } from '@mui/icons-material'
import axios from 'axios'
import { GlobalContext } from '../context'
import { toast } from 'react-hot-toast'
import moment from 'moment/moment'


// Conditionally rendering bg Image 
const Background = styled(Box)(({ background = '' }) => ({
    backgroundImage: background === 'Rain' ? `url('images/rainy.jpg')`
        : background === 'Clouds' ? `url('images/cloud.jpg')`
            : background === 'Thunderstorm' ? `url('images/Thunder.jpg')`
                : background === 'Snow' ? `url('images/snow.jpg')`
                    : background === 'Winter' ? `url('images/winter.jpg')`
                        : background === 'Clear' ? `url('images/sunny.jpg')`
                            : background === 'Mist' ? `url('images/cloudy.jpg')`
                                : `url('images/cloud.jpg')`,
    height: '45vh',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    opacity: '0.5',
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',

}))



const TopDiv = () => {
    const { setWeatherData, weatherData, setCity, city, isCelsius, setIsCelsius } = useContext(GlobalContext)
    const API = process.env.REACT_APP_API
    const isWeatherData = Object.keys(weatherData).length > 0;

    //TIME HANDLE
    const timeNow = moment().format("hh:mm A ")
    const dateNow = (moment().format("DD MMMM yyyy dddd "))

    const timeUtc = weatherData.dt
    let time = (moment.unix(timeUtc).format("hh:mm A "))
    const date = (moment.unix(timeUtc).format("DD MMMM yyyy dddd "))


    const toggleTemperatureUnit = () => {
        setIsCelsius(!isCelsius)
    }
    // SEARCH Cities
    const handleSearch = async () => {
        try {
            const unit = isCelsius ? 'metric' : 'imperial';
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API}`)
            setWeatherData(data)
            toast.success('Got it!')
        } catch (error) {
            console.log(error.message)
            toast.error('City Not Found')
        }

    }
    // handle toggle
    useEffect(() => {
        handleSearch()
    }, [isCelsius])



    return (
        <>
            <Background background={isWeatherData && weatherData?.weather[0]?.main}>
                <Box display='flex' justifyContent='center' pt='1rem'>

                    {/* SEARCH CITIES */}
                    <FlexBetween gap='0.5rem'>
                        <FlexBetween gap='3rem' borderRadius='2rem' border='1px solid white' padding='0.1rem 1.5rem'>
                            <InputBase placeholder='Search cities...' onChange={(e) => setCity(e.target.value)} />
                            <IconButton onClick={handleSearch} >
                                <Search sx={{ color: 'black' }} />
                            </IconButton>
                        </FlexBetween>

                        {/* TOGGLE TEMP UNITS */}
                        <IconButton onClick={toggleTemperatureUnit} sx={{
                            "&:hover": {
                                backgroundColor: '#E67E22 ',
                                cursor: 'pointer',
                            },
                            border: '0.5px solid white',
                            backgroundColor: '#F5B041 '
                        }}
                        >
                            <Typography color='white'>{isCelsius ? '°F' : '°C'}</Typography>
                        </IconButton>
                    </FlexBetween>
                </Box>
                <Box >
                    <FlexBetween gap='4rem' pb='2rem' px='1rem' sx={{ alignItems: 'end' }}>
                        <Box>
                            {isWeatherData &&
                                <>
                                    {/* Weather Icon */}
                                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
                                    <FlexBetween>
                                        <Typography variant='h3' sx={{ color: 'black' }}>
                                            {weatherData.main.temp}
                                        </Typography>
                                        <Typography variant='h3' sx={{ color: 'black' }}>
                                            {isCelsius ? '°C' : '°F'}
                                        </Typography>
                                    </FlexBetween>


                                    <Typography variant='h5' sx={{ color: 'black' }}>{weatherData.name}, {weatherData.sys.country}</Typography>
                                </>
                            }

                        </Box>
                        <Box >
                            <Typography variant='h5' sx={{ color: 'black' }}>{isWeatherData ? time : timeNow}</Typography>
                            <Typography variant='h6' sx={{ color: 'black' }}>{isWeatherData ? date : dateNow}</Typography>
                        </Box>
                    </FlexBetween>
                </Box>
            </Background>
        </>
    )
}

export default TopDiv