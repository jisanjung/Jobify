import { Typography } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react';
import searchHouse from "../assets/undraw_house_searching_re_stk8.svg";

const NoResults = React.memo((props) => {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginY: 8 }}>
            <Box sx={{ width: "200px" }}>
                <img src={searchHouse} alt="Search Error" style={{ width: "100%" }}/>
            </Box>
            <Typography variant="h6" component="h1" sx={{ color: "#757575", textAlign: "center", marginTop: 2 }}>
                {props.text}
            </Typography>
        </Box>
    )
});

export default NoResults
