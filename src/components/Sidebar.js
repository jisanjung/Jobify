import { Button, Container, useMediaQuery, Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Input from './Input';
import JobList from './jobs/JobList';
import NoResults from './NoResults';

const Sidebar = () => {

    const lgMatches = useMediaQuery("(min-width:900px)");
    const [zipCode, setZipCode] = useState("");
    const [keyword, setKeyword] = useState("");
    const [zipCodeError, setZipCodeError] = useState(false);
    const [keywordError, setKeywordError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [jobList, setJobList] = useState([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        if (zipCodeError || keywordError) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [zipCodeError, keywordError]);

    const handleSearch = e => {
        let baseURL = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${process.env.REACT_APP_ADZUNA_APPID}&app_key=${process.env.REACT_APP_ADZUNA_KEY}`;

        e.preventDefault();
        
        if (zipCode && keyword)
            fetch(`${baseURL}&where=${zipCode}&title_only=${keyword}`)
            .then(res => res.json())
            .then(data => {
                if (data.results.length === 0) {
                    return setNoResults(true);
                }
                setNoResults(false);
                return setJobList(data.results);
            });
    }

    useEffect(() => {
        console.log(jobList);
    }, [jobList]);

    return (
        <Container sx={lgMatches ? {
            height: "100vh"
        } : {
            position: "absolute",
            bottom: 0,
            top: "50%",
            left: 0,
            right: 0,
            zIndex: "10",
            background: "#fff"
        }} style={{ paddingTop: "1rem", paddingBottom: "1rem", overflowY: "scroll" }}>
            <form onSubmit={e => handleSearch(e)}>
                <Input 
                    label="Zip Code" 
                    variant="standard" 
                    sx={{width: "100%", marginBottom: "0.5rem"}} 
                    regex={/^\d{5}(?:[-\s]\d{4})?$/} 
                    setInput={setZipCode}
                    setError={setZipCodeError}
                />
                <Input 
                    label="Keyword (Engineer, Analyst, etc.)" variant="standard" 
                    sx={{width: "100%"}} 
                    regex={/.*/} 
                    setInput={setKeyword}
                    setError={setKeywordError}
                />
                <Button type="submit" variant="contained" sx={{ width: "100%", marginTop: "1rem" }} disabled={disabled}>
                    Search
                </Button>
            </form>
            {!noResults ? (
                <JobList jobList={jobList}/>
            ) : (
                <NoResults text={`No results for "${keyword}"`}/>
            )}
        </Container>
    )
}

export default Sidebar
