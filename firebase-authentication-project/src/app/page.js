import LeftPanel from '@/components/authentication/LeftPanel'
import RightPanel from '@/components/authentication/RightPanel'
import React from 'react'

// Alhamdulillah
const page = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      {/* Left Side: Form Panel */}
      <LeftPanel />
      {/* Right Side: Graphic Panel (Hidden on mobile, visible on desktop) */}
      <RightPanel />
    </div>
  )
}

export default page
