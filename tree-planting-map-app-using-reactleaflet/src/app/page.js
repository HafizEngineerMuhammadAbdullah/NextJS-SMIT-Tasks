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

export default function Home() {
  // trees: Array of tree objects fetched from Firebase when component mount & updates the trees when new trees are added.
  // Holds the tree records received from Firebase
  const [trees, setTrees] = useState([]);
  // location: The selected location on the map where the user wants to plant a tree.
  // Holds the location currently selected on the map
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
    const treesRef = ref(database, "trees");
    console.log(treesRef);


    const unsubscribe = onValue(
      treesRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log(data);

        const loadedTrees = data
          ? Object.entries(data).map(([id, tree]) => ({
            ...tree,
            id,
          }))
          : [];

        setTrees(loadedTrees);
        setLoading(false);
      },
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
      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-8 sm:py-10">
        {/* Section - 1(Top Section) */}
        <Section1 />

        {/* Section - 2(Middle Section) */}
        <Section2 loading={loading} trees={trees} location={location} />

        {/* Section - 3 (Bottom Section)*/}
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
