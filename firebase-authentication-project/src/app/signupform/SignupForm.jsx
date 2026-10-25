import React from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'


const myClass=`w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2  rounded-2xl`;
const SignupForm = () => {
    return (
        <div className={`container ${myClass}`} >
            < LeftPanel />
            < RightPanel />
        </div>
    );
}

export default SignupForm
