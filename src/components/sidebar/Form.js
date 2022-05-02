import React, { useState, useEffect } from 'react';
import Input from "../Input";
import { Button } from "@mui/material";
import { useStoreActions } from 'easy-peasy';

const Form = (props) => {

    const [zipCode, setZipCode] = useState("");
    const [keyword, setKeyword] = useState("");
    const [zipCodeError, setZipCodeError] = useState(false);
    const [keywordError, setKeywordError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    
    const setJobs = useStoreActions(actions => actions.setJobs);
    const setCenter = useStoreActions(actions => actions.setCenter);
    const setSelectedId = useStoreActions(actions => actions.setSelectedId);
    const setSelectedJob = useStoreActions(actions => actions.setSelectedJob);

    useEffect(() => {
        if (zipCodeError || keywordError) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [zipCodeError, keywordError]);

    const handleSearch = e => {
        let baseURL = `https://api.adzuna.com/v1/api/jobs/us/search/1?results_per_page=50&app_id=${process.env.REACT_APP_ADZUNA_APPID}&app_key=${process.env.REACT_APP_ADZUNA_KEY}`;

        e.preventDefault();
        
        if (zipCode && keyword)
            props.setLoading(true);
            fetch(`${baseURL}&where=${zipCode}&title_only=${keyword}`)
            .then(res => res.json())
            .then(data => {
                props.setPageCount(Math.ceil(data.count / 50));
                props.setLoading(false);
                setSelectedId(0);
                setSelectedJob(null);
                if (data.results.length === 0) {
                    return props.setNoResults(true);
                }
                props.setNoResults(false);
                setCenter([data.results[0].latitude, data.results[0].longitude]);
                return setJobs(data.results);
            });
    }
    // refetch job list based on current page
    const refetch = currentPage => {
        let baseURL = `https://api.adzuna.com/v1/api/jobs/us/search/${currentPage}?results_per_page=50&app_id=${process.env.REACT_APP_ADZUNA_APPID}&app_key=${process.env.REACT_APP_ADZUNA_KEY}`;
        if (zipCode && keyword) {
            props.setLoading(true);
            fetch(`${baseURL}&where=${zipCode}&title_only=${keyword}`)
            .then(res => res.json())
            .then(data => {
                props.setLoading(false);
                return setJobs(data.results);
            });
        }
    }
    useEffect(() => {
        refetch(props.currentPage);
    }, [props.currentPage]);

  return (
    <form onSubmit={e => handleSearch(e)} style={{ paddingTop: "1rem" }}>
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
  );
};

export default Form;
