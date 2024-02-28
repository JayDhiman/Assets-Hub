import React, { useState } from 'react';
import Layout from '../../Components/Dashboard/Layout';


// import EmpForm from '../../Components/Dashboard/Employee/EmpForm';
// import EmpTable from '../../Components/Dashboard/Employee/EmpTable';

const Employee = () => {
  // const [empForm, setEmpForm] = useState(false);

  return (
    <Layout>
      <div className='flex overflow-auto'>
        <div className='w-full overflow-hidden'>
          <div className='m-4 border-b'>
            <h1 className='text-2xl font-primary mx-1 font-medium '>Employee</h1>
            <h2 className='uppercase text-[15px] mx-2 mb-2 '>Dashboard / Employee</h2>
          </div>
        </div>
      </div>

      {/* <div className=''>
        <div className='container mx-auto w-full p-2 '>
          <div className='flex items-center flex-wrap gap-4 w-full'>
            <div className=' mx-2 max-md:w-full flex-1'>
              <Input placeholder={'Search here'} />
            </div>

            <div className='inline-block relative'>
              <select
                className='block appearance-none bg-stone-800 border border-stone-800 text-white py-3 px-2 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-stone-900 focus:border-stone-900 '
                id='dog-names'
                name='dog-names'>
                <option value='Designation'>Designation</option>
                <option value='Brand'>Brand</option>
                <option value='Title'>Title</option>
                <option value='CPU'>CPU</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white'>
                <IoIosArrowDown />
              </div>
            </div>

            <div className=''>
              <button className='rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950'>
                Search
              </button>
            </div>

            <div className=''>
              <button
                className='rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950 flex'
                onClick={() => setEmpForm(true)}>
                <span className='text-2xl px-1'>
                  <IoAddOutline />
                </span>
                <span className='max-sm:hidden'>ADD</span>
              </button>
            </div>
          </div>
        

          {empForm && (
            <div className=''>
              <EmpForm onClose = {()=>setEmpForm(false)}/>
            </div>
          )}
       
              <div className='w-auto h-auto mx-3'>
                <EmpTable/>
              </div>


        </div>
      </div> */}
    </Layout>
  );
};

export default Employee;



