import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Dashboard/Layout';
import Input from '../../Components/Input';
import { IoAddOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSoftwareList } from '../../store/SoftwareSlice';
import SoftwareForm from '../../Components/Dashboard/Software/SoftwareForm';
import SoftwareTable from '../../Components/Dashboard/Software/SoftwareTable';

const Software = () => {
  const dispatch = useDispatch();
  const softwareList = useSelector((state) => state.software.softwareList);
  const [softwareForm, setSoftwareForm] = useState(false);

  useEffect(() => {
    dispatch(fetchSoftwareList());
  }, [dispatch]);

 
  return (
    <Layout>
      <div className='flex overflow-auto'>
        <div className='w-full overflow-hidden'>
          <div className='m-4 border-b'>
            <h1 className='text-2xl font-primary mx-1 font-medium'>Software</h1>
            <h2 className='uppercase text-[15px] mx-2 mb-2 '>Dashboard / Software</h2>
          </div>
          <div className='container mx-auto w-full p-3 '>
            <div className='flex items-center justify-center gap-3 flex-wrap'>
              <div className='flex-1'>
                <Input placeholder={'Search here'} />
              </div>
              <div className=''>
                <button className='rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950'>
                  Search
                </button>
              </div>
              <div className=''>
                <button
                  onClick={() => setSoftwareForm(true)}
                  className='rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950 flex'
                >
                  <span className='text-2xl px-1'>
                    <IoAddOutline />
                  </span>
                  <span className='max-sm:hidden'>ADD</span>
                </button>
              </div>
            </div>
          </div>
          
          {softwareForm && <SoftwareForm onClose={() => setSoftwareForm(false)} />}
          <div className='w-auto h-auto mx-3'>
            <SoftwareTable data={softwareList} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Software;
