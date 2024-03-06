import React, {  useState, useEffect } from 'react';
import Layout from '../../Components/Dashboard/Layout';
import Input from '../../Components/Input';

import { IoAddOutline } from 'react-icons/io5';
import AssetsForm from '../../Components/Dashboard/AssetsData/AssetsForm';
import AssetsTable from '../../Components/Dashboard/AssetsData/AssetsTable';
import { useDispatch, useSelector } from 'react-redux';
import { addAssets,getAssets, updateAssets } from '../../store/AssetsSlice'; 


const Assets = () => {
  const [empForm, setEmpForm] = useState(false); // State for form popup
  const dispatch = useDispatch();

  const handleToggleEmpForm= () => setEmpForm(true)

  const assets = useSelector((state) => {

    return state.assets.assetsData;
  });

 //update the current asset


  const handleUpdateAssets = (assetData)=>{
   dispatch(updateAssets(assetData))
   setEmpForm(false)
  }

 // Add asstes
  const handleAddAsset = (assetData) => {
    dispatch(addAssets(assetData));
    setEmpForm(false); // Close the form after adding the asset
  };

  useEffect(() => {
    dispatch(getAssets()); // Fetch assets data when component mounts
  }, [dispatch]);
  return (
    <Layout>
      <div className='flex overflow-auto'>
        <div className='w-full overflow-hidden'>
          <div className='m-4 border-b'>
            <h1 className='text-2xl font-primary mx-1 font-medium '>Assets</h1>
            <h2 className='uppercase text-[15px] mx-2 mb-2 '>Dashboard / Assets</h2>
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
                onClick={() => {
                  setEmpForm(true)
                }
              
                }>
                <span className='text-2xl px-1'>
                  <IoAddOutline />
                </span>
                <span className='max-sm:hidden'>ADD</span>
              </button>
            </div>
          </div>

            {empForm && <AssetsForm setEmpForm={ setEmpForm } empForm={empForm } onAdd={handleAddAsset} onUpdate={handleUpdateAssets} />}

          <div className='w-auto h-auto mx-3'>
            <AssetsTable assets={assets} toggleEmpForm={handleToggleEmpForm}  />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Assets;
