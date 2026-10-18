import React from 'react'
import dynamic from "next/dynamic";

// Map component is dynamically imported to prevent server-side rendering issues with Leaflet.
const Map = dynamic(() => import("../components/Map"), {
    ssr: false,
    loading: () => (
        <div className="flex h-[500px] items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
            Loading interactive map...
        </div>
    ),
});

const LeftPanel = ({ trees, setLocation }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm sm:p-4">
            {/* Map Top Most Part */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-4">
                {/* Map Top-Left Heading */}
                <div>
                    <h3 className="font-bold text-slate-900">
                        Explore the planting map
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                        Select a location to place your next tree.
                    </p>
                </div>
                {/* Map Top-Right Trees Count */}
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                    {trees.length} {trees.length === 1 ? "tree" : "trees"} mapped
                </span>
            </div>

            {/* Main/Original React-LeafLet Map */}
            {/* Bottom Part/Actual Map */}
            <div className="overflow-hidden rounded-xl">
                <Map trees={trees} onMapClick={setLocation} />
            </div>

        </div>
    )
}

export default LeftPanel
