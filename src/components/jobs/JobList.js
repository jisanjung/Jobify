import { List, ListItem, Typography } from '@mui/material';
import JobItem from "./JobItem";
import React, { useState } from 'react';

const JobList = (props) => {

    const [id, setId] = useState(0);

    return (
        <List sx={{ marginTop: 2 }}>
            {props.jobList.length > 0 ? 
            <Typography variant="body2" sx={{ color: "#757575", marginBottom: 1 }}>
                {props.jobList.length} jobs
            </Typography> :
            <></>}
            {props.jobList.map(job => {
                return (
                    <ListItem 
                        id={job.id} 
                        key={job.id} 
                        sx={{ p: 0, marginBottom: 2 }} 
                        onClick={e => setId(e.target.offsetParent.id)}
                    >
                        <JobItem job={job} id={id}/>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default JobList