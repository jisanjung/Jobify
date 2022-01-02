import { Button, CircularProgress, Container, useMediaQuery, Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Input from './Input';
import JobList from './jobs/JobList';
import NoResults from './NoResults';
import { useStoreActions, useStoreState } from "easy-peasy";
 
const Sidebar = () => {

    const lgMatches = useMediaQuery("(min-width:900px)");
    const [zipCode, setZipCode] = useState("");
    const [keyword, setKeyword] = useState("");
    const [zipCodeError, setZipCodeError] = useState(false);
    const [keywordError, setKeywordError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const setJobs = useStoreActions(actions => actions.setJobs);
    const jobList = useStoreState(state => state.jobList);

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
            setLoading(true);
            fetch(`${baseURL}&where=${zipCode}&title_only=${keyword}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                if (data.results.length === 0) {
                    return setNoResults(true);
                }
                setNoResults(false);
                return setJobs(data.results);
            });
    }

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
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", marginY: 3 }}>
                    <CircularProgress/>
                </Box>
            ) : <></>}
            {!noResults ? (
                <JobList jobList={jobList}/>
            ) : (
                <NoResults keyWord={keyword} text="No results"/>
            )}
        </Container>
    )
}

export default Sidebar
