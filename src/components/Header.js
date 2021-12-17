import { AppBar, Typography, Box } from '@mui/material'
import React from 'react';
import Search from './Search';

const Header = () => {

    return (
        <AppBar sx={{ p: 3}}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" component="h1">
                    Jobify
                </Typography>
                <Search/>
            </Box>
        </AppBar>
    )
}

export default Header
