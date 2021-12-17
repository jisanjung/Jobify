import { AppBar, Typography } from '@mui/material'
import React from 'react'

const Header = () => {
    return (
        <AppBar sx={{ p: 3}}>
            <Typography variant="h5" component="h1">
                Jobify
            </Typography>
        </AppBar>
    )
}

export default Header
