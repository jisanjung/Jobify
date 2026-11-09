import { Alert, Box, Card, Divider, Fade, Pagination, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import Header from "../Header";
import Form from "./Form";
import JobList from "../jobs/JobList";
import JobDetails from "../jobs/JobDetails";
import NoResults from "../jobs/NoResults";
import useJobSelection from "../../hooks/useJobSelection";

const RESULTS_PER_PAGE = 30;

const buildUrl = (page, { zipCode, keyword }) =>
    `https://api.adzuna.com/v1/api/jobs/us/search/${page}` +
    `?results_per_page=${RESULTS_PER_PAGE}` +
    `&app_id=${process.env.REACT_APP_ADZUNA_APPID}` +
    `&app_key=${process.env.REACT_APP_ADZUNA_KEY}` +
    `&where=${encodeURIComponent(zipCode)}` +
    `&title_only=${encodeURIComponent(keyword)}`;

const LoadingCards = () => (
    <Stack spacing={1.5}>
        {[0, 1, 2, 3].map((i) => (
            <Card key={i} sx={{ p: 2 }}>
                <Stack direction="row" spacing={1.75}>
                    <Skeleton variant="rectangular" width={44} height={44} sx={{ borderRadius: 2, flexShrink: 0 }} />
                    <Box sx={{ flex: 1 }}>
                        <Skeleton width="80%" height={22} />
                        <Skeleton width="45%" />
                        <Skeleton width="60%" />
                    </Box>
                </Stack>
            </Card>
        ))}
    </Stack>
);

const Sidebar = () => {
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [errorMessage, setErrorMessage] = useState("");
    const [params, setParams] = useState(null);
    const [page, setPage] = useState(1);

    const rootRef = useRef(null);
    const listRef = useRef(null);
    const savedScroll = useRef(0);

    const jobList = useStoreState((state) => state.jobList);
    const searchMeta = useStoreState((state) => state.searchMeta);
    const selectedJob = useStoreState((state) => state.selectedJob);
    const detailsOpen = useStoreState((state) => state.detailsOpen);
    const setJobs = useStoreActions((actions) => actions.setJobs);
    const setCenter = useStoreActions((actions) => actions.setCenter);
    const setSearchMeta = useStoreActions((actions) => actions.setSearchMeta);
    const { closeDetails, clearSelection } = useJobSelection();
    const showDetails = Boolean(selectedJob && detailsOpen);

    const scrollEl = () => (isDesktop ? listRef.current : rootRef.current);

    const fetchJobs = (nextPage, nextParams) => {
        setStatus("loading");
        clearSelection();
        fetch(buildUrl(nextPage, nextParams))
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed (${res.status})`);
                return res.json();
            })
            .then((data) => {
                const results = data.results || [];
                setJobs(results);
                setSearchMeta({ ...nextParams, count: data.count || 0 });
                if (results.length > 0) setCenter([results[0].latitude, results[0].longitude]);
                setStatus("success");
            })
            .catch((err) => {
                setErrorMessage(err.message || "Something went wrong");
                setStatus("error");
            });
    };

    const handleSearch = (nextParams) => {
        setParams(nextParams);
        setPage(1);
        fetchJobs(1, nextParams);
    };

    const handlePageChange = (_, value) => {
        if (value === page) return;
        setPage(value);
        const el = scrollEl();
        if (el) el.scrollTop = 0;
        fetchJobs(value, params);
    };

    // Remember list scroll position when opening a job, restore it on "back"
    const prevShowDetails = useRef(showDetails);
    useLayoutEffect(() => {
        const el = scrollEl();
        if (!el) return;
        if (showDetails) {
            el.scrollTop = 0; // opening (or switching) a job: start details at the top
        } else if (prevShowDetails.current) {
            el.scrollTop = savedScroll.current; // back to the list where the user left it
        }
        prevShowDetails.current = showDetails;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showDetails, selectedJob]);

    // Capture scroll position continuously while the list is shown
    const handleScroll = (e) => {
        if (!showDetails) savedScroll.current = e.currentTarget.scrollTop;
    };

    const pageCount = Math.min(Math.ceil((searchMeta?.count || 0) / RESULTS_PER_PAGE), 100);

    const renderContent = () => {
        if (status === "loading") return <LoadingCards />;
        if (status === "error")
            return (
                <Alert severity="error" sx={{ mt: 1 }}>
                    We couldn’t load jobs right now. {errorMessage}. Please try again.
                </Alert>
            );
        if (status === "idle")
            return (
                <NoResults
                    title="Search for jobs near you"
                    subtitle="Enter a job title and a zip code to see openings on the map."
                />
            );
        if (jobList.length === 0)
            return <NoResults title="No jobs found" subtitle="Try a different keyword or a nearby zip code." />;

        if (showDetails)
            return (
                <Fade in key={selectedJob.id}>
                    <Box sx={{ height: "100%" }}>
                        <JobDetails job={selectedJob} onBack={closeDetails} />
                    </Box>
                </Fade>
            );

        return (
            <Fade in>
                <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 1.5 }}>
                        <Typography variant="subtitle2" component="h2">
                            {searchMeta.count.toLocaleString()} jobs
                        </Typography>
                        {pageCount > 1 && (
                            <Typography variant="caption" color="text.secondary">
                                Page {page} of {pageCount}
                            </Typography>
                        )}
                    </Stack>
                    <JobList jobList={jobList} />
                    {pageCount > 1 && (
                        <Stack alignItems="center" sx={{ py: 3 }}>
                            <Pagination
                                count={pageCount}
                                page={page}
                                shape="rounded"
                                color="primary"
                                size={isDesktop ? "medium" : "small"}
                                onChange={handlePageChange}
                            />
                        </Stack>
                    )}
                </Box>
            </Fade>
        );
    };

    return (
        <Box
            ref={rootRef}
            onScroll={isDesktop ? undefined : handleScroll}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.default",
                overflowY: { xs: "auto", md: "hidden" },
            }}
        >
            <Box sx={{ px: { xs: 2, md: 3 }, pt: { xs: 1.5, md: 3 }, pb: 1, bgcolor: "background.paper", flexShrink: 0 }}>
                {!isDesktop && (
                    <Box sx={{ width: 36, height: 4, borderRadius: 2, bgcolor: "divider", mx: "auto", mb: 1.5 }} />
                )}
                <Header />
                <Box sx={{ mt: 2.5 }}>
                    <Form onSearch={handleSearch} loading={status === "loading"} />
                </Box>
                <Box sx={{ pb: 1 }} />
            </Box>
            <Divider />
            <Box
                ref={listRef}
                onScroll={isDesktop ? handleScroll : undefined}
                sx={{
                    flex: 1,
                    overflowY: { xs: "visible", md: "auto" },
                    px: { xs: 2, md: 3 },
                    pt: 2,
                    pb: showDetails ? 0 : 2,
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
};

export default Sidebar;
