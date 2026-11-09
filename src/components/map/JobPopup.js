import { Box, Typography } from "@mui/material";
import React from "react";
import { Popup } from "react-map-gl";
import SalaryBadge from "../jobs/SalaryBadge";
import { PIN_SIZE } from "./Location";

// Lightweight label shown above a hovered or selected pin. Full details live in the side panel.
const JobPopup = ({ job }) => {
    return (
        <Popup
            latitude={job.latitude}
            longitude={job.longitude}
            anchor="bottom"
            offsetTop={-PIN_SIZE * 1.3}
            closeButton={false}
            closeOnClick={false}
        >
            <Box sx={{ minWidth: 180 }}>
                <Typography variant="subtitle2" component="p" sx={{ lineHeight: 1.3 }}>
                    {job.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 0.25 }}>
                    {job.company?.display_name}
                </Typography>
                {job.salary_max ? (
                    <Box sx={{ mt: 1 }}>
                        <SalaryBadge salary={job.salary_max} />
                    </Box>
                ) : null}
            </Box>
        </Popup>
    );
};

export default JobPopup;
