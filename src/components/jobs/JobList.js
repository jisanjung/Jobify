import { List, ListItem } from '@mui/material';
import JobItem from "./JobItem";
import React from 'react';

const JobList = (props) => {
    return (
        <List sx={{ marginTop: 2 }}>
            {props.jobList.map(job => {
                return (
                    <ListItem key={job.id} sx={{ p: 0 }}>
                        <JobItem job={job}/>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default JobList