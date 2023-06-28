import { Card, Typography, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CompanyLogo from './CompanyLogo';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const JobItem = (props) => {

    dayjs.extend(relativeTime)
    const formatDate = dayjs(props.job.created).format("YYYY-MM-DD");

    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (parseInt(props.id) === parseInt(props.job.id)) {
            setActive(!active)
        } else {
            setActive(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.id]);

    const formatCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      });

    return (
        <Card 
            id={props.job.id}
            className="job-item"
            variant="outlined" 
            sx={{ width: "100%", p: 2, cursor: "pointer", boxShadow: hovered ? 1 : 0, borderColor: active ? "primary.main" : "" }} 
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                <CompanyLogo company={props.job.company.display_name}/>
                <Typography variant='caption' sx={{ color: "#757575" }}>
                    {dayjs(formatDate).fromNow()}
                </Typography>
            </Box>
            <div>{formatCurrency.format(props.job?.salary_max)}</div>
            <Box>
                <Typography variant="body1" component="h1" sx={{ fontWeight: 'bold', textDecoration: hovered ? "underline" : "none", cursor: "pointer" }}>
                    {props.job.title}
                </Typography>
                <Typography variant='body1'>
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
