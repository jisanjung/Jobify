import React, { useState } from "react";
import './App.css';
import ReactMapGL from "react-map-gl";

function App() {

  const [viewport, setViewport] = useState({
    latitude: 40.241562,
    longitude: -75.283737,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  return (
    <div className="App">
      <ReactMapGL 
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/jsonjung/ckx7qkqd423gj14s6axbpff2p">
        markers
      </ReactMapGL>
    </div>
  );
}

export default App;
