import React from 'react'
import Navbar from './Navbar'
import Card from './Card';
import { cardData } from '@/data/core'

const Main = () => {
    return (
        <main className='w-full flex flex-col'>
            <Navbar />
            <section>
                <div className='w-full px-7 py-15 mt-4 max-w-5xl mx-auto flex justify-center items-center border rounded-lg'>
                    <h1 className='h-auto bg-linear-to-r from-indigo-300 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent font-bold text-6xl mx-auto'>Welcome to AI Lab</h1>
                </div>
            </section>
            <section>
                <div className='px-7 py-7 grid grid-cols-1 md:grid-cols-4 md:flex gap-18.5'>
                    {cardData.map((item, index) => (
                        <Card key={index} icon={item.icon} content={item.content} number={item.number} trendingIcon={item.trendingIcon} footer={item.footer} />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Main
