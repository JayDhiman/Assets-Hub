import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Dashboard/Layout';
import { MdOutlineWebAsset } from 'react-icons/md';
import { TbCategoryPlus } from 'react-icons/tb';
import { SiBmcsoftware } from 'react-icons/si';
import axios from 'axios';
import AssetsCategoryChart from '../../Components/Dashboard/Charts/AssetsCategoryChart';
import AssetsPieChart from '../../Components/Dashboard/Charts/AssetsDistributionPieChart';

// create a object and map through

// function to fetch the data from the api for all the fields

const Dashboard = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [softwareData, setSoftwareData] = useState([]);




  useEffect(() => {

    fetchAssetData("Assets", setAssetsData)
    fetchAssetData("category", setCategoryData)
    fetchAssetData("Software", setSoftwareData)

  }, [])
  //Asset Data

  const fetchAssetData = async (endpoint, setData) => {
    try {
      const res = await axios.get(`http://localhost:3000/${endpoint}`);
      setData(res.data);



    } catch (error) {
      console.log("Error getting the response from the server", error);
    }
  };


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
          <div className='flex items-center justify-center flex-wrap gap-4 p-2'>
            {/* card-1 */}
            <div className='rounded-xl shadow-md bg-gray-50 flex items-center justify-center flex-wrap gap-8 w-[300px] h-[100px] hover:-translate-y-1  hover:duration-300 hover:transition'>
              <div className='p-2'>
                <MdOutlineWebAsset className='text-orange-400 lg:text-[70px] bg-orange-100 rounded-full p-2' />
              </div>
              <div>
                <h2 className='text-xl font-semibold text-black'>{assetsData.length}</h2>
                <h1 className='font-light text-lg'>Assets</h1>
              </div>
            </div>
            {/* card-2 */}
            <div className='rounded-xl shadow-md bg-gray-50 flex items-center justify-center flex-wrap gap-8 w-[300px] h-[100px] hover:-translate-y-1  hover:duration-300 hover:transition'>
              <div className='p-2'>
                <TbCategoryPlus className='text-orange-400 lg:text-[60px]  bg-orange-100 rounded-full p-2' />
              </div>
              <div>
                <h2 className='text-xl font-semibold'>{categoryData.length}</h2>
                <h1 className='font-light text-lg'>Category</h1>
              </div>
            </div>
            {/* card-3 */}
            <div className='rounded-xl shadow-md bg-gray-50 flex items-center justify-center flex-wrap gap-8 w-[300px] h-[100px] hover:-translate-y-1  hover:duration-300 hover:transition'>
              <div className='p-2'>
                <SiBmcsoftware className='text-orange-400 lg:text-[60px] bg-orange-100 rounded-full p-2' />
              </div>
              <div>
                <h2 className='text-xl font-semibold'>{softwareData.length}</h2>
                <h1 className='font-light text-lg'>Software</h1>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* charts section goes here */}

     {/* Asest-category-section */}
      <div className="flex items-center justify-evenly mt-6 pt-8  flex-wrap   p-2  ">
        <AssetsCategoryChart />
        <div className=''>
          <AssetsPieChart />
        </div>
      </div>

  {/* Software-chart */}








    </Layout>
  );
};

export default Dashboard;
