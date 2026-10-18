import React from 'react'

const Box1 = ({ loading, trees }) => {
    return (
        // Total tree count
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm hover:-translate-y-1 transition-transform">
            {/* TopSide */}
            <p className="text-sm font-medium text-slate-500">
                Community trees
            </p>
            <div className="mt-2 flex items-end justify-between">
                {/* LeftSide */}
                <p className="text-4xl font-extrabold text-emerald-800">
                    {loading ? "—" : trees.length}
                </p>
                {/* RightSide */}
                <span className="text-3xl">🌲</span>
            </div>
            {/* BottomSide */}
            <p className="mt-2 text-sm text-slate-500">
                Trees recorded by the community
            </p>
        </div>
    )
}

export default Box1
