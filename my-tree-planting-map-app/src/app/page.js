"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import useLocalStorage from "../hooks/useLocalStorage";
import TreeForm from "../components/TreeForm";



// Leaflet relies heavily on the browser environment.
// But Next.js can render components on the server.
// The server doesn't have things like:
// window
// document
// browser map APIs
// This is one of the important Next.js-specific reasons behind this code.
const Map = dynamic(
  () => import("../components/Map"),
  {
    ssr: false,//Don't render this Map component on the server. Load it only in the browser.
  }
);

export default function Home() {
  
  // It synchronizes the state with browser localStorage.
  const [trees, setTrees] = useLocalStorage(
    "trees",//key
    []//initialValue
  );

  // No location has been selected yet
  // After clicking:
  // setLocation({ lat: 24.871234, lng: 67.034567 });
  // location
  //  ↓
  //  {
  //   lat: 24.871234,
  //   lng: 67.034567
  //  }
  const [location, setLocation] = useState(null);


  // User Data (UserName + TreeName)
  const [formData, setFormData] = useState({
    userName: "",
    treeName: "",
  });

  const handleMapClick = (location) => {
    setLocation(location);
  };


  // You're creating a database-like record.
  const handleSaveTree = () => {

    if (!location) return;
    
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

    // Main Page
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Center Div Element */}
      <div className="mx-auto max-w-7xl">
       

        {/* Main Heading */}
        <div className="flex items-center gap-x-3">
          <p className="text-3xl font-bold mb-2">🌳</p>
          <h1 className="mb-2 text-3xl font-bold font-mono bg-linear-to-r from-green-300 via-green-600 to-green-950 text-transparent bg-clip-text">
            Tree Planting Map Application
          </h1>
        </div>


        <p className="mb-6 text-gray-600">
          Click on the map, select a location and plant
          your tree.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Actual Map */}
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