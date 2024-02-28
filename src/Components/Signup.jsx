import { useState } from "react";
import { useDispatch } from "react-redux";
import {login } from '../store/AuthSlice'
import { Link , useNavigate } from 'react-router-dom'
import authService from '../Appwrite/Authservice'
import { useForm } from "react-hook-form"
import Button from "./Button";
import Input from "./Input";
import logo from '../assets/logo.jpeg';
import logo1 from '../assets/logo1.webp';


const Signup = () => {

  const navigate = useNavigate()
  const [error, setError] = useState("")
  const  dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  
  const create = async(data) => {
    setError("")
    try {
        const userData = await authService.register(data)
        if (userData) {
            const userData = await authService.currentUser()
            if(userData) dispatch(login(userData));
            navigate("/")
            console.log("navigated to home route");
        }
    } catch (error) {
        setError(error.message)
    }
}

  return (
<>

<div className="flex w-full h-screen">

<div className="flex flex-1 justify-center items-center">
  <div className="w-[50vw] bg-gray-100 p-10 border border-black/10 h-full">
      <div className='w-fit mx-auto mt-12 rounded-2xl bg-gray-200 p-12 shadow-xl '>

      
    <div className="mb-2 flex justify-center">
      <span className="inline-block w-full max-w-[60px]">
        <img src={logo1} alt="" />
      </span>
    </div>
    <h2 className="text-center text-2xl font-bold leading-tight">
    Sign up to create account
    </h2>
    <p className="mt-2 text-center text-base text-black/60 mb-3 pb-2">
      Don&apos;t have any account?&nbsp;
      <Link
        to="/login"
        className="font-medium text-primary transition-all duration-200 hover:underline "
      >
        Sign In
      </Link>
    </p>
    <form onSubmit={handleSubmit(create)}>
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
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
  </div>
  </div>
</div>

<div className="flex flex-1">
  <img src={logo} alt="" className="object-cover w-full h-full" />
</div>
</div>

            


    </>
  )
}

export default Signup