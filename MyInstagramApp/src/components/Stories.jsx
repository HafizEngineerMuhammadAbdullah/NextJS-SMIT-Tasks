import Image from 'next/image'
import React from 'react'

const Stories = ({ path }) => {

  return (
    // <div className='overflow-hidden w-16 h-16 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 p-[2px] cursor-pointer'>
    // <div className='overflow-hidden w-16 h-16 rounded-full border-2 [border-image:linear-gradient(to_right,teal,blue)_1]  p-[2px] cursor-pointer'>
    // Parent container holds the gradient and defines the border thickness via padding
    <div className='overflow-hidden w-16 h-16 rounded-full bg-linear-to-r from-[#fcb045] via-[#f31414]  to-[#eb0ea9] p-1 cursor-pointer'>
      {/* Inner container has your card background */}
      <div className='h-full w-full rounded-full'>
        <Image src={path} alt="story" width={50} height={50} className='w-full h-full rounded-full bg-cover' />
      </div>
    </div>

  )
}

export default Stories