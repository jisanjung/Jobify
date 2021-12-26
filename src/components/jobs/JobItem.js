import { Card, Typography, Box } from '@mui/material'
import React from 'react'
import CompanyLogo from './CompanyLogo';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const JobItem = (props) => {

    dayjs.extend(relativeTime)
    const formatDate = dayjs(props.job.created).format("YYYY-MM-DD");

    return (
        <Card variant="outlined" sx={{ width: "100%", p: 2, marginBottom: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                <CompanyLogo company={props.job.company.display_name}/>
                <Typography variant='caption' sx={{ color: "#757575" }}>
                    {dayjs(formatDate).fromNow()}
                </Typography>
            </Box>
            <Box>
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
