"use client"
import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import Logo from './Logo'
import NavLinks from './NavLinks'
import Button from './Button'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="w-full border-b border-zinc-200/50 backdrop-blur-md sticky top-0 z-50 bg-white/40">
      <nav className='max-w-7xl mx-auto px-6 h-16 flex justify-between items-center'>
        <Logo />
        
        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-8'>
          <NavLinks>Solutions</NavLinks>
          <NavLinks>Resources</NavLinks>
          <NavLinks>Community</NavLinks>
          <NavLinks>Enterprise</NavLinks>
          <NavLinks>Pricing</NavLinks>
          <NavLinks>Security</NavLinks>
        </div>

        {/* Desktop CTA */}
        <div className='hidden md:flex items-center gap-3'>
          <Button variant="ghost">Log in</Button>
          <Button variant="primary">Get Started</Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 text-zinc-600 hover:text-black cursor-pointer transition-colors duration-200"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-200 px-6 py-4 flex flex-col gap-4 shadow-lg">
          <NavLinks>Solutions</NavLinks>
          <NavLinks>Resources</NavLinks>
          <NavLinks>Community</NavLinks>
          <NavLinks>Enterprise</NavLinks>
          <NavLinks>Pricing</NavLinks>
          <NavLinks>Security</NavLinks>
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-100">
            <Button variant="ghost" className="w-full">Log in</Button>
            <Button variant="primary" className="w-full">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar