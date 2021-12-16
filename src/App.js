import React, { useState } from "react";
import './App.css';
import ReactMapGL from "react-map-gl";
import Sidebar from "./components/Sidebar";
import { Grid } from "@mui/material";

function App() {

  const [viewport, setViewport] = useState({
    latitude: 40.241562,
    longitude: -75.283737,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  return (
    <Grid container sx={{overflow: 'hidden'}}>
      <Grid item xs={12} md={4} lg={3}>
        <Sidebar/>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <ReactMapGL 
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
        mapStyle="mapbox://styles/jsonjung/ckx7qkqd423gj14s6axbpff2p">
        </ReactMapGL>
      </Grid>
    </Grid>
  );
}

export default App;
