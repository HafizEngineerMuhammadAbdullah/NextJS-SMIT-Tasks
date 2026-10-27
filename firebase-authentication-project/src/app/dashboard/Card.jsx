import React from 'react'


// icon is a React component passed from cardData, but in JSX <icon /> starts with a lowercase letter, so React treats it as a built-in HTML tag—not as your component. That’s why the icon doesn’t render.
// Alias it with an uppercase name when destructuring the prop, then render that name:
const Card = ({ icon: Icon, trendingIcon: TrendingIcon, content, number, footer }) => {
    console.log(Icon);

    return (
        <div className='px-9 py-6 h-50 w-50 border rounded-2xl border-gray-900'>
            <div className='flex items-center gap-4'>
                <Icon size={24} />
                <span className='text-md font-sans'>{content}</span>

            </div>
            <h1 className='mr-auto py-5 text-3xl font-bold'>{number}</h1>
            <p className='flex gap-3 items-center'>
                <TrendingIcon color="green" size={20} />
                {footer}
            </p>
        </div>
    )
}

export default Card
