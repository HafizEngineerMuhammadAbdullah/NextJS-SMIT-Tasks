"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import useLocalStorage from "../hooks/useLocalStorage";
import TreeForm from "../components/TreeForm";
import { ToastContainer } from "react-toastify";
import { database } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';



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

    console.log("hello");

    if (!location) return;

    const newTree = {
      id: Date.now(),

      userName: formData.userName,

      treeName: formData.treeName,

      lat: location.lat,

      lng: location.lng,

      date: new Date().toLocaleDateString(),
    };

    console.log(newTree);


    // update trees data
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

        {/* Description */}
        <p className="mb-6 text-gray-600">
          Click on the map, select a location and plant
          your tree.
        </p>

        {/* Map  Grid(Left Side + Right Side)*/}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Actual Map */}
          {/* Left Div */}
          <div className="lg:col-span-2">
            <Map
              trees={trees}
              onMapClick={handleMapClick}
            />
          </div>


          {/* Right Div */}

          <div>
            {/* Tree Form */}
            <TreeForm
              location={location}
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveTree}
            />


            {/* Total Trees Block */}
            {/* Tree Count Component */}
            <section
              aria-label="Tree planting total"
              className="group mt-4 flex items-center justify-between overflow-hidden rounded-xl border border-green-200 bg-gradient-to-br from-white to-green-50 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-green-800">
                  Trees planted
                </h2>
                <p className="mt-1 text-4xl font-bold leading-none text-green-700">
                  {trees.length}
                </p>
              </div>

              <div
                aria-hidden="true"
                className="flex size-14 items-center justify-center rounded-full bg-green-100 text-3xl ring-1 ring-green-200 transition-transform duration-200 group-hover:scale-105"
              >
                🌳
              </div>
            </section>

          </div>

        </div>

      </div>
      {/* Toast Container */}
      <ToastContainer></ToastContainer>
    </main>
  );
}