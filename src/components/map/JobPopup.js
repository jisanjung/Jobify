import { Typography, Box } from '@mui/material';
import { useStoreActions } from 'easy-peasy';
import React from 'react';
import { Popup } from 'react-map-gl';

const JobPopup = (props) => {

    const setSelectedId = useStoreActions(actions => actions.setSelectedId);
    const setSelectedJob = useStoreActions(actions => actions.setSelectedJob);

    return (
        <Popup 
            latitude={props.job.latitude} 
            longitude={props.job.longitude}
            onClose={() => {
                setSelectedId(0);
                setSelectedJob(null);
                return;
            }}
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
        </Popup>
    )
}

export default JobPopup
