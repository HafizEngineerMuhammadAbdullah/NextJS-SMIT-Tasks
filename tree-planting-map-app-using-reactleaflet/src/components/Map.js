
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import MapClickHandler from "./MapClickHandler";

const treeIcon = new L.Icon({
  iconUrl: "/tree-marker.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -36],
});

export default function Map({ trees, onMapClick }) {
  return (
    <MapContainer
      center={[24.8607, 67.0011]}
      zoom={12}
      scrollWheelZoom
      className="h-[500px] w-full bg-emerald-50"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onMapClick={onMapClick} />

      {trees.map((tree) => (
        <Marker
          key={tree.id}
          position={[tree.lat, tree.lng]}
          icon={treeIcon}
        >
          <Popup>
            <div className="min-w-[190px] space-y-2 p-1">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Community planting
              </p>

              <h3 className="text-lg font-bold text-emerald-950">
                🌳 {tree.treeName}
              </h3>

              <p className="text-sm text-slate-600">
                Planted by{" "}
                <span className="font-semibold text-slate-900">
                  {tree.userName}
                </span>
              </p>

              <div className="rounded-lg bg-emerald-50 p-2 text-xs text-slate-600">
                <p>Lat: {Number(tree.lat).toFixed(6)}</p>
                <p>Lng: {Number(tree.lng).toFixed(6)}</p>
              </div>

              <p className="text-xs text-slate-500">
                Planted on:{" "}
                {tree.date
                  ? new Date(tree.date).toLocaleDateString()
                  : "Date unavailable"}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
