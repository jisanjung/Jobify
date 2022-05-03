import { CircularProgress, useMediaQuery, Box, Pagination } from '@mui/material'
import React, { useState, useRef } from 'react'
import JobList from '../jobs/JobList';
import NoResults from '../jobs/NoResults';
import { useStoreActions, useStoreState } from "easy-peasy";
import Form from './Form';
 
const Sidebar = () => {

    const lgMatches = useMediaQuery("(min-width:900px)");
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentURL, setCurrentURL] = useState("");
    const myRef = useRef(null);
    
    const jobList = useStoreState(state => state.jobList);
    const setJobs = useStoreActions(actions => actions.setJobs);

     // refetch job list based on current page
    const refetch = (currentPage, url) => {
        const urlFirstHalf = url.substring(0, url.indexOf("?") - 1);
        const urlSecondHalf = url.substring(urlFirstHalf.length + 1);
        const newURL = urlFirstHalf + currentPage + urlSecondHalf;

        setLoading(true);
        fetch(newURL)
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            return setJobs(data.results);
        });
    }

    return (
        <div ref={myRef} style={lgMatches ? {
            height: "100vh", 
            overflowY: "scroll",
            paddingRight: "1.5rem",
            paddingLeft: "1.5rem",
            paddingTop: "1rem"
        } : {
            position: "absolute",
            bottom: 0,
            top: "60%",
            left: 0,
            right: 0,
            zIndex: "10",
            background: "#fff", 
            overflowY: "scroll",
            paddingRight: "1rem",
            paddingLeft: "1rem"
        }}>
            <Form 
                setLoading={setLoading} 
                setNoResults={setNoResults}
                setPageCount={setPageCount}
                setCurrentURL={setCurrentURL}
                currentPage={currentPage}
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
            {jobList.length > 0 ? 
            <Pagination style={{paddingBottom: lgMatches ? "2rem" : "1rem"}} count={pageCount} variant="outlined" color="primary" disabled={loading} onChange={(e, val) => {
                myRef.current.scrollTop = 0;
                setCurrentPage(val);
                if (val !== currentPage) refetch(val, currentURL);
            }}/>
             : <></>}
        </div>
    )
}

export default Sidebar
