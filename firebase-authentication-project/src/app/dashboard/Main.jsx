import React from 'react'
import Navbar from './Navbar'

const Main = () => {
    return (
        <main className='w-full flex flex-col'>
            <Navbar />
            <h1 className='h-auto bg-linear-to-r from-indigo-300 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent font-bold text-6xl mx-auto'>Welcome to AI Lab</h1>
        </main>
    )
}

export default Main
