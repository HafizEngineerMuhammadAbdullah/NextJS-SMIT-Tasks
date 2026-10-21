"use client"
import React from 'react'
// import styles from './SignupForm.module.css';
import { TbBolt } from 'react-icons/tb'
import { motion } from 'motion/react';
import { options } from '@/data/core';


// Now React won't recreate the array every render.
// Tiny optimization


const LeftPanel = () => {
  return (
    <>
      {/* LEFT PANEL */}
      {/* Slide in from the left */}
      <motion.div
        initial={{ opacity: 0, x: -1500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        className={`leftPanel relative flex flex-col md:justify-between gap-y-10 bg-[#1A1A2E] px-10 py-8 overflow-hidden`
        }
      >

        {/* for Left Upper Panel */}
        < div className={`upperLeftPanel`}>
          <div className='h-10 w-10 flex justify-center items-center rounded-xl bg-[#534AB7] '>
            < TbBolt color='white' size={22} />
          </div>

          <h1 className='font-medium text-2xl text-white text-wrap my-3'>Built something great today</h1>
          <p className='text-[#9595B6] text-sm'>Join thousands of developers shipping faster with our platform.</p>
        </div >

        {/* for Left Lower Panel */}
        < div className={`lowerLeftPanel`}>
          {
            options.map((item, idx) => {
              return (
                <div key={idx} className={`options h-10 flex gap-3 items-center`}>

                  {/* Icon(if any) */}
                  <div className={`icon h-7 w-7 flex justify-center items-center rounded-full border`} style={{
                    backgroundColor: item.backgroundColor,
                    color: item.color,
                    borderColor: item.borderColor
                  }}>
                    {
                      // Remove space after the opening bracket of the ternary operator to fix the error
                      item.icon ? <item.icon /> : (idx + 1)
                    }
                  </div>

                  {/* Textual Content */}
                  <div className={`textContent text-md font-medium`} style={{ color: item.contentColor }} >{item.content}</div>
                </div>
              )
            })
          }
        </div >
      </motion.div >
    </>
  )
}

export default LeftPanel