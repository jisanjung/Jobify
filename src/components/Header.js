import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <header>
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" component="h1">
                    Jobify
                </Typography>
            </Box>
        </header>
    )
}

export default Header
