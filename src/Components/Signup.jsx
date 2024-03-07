import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from '../store/AuthSlice'
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

<div className="flex justify-center  w-full h-screen">

  <div className="flex flex-1 justify-center items-center overflow-hidden ">

 

<div className="flex h-full sm:w-full  max-sm:w-full justify-center items-center sm:bg-gray-100 max-sm:absolute max-sm:z-10 max-sm: max-sm:bg-transparent max-sm:opacity-95  max-sm:left-0 max-sm:top-0 ">
  <div className="sm:w-[50vw] max-sm:w-full  sm:p-10 overflow-auto max-sm:m-4">
      <div className='w-fit mx-auto sm:mt-12  rounded-2xl bg-gray-100 p-12 shadow-xl '>

      
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
        className="font-medium text-primary transition-all duration-200  border-b border-black border-spacing-1 text-blue-500 hover:scale-110  "
      >
        Sign In
      </Link>
    </p>
    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    <form onSubmit={handleSubmit(create)} className="mt-6">
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
 </div>

<div className="flex sm:flex-1 overflow-hidden max-sm:w-auto">
  <img src={logo} alt="" className="object-cover sm:w-full max-sm:w-full max-sm:overflow-hidden" />
</div>

</div>

            


    </>
  )
}

export default Signup