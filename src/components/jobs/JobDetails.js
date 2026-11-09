import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { MdArrowBack, MdOpenInNew, MdOutlinePlace, MdOutlineSchedule } from "react-icons/md";
import CompanyLogo from "./CompanyLogo";
import SalaryBadge from "./SalaryBadge";
import { postedAgo } from "./JobItem";

const JobDetails = ({ job, onBack }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
            <Box sx={{ flex: 1 }}>
                <Button
                    onClick={onBack}
                    startIcon={<MdArrowBack size={18} />}
                    size="small"
                    sx={{ mb: 2, ml: -1, color: "text.secondary", fontWeight: 500 }}
                >
                    Back to results
                </Button>

                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <CompanyLogo company={job.company?.display_name} size={56} />
                    <Box sx={{ minWidth: 0 }}>
                        <Typography variant="h6" component="h2">
                            {job.title}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.25 }}>
                            {job.company?.display_name}
                        </Typography>
                    </Box>
                </Stack>

                <Stack spacing={0.75} sx={{ mt: 2, color: "text.secondary" }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <MdOutlinePlace size={16} />
                        <Typography variant="body2">{job.location?.display_name}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <MdOutlineSchedule size={16} />
                        <Typography variant="body2">Posted {postedAgo(job.created)}</Typography>
                    </Stack>
                </Stack>

                {job.salary_max ? (
                    <Box sx={{ mt: 2 }}>
                        <SalaryBadge salary={job.salary_max} size="medium" />
                    </Box>
                ) : null}

                <Divider sx={{ my: 3 }} />

                <Typography variant="overline" color="text.secondary" component="h3">
                    About the role
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.75, whiteSpace: "pre-line" }}>
                    {job.description}
                </Typography>
            </Box>

            <Box
                sx={{
                    position: "sticky",
                    bottom: 0,
                    pt: 2,
                    pb: 2,
                    mt: 3,
                    background: (theme) =>
                        `linear-gradient(to bottom, transparent, ${theme.palette.background.default} 30%)`,
                }}
            >
                <Button
                    component="a"
                    href={job.redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    size="large"
                    fullWidth
                    endIcon={<MdOpenInNew size={18} />}
                >
                    Apply on company site
                </Button>
            </Box>
        </Box>
    );
};

export default JobDetails;
