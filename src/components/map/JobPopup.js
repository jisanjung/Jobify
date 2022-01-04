import { Link, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { Popup } from 'react-map-gl';

const JobPopup = (props) => {

    const [expandText, setExpandText] = useState(false);

    return (
        <Popup latitude={props.job.latitude} longitude={props.job.longitude}>
            <Typography variant='body1' component="h1" sx={{ fontWeight: 'bold' }}>
                {props.job.title}
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant='body2' component="h3" sx={{ color: "#757575" }}>
                    {props.job.company.display_name}
                </Typography>
                <Typography variant='body2' component="h3" sx={{ color: "#757575" }}>
                    {props.job.location.display_name}
                </Typography>
            </Box>
            {props.full ? (
            <Box>
                <Typography variant='body2' sx={{ marginBottom: 1, height: "100px", overflowY: "hidden" }}>
                    {props.job.description}
                </Typography>
                <Link href={props.job.redirect_url} target="_blank" rel="noopener noreferrer">
                    Apply
                </Link>
            </Box>
            ) : <></>}
        </Popup>
    )
}

export default JobPopup
