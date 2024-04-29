import React from 'react'
import logo1 from '../assets/logo1.webp'

import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  return (
    <footer className='relative w-full  flex flex-col  justify-between items-start max-xl:px-3   mx-auto bg-gradient-to-t from-stone-700 to-stone-900 mt-16 pb-12 overflow-hidden' >
    <div className=' xl:container mx-auto flex items-start justify-center gap-6 max-sm:gap-3 max-sm:flex-col overflow-hidden flex-wrap'>
    
    
    
    
    <div className='w-fit  mx-10 max-sm:mx-auto'>
      
      {/* logo */}
    <div className='flex items-center justify-start  max-sm:flex-col mt-4  '>
    
    <div className='text-xl ml-4 mr-1 pt-2'>
    <img src={logo1} alt="Logo" className='' width={50}/>
    </div>
    
    <div className='pt-3 '>
      <h1 className='text-white text-2xl uppercase mt-3'>AssetHub</h1>
    </div>
    </div>
    
     {/* about the company */}
    <div className=' mx-5 mt-4 text-white font-thin text-sm'>
    
    <div className='w-64 overflow-hidden'>
    <p>The Company makes it easy to keep track of what you own. Our asset management software lets you create, categorize, and search your inventory quickly 
      
        and easily. With powerful reporting features, you'll have a clear picture of what you own and where it's located.</p>
    </div>
    </div>
    </div>
    
    
    
    {/* features desciption */}
    <div className='flex max-sm:flex-row gap-1  max-sm:mx-auto'>
    
    
    
    <div className='mt-5 w-fit h-auto mx-10 px-5 max-sm:mx-auto '>
    <div className='pt-4'>
      <h1 className='text-orange-400 text-lg font-semibold'>Features</h1>
    </div>
    
    <div className='pt-6'>
      <ul className='text-white text-sm '>
        <li className='hover:text-orange-300 p-1'>Location tracking</li>
        <li className='hover:text-orange-300 p-1'>Asset Search</li>
        <li className='hover:text-orange-300 p-1'>Asset Custody</li>
        <li className='hover:text-orange-300 p-1'>Workspaces</li>
        <li className='hover:text-orange-300 p-1'>Dashboard</li>
    
      </ul>
    </div>
    
    </div>
    
    
    <div className='mt-5 w-fit h-auto mx-10 px-5 max-sm:mx-auto'>
    <div className='pt-4'>
      <h1 className='text-orange-400 text-lg font-semibold'>Quik Links</h1>
    </div>
    
    <div className='pt-6'>
      <ul className='text-white text-sm '>
        <li className='hover:text-orange-300 p-1'>About us</li>
        <li className='hover:text-orange-300 p-1'>Contact Us</li>
        <li className='hover:text-orange-300 p-1'>Blogs</li>
    
    
     </ul>
    </div>
    
    </div>
    </div>
      
    <div>
    
    <div className='flex items-center justify-center mt-4 mx-12 pt-4 px-12 max-sm:px-1 max-sm:overflow-hidden max-sm:flex-wrap'>
    <div className='pt-10 px-4 mx-4 text-white hover:text-gray-200 hover:-translate-y-2 hover:duration-200 hover:delay-300'>
      <FaFacebook fontSize={40}/>
    </div>
    <div className='pt-10 px-4 mx-4 text-white hover:-translate-y-2 hover:duration-200 hover:delay-300'>
      <FaGithub fontSize={40}/>
    </div>
    <div className='pt-10 px-4 mx-4 text-white hover:-translate-y-2 hover:duration-200 hover:delay-300 '>
      <FaLinkedin fontSize={40}/>
    </div>
    
    
    <div className='pt-10 px-4 mx-4 text-white hover:-translate-y-2 hover:duration-200 hover:delay-300'>
      <IoLogoYoutube fontSize={40}/>
    </div>
    
    </div>
    </div>
    </div>
    </footer>
  )
}

export default Footer