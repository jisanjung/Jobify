import { Container, useMediaQuery } from '@mui/material'
import React from 'react'

const Sidebar = () => {

    const lgMatches = useMediaQuery("(min-width:900px)");

    return (
        <Container sx={lgMatches ? {} : {
            position: "absolute",
            bottom: 0,
            top: "50%",
            left: 0,
            right: 0,
            zIndex: "10",
            background: "#fff"
        }}>
            sidebar
        </Container>
    )
}

export default Sidebar
