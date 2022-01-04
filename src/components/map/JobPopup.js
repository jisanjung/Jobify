import { Typography } from '@mui/material';
import React from 'react';
import { Popup } from 'react-map-gl';

const JobPopup = (props) => {

    return (
        <Popup latitude={props.job.latitude} longitude={props.job.longitude}>
            <Typography variant='h6' component="h1">
                {props.job.title}
            </Typography>
            <Typography variant='body1' component="h1" sx={{ color: "#757575" }}>
                {props.job.company.display_name}
            </Typography>
            {props.full ? <Typography variant='body2'>
                {props.job.description}
            </Typography> : <></>}
        </Popup>
    )
}

export default JobPopup
