import React from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

// Alhamdulillah
const page = () => {
    return (
        <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
            {/* Left Side: Form Panel */}
            {/* LEFT SIDE: REDUX / FIREBASE AUTH FORM */}
            <LeftPanel />
            {/* Right Side: Graphic Panel (Hidden on mobile, visible on desktop) */}
            {/* RIGHT SIDE: THE REACT FLOW NETWORK PANEL */}
            <RightPanel />
        </div>
    )
};

export default page
