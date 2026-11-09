import { Box, Typography } from "@mui/material";
import React from "react";
import searchHouse from "../../assets/undraw_house_searching_re_stk8.svg";

const NoResults = React.memo(({ title, subtitle }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", py: 6, px: 2 }}>
            <Box component="img" src={searchHouse} alt="" sx={{ width: 160, mb: 3, opacity: 0.9 }} />
            <Typography variant="subtitle1" component="h2">
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 280 }}>
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
});

export default NoResults;
