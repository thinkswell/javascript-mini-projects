import React, { useState } from 'react';


export const GlobalContext = React.createContext({
    city: '',
    isCelsius: true,
    weatherData: {},
    forcastData: [],
    loading: true,
    setCity: () => { },
    setIsCelsius: () => { },
    setWeatherData: () => { },
    setForcastData: () => { },
    setLoading: () => { },
});

export const GlobalContextProvider = (props) => {
    const [city, setCity] = useState('mumbai');
    const [unit, setUnit] = useState(true);
    const [weather, setWeather] = useState({});
    const [forcast, setForcast] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    return (
        <GlobalContext.Provider
            value={{
                city: city,
                isCelsius: unit,
                weatherData: weather,
                forcastData: forcast,
                loading: isLoading,
                setCity: setCity,
                setIsCelsius: setUnit,
                setWeatherData: setWeather,
                setForcastData: setForcast,
                setLoading: setIsLoading,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};