"use client"
import React, { useState } from 'react'
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { BiSolidError } from "react-icons/bi";
import { TbFaceIdError } from "react-icons/tb";
import { MdRunningWithErrors } from "react-icons/md";
import { MdError } from "react-icons/md";
import { RiSignalWifiErrorFill } from "react-icons/ri";
import { BiSolidCommentError } from "react-icons/bi";
import { BiSolidMessageRoundedError } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "motion/react"
import { TbArrowRight, TbEye, TbEyeClosed, TbBrandGoogle, TbBrandGithub, TbPassword } from 'react-icons/tb';


const inputStyle = 'w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1A6C63FF] focus:border-[#6C63FF] transition-colors duration-200 mt-2';

//Initial formData
const INITIAL_FORM_DATA = {
    email: "",
    password: ""
};

const Form = () => {
    // Use State Hook to track variables & update if required
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errorMsg, setErrorMsg] = useState("");

    // function to handle change event, it triggers(this function calls) whenever we type or remove sth from an input box
    const handleChange = (e) => {
        // extract the name & value from change event object e.target
        const { name, value } = e.target;

        // update the form data with a new value of existing key
        // updates the formData by updating the form Data state
        // Even though we could overwrite the form values by updating the values,but the issue is React doesn't  update state when the same object referencing(have same address) to same memory location it had
        // React updates object state only when the reference(address) pointing to that particular object in memory changes
        // React schedules the update(not immediately updates the state)
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // show Error Message
    const showError = (message) => {
        setErrorMsg(message);
    }


    const showToast = (message) => {
        toast.warn(`${message}`, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    // performs Validation before submission
    const validateForm = () => {

        // [^\s@] => Matches any character except whitespaces & '@'
        // the email to start with a letter, number character. 
        const emailRegex = /^[A-Za-z0-9@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^[A-Za-z][A-Za-z0-9!@#%^&*$]{6,15}$/;
        const hasSpecialChar = /[!@#%^&*$]/;
        const hasUppercase = /[A-Z]/;
        //  if any of one field is empty ,throw/display/show the error to the user 
        if (!formData.email.trim() || !formData.password.trim()) {
            showError("Either Email or password can't be empty!");
            showToast("Either Email or password can't be empty!");
            return false;
        }

        // 1. Validate Email
        if (!emailRegex.test(formData.email)) {
            showError("Please enter a valid email address.");
            showToast("Please enter a valid email address.");
            return false;
        }

        // 2. Validate Password
        if (!passwordRegex.test(formData.password)) {
            showError("Password first character must be english letter and be 7-15 characters long!");
            showToast("Password first character must be english letter and be 7-15 characters long!");
            return false;
        }

        // check if there is a special character exist in the password or not
        if (!hasSpecialChar.test(formData.password)) {
            showError("Password must contain at least one special character.");
            showToast("Password must contain at least one special character.");
            return false;
        }
        // check if there is an UpperCase letter exist in the password or not
        if (!hasUppercase.test(formData.password)) {
            showError("Password must contain at least one upper case letter.");
            showToast("Password must contain at least one upper case letter.");
            return false;
        }
        return true;//return true only when all validation becomes successfull
    };


    const submitHandler = (e) => {
        // resist reloading the page(prevent the browser default behaviour i.e. reload the webpage when submit btn is pressed)
        e.preventDefault();

        // if the form doesn't validate successfully,return from here(because no need to submit formData to Firebase Database)
        if (!validateForm()) return;// validate the formData here

        //dispatch the data to firebase real time database database


        setFormData(INITIAL_FORM_DATA);
        showError("");

        toast.success('Successfully Submit the form', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    };



    // function to toggle changes(password visibility)
    const togglePasswordVisibility = () => {
        setIsShowPassword((prev) => !prev)
    };

    return (
        <form className='h-auto w-full max-w-sm mt-1 space-y-4' onSubmit={submitHandler}>
            {/* for Email: */}
            <div>
                <label htmlFor="email" className='text-white mb-2'>Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputStyle}
                    required={true}
                />
            </div>
            {/* for Password: */}
            <div className="relative">
                <label htmlFor="password" className='text-white mb-2'>Password:</label>
                <input
                    type={isShowPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={inputStyle}
                    required={true}
                />
                <button type="button" className='text-gray-300 absolute right-4 top-10.5 cursor-pointer' onClick={togglePasswordVisibility}>
                    {isShowPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                </button>
            </div>
            {/* for ErrorMessage */}
            <div>
                {errorMsg ?
                    <p className='flex gap-2 text-sm text-center text-red-500 font-medium'><BiSolidError size={20} /> {errorMsg}</p> : <TbFaceIdError />
                }
            </div>

            <div className='flex justify-between items-center'>
                <div className='space-x-1'>
                    <input type="checkbox" name="" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <p>Forgot password?</p>
            </div>
            {/* Submit Button */}
            <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer'>
                Continue
            </button>
            {/* OR */}
            <div className='flex items-center'>
                <p className='bg-black w-1/2 h-0.5'></p>
                <p className='mx-1.5'>OR</p>
                <p className='bg-black w-1/2 h-0.5'></p>
            </div>

            {/* Signin with Google Or Github */}
            <div className='flex sm:justify-center gap-3 items-center flex-col sm:flex-row'>
                <motion.button
                    type='button'
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`${inputStyle} flex-1 flex justify-center items-center gap-x-2 cursor-pointer`}>
                    {/* <div className='h-7 w-7 rounded-full border-2 border-white flex justify-center items-center'>< TbBrandGoogle size={20} /></div> */}
                    < TbBrandGoogle size={20} />
                    <span className='text-white'>Sign in with Google</span>
                </motion.button>
                <motion.button
                    type='button'
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`${inputStyle} flex-1 flex justify-center items-center gap-x-2 cursor-pointer`}>
                    {/* <div className='h-7 w-7 rounded-full border-2 border-white flex justify-center items-center'>< TbBrandGithub size={20} /></div> */}
                    < TbBrandGithub size={20} />
                    <span className='text-white'>Sign in with Github</span>
                </motion.button>
            </div>
            <ToastContainer></ToastContainer>
        </form>

    );
};

export default Form;
