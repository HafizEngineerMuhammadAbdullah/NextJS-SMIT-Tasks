import React from 'react'
import AiLabLogo from './AiLabLogo'
import Link from 'next/link';
import Form from './Form';



const LeftPanel = () => {

    return (
        <div className='min-h-screen w-full p-10 flex flex-col items-center gap-y-3 flex-1 bg-white'>
            <AiLabLogo />
            <div className="text-center space-y-4">
                <h1 className='text-2xl font-bold text-black'>Welcome to AI Labs</h1>
                <p className='text-gray-600'>Your AI-powered solution for the future.</p>
                <p className='text-gray-800 w-85'>Please sign in or sign up with your Google account to get started.</p>
                {/* Signin Option */}
                <div className='mt-2'>
                    <p className='text-gray-800 text-sm font-bold text-center'>Don't have an account? <Link href={"/signupform"} className='ml-1 text-[#534AB7] cursor-pointer hover:text-cyan-900'>Create an account</Link></p>
                </div>
            </div>

            {/* Form */}
            <Form />
            <Link href={"https://google.com"} className='text-center text-black font-bold text-md'>Have Trouble Signing in?</Link>
        </div>
    )
}

export default LeftPanel
