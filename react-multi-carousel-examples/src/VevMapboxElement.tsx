import React from "react";
import styles from "./MyComponent.module.css";
import { registerVevComponent } from "@vev/react";
import mapboxgl from 'mapbox-gl';
import Map from 'react-map-gl';

type Props = {
  title: string;
};

var before = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/mapbox/light-v8'
  });
  
  var after = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/mapbox/dark-v8'
  });
  

const VevMapboxElement = ({ title = "Vev" }: Props) => {
  return (
    <div className={styles.wrapper}>
     <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
    </div>
  );
};

registerVevComponent(VevMapboxElement, {
  name: "Mapbox",
  type: 'both',
  props: [{ name: "title", type: "string", initialValue: "Vev" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default VevMapboxElement;
