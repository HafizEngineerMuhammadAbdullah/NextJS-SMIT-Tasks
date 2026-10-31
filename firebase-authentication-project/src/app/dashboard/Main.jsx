import React from 'react'
import TopBar from './TopBar'
import StatCard from './StatCard';
import { cardData } from '@/data/core'
import NotificationPanel from './NotificationPanel';
import ApiUsagePanel from './ApiUsagePanel';
import ConnectedModelCards from './ConnectedModelCards';

const Main = () => {
    return (
        <main className='w-full flex flex-col bg-[#0B0B0B]'>
            <TopBar />
            <article className='px-7 mx-auto'>
                {/* Section : 1 */}
                <section>
                    <div className='w-full px-7 py-15 mt-4 max-w-5xl mx-auto flex justify-center items-center border rounded-lg'>
                        <h1 className='h-auto bg-linear-to-r from-indigo-300 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent font-bold text-6xl mx-auto font-space'>Welcome to AI Lab</h1>
                    </div>
                </section>
                {/* Section : 2 */}
                <section>
                    <div className='py-7 grid grid-cols-1 md:grid-cols-4 md:flex gap-18.5'>
                        {cardData.map((item, index) => (
                            <StatCard key={index} icon={item.icon} content={item.content} number={item.number} trendingIcon={item.trendingIcon} footer={item.footer} />
                        ))}
                    </div>
                </section>
                {/* Section : 3 */}
                <section>
                    <div className='py-4 grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <NotificationPanel />
                        <ApiUsagePanel />
                    </div>
                </section>
                {/* Section : 4 */}
                <section>
                    <ConnectedModelCards />
                </section>
            </article>
        </main>
    )
}

export default Main
