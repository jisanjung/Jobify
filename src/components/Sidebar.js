import { Container, useMediaQuery, TextField } from '@mui/material'
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
        }} style={{ paddingTop: "1rem", paddingBottom: "1rem", overflow: "scroll" }}>
            <form>
                <TextField label="Zip Code" variant="standard"
                sx={{ width: "100%", marginBottom: "0.5rem" }}/>
                <TextField label="Keyword" variant="standard"
                sx={{ width: "100%" }}/>
            </form>
        </Container>
    )
}

export default Sidebar
