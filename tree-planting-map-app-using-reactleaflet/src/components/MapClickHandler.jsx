"use client";

import { useMapEvents } from "react-leaflet";
// Translate a map click into geographic coordinates and send them
// to Home through a callback. This keeps map events separate
// from the form and Firebase logic.
// Detecting map clicks and passing coordinates upward
// It translates Leaflet click events into latitude and longitude and calls the parent callback.
const MapClickHandler = ({ onMapClick }) => {
    // whenever user clicks on the map,this function will be called and it will pass the lat and lng to the parent component (Home) through the onMapClick prop.
    useMapEvents({
        click(event) {
            const { lat, lng } = event.latlng;

            onMapClick({ lat, lng });
        },
    });

    return null;
};

export default MapClickHandler;