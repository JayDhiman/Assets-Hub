import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../store/AuthSlice';
import { Link , useNavigate } from 'react-router-dom';
import authService from '../Appwrite/Authservice';
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import logo from '../assets/logo.jpeg';
import logo1 from '../assets/logo1.webp';

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null); // Add error state
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }} = useForm();

    const create = async (data) => {
        setLoading(true);
        try {
            const userData = await authService.register(data);
            if (userData) {
                const currentUserData = await authService.currentUser();
                if (currentUserData) {
                    dispatch(login(currentUserData));
                } 
                navigate("/login");
                setSuccess(true);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            } else {
                setError("A user with the same id, email, or phone already exists");
            }
        }
        setLoading(false);
    };

    return (
        <>
            <div className="flex justify-center w-full h-screen">
                <div className="flex flex-1 justify-center items-center overflow-hidden">
                    <div className="flex h-full sm:w-full max-sm:w-full justify-center items-center sm:bg-gray-100 max-sm:absolute max-sm:z-10 max-sm:bg-transparent max-sm:opacity-95 max-sm:left-0 max-sm:top-0">
                        <div className="sm:w-[50vw] max-sm:w-full sm:p-10 overflow-auto max-sm:m-4">
                            <div className='w-fit mx-auto sm:mt-12 rounded-2xl bg-gray-100 p-12 shadow-xl'>
                                <div className="mb-2 flex justify-center">
                                    <Link to={'/'}>
                                        <span className="inline-block w-full max-xl:max-w-[60px] xl:max-w-[80px]">
                                            <img src={logo1} alt="" />
                                        </span>
                                    </Link>
                                </div>
                                <h2 className="text-center text-2xl font-bold leading-tight 2xl:text-[60px]">
                                    Sign up to create account
                                </h2>
                               
                                <p className="mt-2 text-center text-base text-black/60 2xl:text-[30px]">
                                    Don&apos;t have any account?&nbsp;
                                    <Link
                                        to="/login"
                                        className="font-medium text-primary transition-all duration-200 border-b border-black border-spacing-1 text-blue-500 hover:scale-110"
                                    >
                                        Sign In
                                    </Link>
                                </p>

                                {loading && <p className="text-center">Loading...</p>}
                                {success && (
                                    <p className="text-green-600 text-center">Account created successfully!</p>
                                )}
                                {error && ( // Display error message if error state is not null
                                    <p className="text-red-600 text-center mt-1">{error}</p>
                                )}
                                <form onSubmit={handleSubmit(create)} className="mt-4">
                                  
                                    <div className='space-y-5'>
                                        <Input
                                            label="Full Name: "
                                            placeholder="Enter your full name"
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                        <Input
                                            label="Email: "
                                            placeholder="Enter your email"
                                            type="email"
                                            {...register("email", {
                                                required: "Email is required",
                                                message: 'Please enter your email',
                                                pattern: {
                                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                    message: "Please enter a valid email address"
                                                }
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="text-red-600 mt-2">{errors.email.message}</p>
                                        )}
                                        <Input
                                            label="Password: "
                                            type="password"
                                            placeholder="Enter your password"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters long"
                                                },
                                                maxLength: {
                                                    value: 20,
                                                    message: "Password must not exceed 20 characters"
                                                },
                                                validate: {
                                                    uppercase: value => /^(?=.*[A-Z])/.test(value) || "Password must contain at least one uppercase letter",
                                                    lowercase: value => /^(?=.*[a-z])/.test(value) || "Password must contain at least one lowercase letter",
                                                    number: value => /^(?=.*\d)/.test(value) || "Password must contain at least one number",
                                                    specialChar: value => /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(value) || "Password must contain at least one special character"
                                                }
                                            })}
                                        />
                                        {errors.password && (
                                            <p className="text-red-600 mt-2">{errors.password.message}</p>
                                        )}
                                        <Button 
                                            type="submit" 
                                            className="w-full"
                                        >
                                            Create Account
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex sm:flex-1 overflow-hidden max-sm:w-auto">
                    <img src={logo} alt="" className="object-cover sm:w-full max-sm:w-full max-sm:overflow-hidden" />
                </div>
            </div>
        </>
    )
}

export default Signup;
