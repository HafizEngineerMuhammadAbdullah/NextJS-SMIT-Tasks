import React from 'react';
import { connectedModelsData } from '@/data/core'
import { LuArrowUpRight, LuDot } from "react-icons/lu";

const ConnectedModelCards = () => {
  return (
    <div className='w-full max-w-5xl p-5 mx-auto rounded-2xl border border-neutral-900 shadow-xl text-gray-200'>
      {/* Top Div Element */}
      <div className='flex justify-between'>
        <h1 className='text-md font-medium text-white'>Connected Models</h1>
        <button className="flex items-center text-[13px] font-semibold text-white px-4 py-1.5 rounded-xl border border-neutral-800 bg-[#1a1a1a] hover:bg-neutral-800 transition-colors">
          Add Model
           <LuArrowUpRight size={20}/>
        </button>
      </div>
      <div className='mt-3 grid md:grid-cols-3 grid-cols-1 gap-3'>
        {
          connectedModelsData.map((item,index) => (
            <div key={item.id} className='p-5 max-w-[300px] flex justify-between items-center rounded-2xl border border-neutral-800'>
              <div className="flex gap-3">
                <div className={`h-10 w-10 flex justify-center items-center rounded-xl text-gray-200 ${item.brandBg}`}>
                   {item.iconText}
                </div>
                <div className='flex flex-col gap-y-0.5'>
                    <h1 className='text-[14px] font-bold tracking-tight text-white leading-tight'>{item.name}</h1>
                    <p className="flex items-center text-[13px] font-medium text-neutral-400 mt-0.5 leading-normal">
                     {item.provider} < LuDot /> <span>{item.type}</span>
                    </p>
                </div>
              </div>
              <div className={`h-1.5 w-1.5 rounded-full ${item.status === "connected" ? 'bg-green-700' : 'bg-gray-300'}`}>
              </div>
            </div>
          ))
        }
        <button className="flex w-[300px] items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-neutral-800 bg-transparent text-[14px] font-semibold text-neutral-400 transition-colors hover:border-neutral-700 hover:text-white">
  <svg 
    xmlns="http://w3.org" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={2.5} 
    stroke="currentColor" 
    className="h-4 w-4"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
  Add model
</button>

      </div>
    </div>
  )
}

export default ConnectedModelCards
