import React from "react";
import { registerVevComponent } from "@vev/react";
import GoogleMapReact from 'google-map-react';

const LAT = 53.7436591235699;
const LON = -2.4181541659627346;

type Props = {
  publicApiKey: string;
};

const GoogleMaps = ({ publicApiKey }: Props) => {
  const defaultProps = {
    center: {
      lat: LAT,
      lng: LON
    },
    zoom: 15
  };

  return (
    <div style={{ height: '100%' /** Force it to take up the full height of the drawn element in the editor */ }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: publicApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      />
    </div>
  );
};

registerVevComponent(GoogleMaps, {
  name: "BetterGoogleMaps",
  props: [{ name: "publicApiKey", type: "string", initialValue: "AIzaSyAkQRDoMLeuxVyX1QvG_JIxo8P7rajLMxo" }]
});

export default GoogleMaps;