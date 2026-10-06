import React from 'react'
import { IoSearch } from "react-icons/io5";

const InputField = () => {
  return (
    <div className="relative">
      <IoSearch className="absolute right-3 top-2.5 text-gray-400" />
      <input
        className="border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
        placeholder="Search"
      />

    </div>
  )
}

export default InputField