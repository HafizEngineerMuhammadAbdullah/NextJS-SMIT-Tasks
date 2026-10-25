"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { sidebarLinksOne, sidebarLinksTwo, sidebarLinksThree } from '@/data/core';
import { VscLayoutSidebarLeftOff, VscLayoutSidebarRightOff, VscLayoutSidebarLeftDock, VscLayoutSidebarRightDock } from "react-icons/vsc"
import Logo from "./Logo";

const Sidebar = ({ myClass }) => {

    const [isHover, setIsHover] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    console.log("isSidebarOpen : ", isSidebarOpen);
    console.log("isHover : ", isHover);

    return (
        <aside className={`relative min-h-screen flex flex-col bg-sky-700 ${myClass} bg-gray-800 transition-all overflow-y-auto ${isSidebarOpen ? 'w-[250px]' : 'w-15'}`}>
            {/* Top Div Element */}
            <div className="p-2 border-b border-gray-800 flex justify-between items-center">
                {/* Firebase Logo */}
                <div className={`flex gap-3 items-center p-2 transition-all ${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}>
                    <Logo src="/assets/cursor-ai.png" myClass='w-10 h-10 object-contain' alt="Firebase Logo" width={50} height={50} />
                    <h2 className='font-medium text-md text-transparent bg-linear-to-r from-green-200 via-orange-200 to-red-300 bg-clip-text '>Cursor AI</h2>
                </div>


                {/* SideBar Open Icon */}
                {/* Use a functional state update and keep the icon clickable when closed: */}
                {/* The first click closes the sidebar, but then the wrapper disables pointer events, so the icon can’t receive the second click. There’s also a handler bug: React passes the click event to onClick, not the previous state, so !prev evaluates to false. */}
                <button
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className={`shrink-0 p-2 hover:bg-gray-200 rounded-md ${isSidebarOpen ? 'cursor-pointer' : `cursor-e-resize`}`}
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                >
                    {
                        // !isSidebarOpen && isHover ? <VscLayoutSidebarRightOff size={24} /> : <CgSidebarOpen />
                        // !isSidebarOpen && isHover ? <VscLayoutSidebarRightDock size={24} /> : <VscLayoutSidebarLeftDock size={24}/>

                        isSidebarOpen
                            ? <VscLayoutSidebarLeftDock size={20} />
                            : isHover
                                ? <VscLayoutSidebarRightDock size={20} />
                                : <Logo src="/assets/cursor-ai.png" myClass="block w-12 h-12 shrink-0 object-contain" alt="Firebase Logo" width={48} height={48} />
                    }
                </button>
            </div>


            {/* Sidebar Links Section */}
            <section className={`h-[160vh] px-4 py-2 flex flex-col gap-4 ${isSidebarOpen ? '' : 'opacity-0 hidden pointer-events-none'}`}>
                <h2 className='font-medium text-md text-gray-600 uppercase'>Main</h2>
                {/* SidebarLink-1 */}
                {sidebarLinksOne.map((link, index) => (
                    <div key={index} className='px-2 py-1 rounded-md flex gap-3 items-center hover:bg-cyan-500 cursor-pointer'>
                        <link.icon className="" size={22} />
                        <Link href={`${link.text.toLocaleLowerCase()}`} className='font-medium text-md '>{link.text}</Link>
                    </div>
                ))}
                {/* SidebarLink-2 */}
                <h2 className='font-medium text-md text-gray-600 uppercase'>Workspace</h2>
                {sidebarLinksTwo.map((link, index) => (
                    <div key={index} className='px-2 py-1 rounded-md flex gap-3 items-center hover:bg-cyan-500 cursor-pointer'>
                        <link.icon className="" size={22} />
                        <Link href={`${link.text.toLocaleLowerCase()}`} className='font-medium text-md '>{link.text}</Link>
                    </div>
                ))}
                {/* SidebarLink-3 */}
                <h2 className='font-medium text-md text-gray-600 uppercase'>System</h2>
                {sidebarLinksThree.map((link, index) => (
                    <div key={index} className='px-2 py-1 rounded-md flex gap-3 items-center hover:bg-cyan-500 cursor-pointer'>
                        <link.icon className="" size={22} />
                        <Link href={`${link.text.toLocaleLowerCase()}`} className='font-medium text-md '>{link.text}</Link>
                    </div>
                ))}
            </section>


            <div className='p-2 absolute bottom-1 left-2 border-t border-gray-700 flex items-center gap-3'>
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
