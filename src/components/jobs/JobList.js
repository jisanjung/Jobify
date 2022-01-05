import { List, ListItem, Typography } from '@mui/material';
import JobItem from "./JobItem";
import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const JobList = (props) => {

    const selectedId = useStoreState(state => state.selectedId);
    const setSelectedId = useStoreActions(actions => actions.setSelectedId);
    const setSelectedJob = useStoreActions(actions => actions.setSelectedJob);
    const setHoveredJob = useStoreActions(actions => actions.setHoveredJob);
    const setCenter = useStoreActions(actions => actions.setCenter);

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
                            setSelectedJob(job);
                            setCenter([job.latitude, job.longitude]);
                            return setSelectedId(e.target.offsetParent.id);
                        }}
                        onMouseEnter={() => setHoveredJob(job)}
                        onMouseLeave={() => setHoveredJob(null)}
                    >
                        <JobItem job={job} id={selectedId}/>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default JobList