"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import useLocalStorage from "../hooks/useLocalStorage";
import TreeForm from "../components/TreeForm";

const Map = dynamic(
  () => import("../components/Map"),
  {
    ssr: false,
  }
);

export default function Home() {

  const [trees, setTrees] = useLocalStorage(
    "trees",
    []
  );

  const [location, setLocation] = useState("");

  const [formData, setFormData] = useState({
    userName: "",
    treeName: "",
  });

  const handleMapClick = (location) => {
    setLocation(location);
  };

  const handleSaveTree = () => {

    const newTree = {
      id: Date.now(),

      userName: formData.userName,

      treeName: formData.treeName,

      lat: location.lat,

      lng: location.lng,

      date: new Date().toLocaleDateString(),
    };

    setTrees([
      ...trees,
      newTree,
    ]);

    // Reset form
    setFormData({
      userName: "",
      treeName: "",
    });

    setLocation(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="mx-auto max-w-7xl">

        <h1 className="mb-2 text-3xl font-bold text-green-700">
          🌳 Tree Planting Application
        </h1>

        <p className="mb-6 text-gray-600">
          Click on the map, select a location and plant
          your tree.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Map */}
          <div className="lg:col-span-2">
            <Map
              trees={trees}
              onMapClick={handleMapClick}
            />
          </div>

          {/* Form */}
          <div>
            <TreeForm
              location={location}
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveTree}
            />

            <div className="mt-4 rounded-lg bg-white p-4">
              <h2 className="font-semibold">
                Total Trees
              </h2>

              <p className="mt-1 text-3xl font-bold text-green-600">
                {trees.length}
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}