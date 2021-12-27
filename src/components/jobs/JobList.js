import { List, ListItem } from '@mui/material';
import JobItem from "./JobItem";
import React, { useState } from 'react';

const JobList = (props) => {

    const [id, setId] = useState(0);

    return (
        <List sx={{ marginTop: 2 }} onClick={e => setId(e.target.offsetParent.id)}>
            {props.jobList.map(job => {
                return (
                    <ListItem id={job.id} key={job.id} sx={{ p: 0 }}>
                        <JobItem job={job} id={id}/>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default JobList