
import React, { useEffect, useState, useContext } from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    Filler
} from 'chart.js'
import CardWrapper from './Wrapper';
import { GlobalContext } from '../context';

ChartJs.register(
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    Filler
)

const Chart = () => {
    const [chartData, setChartData] = useState({ datasets: [], labels: [] })
    const [wind, setWind] = useState([])
    const { forcastData } = useContext(GlobalContext)

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false, // Hide x-axis grid lines

                },
            },
            y: {
                grid: {
                    display: false, // Hide y-axis grid lines
                    drawBorder: false,
                },
                ticks: {
                    display: false
                }
            },
        },
    };

    useEffect(() => {
        setChartData({
            labels: ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    label: 'Wind Speed',
                    data: wind,
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    backgroundColor: 'rgb(53,162,235,0.4)'
                }
            ]
        })
        const windData = forcastData.map(item => item.wind)
        setWind(windData)
    }, [forcastData, wind])


    return (
        <>
            <CardWrapper sx={{ maxHeight: '500px' }}>
                <Line data={chartData} options={options} />
            </CardWrapper>
        </>
    )
}

export default Chart