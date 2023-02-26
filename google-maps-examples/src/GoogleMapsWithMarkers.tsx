import React from "react";
import { registerVevComponent } from "@vev/react";
import GoogleMapReact from 'google-map-react';
import styles from './GoogleMaps.module.css';
const LAT = 53.7436591235699;
const LON = -2.4181541659627346;

type Props = {
    publicApiKey: string;
};
const MarkerReactComponent = ({ text }) => <div className={styles.marker}>{text}</div>;
const GoogleMapsWithMarkers = ({ publicApiKey }: Props) => {
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
                defaultZoom={defaultProps.zoom}>
                <MarkerReactComponent
                    lat={LAT}
                    lng={LON}
                    text="A"
                />
            </GoogleMapReact>
        </div>
    );
};

registerVevComponent(GoogleMapsWithMarkers, {
    name: "BetterGoogleMapsWithMarkers",
    editableCSS: [{
        selector: styles.marker,
        properties: ["background", "font-size", "color", "border", "border-radius"],
    }], props: [
        { name: "publicApiKey", type: "string", initialValue: "AIzaSyAkQRDoMLeuxVyX1QvG_JIxo8P7rajLMxo" },
        {
            name: "products",
            type: "array",
            of: [
              {
                name: "title",
                type: "string",
              },
              { name: "price", type: "number" },
            ],
          },]
});

export default GoogleMapsWithMarkers;