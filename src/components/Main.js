import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import Sidebar from "./sidebar/Sidebar";
import { Box } from "@mui/material";
import Header from "./Header";
import { useMediaQuery } from "@mui/material"; 
import { useStoreState } from "easy-peasy";
import Location from './map/Location';
import JobPopup from './map/JobPopup';

const Main = () => {

    const jobList = useStoreState(state => state.jobList);
    const center = useStoreState(state => state.center);
    const selectedJob = useStoreState(state => state.selectedJob);
    const hoveredJob = useStoreState(state => state.hoveredJob);
    
    const lgMatches = useMediaQuery("(min-width:900px)");

    // for react map component
    // default location is Los Angelos, CA. No reason, just a popular city
    const [viewport, setViewport] = useState({
        latitude: 34.0522,
        longitude: -118.2437,
        width: "100vw",
        height: "100%",
        zoom: 10
    });

    useEffect(() => {
      setViewport({
        latitude: center[0],
        longitude: center[1],
        width: "100vw",
        height: "100%",
        zoom: 10
      });
    }, [center]);

    useEffect(() => {
      console.log(jobList)
    }, [jobList]);

    return (
        <Box sx={{ display: "flex", flexDirection: lgMatches ? "row" : "column" }}>
          <Box>
            <Sidebar/>
          </Box>
          <Box sx={{ position: "relative" }}>
            <Header/>
            <ReactMapGL 
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={(viewport) => {
                return setViewport(viewport)
              }}
              mapStyle="mapbox://styles/jsonjung/ckx7qkqd423gj14s6axbpff2p"
              height={lgMatches ? "100vh" : "60vh"}
            >
              {jobList.map(job => (
                <Marker 
                  key={job.id}
                  latitude={job.latitude}
                  longitude={job.longitude}
                >
                  <Location job={job}/>
                </Marker>
              ))}
              {hoveredJob && !selectedJob ? (
                <JobPopup job={hoveredJob}/>
              ) : <></>}
              {selectedJob ? (
                <JobPopup job={selectedJob} full={true}/>
              ) : <></>}
            </ReactMapGL>
            {/* <div style={{ width: "100%", height: "100vh", background: "#e3e3e3" }}>
            </div> */}
          </Box>
        </Box>
    )
}

export default Main
