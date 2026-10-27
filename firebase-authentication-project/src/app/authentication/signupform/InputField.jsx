"use client"
import React from 'react';


// Create Componentization for InputField component to make it reusable and maintainable
// This gives you:
// Less duplicated code
// Easier maintenance
// Reusable inputs across different forms
// Cleaner RightPanel
const InputField = ({ label, name, value, type, id, placeholder, changeHandler, myClass, autoComplete, pattern, title, }) => {
    return (
        <div className='w-full flex flex-col gap-y-1.5'>
            <label htmlFor="firstname" className='text-[#9595B6] text-sm'>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={changeHandler}
                className={myClass}
                autoComplete={autoComplete}
                pattern={pattern}
                title={title}
                required />
        </div>
    )
}

export default InputField