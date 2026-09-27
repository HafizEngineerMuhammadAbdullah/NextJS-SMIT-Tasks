import React from 'react'
import InstaLogo from './InstaLogo'
import InputField from './InputField'
import { MdHome } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { FaRegCompass } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { GiRamProfile } from "react-icons/gi";
import Link from 'next/link';
const Header = () => {

  const icons = [
     {
        icon: <MdHome />,
        path: "/"
     },
     {
        icon: <RiMessengerLine />,
        path: "/messenger"
     },
     {
        icon: <CgAddR />,
        path: "/add"
     },
     {
        icon: <FaRegCompass />,
        path: "/explore"
     },
     {
        icon: <FaRegHeart />,
        path: "/notifications"
     },
     {
        icon: <GiRamProfile />,
        path: "/profile"
     }

  ]
  return (
    <div className="flex items-center justify-between px-12 py-3 border-b border-gray-300 mb-3">
        {/* Instagram Logo */}
        <InstaLogo />
        {/* Search Input */}
        <InputField />
         
         {/* Navigation Icons */}
        <div className="flex space-x-4">
            {icons.map((item, index) => (
                <Link key={index} href={item.path} className="text-3xl cursor-pointer border-3 border-transparent hover:border-b-blue-500">
                    {item.icon}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Header