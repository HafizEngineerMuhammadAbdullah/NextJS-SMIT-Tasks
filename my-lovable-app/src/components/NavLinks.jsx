// import Link from 'next/link'
// import React from 'react'

// const NavLinks = ({ children }) => {
//     return (
//         <div className='font-medium font-mono'>
//             <Link href={`/${children}`}>
//                 {children}</Link>
//         </div>
//     )
// }

// export default NavLinks


import Link from 'next/link'
import React from 'react'

const NavLinks = ({ children }) => {
  const href = `/${children.toLowerCase()}`;

  return (
    <Link 
      href={href} 
      className='text-sm font-medium text-zinc-600 hover:text-black transition-colors duration-200'
    >
      {children}
    </Link>
  )
}

export default NavLinks;