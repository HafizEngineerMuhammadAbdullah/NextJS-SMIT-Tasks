import React from 'react'
import { TbTrendingUp } from 'react-icons/tb';


// icon is a React component passed from cardData, but in JSX <icon /> starts with a lowercase letter, so React treats it as a built-in HTML tag—not as your component. That’s why the icon doesn’t render.
// Alias it with an uppercase name when destructuring the prop, then render that name:
// 4 stat cards — models connected, API calls today, average response time, and uptime — the kind of numbers a user wants to see at a glance.
const StatCard = ({ icon: Icon, trendingIcon: TrendingIcon, content, number, footer }) => {
    console.log(Icon);

    return (
        <div className='px-7 py-6 h-48 w-48 bg-[#121212] text-white border rounded-2xl border-gray-900 shadow-md hover:shadow-indigo-400 hover:-translate-y-1.5 transition-all cursor-pointer'>
            <div className='flex items-center gap-4'>
                <Icon size={24} />
                <span className='text-[14px] font-sans'>{content}</span>

            </div>
            <h1 className='mr-auto py-4 text-3xl font-bold'>{number}</h1>
            <p className='flex gap-3 items-center text-[14px]'>
                <TrendingIcon className={`${TrendingIcon === TbTrendingUp ? 'text-green-500' : 'text-red-500'}`} size={22} />
                <span>{footer}</span>
            </p>
        </div>
    )
}

export default StatCard;
