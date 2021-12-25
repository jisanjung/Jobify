import React, { useState } from "react";
import './App.css';
import ReactMapGL from "react-map-gl";
import Sidebar from "./components/Sidebar";
import { Grid } from "@mui/material";
import Header from "./components/Header";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material"; 

function App() {

  const lgMatches = useMediaQuery("(min-width:900px)");

  // for react map component
  const [viewport, setViewport] = useState({
    latitude: 40.241562,
    longitude: -75.283737,
    width: "100vw",
    height: "100%",
    zoom: 10
  });

  const theme = createTheme({
    palette: {
      primary: {
        light: '#4dabf5',
        main: '#2196f3',
        dark: '#1769aa',
        contrastText: '#fff',
      },
      secondary: {
        light: '#637bfe',
        main: '#3d5afe',
        dark: '#2a3eb1',
        contrastText: '#fff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12} md={4} lg={3}>
          <Sidebar/>
        </Grid>
        <Grid item xs={12} md={8} lg={9} sx={{ position: "relative" }}>
          <Header/>
          {/* <ReactMapGL 
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle="mapbox://styles/jsonjung/ckx7qkqd423gj14s6axbpff2p"
          height={lgMatches ? "100vh" : "50vh"}>
          </ReactMapGL> */}
          <div style={{ width: "100%", height: "100vh", background: "#e3e3e3" }}>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
