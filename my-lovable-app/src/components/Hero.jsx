// import Headings from './Headings'
// import Input from './Input'

// const Hero = () => {
//   return (
//     <div className='h-165 w-full flex flex-col gap-10 justify-center items-center'>
//         < Headings/>
//         <Input />
        
//     </div>
    
//   )
// }

// export default Hero


import React from 'react'
import Headings from './Headings'
import Input from './Input'
import PromptPills from './PromptPills'

const Hero = () => {
  return (
    <section className='min-h-[calc(100vh-80px)] w-full flex flex-col justify-center items-center gap-8 py-12'>
      <Headings />
      <Input />
      <PromptPills />
    </section>
  )
}

export default Hero;