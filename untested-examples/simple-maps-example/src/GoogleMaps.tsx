import React from "react";
import styles from "./GoogleMaps.module.css";
import { registerVevComponent } from "@vev/react";
import GoogleMapReact from 'google-map-react';

type Props = {
  apiKey: string;
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMaps = ({ apiKey }: Props) => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };
  return (
    <div style={{height: '100%' /** Force it to take up the full height of the drawn element in the editor */}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

registerVevComponent(GoogleMaps, {
  name: "BetterGoogleMaps",
  props: [{ name: "publicApiKey", type: "string", initialValue: "AIzaSyAkQRDoMLeuxVyX1QvG_JIxo8P7rajLMxo" }],
  editableCSS: [
    {
      selector: styles.wrapper,
      properties: ["background"],
    },
  ],
});

export default GoogleMaps;
