"use client"
import React, { useState } from 'react'
import AiLabLogo from './AiLabLogo'
import Link from 'next/link';
import Form from './Form';



const LeftPanel = () => {

    return (
        <div className='h-screen p-10 flex flex-col items-center gap-y-3 flex-1 bg-white/20 border-r-2 border-b-gray-50'>
            <AiLabLogo />
            <div className="text-center space-y-4">
                <h1 className='text-xl font-medium text-white'>Welcome to AI Labs</h1>
                <p className='text-white'>Your AI-powered solution for the future.</p>
                <p className='text-white'>Please sign in or sign up with your Google account to get started.</p>
            </div>

            <Form />
            <Link href={"/"} className='text-center'>Have Trouble Signing in</Link>
        </div>
    )
}

export default LeftPanel
