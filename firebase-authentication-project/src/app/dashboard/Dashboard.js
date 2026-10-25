import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Main from './Main'

const Dashboard = () => {
    // the two sidebar and then Main Layout comes side by side
    return (
        <div className='w-full flex'>
            <Sidebar myClass="" />
            <Main />
        </div>
    );
}

export default Dashboard
