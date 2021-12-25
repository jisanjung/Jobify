import { Card, Typography } from '@mui/material'
import React from 'react'

const JobItem = (props) => {
    return (
        <Card variant="outlined" sx={{ width: "100%", p: 2, marginBottom: 2 }}>
            <Typography variant="body1" component="h1" sx={{ fontWeight: 'bold' }}>
                {props.job.title}
            </Typography>
            <Typography variant='body1' sx={{ color: "#757575" }}>
                {props.job.company.display_name}
            </Typography>
            <Typography variant='body1' sx={{ color: "#757575" }}>
                {props.job.location.display_name}
            </Typography>
        </Card>
    )
}

export default JobItem
