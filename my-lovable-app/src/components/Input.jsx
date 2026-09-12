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
    // Replace <p> with a controlled <textarea> and place the animated text inside a dynamic floating placeholder overlay that hides when the input receives focus or text
    <div className='w-full max-w-2xl px-4'>
      <div className='relative bg-white/80 backdrop-blur-xl border border-zinc-200/90 hover:border-gray-400 rounded-4xl p-4 shadow-xl shadow-pink-500/5 transition-all outline-none'>

        <div className="relative">
          {/* Animated Placeholder (Hidden when user focuses or types) */}
          {!isFocused && prompt.length === 0 && (
            <div className="absolute inset-0 pointer-events-none text-zinc-400 text-base select-none pt-1 px-1">
              {/* Using a <p> tag with TypeAnimation makes the prompt box untypable */}
              <TypeAnimation
                sequence={[
                  'Ask Lovable to create a dashboard for...', 2000,
                  'Ask Lovable to create a SaaS landing page...', 2000,
                  'Ask Lovable to create a CRM internal tool...', 2000,
                  'Ask Lovable to create an internal tool that...', 2000,
                  'Ask Lovable to create a blog about...', 2000,
                  'Ask Lovable to create a prototype for my...', 2000,
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
            <GoPlusCircle size={28} />
          </button>

          <div className='flex items-center gap-2'>
            <button
              type="button"
              aria-label="Voice prompt"
              className='p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors'
            >
              <TiMicrophoneOutline size={24} />
            </button>

            <button
              type="button"
              aria-label="Submit prompt"
              disabled={!prompt.trim()}
              className={`p-2 rounded-xl transition-all ${prompt.trim()
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