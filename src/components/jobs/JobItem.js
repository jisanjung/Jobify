import { Card, Typography, Box, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CompanyLogo from './CompanyLogo';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SalaryBadge from './SalaryBadge';
import { useStoreState } from 'easy-peasy';

const JobItem = (props) => {

    dayjs.extend(relativeTime)
    const formatDate = dayjs(props.job.created).format("YYYY-MM-DD");

    const selectedJob = useStoreState(state => state.selectedJob);

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
            {props.job?.salary_max && <SalaryBadge salary={props.job?.salary_max}/>}
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
            {selectedJob?.id === props.job?.id && 
            <Box>
                <Box sx={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                    <Typography variant='button' fontStyle={{ color: "#2196f3", display: "block" }}>Job Description</Typography>
                    <Typography>
                        {props.job?.description}
                    </Typography>
                </Box>
                <a href={props.job?.redirect_url} target="_blank" rel="noopener noreferrer">
                    <Button variant='contained' sx={{ width: "100%" }}>Apply</Button>
                </a>
            </Box>}
        </Card>
    )
}

export default JobItem
