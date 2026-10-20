import React from 'react'
import AiLabLogo from './AiLabLogo'
import Link from 'next/link';
import Form from './Form';



const LeftPanel = () => {

    return (
        <div className='min-h-screen w-full p-10 flex flex-col items-center gap-y-3 flex-1 bg-[#2C2C2A] border-r-2 border-b-gray-50'>
            <AiLabLogo />
            <div className="text-center space-y-4">
                <h1 className='text-xl font-medium text-white'>Welcome to AI Labs</h1>
                <p className='text-white'>Your AI-powered solution for the future.</p>
                <p className='text-white w-85'>Please sign in or sign up with your Google account to get started.</p>
                {/* Signin Option */}
                <div className='mt-2'>
                    <p className='text-[#9595B6] text-sm text-center'>Don't have an account? <Link href={"/"} className='ml-1 text-[#534AB7] cursor-pointer'>Create an account</Link></p>
                </div>
            </div>

            {/* Form */}
            <Form />
            <Link href={"/"} className='text-center'>Have Trouble Signing in</Link>
        </div>
    )
}

export default LeftPanel
