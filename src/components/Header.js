import { AppBar, Typography, Box, useMediaQuery } from '@mui/material'
import React from 'react';

const Header = () => {

    const lgMatches = useMediaQuery("(min-width:900px)");

    return (
        <AppBar sx={{ p: lgMatches ? 3 : 2, boxShadow: 3, zIndex: 10 }} position="absolute">
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant={lgMatches ? "h5" : "h6"} component="h1">
                    Jobify
                </Typography>
            </Box>
        </AppBar>
    )
}

export default Header
