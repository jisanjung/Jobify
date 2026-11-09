import React, { useState } from "react";
import { Box, Button, CircularProgress, InputAdornment } from "@mui/material";
import { MdSearch, MdOutlinePlace } from "react-icons/md";
import Input from "../Input";

const ZIP_REGEX = /^\d{5}(?:[-\s]\d{4})?$/;
const KEYWORD_REGEX = /\S+/;

const Form = ({ onSearch, loading }) => {
    const [zipCode, setZipCode] = useState("");
    const [keyword, setKeyword] = useState("");
    const [zipCodeError, setZipCodeError] = useState(false);
    const [keywordError, setKeywordError] = useState(false);

    const canSubmit = zipCode && keyword && !zipCodeError && !keywordError && !loading;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSearch({ zipCode, keyword });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, columnGap: 1.5 }}>
                <Input
                    label="Job title or keyword"
                    name="keyword"
                    placeholder="e.g. Engineer, Analyst"
                    sx={{ flex: 3 }}
                    regex={KEYWORD_REGEX}
                    errorText="Enter a keyword"
                    setInput={setKeyword}
                    setError={setKeywordError}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MdSearch size={18} />
                            </InputAdornment>
                        ),
                    }}
                />
                <Input
                    label="Zip code"
                    name="zip"
                    placeholder="90012"
                    sx={{ flex: 2 }}
                    regex={ZIP_REGEX}
                    errorText="Enter a 5-digit zip code"
                    setInput={setZipCode}
                    setError={setZipCodeError}
                    inputProps={{ inputMode: "numeric", maxLength: 10 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MdOutlinePlace size={18} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!canSubmit}
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <MdSearch size={18} />}
            >
                {loading ? "Searching…" : "Search jobs"}
            </Button>
        </Box>
    );
};

export default Form;
