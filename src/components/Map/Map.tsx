import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import styles from "./Map.module.css";
import OralHistories from "./OralHistories/OralHistories";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 42.2819229,
    longitude: -71.0849532,
    zoom: 13,
    width: "40vw",
    height: "80vh",
  });

  return (
    <div className={styles.Map}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ENV}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {OralHistories()}
      </ReactMapGL>
    </div>
  );
}
