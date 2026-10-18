import React from 'react'
import Box1 from "@/components/Box1";
import Box2 from "@/components/Box2";


{/* Section2 is a component that displays two boxes side by side, each containing an image and some text. It is used to highlight the benefits of planting trees and how users can contribute to the community planting map. */ }
const Section2 = ({ loading, trees, location }) => {
    return (
        <section className="mb-6 grid gap-4 sm:grid-cols-2" >
            {/* Box-1(Left Box) */}
            < Box1 loading={loading} trees={trees} />

            {/* Box-2(Right Box) */}
            < Box2 location={location} />
        </section >
    )
}

export default Section2
