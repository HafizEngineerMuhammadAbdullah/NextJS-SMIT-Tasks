import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

const inputStyle = 'w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#032042] focus:border-[#0d366b] transition-colors duration-200'
const Form = () => {



    const [isShowPassword, setIsShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setIsShowPassword((prev) => !prev)
    }

    return (
        <form className='w-full max-w-sm mt-2 space-y-2'>
            {/* for Email: */}
            <div className="space-y-1">
                <label htmlFor="email" className='text-white'>Email:</label>
                <input type="email" id="email" name="email" className={inputStyle} required />
            </div>
            <br />
            {/* for Password: */}
            <div className="relative space-y-1">
                <label htmlFor="password" className='text-white'>Password:</label>
                <input type={isShowPassword ? "password" : "text"} id="password" name="password" className={`${inputStyle}`} required />
                <button type="button" className='text-gray-300 absolute right-4 top-8.5 cursor-pointer' onClick={togglePasswordVisibility}>
                    {isShowPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </button>
            </div>
            <br />

            <div className='flex justify-between items-center'>
                <div className='space-x-1'>
                    <input type="checkbox" name="" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <p>Forgot password?</p>
            </div>
            <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer'>Sign In</button>
        </form>
    )
}

export default Form
