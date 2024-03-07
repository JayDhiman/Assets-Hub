import React, { useState } from 'react'
import Layout from '../../Components/Dashboard/Layout'
import { IoAddOutline } from 'react-icons/io5';
import Input from '../../Components/Input';
import Table from '../../Components/Dashboard/Category/Table';
import Form from '../../Components/Dashboard/Category/Form';
import axios from 'axios';

const Category = () => {
  const[form,setForm] = useState(false)


  const handleToggleClose = () => setForm(false)

 
  return (
   <Layout>
<div className='flex overflow-auto'>
        <div className='w-full overflow-hidden'>
        <div className='m-4 border-b'>
            {/* it needs to be dynamic */}
            <h1 className='text-2xl font-primary mx-1 font-medium '>Category</h1>
            <h2 className='uppercase text-[15px] mx-2 mb-2 '>Dashboard / Category</h2>
          </div>
        </div>

      </div>

      <div className=''>
        <div className='container mx-auto w-full p-2 '>
          <div className='flex items-center flex-wrap gap-4 w-full'>
            <div className='mx-2 max-md:w-full flex-1'>
              <Input placeholder={'Search here'} />
            </div>

            {/* Other input fields and buttons */}

            <div className=''>
              <button
                className='rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950 flex'
                onClick={()=>setForm(true)}
              
                >
                <span className='text-2xl px-1'>
                  <IoAddOutline />
                </span>
                <span className='max-sm:hidden'>ADD</span>
              </button>
            </div>
          </div>
 
          <div>
            <Table />
          </div>

         {
          form && <Form setForm={handleToggleClose} handleAddCategory={handleAddCategory} />
         }
        </div>
        
      </div>

   </Layout>
  )
}

export default Category