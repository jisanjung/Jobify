import { CircularProgress, useMediaQuery, Box, Pagination } from '@mui/material'
import React, { useState, useRef } from 'react'
import JobList from '../jobs/JobList';
import NoResults from '../jobs/NoResults';
import { useStoreState } from "easy-peasy";
import Form from './Form';
 
const Sidebar = () => {

    const lgMatches = useMediaQuery("(min-width:900px)");
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const myRef = useRef(null);
    
    const jobList = useStoreState(state => state.jobList);

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
            }}/>
             : <></>}
        </div>
    )
}

export default Sidebar
