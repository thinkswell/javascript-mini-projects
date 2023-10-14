import React from 'react'
import moment from 'moment/moment';
import CardWrapper from './Wrapper'
import { Box, Typography } from '@mui/material';
import FlexBetween from './FlexBetween';

const Forcast = (props) => {
    const day = moment(props.date).format('dddd')
    return (
        <CardWrapper sx={{ background: 'linear-gradient(to right, #B993D6, #8CA6DB)', p: '1rem' }}>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' textAlign='center'>
                <Typography fontSize={15} fontWeight={500} color='white'>{day}</Typography>
                <img src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt='' width={25} height={25} />
                <Typography fontSize={10} color='#EBF5FB'>{props.desc}</Typography>
                <FlexBetween>
                    <Typography fontSize={10} color='#2E4053'>{props.minTemp}</Typography>
                    <sup>&deg;</sup>
                    <small>/</small>
                    <Typography fontSize={10} color='#2E4053'>{props.maxTemp}</Typography>
                    <sup>&deg;</sup>
                </FlexBetween>
            </Box>

        </CardWrapper>
    )
}

export default Forcast