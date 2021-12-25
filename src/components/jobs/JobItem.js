import { Card, Typography } from '@mui/material'
import React from 'react'

const JobItem = (props) => {
    return (
        <Card variant="outlined" sx={{ width: "100%", p: 1, marginBottom: 2 }}>
            <Typography variant="h6" component="h1">
                {props.job.title}
            </Typography>
            <Typography variant='body1'>
                {props.job.company.display_name}
            </Typography>
            <Typography variant='body1'>
                {props.job.location.display_name}
            </Typography>
        </Card>
    )
}

export default JobItem
