// import Button from './Button'
// import Logo from './Logo'
// import NavLinks from './NavLinks'

// const Navbar = () => {
//   return (
//     <div className='p-4 flex justify-around items-center'>
//         <Logo/>
//         <div className='flex justify-around items-center gap-4'>
//             < NavLinks>Solutions</NavLinks>
//             < NavLinks>Resources</NavLinks>
//             < NavLinks>Community</NavLinks>
//             < NavLinks>Enterprise</NavLinks>
//             < NavLinks>Pricing</NavLinks>
//             < NavLinks>Security</NavLinks>
//         </div>

//         <div className='flex gap-4'>
//           <Button className='border-2 p-2 border-black rounded-2xl' >Log in</Button>
//           <Button>Get Started</Button>
//         </div>
//     </div>
//   )
// }

// export default Navbar



import React from 'react'
import Button from './Button'
import Logo from './Logo'
import NavLinks from './NavLinks'

const Navbar = () => {
  return (
    // Header with sticky top and backdrop blur
    <header className="w-full border-b border-zinc-200/50 backdrop-blur-md sticky top-0 z-50 bg-white/40">
      <nav className='max-w-7xl mx-auto px-6 h-16 flex justify-between items-center'>
        {/* Lovable Logo */}
        <Logo />
        
        {/* Navigation Links */}
        <div className='hidden md:flex items-center gap-8'>
          <NavLinks>Solutions</NavLinks>
          <NavLinks>Resources</NavLinks>
          <NavLinks>Community</NavLinks>
          <NavLinks>Enterprise</NavLinks>
          <NavLinks>Pricing</NavLinks>
        </div>
        
        {/* CTA Buttons */}
        <div className='flex items-center gap-3'>
          <Button variant="ghost">Log in</Button>
          <Button variant="primary">Get Started</Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;