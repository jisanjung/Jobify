import { Card, Typography } from '@mui/material'
import React from 'react'

const JobItem = (props) => {
    return (
        <Card variant="outlined" sx={{ width: "100%" }}>
            <Typography component="h5">
                {props.job.title}
            </Typography>
        </Card>
    )
}

export default JobItem
