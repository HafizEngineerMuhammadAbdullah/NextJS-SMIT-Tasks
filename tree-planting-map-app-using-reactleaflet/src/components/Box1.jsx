import React from 'react'

const Box1 = ({ loading, trees }) => {
    return (
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
    )
}

export default Box1
