import { AppBar, Typography, Box } from '@mui/material'
import React from 'react';

const Header = () => {

    return (
        <AppBar sx={{ p: 2, boxShadow: 3, zIndex: 10 }} position="absolute">
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant={"h6"} component="h1">
                    Jobify
                </Typography>
            </Box>
        </AppBar>
    )
}

export default Header
