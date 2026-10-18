import React from 'react'



// Section1 is a component where only the static content is displayed, which includes a heading and a paragraph that encourages users to plant trees and contribute to the community planting map. It does not handle any state or logic for saving trees to Firebase or updating the map in real-time.
const Section1 = () => {
    return (
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
    )
}

export default Section1
