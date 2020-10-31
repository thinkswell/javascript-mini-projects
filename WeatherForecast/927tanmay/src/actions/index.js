import axios from 'axios';

const API_KEY = '8ed96f21dfffbf7c37870c9bc50c242d';

const root_url=`http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city){

    const url = `${root_url}&q=${city},in`
    const request =axios.get(url);

    return{
    type : FETCH_WEATHER,
    payload :request
    };
}