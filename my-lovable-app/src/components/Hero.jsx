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