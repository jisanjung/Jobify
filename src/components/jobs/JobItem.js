import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdOutlinePlace } from "react-icons/md";
import CompanyLogo from "./CompanyLogo";
import SalaryBadge from "./SalaryBadge";

dayjs.extend(relativeTime);

export const postedAgo = (created) => dayjs(created).fromNow();

const JobItem = ({ job, selected, highlighted, onSelect, onHover }) => {
    return (
        <Card
            sx={{
                borderColor: selected ? "primary.main" : highlighted ? "primary.light" : "divider",
                bgcolor: (theme) => (selected ? alpha(theme.palette.primary.main, 0.04) : "background.paper"),
                "&:hover": {
                    borderColor: selected ? "primary.main" : "primary.light",
                    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
                },
            }}
            onMouseEnter={() => onHover(job)}
            onMouseLeave={() => onHover(null)}
        >
            <CardActionArea onClick={() => onSelect(job)} sx={{ p: 2 }} aria-label={`${job.title} at ${job.company?.display_name}`}>
                <Stack direction="row" spacing={1.75} alignItems="flex-start">
                    <CompanyLogo company={job.company?.display_name} />
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                            variant="subtitle1"
                            component="h3"
                            sx={{
                                fontSize: "0.975rem",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {job.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.25 }} noWrap>
                            {job.company?.display_name}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "text.secondary", mt: 0.25 }}>
                            <MdOutlinePlace size={14} style={{ flexShrink: 0 }} />
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {job.location?.display_name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mt: 1.25 }}>
                            {job.salary_max ? <SalaryBadge salary={job.salary_max} /> : <span />}
                            <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>
                                {postedAgo(job.created)}
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </CardActionArea>
        </Card>
    );
};

export default JobItem;
