import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import Forcast from './Forcast'
import { GlobalContext } from '../context';
import { Grid } from '@mui/material';


const ForcastWrapper = () => {
    const { setForcastData, city, forcastData, isCelsius } = useContext(GlobalContext)
    const API = process.env.REACT_APP_API

    // Fetching forcast data
    useEffect(() => {
        async function fetchData() {
            try {
                const unit = isCelsius ? 'metric' : 'imperial';
                const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API}`)
                const forecastList = data.list;

                // Extract daily data for 5 days
                const dailyForecast = [];
                const days = {}
                forecastList.forEach(item => {
                    const date = new Date(item.dt * 1000);
                    const day = date.toISOString().split('T')[0];
                    if (!days[day]) {
                        days[day] = {
                            date: day,
                            minTemp: item.main.temp_min,
                            maxTemp: item.main.temp_max,
                            description: item.weather[0].description,
                            icon: item.weather[0].icon,
                            wind: item.wind.speed
                        };
                        dailyForecast.push(days[day]);
                    }

                    //days[day].temperatures.push(item.main.temp);
                    setForcastData(dailyForecast)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [city, isCelsius, setForcastData, API])

    return (
        <>
            <Grid container spacing={2}>
                {forcastData.map((item, index) => (
                    <Grid item lg={2} xs={4} key={index}>
                        <Forcast date={item.date} desc={item.description} minTemp={item.minTemp} maxTemp={item.maxTemp} icon={item.icon} />
                    </Grid>
                ))}
            </Grid>

        </>
    )
}

export default ForcastWrapper