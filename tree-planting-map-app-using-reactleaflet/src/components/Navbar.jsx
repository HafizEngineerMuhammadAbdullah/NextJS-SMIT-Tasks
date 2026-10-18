import React from 'react'

const Navbar = () => {
    return (
        <nav className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-5 sm:px-8">

            <div className="flex items-center gap-3">
                {/* Tree Png */}
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                    🌳
                </div>
                {/* Navbar Heading */}
                <div>
                    <h1 className="text-xl font-extrabold tracking-tight text-emerald-950 sm:text-2xl">
                        GreenRoots
                    </h1>
                    <p className="text-xs text-slate-500 sm:text-sm">
                        Every tree makes a difference.
                    </p>
                </div>
            </div>

            {/* Community Badge */}
            <div className="hover:-translate-y-1 transition-all hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 sm:flex">
                {/* Dotted Circle */}
                {/* <div className="size-2 rounded-full bg-emerald-500 hover:bg-emerald-600 animate-pulse motion-reduce:animate-none shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" /> */}
                {/* <div className="size-2 rounded-full bg-emerald-500 hover:bg-emerald-600 animate-pulse motion-reduce:animate-none shadow-sm transition-all" /> */}
                <div className="size-2 rounded-full bg-emerald-500 hover:bg-emerald-600 animate-my-pulse motion-reduce:animate-none shadow-sm transition-all" />
                Community planting map
            </div>
        </nav>
    )
}

export default Navbar
