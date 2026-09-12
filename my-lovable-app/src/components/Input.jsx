// // import React from 'react'
// // import { GoPlusCircle } from "react-icons/go";
// // import { TiMicrophoneOutline } from "react-icons/ti";


// // const Input = () => {
// //     return (
// //         <div className='relative border-2 border-gray-600 bg-amber-50 pt-4 pb-13 px-5 w-[40%] rounded-3xl text-lg'>

// //             <input className='w-full h-full outline-none' type="text" name="" id="" placeholder='Ask Lovable to create a dashboard to...' />
// //             <GoPlusCircle size={26} color='gray' className='absolute left-3 bottom-4' />
// //             <TiMicrophoneOutline size={26} color='gray' className='absolute right-4 bottom-4' />
// //         </div>

// //     )
// // }

// // export default Input


// "use client"
// import React from 'react'
// import { GoPlusCircle } from "react-icons/go";
// import { TiMicrophoneOutline } from "react-icons/ti";
// import { FiArrowUp } from "react-icons/fi";
// import { TypeAnimation } from 'react-type-animation';

// const Input = () => {

//   const [prompt, setPrompt] = useState('')
//   const [isFocused, setIsFocused] = useState(false)

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault()
//       if (prompt.trim()) {
//         console.log("Submitting prompt:", prompt)
//         // Add submit logic here
//       }
//     }
//   }



//   return (
//     <div className='w-full max-w-2xl px-4'>
//       <div className='relative bg-white/80 backdrop-blur-xl border border-gray-400/80 hover:border-gray-500/80 rounded-4xl p-4 shadow-xl shadow-pink-500/5 transition-all outline-none'>

//         {/* Using a <p> tag with TypeAnimation makes the prompt box untypable */}
//         <p
//           className='px-2 w-full bg-transparent outline-none resize-none text-gray-500 placeholder:text-zinc-400 text-base sm:text-base focus:outline-none focus:ring-0 focus:border-transparent'
//         >
//           <TypeAnimation
//             sequence={[
//               'Ask Lovable to create a dashboard to...',
//               2000,
//               'Ask Lovable to create a landing page for my...',
//               2000,
//               'Ask Lovable to create a prototype for my...',
//               2000, // Waits 2s
//               'Ask Lovable to create an internal tool that...',
//               2000,
//               'Ask Lovable to create a blog about...',
//               2000,
//               'Ask Lovable to create a web app that...',
//               () => {
//                 console.log('Sequence completed');
//               },
//             ]}
//             wrapper="span"
//             cursor={true}
//             repeat={Infinity}
//           />
//         </p>

//         <div className='flex justify-between items-center mt-2 pt-2 px-1 border-t border-zinc-100'>
//           {/* Plus Button */}
//           <button className='text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors'>
//             <GoPlusCircle size={30} />
//           </button>

//           <div className='flex items-center gap-2'>
//             {/* Microphone Button */}
//             <button className='p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors'>
//               <TiMicrophoneOutline size={24} />
//             </button>
//             {/* Send Button */}
//             <button className='p-1 bg-black text-white rounded-xl hover:bg-zinc-800 transition-all cursor-pointer'>
//               <FiArrowUp size={20} />
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Input;



// Replace <p> with a controlled <textarea> and place the animated text inside a dynamic floating placeholder overlay that hides when the input receives focus or text

"use client"
import React, { useState } from 'react'
import { GoPlusCircle } from "react-icons/go"
import { TiMicrophoneOutline } from "react-icons/ti"
import { FiArrowUp } from "react-icons/fi"
import { TypeAnimation } from 'react-type-animation'

const Input = () => {
  const [prompt, setPrompt] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (prompt.trim()) {
        console.log("Submitting prompt:", prompt)
        // Add submit logic here
      }
    }
  }

  return (
    <div className='w-full max-w-2xl px-4'>
      <div className='relative bg-white/80 backdrop-blur-xl border border-zinc-200/90 hover:border-zinc-300 rounded-3xl p-4 shadow-xl shadow-pink-500/5 transition-all focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100'>
        
        <div className="relative min-h-[72px]">
          {/* Animated Placeholder (Hidden when user focuses or types) */}
          {!isFocused && prompt.length === 0 && (
            <div className="absolute inset-0 pointer-events-none text-zinc-400 text-base select-none pt-1 px-1">
              <TypeAnimation
                sequence={[
                  'Ask Lovable to create a dashboard for...', 2000,
                  'Ask Lovable to create a SaaS landing page...', 2000,
                  'Ask Lovable to create a CRM internal tool...', 2000,
                  'Ask Lovable to create a web app that...', 2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </div>
          )}

          {/* Real Functional Input */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            rows={2}
            className='w-full bg-transparent outline-none resize-none text-zinc-800 text-base focus:ring-0 border-none p-1'
            aria-label="Prompt input"
          />
        </div>

        {/* Action Controls */}
        <div className='flex justify-between items-center mt-2 pt-2 border-t border-zinc-100'>
          <button 
            type="button" 
            aria-label="Attach file"
            className='p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors'
          >
            <GoPlusCircle size={22} />
          </button>

          <div className='flex items-center gap-2'>
            <button 
              type="button" 
              aria-label="Voice prompt"
              className='p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors'
            >
              <TiMicrophoneOutline size={22} />
            </button>
            
            <button 
              type="button" 
              aria-label="Submit prompt"
              disabled={!prompt.trim()}
              className={`p-2 rounded-xl transition-all ${
                prompt.trim() 
                  ? 'bg-black text-white hover:bg-zinc-800 cursor-pointer scale-100' 
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
            >
              <FiArrowUp size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Input