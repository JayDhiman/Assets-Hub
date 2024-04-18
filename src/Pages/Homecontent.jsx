import React from 'react'
import { motion } from "framer-motion";
import Button from '../Components/Button';
import Dashboard1 from '../assets/Dashboard1.png'
import Carousel from '../Components/Carousel';
import { CiMobile1 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { MdWebAsset } from "react-icons/md";
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';




const Homecontent = () => {
    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
 
    return (
    <>
  <Header />
  <motion.main 
   initial="hidden"
   animate="visible"
   exit={{ opacity: 0, transition: { duration: 2 } }}
   variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
   className='  h-auto top-0  w-full overflow-hidden'>
    
    

    <div className='relative w-full  flex flex-col  justify-between items-start max-xl:px-3 pt-28  mx-auto bg-sky-900  '>
      
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
   <p className='max-sm:text-sm'>Company is an open source asset management system
   <span className='max-sm:hidden'>
   that lets you create,
    </span></p>
   <p className='max-sm:hidden'> manage and overview your assets across
   locations.</p>
  </div>  
    </div>
   
      <div className='mx-auto mb-12'>
      <Link to={"/login"}>
      <Button  className='text-sm md:text-lg font-light hover:font-medium hover:bg-orange-600 mt-3 md:mx-4 md:px-4 '>
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

<section className=' overflow-hidden w-full mt-12 pt-12'>

 
<h1 className='text-lg pt-4 max-sm:text-center max-sm:text-lg mx-1 text-center xl:text-2xl md:pt-2 xl:my-4 pb-8 '>
  
Use our Programmable QR Code Tags and track & mantain your assets</h1>
<div className=' flex max-sm:flex-col gap-6 justify-center p-1 flex-wrap'>

 {/* wrapper */}
<div className=' flex max-sm:flex-col items-center'>

{/* items */}
<div className=" xl:w-96 xl:h-96 md:w-64 md:h-64 flex flex-col items-center shadow-lg bg-slate-100 rounded-xl max-sm:w-fit max-sm:h-fit  mb-4  hover:shadow-2xl hover:shadow-black hover:border-spacing-3 hover:-translate-y-2 hover:duration-200 hover:delay-300">
       <h1 className='text-lg pt-4 max-sm:text-center max-sm:text-lg mx-1 text-center xl:text-2xl md:pt-2 xl:my-4'>Ready for mobile Devices</h1>
       <div className='py-3 text-orange-300 '>
        <CiMobile1 className="2xl:text-[120px] xl:text-[100px] lg:text-[80px] md:text-[60px] max-md:text-[40px]" />
       </div>
       <p className='font-thin text-sm  text-center pt-3 xl:text-lg'>No extra hardware needed. Most </p>
       <p className='font-extralight text-sm xl:text-lg'> smartphones support Company.</p>
      
        
</div>

</div>


<div className='flex max-sm:flex-col items-center  '>

{/* items */}
<div className=" xl:w-96 xl:h-96 md:w-64 md:h-64 flex flex-col items-center shadow-lg bg-slate-100 rounded-xl max-sm:w-fit max-sm:h-fit  mb-4  hover:shadow-2xl hover:shadow-black hover:border-spacing-3 hover:-translate-y-2 hover:duration-300 hover:delay-200">
       <h1 className='text-lg pt-4 max-sm:text-center max-sm:text-lg mx-1 text-center xl:text-2xl md:pt-2 xl:my-4'>Location tracking</h1>
       <div className='py-3 text-orange-300 drop-shadow-xl decoration-purple-100'>
        <CiLocationOn className="2xl:text-[120px] xl:text-[100px] lg:text-[80px] md:text-[60px] max-md:text-[40px]" />
       </div>
       <p className='font-thin text-sm  text-center pt-3 xl:text-lg'>Each scan updates your asset's location.</p>
       <p className='font-extralight text-sm xl:text-lg'>Know where things last were.</p>
       <p className='font-semibold text-sm xl:text-lg text-neutral-600 mt-2'>Upcoming Feature.</p>

        
</div>

</div>

<div className=' flex max-sm:flex-col items-center mb-3 '>

{/* items */}
<div className="xl:w-96 xl:h-96 md:w-64 md:h-64 flex flex-col items-center shadow-lg bg-slate-100 rounded-xl max-sm:w-fit max-sm:h-fit  mb-4   hover:shadow-2xl hover:shadow-black hover:border-spacing-3 hover:-translate-y-2 hover:duration-300 hover:delay-200">
       <h1 className='text-lg pt-4 max-sm:text-center max-sm:text-lg mx-1 text-center xl:text-2xl md:pt-2 xl:my-4'>Create and Program Your Assets</h1>
       <div className='py-3 text-orange-300 drop-shadow-xl decoration-purple-100'>
        <MdWebAsset className="2xl:text-[120px] xl:text-[100px] lg:text-[80px] md:text-[60px] max-md:text-[40px]" />
       </div>
       <p className='font-thin text-sm  text-center pt-3 xl:text-lg'>Print your own.Attach them to anything </p>
      <p className='font-extralight text-sm xl:text-lg'>  you want to track.</p>

        
</div>

</div>


{/* items */}
{/* <div className=' flex max-sm:flex-col items-center '>

<div className="xl:w-96 xl:h-96 md:w-64 md:h-64 flex flex-col items-center shadow-lg bg-slate-100 rounded-xl max-sm:w-fit max-sm:h-fit  mb-4  hover:shadow-2xl hover:shadow-black hover:border-spacing-3 hover:-translate-y-2 hover:duration-300 hover:delay-200">
 <h1 className='text-lg pt-4 max-sm:text-center max-sm:text-lg mx-1 text-center xl:text-2xl md:pt-2 xl:my-4'>Create and Program Your Assets</h1>
 <div className='py-3 text-orange-300 drop-shadow-xl decoration-purple-100'>
        <MdWebAsset className="2xl:text-[120px] xl:text-[100px] lg:text-[80px] md:text-[60px]  max-md:text-[40px]" />
       </div>
       <p className='font-thin text-sm  text-center pt-3 xl:text-lg'>Print your own.Attach them to anything </p>
      <p className='font-extralight text-sm xl:text-lg'>  you want to track.</p>

        
</div>

</div> */}

</div>




</section>
              
          
  {/* Service Section */}
 <section className=''>
   <Carousel />
 </section>
 <Footer/>
 
    </>
  )
}

export default Homecontent