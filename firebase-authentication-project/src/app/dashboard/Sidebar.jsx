"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarLinksOne, sidebarLinksTwo, sidebarLinksThree, sidebarSections } from '@/data/core';
import { VscLayoutSidebarLeftOff, VscLayoutSidebarRightOff, VscLayoutSidebarLeftDock, VscLayoutSidebarRightDock } from "react-icons/vsc"
import Logo from "./Logo";

const Sidebar = ({ myClass }) => {


    const pathname = usePathname()
    // 🟠 Structure Problems
    // Problem 1 — isHover state is unnecessary
    // You use isHover only to swap icons. This can be done with pure Tailwind group-hover — no state needed:
    // ❌ Unnecessary — causes extra re-renders
    const [isHover, setIsHover] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    console.log("isSidebarOpen : ", isSidebarOpen);
    console.log("isHover : ", isHover);


    // I found the issue: one shared isHovered state is used by every icon in the first link group, so hovering one row changes all of them. I’ll switch the icons to Tailwind’s per-row group-hover styling, which keeps each color change scoped to its own sidebar link.

    // Use Tailwind’s group on each sidebar row and group-hover: on its icon. That scopes the color change to the row being hovered, instead of changing every icon together.
    // I applied this to all three sidebar link groups in Sidebar.jsx. The icon now uses group-hover:text-blue-400, with a color transition. The sidebar file passes ESLint
    // Sidebar — brand logo, navigation sections (Main, Workspace, System)
    // 🟡 UI/UX Improvements
    // Improvement 1 — Active link has no visual indicator
    // Right now nothing tells the user which page they are on. Use Next.js usePathname():
    // Improvement 2 — Sidebar collapse animation is abrupt
    // Add a smooth width transition
    // Improvement 3 — Collapsed sidebar shows nothing useful
    // When collapsed, show a tooltip on hover so the user knows what each icon is. New concept — use Tailwind’s group + absolute tooltip:

    return (

        // <aside className={`min-h-screen flex flex-col bg-[#121212] ${myClass} bg-gray-800 transition-all overflow-y-auto ${isSidebarOpen ? 'w-[250px]' : 'w-18'}`}>
        // ✅ Smooth collapse with transition
        <aside className={`min-h-screen flex flex-col bg-[#121212] border-r border-gray-800 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-[240px]' : 'w-[68px]'}`}>
            {/* Top Div Element */}
            <div className="p-2 border-b border-gray-800 flex justify-between items-center">
                {/* Cursor Logo */}
                <div className={`flex gap-3 items-center p-2 transition-all ${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}>
                    <Logo src="/assets/cursor-ai.png" myClass='w-10 h-10 object-contain' alt="Firebase Logo" width={50} height={50} />
                    <h2 className='font-medium text-md text-transparent bg-linear-to-r from-green-200 via-orange-200 to-red-300 bg-clip-text '>Cursor AI</h2>
                </div>


                {/* SideBar Open Icon */}
                {/* Use a functional state update and keep the icon clickable when closed: */}
                {/* The first click closes the sidebar, but then the wrapper disables pointer events, so the icon can’t receive the second click. There’s also a handler bug: React passes the click event to onClick, not the previous state, so !prev evaluates to false. */}
                {/* ✅ Better — use Tailwind group-hover on the button */}
                <button
                    // onMouseEnter={() => setIsHover(true)}
                    // onMouseLeave={() => setIsHover(false)}
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                    className={`group shrink-0 p-2 hover:bg-gray-200 rounded-md ${isSidebarOpen ? 'cursor-pointer' : `cursor-e-resize`}`}
                >
                    {/* {
                        !isSidebarOpen && isHover ? <VscLayoutSidebarRightOff size={24} /> : <CgSidebarOpen />
                        !isSidebarOpen && isHover ? <VscLayoutSidebarRightDock size={24} /> : <VscLayoutSidebarLeftDock size={24}/>

                        isSidebarOpen
                            ? <VscLayoutSidebarLeftDock size={20} />
                            : isHover
                                ? <VscLayoutSidebarRightDock size={20} />
                                : <Logo src="/assets/cursor-ai.png" myClass="block w-12 h-12 shrink-0 object-contain" alt="Firebase Logo" width={48} height={48} />
                    } */}

                    {isSidebarOpen
                        ? <VscLayoutSidebarLeftDock size={20} />
                        : <>
                            {/* show logo by default, swap to open icon on hover */}
                            <Logo src="/assets/cursor-ai.png" myClass="block w-8 h-8 group-hover:hidden" alt="logo" />
                            <VscLayoutSidebarRightDock size={20} className="hidden group-hover:block" />
                        </>
                    }


                </button>
            </div>


            {/* Sidebar Links Navigationbar Section */}
            {/* ❌ Wrong — hardcoded viewport multiplier makes no sense */}
            {/* <nav className={`h-[160vh] px-4 py-2 flex flex-col gap-4 `}> */}

            {/* ✅ Fix — let it grow naturally */}
            {/*<nav className='flex-1 px-4 py-2 flex flex-col gap-4 overflow-y-auto'>
                <h2 className={`font-medium text-md text-gray-600 uppercase ${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}>Main</h2>
                SidebarLink-1
                {sidebarLinksOne.map((link, index) => (
                    ❌ Wrong — nesting interactive elements is illegal HTML
                    <button className='...'><link.icon /><Link href={link.text}>Dashboard</Link</button>

                    // ✅ Fix — make the whole row a Next.js Link, style it as a row
                    <Link
                        key={index}
                        // href={`/${link.text.toLowerCase()}`}
                        href={link.href}
                        className='group px-2 py-1 rounded-md flex gap-3 items-center hover:bg-gray-500'
                    >
                        <link.icon className='shrink-0 group-hover:text-blue-400' size={22} />
                        {isSidebarOpen && <span className='font-medium text-md'>{link.text}</span>}
                    </Link>
                    // <button
                    //     key={index}
                    //     className='w-full group px-2 py-1 rounded-md flex gap-3 items-center hover:bg-gray-500 cursor-pointer'>
                    //     <link.icon className='shrink-0 transition-colors group-hover:text-blue-400' size={22} />
                    //     <Link href={`${link.text.toLocaleLowerCase()}`} className={`font-medium text-md ${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}>{link.text}</Link>
                    // </button>
                ))}
                SidebarLink-2 
                <h2 className={`font-medium text-md text-gray-600 uppercase ${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}>Workspace</h2>
                {sidebarLinksTwo.map((link, index) => (
                    // <button key={index} className='group px-2 py-1 rounded-md flex gap-3 items-center hover:bg-gray-500 cursor-pointer'>
                    //     <link.icon className='shrink-0 transition-colors group-hover:text-blue-400' size={22} />
                    //     <Link href={`${link.text.toLocaleLowerCase()}`} className={`font-medium text-md ${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}>{link.text}</Link>
                    // </button>
                    <Link
                        key={index}
                        href={link.href}
                        className='group px-2 py-1 rounded-md flex gap-3 items-center hover:bg-gray-500'
                    >
                        <link.icon className='shrink-0 group-hover:text-blue-400' size={22} />
                        {isSidebarOpen && <span className='font-medium text-md'>{link.text}</span>}
                    </Link>
                ))}
                 SidebarLink-3 
                <h2 className={`font-medium text-md text-gray-600 uppercase ${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}>System</h2>
                {sidebarLinksThree.map((link, index) => (
                    // <button key={index} className='group px-2 py-1 rounded-md flex gap-3 items-center hover:bg-gray-500 cursor-pointer'>
                    //     <link.icon className='shrink-0 transition-colors group-hover:text-blue-400' size={22} />
                    //     <Link href={`${link.text.toLocaleLowerCase()}`} className={`font-medium text-md ${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}>{link.text}</Link>
                    // </button>
                    <Link
                        key={index}
                        // href={`/${link.text.toLowerCase()}`}
                        href={link.href}
                        className='group px-2 py-1 rounded-md flex gap-3 items-center hover:bg-gray-500'
                    >
                        <link.icon className='shrink-0 group-hover:text-blue-400' size={22} />
                         ❌ Wrong — this takes space even when hidden on some browsers 
                        <span className={`${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}> 

                        ✅ Fix — conditional render is cleaner and cheaper 
                        {isSidebarOpen && <span className='font-medium text-md'>{link.text}</span>}
                    </Link>
                ))}
            </nav> */}


            {/* Then your sidebar becomes one clean loop: */}
            <nav className='flex-1 px-3 py-2 flex flex-col gap-1 overflow-y-auto'>
                {sidebarSections.map((section) => (
                    <div key={section.title} className='mb-3'>
                        {isSidebarOpen && (
                            <p className='px-2 mb-1 text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                {section.title}
                            </p>
                        )}
                        {section.links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`group relative flex items-center gap-3 px-2 py-2 rounded-lg transition-colors
                                    ${pathname === link.href
                                        ? 'bg-gray-700 text-white'      // active state
                                        : 'hover:bg-gray-700 text-gray-400 hover:text-white'}
                                        `}>
                                <link.icon size={20} className={`shrink-0 text-gray-400 transition-colors
                                    ${pathname === link.href ? 'text-blue-400' : 'group-hover:text-blue-400'}`} />
                                {/* Tooltip — only shows when sidebar is collapsed */}
                                {!isSidebarOpen && (
                                    <span className='absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50'>
                                        {link.text}
                                    </span>
                                )}
                                
                                {isSidebarOpen && (
                                    <span className='text-sm font-medium text-gray-300 group-hover:text-white'>
                                        {link.text}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>


            {/* ❌ Wrong — absolute positioning inside a flex column causes overlap */}
            {/* <div className='p-2 absolute bottom-1 left-2 border-t border-gray-700 flex items-center gap-3'> */}

            {/*✅ Fix — push it to the bottom naturally with margin-top: auto */}
            <div className='mt-auto p-3 border-t border-gray-700 flex items-center gap-3'>
                {/* Circle */}
                <div className='h-8 aspect-auto w-10 rounded-full bg-blue-100 text-cyan-900 flex items-center justify-center'>MA</div>
                <div>
                    <p>Muhammad Abdullah</p>
                    <p>grace@org.com</p>
                </div>

            </div>
        </aside >
    )
}

export default Sidebar
