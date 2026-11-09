import { Avatar, Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
import { MdWorkOutline } from "react-icons/md";

const Header = () => {
    return (
        <Box component="header" sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
                variant="rounded"
                sx={{
                    width: 36,
                    height: 36,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                    color: "primary.main",
                }}
            >
                <MdWorkOutline size={20} />
            </Avatar>
            <Box>
                <Typography variant="h6" component="h1" sx={{ lineHeight: 1.1 }}>
                    Jobify
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Find jobs near you, on the map
                </Typography>
            </Box>
        </Box>
    );
};

export default Header;
