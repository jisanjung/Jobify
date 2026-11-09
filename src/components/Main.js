import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import { Box, Paper, Typography } from "@mui/material";
import { useStoreState } from "easy-peasy";
import Sidebar from "./sidebar/Sidebar";
import Location, { PIN_SIZE } from "./map/Location";
import JobPopup from "./map/JobPopup";

const Main = () => {
    const jobList = useStoreState((state) => state.jobList);
    const center = useStoreState((state) => state.center);
    const selectedJob = useStoreState((state) => state.selectedJob);
    const hoveredJob = useStoreState((state) => state.hoveredJob);
    const searchMeta = useStoreState((state) => state.searchMeta);

    const [viewport, setViewport] = useState({
        latitude: center[0],
        longitude: center[1],
        zoom: 10,
    });

    useEffect(() => {
        setViewport((v) => ({
            ...v,
            latitude: center[0],
            longitude: center[1],
            zoom: Math.max(v.zoom, 10),
            transitionDuration: 600,
            transitionInterpolator: new FlyToInterpolator(),
        }));
    }, [center]);

    const popupJob = hoveredJob || selectedJob;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                height: "100vh",
                bgcolor: "background.default",
            }}
        >
            <Box
                component="aside"
                sx={{
                    order: { xs: 1, md: 0 },
                    width: { xs: "100%", md: 420 },
                    flexShrink: 0,
                    flex: { xs: 1, md: "none" },
                    minHeight: 0,
                    borderRight: { md: 1 },
                    borderColor: { md: "divider" },
                    borderTopLeftRadius: { xs: 16, md: 0 },
                    borderTopRightRadius: { xs: 16, md: 0 },
                    mt: { xs: -2, md: 0 },
                    overflow: "hidden",
                    position: "relative",
                    zIndex: 2,
                    boxShadow: { xs: "0 -4px 16px rgba(15, 23, 42, 0.08)", md: "none" },
                }}
            >
                <Sidebar />
            </Box>

            <Box
                component="main"
                sx={{ position: "relative", flex: { md: 1 }, height: { xs: "45vh", md: "100%" }, minWidth: 0 }}
            >
                <ReactMapGL
                    {...viewport}
                    width="100%"
                    height="100%"
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/jsonjung/ckx7qkqd423gj14s6axbpff2p"
                    onViewportChange={setViewport}
                >
                    {jobList.map((job) => (
                        <Marker
                            key={job.id}
                            latitude={job.latitude}
                            longitude={job.longitude}
                            offsetLeft={-PIN_SIZE / 2}
                            offsetTop={-PIN_SIZE}
                        >
                            <Location
                                job={job}
                                active={hoveredJob?.id === job.id}
                                selected={selectedJob?.id === job.id}
                            />
                        </Marker>
                    ))}
                    {popupJob && <JobPopup job={popupJob} />}
                </ReactMapGL>

                {searchMeta && jobList.length > 0 && (
                    <Paper
                        elevation={0}
                        sx={{
                            position: "absolute",
                            top: 16,
                            left: "50%",
                            transform: "translateX(-50%)",
                            px: 2,
                            py: 0.75,
                            borderRadius: 999,
                            border: 1,
                            borderColor: "divider",
                            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.1)",
                            whiteSpace: "nowrap",
                            maxWidth: "calc(100% - 32px)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        <Typography variant="body2" component="span" sx={{ fontWeight: 600 }}>
                            {jobList.length} of {searchMeta.count.toLocaleString()} jobs
                        </Typography>
                        <Typography variant="body2" component="span" color="text.secondary">
                            {" "}· “{searchMeta.keyword}” near {searchMeta.zipCode}
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    );
};

export default Main;
