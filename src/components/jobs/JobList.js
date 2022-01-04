import { List, ListItem, Typography } from '@mui/material';
import JobItem from "./JobItem";
import React, { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

const JobList = (props) => {

    const [id, setId] = useState(0);
    const setSelectedId = useStoreActions(actions => actions.setSelectedId);
    const setSelectedJob = useStoreActions(actions => actions.setSelectedJob);
    const setHoveredJob = useStoreActions(actions => actions.setHoveredJob);

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
                        onClick={e => {
                            setSelectedId(e.target.offsetParent.id);
                            setSelectedJob(job);
                            return setId(e.target.offsetParent.id);
                        }}
                        onMouseEnter={() => setHoveredJob(job)}
                        onMouseLeave={() => setHoveredJob(null)}
                    >
                        <JobItem job={job} id={id}/>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default JobList