import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  )
}

export default page
