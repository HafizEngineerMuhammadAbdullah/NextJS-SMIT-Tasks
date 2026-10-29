import React from 'react';
import { connectedModelsData } from '@/data/core'
import { LuArrowUpRight, LuDot } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
// Connected models grid — the same 9 AI model nodes from the login page’s right panel, now shown as manageable cards with green/gray status dots and an “Add model” tile at the end.
const ConnectedModelCards = () => {
  return (
    <div className='w-full max-w-5xl px-5 py-9 mx-auto mb-5 rounded-2xl border border-neutral-900 shadow-xl text-gray-200'>
      {/* Top Div Element */}
      <div className='flex justify-between'>
        <h1 className='text-md font-medium text-white'>Connected Models</h1>
        <button className="flex items-center text-[13px] font-semibold text-white px-4 py-1.5 rounded-xl border border-neutral-800 bg-[#1a1a1a] hover:bg-neutral-800 transition-colors">
          Add Model
          <LuArrowUpRight size={20} />
        </button>
      </div>

      {/* Connected Model Cards Div Element */}
      <div className='mt-3 grid md:grid-cols-3 grid-cols-1 gap-3'>
        {
          // Connected Model Cards
          connectedModelsData.map((item, index) => (
            <button key={item.id} className='p-5 max-w-[300px] flex justify-between items-center rounded-2xl border border-neutral-800 cursor-pointer transition-all shadow-sm hover:shadow-gray-500 hover:-translate-y-1'>
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
            </button>
          ))
        }
        <button className="p-5 flex w-[300px] items-center gap-3 rounded-2xl border border-neutral-800 bg-transparent text-[14px] font-semibold text-blue-400 hover:border-neutral-700 hover:text-white cursor-pointer transition-all shadow-sm shadow-gray-500 hover:-translate-y-1">
            <div className={`h-10 w-10 flex justify-center items-center bg-gray-900 rounded-xl text-gray-200`}>
              <FaPlus />
            </div>
            <div className='flex flex-col gap-y-0.5'>
              <h1 className='text-[14px] font-bold tracking-tight text-blue-400 leading-tight'>Add model</h1>
              <p className="flex items-center text-[13px] font-medium text-neutral-400 mt-0.5 leading-normal">
                Connect New
              </p>
            </div>
        </button>
      </div>
    </div>
  )
}

export default ConnectedModelCards
