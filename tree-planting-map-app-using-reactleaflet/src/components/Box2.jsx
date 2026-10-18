import React from 'react'

const Box2 = ({location}) => {
    return (
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
    )
}

export default Box2
