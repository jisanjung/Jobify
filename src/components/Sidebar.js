import { Container, useMediaQuery } from '@mui/material'
import React from 'react'
import Input from './Input';

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
        }} style={{ paddingTop: "1rem", paddingBottom: "1rem", overflow: "scroll" }}>
            <form>
                <Input label="Zip Code" variant="standard" sx={{width: "100%", marginBottom: "0.5rem"}} regex={/^\d{5}(?:[-\s]\d{4})?$/}/>
                <Input label="Keyword (Engineer, Analyst, etc.)" variant="standard" sx={{width: "100%"}} regex={/.*/}/>
            </form>
        </Container>
    )
}

export default Sidebar
