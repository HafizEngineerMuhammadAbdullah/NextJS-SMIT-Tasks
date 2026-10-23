"use client"
import React, { useState } from 'react'
// import styles from './SignupForm.module.css';
import { TbArrowRight, TbEye, TbEyeClosed, TbBrandGoogle, TbBrandGithub, TbPassword } from 'react-icons/tb';
import { motion } from 'motion/react';
import InputField from './InputField';
// import { ref, push } from "firebase/database";
// import { database } from "../../../configuration/firebase";
import { ToastContainer, toast } from "react-toastify";
import Link from 'next/link';
import AiLabLogo from '@/components/authentication/AiLabLogo';


const RightPanel = () => {
    // const [showPassword, setShowPassword] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    //  Form Data :-
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })



    // function to toggle password visibility
    const togglePasswordVisibility = () => {
        // setShowPassword((prev) => (!prev))
        setIsPasswordVisible((prev) => (!prev))
    }

    const checks = {
        length: formData.password.length >= 8,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /\d/.test(formData.password),
        special: /[^A-Za-z0-9]/.test(formData.password),
    };


    // Derived State: Password Strength
    // This is the preferred React approach.
    // function to calculate password strength based on certain criteria
    const getPasswordStrength = (password) => {
        let score = 0;

        if (password.length >= 8) score++;

        if (/[A-Z]/.test(password)) score++;

        if (/[a-z]/.test(password)) score++;

        if (/[0-9]/.test(password)) score++;

        if (/[^A-Za-z0-9]/.test(password)) score++;

        return score;
    };

    // get Password Strength in terms of score value
    const passwordStrength = getPasswordStrength(formData.password);


    // get the color of Password Strength Bar
    const getStrengthColor = (score) => {

        switch (score) {

            case 1:
                return "#ef4444";

            case 2:
                return "#f97316";

            case 3:
                return "#eab308";

            case 4:
                return "#22c55e";

            case 5:
                return "#15803d";

            default:
                return "#6b7280";
        }

    };

    // convert score(Password Strength) into words
    const getStrengthText = (score) => {
        switch (score) {
            case 0:
                return "";

            case 1:
                return "Very Weak";

            case 2:
                return "Weak";

            case 3:
                return "Medium";

            case 4:
                return "Strong";

            case 5:
                return "Very Strong";

            default:
                return "";
        }
    };


    // function that handle changes when changes occur in input field while typing...
    const changeHandler = (e) => {
        // extract the name and value from e.target object from each input field
        const { name, value } = e.target;

        // updates the formData by updating the form Data state
        // Even though we could overwrite the form values by updating the values,but the issue is React doesn't  update state when the same object referencing(have same address) to same memory location it had
        // React updates object state only when the reference(address) pointing to that particular object in memory changes
        // React schedules the update(not immediately updates the state) 
        setFormData((prevFormData) => ({
            ...prevFormData,// copy the existing form data
            [name]: value // update the name and value as key value pair
        }));
    }



    // function to validate the form data before submission
    const validateFormData = () => {
        const { firstName, lastName, email, password } = formData;

        // Validate first name and last name (only letters allowed)
        const nameRegex = /^[A-Za-z]{3,20}$/;
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            alert("First name and Last name should contain only letters (3-20 characters).");
            return false;
        }

        // Validate email format
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Validate password (only letters and numbers allowed)
        const passwordRegex = /^[A-Za-z0-9]{7,15}$/;
        if (!passwordRegex.test(password)) {
            alert("Password should contain only letters and numbers (7-15 characters).");
            return false;
        }

        return true; // Form data is valid
    };

    // function that handle submit(when the submit button is pressed/clicked)
    const submitHandler = async (e) => {
        // resist reloading the page(prevent the browser default behaviour i.e. reload the webpage when submit btn is pressed)
        e.preventDefault();

        if (!validateFormData()) return;

        try {

            // Creates a reference to a folder named 'formSubmissions'
            // const dbRef = ref(database, 'formSubmissions');

            // push() generates a unique ID for every form entry automatically
            // await push(dbRef, {
            //     firstName: formData.firstName,
            //     lastName: formData.lastName,
            //     email: formData.email,
            //     message: "Form has been submitted successfully!",
            //     password: formData.password,
            //     timestamp: Date.toISOString()
            // });

            // await push(ref(database, "usersData"), formData);

            toast('Form data sent successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });

            alert(`Form submitted with data: ${JSON.stringify(formData)}`);

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });
        } catch (error) {
            console.error(error);
            // console.error("Error sending data:", error.message);
            toast.error('Error Submitting Form.Please try again!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                // transition: Bounce,
            });
        }
    }




    return (
        <>
            {/* RIGHT PANEL */}
            {/* Fade in from the Right */}
            <motion.div
                initial={{ opacity: 0, x: 1500 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                className={`rightPanel flex flex-col gap-y-5 bg-[#2C2C2A] py-4 px-4 sm:px-6 md:px-8 lg:px-9`}>

                {/* for Heading */}
                <div>
                    <div className='flex items-center gap-2.5'>
                        {/* Ai Lab Logo */}
                        <AiLabLogo src="/assets/gemini.png" myClass={`w-10 h-10`} />
                        {/* Heading */}
                        <h1 className='font-medium text-2xl text-white text-wrap my-3'>
                            Create your account
                        </h1>
                    </div>
                    <p className='text-[#9595B6] text-sm'>Step 1 of 3 — takes less than 2 minutes</p>
                    {/* Progress Bar */}
                    <div className="mt-1.5 h-2 bg-gray-700">
                        <div
                            style={{
                                width: "33%"
                            }}
                        />
                    </div>
                </div>

                {/* User Form */}
                {/* Controlled Component */}
                <form className={`formGrid`} onSubmit={submitHandler}>

                    {/* Row-1 */}
                    {/* <div className='flex flex-col md:flex-row gap-3 items-center'> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* for First Name */}
                        < InputField
                            label="First name"
                            name="firstName"
                            value={formData.firstName}
                            type="text"
                            id='firstname'
                            placeholder="Thomas"
                            changeHandler={changeHandler}
                            myClass={`input`}
                            autoComplete="given-name"
                            pattern="[A-Za-z]{3,20}"
                            title="Only letters allowed"
                        />

                        {/* for Last Name */}
                        <InputField
                            label="Last name"
                            type="text"
                            id='lastname'
                            name='lastName'
                            value={formData.lastName}
                            placeholder="John"
                            changeHandler={changeHandler}
                            myClass={`input`}
                            autoComplete="family-name"
                            pattern="[A-Za-z]{3,20}"
                            title="Only letters allowed"
                            required />
                    </div>

                    {/* Row-2 */}
                    {/* for Email */}
                    <InputField
                        label="Email"
                        type="email"
                        id='email'
                        name='email'
                        value={formData.email}
                        placeholder="John@example.com"
                        changeHandler={changeHandler}
                        myClass={`input`}
                        autoComplete="email"
                        pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                        title="Letters & Numbers allowed"
                        required />

                    {/* Row-3 */}
                    {/* for Password */}
                    <div className='relative'>
                        <InputField
                            label="Password"
                            type={isPasswordVisible ? "text" : "password"}
                            id='password'
                            name='password'
                            value={formData.password}
                            changeHandler={changeHandler}
                            myClass={`input`}
                            autoComplete="new-password"
                            pattern="[A-Za-z0-9]{7,15}"
                            title="Letters & Numbers allowed"
                            required />
                        <button onClick={togglePasswordVisibility} type='button' className='absolute right-3 bottom-3 text-[#9595B6] cursor-pointer'>
                            {
                                isPasswordVisible ? <TbEyeClosed size={20} /> : <TbEye size={20} />
                            }
                        </button>
                    </div>
                    {/* Password Strength in words */}
                    <p className='text-center font-medium font-mono text-sm text-white mt-1'>
                        {getStrengthText(passwordStrength)}
                    </p>

                    {/* Password Strength in Progress Bar */}
                    <div className="w-full h-2 bg-gray-700 rounded mt-1.5">
                        <div
                            className="h-2 rounded transition-all duration-300"
                            style={{
                                width: `${passwordStrength * 20}%`,
                                backgroundColor: getStrengthColor(passwordStrength)
                            }}
                        ></div>
                    </div>



                    {/* <ul className="flex flex-wrap justify-between mt-2 text-sm space-y-1">
                            <li>{checks.length ? "✅" : "❌"} At least 8 characters</li>
                            <li>{checks.uppercase ? "✅" : "❌"} One uppercase letter</li>
                            <li>{checks.lowercase ? "✅" : "❌"} One lowercase letter</li>
                            <li>{checks.number ? "✅" : "❌"} One number</li>
                            <li>{checks.special ? "✅" : "❌"} One special character</li>
                        </ul> */}


                    {/* Row-4 */}
                    {/* for Terms & Conditions */}
                    <div className='flex gap-3 items-center my-1.5'>
                        <input
                            type="checkbox"
                            className='bg-[#2c2c2a] border border-[rgba(108, 99, 255, 0.1)] accent-[#534AB7]' />
                        <p className='text-[#9595B6] text-sm flex gap-x-2'>
                            I agree to the
                            <span className='text-[#534AB7]'>
                                <a href="#"> Terms of Service</a>
                            </span>
                            and
                            <span className='text-[#534AB7]'>Privacy Policy</span>
                        </p>
                    </div>

                    {/* Row-5 */}
                    {/* Create Account */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}>
                        <button
                            type='submit'
                            className={`input account w-full flex justify-center items-center gap-2 text-white text-xl font-mono font-medium cursor-pointer`}
                        >
                            <TbArrowRight size={20} />
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </motion.div>

                    {/* Row-6 */}
                    {/* More Options for Signup */}
                    <div className='flex gap-x-2 items-center my-2'>
                        <div className='h-px w-full bg-[#9595B6]'></div>
                        <p className='text-[#9595B6] text-sm text-center w-full cursor-pointer'>or sign up with</p>
                        <div className='h-px w-full bg-[#9595B6]'></div>
                    </div>

                    {/* Row-7 */}
                    {/* Signup with Google Or Github */}
                    <div className='flex sm:justify-center gap-3 items-center flex-col sm:flex-row'>
                        <motion.button
                            type='button'
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`input flex-1 flex justify-center items-center gap-x-2 cursor-pointer`}>
                            {/* <div className='h-7 w-7 rounded-full border-2 border-white flex justify-center items-center'>< TbBrandGoogle size={20} /></div> */}
                            < TbBrandGoogle size={20} />
                            <span className='text-white'>Sign up with Google</span>
                        </motion.button>
                        <motion.button
                            type='button'
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`input flex-1 flex justify-center items-center gap-x-2 cursor-pointer`}>
                            {/* <div className='h-7 w-7 rounded-full border-2 border-white flex justify-center items-center'>< TbBrandGithub size={20} /></div> */}
                            < TbBrandGithub size={20} />
                            <span className='text-white'>Sign up with Github</span>
                        </motion.button>
                    </div>

                    {/* Row-8 */}
                    {/* Signin Option */}
                    <div className='mt-2'>
                        <p className='text-[#9595B6] text-sm text-center'>Already have an account? <Link href="/" className='text-[#534AB7] cursor-pointer'>Sign in</Link></p>
                    </div>

                    {/* Toast Container */}
                    <ToastContainer></ToastContainer>
                </form>
            </motion.div >
        </>
    )
}

export default RightPanel