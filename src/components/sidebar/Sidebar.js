import { CircularProgress, Container, useMediaQuery, Box } from '@mui/material'
import React, { useState } from 'react'
import JobList from '../jobs/JobList';
import NoResults from '../jobs/NoResults';
import { useStoreState } from "easy-peasy";
import Form from './Form';
 
const Sidebar = () => {

    const lgMatches = useMediaQuery("(min-width:900px)");
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const jobList = useStoreState(state => state.jobList);

    return (
        <Container sx={lgMatches ? {
            height: "100vh"
        } : {
            position: "absolute",
            bottom: 0,
            top: "60%",
            left: 0,
            right: 0,
            zIndex: "10",
            background: "#fff"
        }} style={{ paddingTop: "1rem", paddingBottom: "1rem", overflowY: "scroll" }}>
            <Form 
                setLoading={setLoading} 
                setNoResults={setNoResults}
            />
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
                    <CircularProgress/>
                </Box>
            ) : <></>}
            {!noResults ? (
                <JobList jobList={jobList}/>
            ) : (
                <NoResults text="No results"/>
            )}
        </Container>
    )
}

export default Sidebar