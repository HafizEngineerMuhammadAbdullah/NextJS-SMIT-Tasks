"use client"
import RightSideWorkflow from "@/app/authentication/signinform/RightSideWorkflow"
const RightPanel = () => {



  return (
    <div className='flex flex-1 flex-col items-center px-4 py-5 bg-gray-100/60 border-l border-l-black/40'>
      {/* Top Side Heading block */}
      <div className='space-y-1.5 mt-3.5 text-center'>
        <h1 className='text-xl font-bold text-black'>Select & Combine & Integrate</h1>
        <p className='text-base font-medium text-gray-400'>Develop & refine AI models using our intuitive interface</p>
      </div>

      <RightSideWorkflow />

    </div>
  )
}

export default RightPanel
