import { Box } from '@mui/system'
import React from 'react'

const Search = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <input type="number" style={{
                width: "100%"
            }}/>
            <input type="text" style={{
                width: "100%"
            }}/>
        </Box>
    )
}

export default Search
