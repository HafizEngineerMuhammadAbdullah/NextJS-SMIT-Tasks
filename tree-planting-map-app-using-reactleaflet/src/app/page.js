"use client";

import { useEffect, useState } from "react";
import { ref, push, onValue } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import { database } from "@/lib/firebase";

import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section1 from "@/components/Section1";
import Section3 from "@/components/Section3";
import Section2 from "@/components/Section2";


const INITIAL_FORM_DATA = {
  userName: "",
  treeName: "",
}

// Home — application controller
// Owns the shared state, subscribes to Firebase, saves trees, and passes data and callbacks to child components.
export default function Home() {
  // trees: Array of tree objects fetched from Firebase when component mount & updates the trees when new trees are added.
  // Holds the tree records received from Firebase
  // Shared source for all map markers and tree-count UI.
  // Populated by the Firebase onValue listener, not by the form directly.
  const [trees, setTrees] = useState([]);
  // location: The selected location on the map where the user wants to plant a tree.
  // Holds the location currently selected on the map(latitude + longitude)
  const [location, setLocation] = useState(null);
  // Your other two state variables are loading and saving. They control the UI while data is being fetched or saved.
  // loading: A boolean state to indicate whether the trees are being loaded from Firebase.
  const [loading, setLoading] = useState(true);
  // saving: A boolean state to indicate whether the tree is being saved to Firebase.
  const [saving, setSaving] = useState(false);
  // formData: The data entered by the user in the form, including their name and the name of the tree.
  // Holds what the user is typing
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // Subscribe to Firebase. Updates arrive automatically.
  useEffect(() => {
    // here database is the reference to the Firebase Realtime Database, and "trees" is the path in the database where tree records are stored. The ref function creates a reference to that location in the database.
    const treesRef = ref(database, "trees");
    console.log("Trees Reference of Database:", treesRef);

    // onValue => it registers the listener for changes at the specified reference in the Firebase Realtime Database. Whenever the data at that reference changes, the provided callback function is executed with a snapshot of the new data.
    // The active Firebase subscription receives changes and updates React state.
    const unsubscribe = onValue(//Firebase's onValue listener receives the database update
      treesRef,
      // not run only one time ,can run more than one time when data changes
      (snapshot) => {
        const data = snapshot.val();
        console.log("Loaded Trees from RealTimeDatabase:", data);
        
        const loadedTrees = data
        ? Object.entries(data).map(([id, tree]) => ({
          ...tree,
          id,
        }))
        : [];
        
        console.log("Loaded Trees from RealTimeDatabase After convertng it into array:", loadedTrees);


        //Because your onValue() listener is already listening to /trees, Firebase sends the updated snapshot back to the app. Your listener converts it to an array and calls setTrees()
        // This is a genuine advantage of using Realtime Database rather than maintaining separate local and remote copies of your tree data.
        setTrees(loadedTrees);
        setLoading(false);
      },
      // It handles Firebase write failures and resets saving after the attempt.
      (error) => {
        console.error("Firebase read failed:", error);
        toast.error("Could not load trees from Firebase.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // Save the tree only to Firebase.
  const handleSaveTree = async () => {
    if (!location || saving) return;

    setSaving(true);

    const newTree = {
      userName: formData.userName.trim(),
      treeName: formData.treeName.trim(),
      lat: location.lat,
      lng: location.lng,
      date: new Date().toISOString(),
    };

    try {
      // This writes a new record to Firebase.Not Overwrte the old data/record, but adds a new record to the "trees" collection.
      // push the new tree data to the "trees" path in the Firebase Realtime Database. The push function generates a unique key for the new tree record and saves it under that key.
      // Persist the new tree to Firebase.
      // The onValue subscription updates local React state after the database changes.
      await push(ref(database, "trees"), newTree);

      // The onValue listener updates the map and count.
      setFormData(INITIAL_FORM_DATA);
      setLocation(null);
      toast.success("Your tree has been planted on the map!");
    } catch (error) {
      console.error("Firebase write failed:", error);
      toast.error("Tree could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f8f2] text-slate-800">
      {/* Header */}
      <Header />

      {/* Main Content/Body */}
      {/* Section1, Section2, Box1, Box2 — presentation
        Display introductory content, the total tree count, and the currently selected coordinates. They shouldn't manage the Firebase subscription. */}
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-8 sm:py-10">
        {/* Section - 1(Top Section) */}
        <Section1 />

        {/* Section - 2(Middle Section) */}
        <Section2 loading={loading} trees={trees} location={location} />

        {/* Section - 3 (Bottom Section)*/}
        {/* Section3 and LeftPanel — map workspace
         Arrange the map and form panels. LeftPanel loads the browser-only map and passes the tree data and map-click callback to it. */}
        <Section3
          trees={trees}
          location={location}
          setLocation={setLocation}
          formData={formData}
          setFormData={setFormData}
          handleSaveTree={handleSaveTree}
          saving={saving}
        />

        {/* For Footer */}
        <Footer />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}
