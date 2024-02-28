import React from 'react';
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
  const { register, handleSubmit } = useForm();
  const [error, setError] = React.useState('');

  const login = async (data) => {
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.currentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center  w-full h-screen">

      <div className="flex flex-1 justify-center items-center overflow-hidden ">
        <div className=" md:w-[50vw] max-md:w-[100vw] xl:max-h-[70vh] max-xl:max-h-[50vh] h-full  ">
            <div className='w-fit mx-auto my-12 rounded-2xl bg-gray-100 p-12 shadow-2xl max-sm:pt-12 max-sm:mt-12  '>

            
          <div className="mb-2 flex justify-center ">
            <span className="inline-block w-full max-xl:max-w-[60px] xl:max-w-[80px] ">
              <img src={logo1} alt="" className=' '/>
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight 2xl:text-[60px]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60 2xl:text-[30px]">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <form onSubmit={handleSubmit(login)} className="mt-8">
            {error && (
              <p className="text-red-600 mt-8 text-center">{error}</p>
            )}
            <div className="space-y-5 2xl:text-[30px]">
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register('email', {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || 'Email address must be a valid address',
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register('password', {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
          </form>
        </div>
        </div>
      </div>

      <div className="flex sm:flex-1">
        <img src={logo} alt="" className="object-cover sm:w-full max-md:hidden h-full" />
      </div>
    </div>
  );
};

export default Login;
