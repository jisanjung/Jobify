import { Stack } from "@mui/material";
import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import JobItem from "./JobItem";
import useJobSelection from "../../hooks/useJobSelection";

const JobList = ({ jobList }) => {
    const selectedJob = useStoreState((state) => state.selectedJob);
    const hoveredJob = useStoreState((state) => state.hoveredJob);
    const setHoveredJob = useStoreActions((actions) => actions.setHoveredJob);
    const { selectJob } = useJobSelection();

    return (
        <Stack spacing={1.5} component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {jobList.map((job) => (
                <li key={job.id}>
                    <JobItem
                        job={job}
                        selected={selectedJob?.id === job.id}
                        highlighted={hoveredJob?.id === job.id}
                        onSelect={selectJob}
                        onHover={setHoveredJob}
                    />
                </li>
            ))}
        </Stack>
    );
};

export default JobList;
