import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/AuthSlice';
import authService from '../Appwrite/Authservice';
import { useForm } from 'react-hook-form';
import Button from './Button';
import Input from './Input';
import logo from '../assets/logo.jpeg';
import logo1 from '../assets/logo1.webp';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [loginError, setLoginError] = useState(''); // State for login error message

  const login = async (data) => {
    setLoading(true); // Start loading
    setLoginError(''); // Clear previous login error message
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.currentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
        setLoginError('Invalid email or password.'); // Set specific error message for invalid email or user not found
      } else if (error.code === 'auth/wrong-password') {
        setLoginError('Wrong password.'); // Set specific error message for wrong password
      } else {
        console.error('Login failed:', error.message);
        setLoginError('We cannot find an account with that email address.'); // Generic error message for other errors
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center w-full h-screen">
      <div className="flex flex-1 justify-center items-center overflow-hidden">
        <div className="flex h-full sm:w-full max-sm:w-full justify-center items-center sm:bg-gray-100 max-sm:absolute max-sm:z-10 max-sm:h-full max-sm:bg-transparent max-sm:opacity-95  max-sm:left-0  ">
          <div className=' mx-auto  rounded-2xl bg-gray-100 sm:p-12 max-sm:p-4 shadow-2xl  max-sm:m-4 overflow-hidden '>
            <div className="mb-2 flex justify-center ">
              <Link to={'/'}>
                <span className="inline-block w-full max-xl:max-w-[60px] xl:max-w-[80px] ">
                  <img src={logo1} alt="" className=' '/>
                </span>
              </Link>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight 2xl:text-[60px]">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60 2xl:text-[30px]">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition duration-200  border-b border-black border-spacing-1 text-blue-500"
              >
                Sign Up
              </Link>
            </p>
            <form onSubmit={handleSubmit(login)} className="mt-8">
              {loading && <p className="text-center">Loading...</p>}
              {/* Error for invalid credentials */}
              {loginError && (
                <p className="text-red-600  text-sm text-center">{loginError}</p>
              )}
              {/* Error for incorrect email or password */}
              {errors.login && (
                <p className="text-red-600 text-sm text-center">{errors.login.message}</p>
              )}
              <div className="space-y-5 2xl:text-[30px]">
                <Input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
                {/* Error for email field */}
                {errors.email && (
                  <p className="text-red-600 text-sm ">{errors.email.message}</p>
                )}
                <Input
                  label="Password: "
                  type="password"
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  })}
                />
                {/* Error for password field */}
                {errors.password && (
                  <p className="text-red-600 mt-2">{errors.password.message}</p>
                )}
                <Button
                 type="submit" 
                 className="w-full ">
                Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-1 overflow-hidden max-sm:w-auto ">
        <img src={logo} alt="" className="object-cover sm:w-full max-sm:overflow-hidden  " />
      </div>
    </div>
  );
};

export default Login;
