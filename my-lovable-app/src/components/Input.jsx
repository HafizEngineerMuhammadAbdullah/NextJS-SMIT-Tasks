// import React from 'react'
// import { GoPlusCircle } from "react-icons/go";
// import { TiMicrophoneOutline } from "react-icons/ti";


// const Input = () => {
//     return (
//         <div className='relative border-2 border-gray-600 bg-amber-50 pt-4 pb-13 px-5 w-[40%] rounded-3xl text-lg'>

//             <input className='w-full h-full outline-none' type="text" name="" id="" placeholder='Ask Lovable to create a dashboard to...' />
//             <GoPlusCircle size={26} color='gray' className='absolute left-3 bottom-4' />
//             <TiMicrophoneOutline size={26} color='gray' className='absolute right-4 bottom-4' />
//         </div>

//     )
// }

// export default Input



import React from 'react'
import { GoPlusCircle } from "react-icons/go";
import { TiMicrophoneOutline } from "react-icons/ti";
import { FiArrowUp } from "react-icons/fi";

const Input = () => {
  return (
    <div className='w-full max-w-2xl px-4'>
      <div className='relative bg-white/80 backdrop-blur-xl border border-zinc-200/80 rounded-2xl p-4 shadow-xl shadow-pink-500/5 hover:border-zinc-300 transition-all focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100'>
        
        <textarea 
          rows={3}
          className='w-full bg-transparent outline-none resize-none text-zinc-800 placeholder:text-zinc-400 text-base sm:text-lg'
          placeholder='Ask Lovable to create a dashboard to...' 
        />
        
        <div className='flex justify-between items-center mt-2 pt-2 border-t border-zinc-100'>
          <div className='flex items-center gap-2'>
            <button className='p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors'>
              <GoPlusCircle size={20} />
            </button>
            <button className='p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors'>
              <TiMicrophoneOutline size={20} />
            </button>
          </div>

          <button className='p-2 bg-black text-white rounded-xl hover:bg-zinc-800 transition-all'>
            <FiArrowUp size={18} />
          </button>
        </div>

      </div>
    </div>
  )
}

export default Input;