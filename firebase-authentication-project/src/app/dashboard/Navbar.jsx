import React from 'react'
import Logo from './Logo'
import Link from 'next/link';
import { primaryButtons } from '@/data/core';
import Button from './Button';

// Header + Navbar
const Navbar = () => {

    const navLinks = [
        'Home',
        'About',
        'Contact',
        'Products',
        'Buy'
    ];

    return (
        // Header
        <header className='w-full px-4 py-1.5 bg-white/20'>
            {/* Navbar */}
            <nav className='w-full flex justify-between items-center border-b border-gray-700'>

                {/* Left Side */}
                <div>
                    {/* NavLogo */}
                    <Logo src="/logos/lockup.svg" myClass="w-30 h-20" alt="NavLogo/Firebase Logo" />
                    {/* <RiCursorAiLine  size={24}/> */}
                </div>

                {/* <div className='flex gap-2'>
                    {navLinks.map((link, index) => (
                        <Link key={index} className='font-medium text-md font-dmsans text-black' href={`${link.toLocaleLowerCase()}`}>{link}</Link>
                    ))}
                </div> */}

                {/* Right Side */}
                <div className='flex gap-2'>
                    {primaryButtons.map((item, index) => (
                        <Button
                            key={index}
                            myClass={`h-9 shrink-0 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:text-gray-700 ${index === primaryButtons.length - 1
                                ? 'w-auto gap-2 px-3 whitespace-nowrap'
                                : 'w-9'
                                }`}
                        >
                            <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                            {index === primaryButtons.length - 1 && (
                                <span>New Experiment</span>
                            )}
                        </Button>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
