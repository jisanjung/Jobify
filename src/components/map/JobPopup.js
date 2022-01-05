import { Link, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { Popup } from 'react-map-gl';

const JobPopup = (props) => {

    const [expandText, setExpandText] = useState(false);

    return (
        <Popup 
            latitude={props.job.latitude} 
            longitude={props.job.longitude}
        >
            <Typography variant='body1' component="h1" sx={{ fontWeight: 'bold' }}>
                {props.job.title}
            </Typography>
            <Box>
                <Typography variant='body2' component="h3" sx={{ color: "#757575" }}>
                    {props.job.company.display_name}
                </Typography>
                <Typography variant='body2' component="h3" sx={{ color: "#757575" }}>
                    {props.job.location.display_name}
                </Typography>
            </Box>
            {props.full ? (
            <Box sx={{ marginTop: 2 }}>
                <Typography variant='body2' sx={{ height: expandText ? "auto" : "100px", overflowY: "hidden" }}>
                    {props.job.description}
                </Typography>
                <button style={{ background: "transparent", border: 0, padding: 0, color: "#757575", cursor: "pointer" }} onClick={() => setExpandText(!expandText)}>
                    {expandText ? "less" : "more..."}
                </button>
                <Link href={props.job.redirect_url} target="_blank" rel="noopener noreferrer"
                sx={{ display: "block", marginTop: 2 }}
                >
                    Apply
                </Link>
            </Box>
            ) : <></>}
        </Popup>
    )
}

export default JobPopup
