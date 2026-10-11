"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import MapClickHandler from "./MapClickHandler";

// The custom tree icon
const treeIcon = new L.Icon({
  iconUrl: "/tree-marker.png",//Use this image as the marker.
  iconSize: [40, 40],//Image dimensions.
  iconAnchor: [20, 40],//Which point of this image represents the actual geographical location? So the bottom-center of the image is anchored to the geographical coordinate.
  popupAnchor: [0, -40],
});

const Map = ({ trees, onMapClick }) => {
  //   trees = [
  //    {
  //       treeName: "Neem",
  //       lat: 24.871234,
  //       lng: 67.034567
  //    } 
  // ]

  return (
    <MapContainer
      center={[24.8607, 67.0011]}
      zoom={12}
      className="h-[500px] w-full rounded-lg"
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />




      <MapClickHandler
        onMapClick={onMapClick}
      />

      {/* Leaflet receives those coordinates and says:
      Put the marker at this geographical position. */}
      {/* Create a marker for each tree */}
      {trees.map((tree) => (
        <Marker
          key={tree.id}
          position={[tree.lat, tree.lng]}
          icon={treeIcon}
        >
          {/* Popup is simply attached information */}
          {/* When this marker is interacted with, show this information. */}
          <Popup>

            <div className="min-w-[180px]">
              <h3 className="text-lg font-bold text-green-700">
                🌳 {tree.treeName}
              </h3>

              <p className="mt-2">
                <strong>Planted by:</strong>{" "}
                {tree.userName}
              </p>

              <p>
                <strong>Latitude:</strong>{" "}
                {tree.lat}
              </p>

              <p>
                <strong>Longitude:</strong>{" "}
                {tree.lng}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Planted on: {tree.date}
              </p>
            </div>

          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default Map;
