"use client";

import { useMapEvents } from "react-leaflet";

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