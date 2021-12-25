import { Card, Typography, Box } from '@mui/material'
import React from 'react'
import CompanyLogo from './CompanyLogo';

const JobItem = (props) => {

    return (
        <Card variant="outlined" sx={{ width: "100%", p: 2, marginBottom: 2 }}>
            <CompanyLogo company={props.job.company.display_name}/>
            <Box sx={{ marginTop: 1 }}>
                <Typography variant="body1" component="h1" sx={{ fontWeight: 'bold' }}>
                    {props.job.title}
                </Typography>
                <Typography variant='body1' sx={{ color: "#757575" }}>
                    {props.job.company.display_name}
                </Typography>
                <Typography variant='body1' sx={{ color: "#757575" }}>
                    {props.job.location.display_name}
                </Typography>
            </Box>
        </Card>
    )
}

export default JobItem
