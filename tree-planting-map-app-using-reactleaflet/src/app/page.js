"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ref, push, onValue } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import { database } from "@/lib/firebase";
import TreeForm from "../components/TreeForm";

import "react-toastify/dist/ReactToastify.css";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
      Loading interactive map...
    </div>
  ),
});

export default function Home() {
  const [trees, setTrees] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    treeName: "",
  });

  // Subscribe to Firebase. Updates arrive automatically.
  useEffect(() => {
    const treesRef = ref(database, "trees");

    const unsubscribe = onValue(
      treesRef,
      (snapshot) => {
        const data = snapshot.val();

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
      setFormData({ userName: "", treeName: "" });
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
      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
              🌳
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-emerald-950 sm:text-2xl">
                GreenRoots
              </h1>
              <p className="text-xs text-slate-500 sm:text-sm">
                Every tree makes a difference.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 sm:flex">
            <span className="size-2 rounded-full bg-emerald-500" />
            Community planting map
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-8 sm:py-10">
        <section className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
            Grow a greener tomorrow
          </p>
          <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Make your mark.
            <span className="text-emerald-700"> Plant a tree.</span>
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Choose a spot on the map, record your tree, and help
            your community grow a greener future.
          </p>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm hover:-translate-y-1 transition-transform">
            <p className="text-sm font-medium text-slate-500">
              Community trees
            </p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-4xl font-extrabold text-emerald-800">
                {loading ? "—" : trees.length}
              </p>
              <span className="text-3xl">🌲</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Trees recorded by the community
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm hover:-translate-y-1 transition-transform">
            <p className="text-sm font-medium text-slate-500">
              Selected location
            </p>
            <p className="mt-2 text-xl font-bold text-slate-800">
              {location ? "Location selected" : "Choose a spot"}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {location
                ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                : "Click anywhere on the map to begin."}
            </p>
          </div>
        </section>

        <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
          <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-4">
              <div>
                <h3 className="font-bold text-slate-900">
                  Explore the planting map
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Select a location to place your next tree.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                {trees.length} {trees.length === 1 ? "tree" : "trees"} mapped
              </span>
            </div>

            <div className="overflow-hidden rounded-xl">
              <Map trees={trees} onMapClick={setLocation} />
            </div>
          </div>

          <aside className="space-y-5">
            <TreeForm
              location={location}
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveTree}
              saving={saving}
            />

            <div className="rounded-2xl bg-emerald-950 p-5 text-white shadow-sm hover:-translate-y-1.5 transition-transform">
              <p className="text-lg font-bold">Small action, lasting impact.</p>
              <p className="mt-2 text-sm leading-6 text-emerald-100">
                Record your planting location and inspire others to
                contribute to a greener community.
              </p>
              <div className="mt-4 text-3xl">🌱 🌿 🌳</div>
            </div>
          </aside>
        </section>

        <footer className="py-8 text-center text-sm text-slate-500">
          Built for a greener future · GreenRoots
        </footer>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}
