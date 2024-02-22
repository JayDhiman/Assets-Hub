import React from 'react';
import Layout from '../../Components/Dashboard/Layout';
import { MdOutlineWebAsset } from 'react-icons/md';
import { TbCategoryPlus } from 'react-icons/tb';
import { SiBmcsoftware } from 'react-icons/si';

const Dashboard = () => {
  return (
    <Layout>
      <div className='flex  overflow-auto'>
        {/* Main */}
        <div className='w-full overflow-auto'>
          {/* heading */}
          <div className='m-4 border-b'>
            {/* it needs to be dynamic */}
            <h1 className='text-2xl font-primary mx-1 font-medium '>Welcome Admin!</h1>
            <h2 className='uppercase text-[15px] mx-2 mb-2 '>Dashboard</h2>
          </div>
          {/* Data cards */}
          <div className='flex items-center justify-center flex-wrap gap-4'>
            {/* card-1 */}
            <div className='rounded-xl shadow-xl bg-slate-100 flex items-center justify-center flex-wrap gap-8 w-[300px] h-[100px] hover:-translate-y-1  hover:duration-300 hover:transition'>
              <div className='p-2'>
                <MdOutlineWebAsset className='text-orange-400 lg:text-[70px] bg-orange-100 rounded-full p-2' />
              </div>
              <div>
                <h2 className='text-xl font-semibold'>12</h2>
                <h1 className='font-light text-lg'>Assets</h1>
              </div>
            </div>
            {/* card-2 */}
            <div className='rounded-xl shadow-xl bg-slate-100 flex items-center justify-center flex-wrap gap-8 w-[300px] h-[100px] hover:-translate-y-1  hover:duration-300 hover:transition'>
              <div className='p-2'>
                <TbCategoryPlus  className='text-orange-400 lg:text-[60px]  bg-orange-100 rounded-full p-2' />
              </div>
              <div>
                <h2 className='text-xl font-semibold'>5</h2>
                <h1 className='font-light text-lg'>Category</h1>
              </div>
            </div>
            {/* card-3 */}
            <div className='rounded-xl shadow-xl bg-slate-100 flex items-center justify-center flex-wrap gap-8 w-[300px] h-[100px] hover:-translate-y-1  hover:duration-300 hover:transition'>
              <div className='p-2'>
                <SiBmcsoftware className='text-orange-400 lg:text-[60px] bg-orange-100 rounded-full p-2' />
              </div>
              <div>
                <h2 className='text-xl font-semibold'>10</h2>
                <h1 className='font-light text-lg'>Software</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
