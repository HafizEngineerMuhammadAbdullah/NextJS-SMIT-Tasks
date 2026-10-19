import LeftPanel from '@/components/LeftPanel'
import RightPanel from '@/components/RightPanel'
import React from 'react'

// Alhamdulillah
const page = () => {
  return (
    <div className='h-screen bg-black/85 grid grid-cols-1 lg:grid-cols-2'>
      {/* Left Side: Form Panel */}
      <LeftPanel />
      {/* Right Side: Graphic Panel (Hidden on mobile, visible on desktop) */}
      <RightPanel />
    </div>
  )
}

export default page
