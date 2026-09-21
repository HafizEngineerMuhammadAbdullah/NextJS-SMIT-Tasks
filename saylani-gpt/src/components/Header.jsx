import React from 'react';
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand } from "react-icons/tb";
import { IoMenu } from "react-icons/io5";
import Image from 'next/image';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
    const [isHovered, setIsHovered] = React.useState(false);

      
    return (
        // Header component with a menu button, title, and right section containing an upgrade button and avatar
        < header className="header" >

            <button
                className="menu-button flex items-center justify-center p-2 transition-colors duration-200"
                onClick={() =>
                    setSidebarOpen(!sidebarOpen)
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* ☰ */}
                {/* Conditionally render the icon based on hover state */}
                {isHovered ? (
                    <TbLayoutSidebarRightCollapse size={30} color="#6c63ff" />
                ) : (
                    <IoMenu size={30} />
                )}
                
            </button>

            <div className="header-title">
                SaylaniGPT
            </div>

            <div className="header-right">

                <button className="upgrade-button">
                    Upgrade
                </button>

                <div className="avatar">
                    {/* U */}
                    <Image
                     src="/assets/chatgpt.png" 
                     width={40}
                     height={40}
                     alt="Avatar"
                     className="rounded-full"
                    />
                </div>

            </div>

        </header >
    )
}

export default Header
