import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Dashboard = () => {
    // the two sidebar and then navbar comes side by side
    return (
        <div className='w-full flex'>
            <Sidebar myClass="" />
            <Navbar />
        </div>
    )
}

export default Dashboard
