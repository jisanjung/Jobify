import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import Sidebar from "./Sidebar";
import { Grid } from "@mui/material";
import Header from "./Header";
import { useMediaQuery } from "@mui/material"; 
import { useStoreState } from "easy-peasy";
import Location from './Location';

const Main = () => {

    const jobList = useStoreState(state => state.jobList);
    const center = useStoreState(state => state.center);
    
    const lgMatches = useMediaQuery("(min-width:900px)");

    // for react map component
    const [viewport, setViewport] = useState({
        latitude: 40.241562,
        longitude: -75.283737,
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
        <Grid container>
          <Grid item xs={12} md={4} lg={3}>
            <Sidebar/>
          </Grid>
          <Grid item xs={12} md={8} lg={9} sx={{ position: "relative" }}>
            <Header/>
            <ReactMapGL 
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={(viewport) => {
                return setViewport(viewport)
              }}
              mapStyle="mapbox://styles/jsonjung/ckx7qkqd423gj14s6axbpff2p"
              height={lgMatches ? "100vh" : "50vh"}
            >
              {jobList.map(job => (
                <Marker 
                  key={job.id}
                  latitude={job.latitude}
                  longitude={job.longitude}
                >
                  <Location/>
                </Marker>
              ))}
            </ReactMapGL>
            {/* <div style={{ width: "100%", height: "100vh", background: "#e3e3e3" }}>
            </div> */}
          </Grid>
        </Grid>
    )
}

export default Main
