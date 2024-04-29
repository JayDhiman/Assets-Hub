import React from 'react'
import { motion } from "framer-motion";
import Button from '../Components/Button';
import Dashboard1 from '../assets/Dashboard1.png'
import Carousel from '../Components/Carousel';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import Header from '../Components/HeaderFolder/Header';
import mobileResponsive from "../assets/mobileResponsive.jpeg"
import location from "../assets/location.jpeg"
import employeeFeature from "../assets/employeeFeature.jpeg"



const Homecontent = () => {
    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
 
    return (
    <>
    <div className='bg-gray-100'>  <Header />
  <motion.main 
   initial="hidden"
   animate="visible"
   exit={{ opacity: 0, transition: { duration: 2 } }}
   variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
   className='  h-auto top-0  w-full overflow-hidden'>
    
    

    <div className='relative w-full  flex flex-col  justify-between items-start max-xl:px-3 pt-28  mx-auto bg-gradient-to-t from-stone-700 to-stone-900  '>
      
      <div className='font-bold  mx-auto md:text-4xl text-lg max-sm:text-[20px] max-sm:leading-[1] '>
       <motion.h1 
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible
        }}
       className='text-gray-100 max-sm:text-sm'>Open Source Asset</motion.h1>
      </div>
        <div className='font-bold mx-auto md:text-4xl text-lg max-sm:leading-[1]  max-lg:px mb-3 '>
        
        <motion.h1 
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible
        }} className='text-gray-100 max-sm:text-sm'>Management <span className='text-orange-400'>Software</span></motion.h1>
      </div>

      
      <div className='flex mx-auto gap-3 max-sm:gap-1 max-sm:text-center'>
      <div className='bg-orange-300 w-2 h-34 mx-auto  mt-5'>
     </div>

  <div className='font-extralight md:text-2xl max-sm:text-sm max-sm:px-2  max-sm:leading-[1] mt-5  container text-white '> 
   <p className='max-sm:text-sm'><span className='text-green-300 font-normal'>Asset</span> and <span className='text-green-300 font-normal'>Equipment</span> tracking software used by <span className='text-green-300 font-normal'>teams</span>
   <span className='max-sm:hidden'> who value clarity.</span> 
    </p>
   <p className='max-sm:text-sm'>Company is an <span className='text-green-300 font-normal'>Open source asset management system</span> <span className='max-sm:hidden'>that lets you create,
    </span></p>
   <p className='max-sm:hidden'> manage and overview your assets across
   locations.</p>
  </div>  
    </div>
   
      <div className='mx-auto mb-12'>
      <Link to={"/login"}>
      <Button  className='text-sm md:text-lg font-light  hover:bg-blue-700 mt-3 md:mx-4 md:px-4 '>
        GET STARTED
      </Button>
      </Link>  
      </div>

      </div> 
      {/* Image section  Dashboard img */}
      <div className=''>
        <div className='container mx-auto mt-5 '>
        <img src={Dashboard1} alt="" className='opacity-90 px1- py-10 shadow-xl' />
        </div>
      {/* small images */}
        
      </div>

  </motion.main>


  {/* cards */}

  <section className='overflow-hidden w-full my-6 pt-12 bg-white container mx-auto rounded-lg shadow-xl drop-shadow-xl py-2 pb-8 mb-12' >
    <h1 className='  -translate-y-5 font-primary font-semibold  text-xl max-sm:text-sm text-center mb-4'>Features</h1>
  <div className='flex max-md:flex-col gap-6 md:gap-12 max-md:gap-12 items-center justify-center p-1 flex-wrap'>

    <div className='flex max-sm:flex-col items-center w-96'>

      <div className="relative flex flex-col  text-gray-700 bg-sky-50 shadow-md bg-clip-border rounded-xl h-[450px]">
        <div className="relative h-52 -translate-y-6 mx-4  overflow-hidden text-gray-50 shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40  hover:duration-300 hover:transition-all hover:-translate-y-7">
          <img src={mobileResponsive} alt="responsive design" />
        </div>
        <div className="px-3">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Mobile Responsive Ready
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            Our website is mobile-responsive, guaranteeing a seamless experience across all devices. Whether on a smartphone, tablet, or desktop, users can effortlessly access and interact with our content. 
          </p>
        </div>
        <div className="p-6 ">
          <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:bg-blue-700 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">
            Read More
          </button>
        </div>
      </div>

    </div>


    <div className='flex  justify-centermax-sm:flex-col items-center w-96  '>

      <div className="relative  flex flex-col mt text-gray-700 bg-sky-50 shadow-md bg-clip-border rounded-xl h-[450px]">
    <div className=" -translate-y-7 mx-4  h-52 overflow-hidden text-gray-50 shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40  hover:duration-300 hover:transition-all hover:-translate-y-8">
          <img src={location} alt="responsive design" />
        </div> 
        <div className="px-3 ">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Track Location
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            Our track location feature enhances user experience by utilizing their current geographical position. To overall satisfaction with our website.
          </p>
          <p className='text-center font-m text-sm xl:text-lg text-zinc-400 mt-2'>Upcoming Feature.</p>
        </div>
        <div className="p-4 ">
          <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:bg-blue-700 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">
            Read More
          </button>
        </div>
      </div>

    </div>

       <div className='flex max-sm:flex-col items-center w-96'>

      <div className="relative flex flex-col  text-gray-700 bg-sky-50 shadow-md bg-clip-border rounded-xl h-[450px]">
        <div className=" -translate-y-7  mx-4  overflow-hidden text-gray-50 shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 hover:duration-300 hover:transition-all hover:-translate-y-8">
          <img src={employeeFeature} alt="responsive design" />
        </div>
        <div className="px-3">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Employee Data Management
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            Empowering users to efficiently manage employee data, this feature offers comprehensive tools for organizing and maintaining personnel information. 
          </p>
        </div>
        <div className="p-6 ">
          <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-blue-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:bg-blue-700 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">
            Read More
          </button>
        </div>
      </div>

    </div>

  </div>
</section>

              
          
  {/* Service Section */}
 <section className=''>
   <Carousel />
 </section>
 <Footer/>

 </div>

 
    </>
  )
}

export default Homecontent