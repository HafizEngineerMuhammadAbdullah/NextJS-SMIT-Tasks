"use client"
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {

  const route = useRouter()

  return (
    // NAVBAR
    <nav className='flex items-center justify-between p-5 bg-gray-800 text-white hover:bg-gray-100 cursor-pointer'>

       <Image 
       onClick={() => route.push('/')}
       src="/assets/logo.png"
       alt="Logo"
       className=''
       width={200}
       height={200}
       />

      <ul className='flex space-x-4 font-bold text-lg'>
        <Link className='transition hover:text-green-700' href="/about">About</Link>
        <Link className='transition hover:text-green-700' href="/contact">Contact</Link>
        <Link className='transition hover:text-green-700' href="/faculty">Faculty</Link>
        <Link className='transition hover:text-green-700' href="/courses">Courses</Link>
      </ul>
    </nav>
  )
}

export default Navbar
