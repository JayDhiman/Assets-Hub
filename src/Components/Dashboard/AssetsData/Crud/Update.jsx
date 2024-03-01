import axios from 'axios';
import React, { useState } from 'react';
import AssetsForm from '../AssetsData/AssetsForm';

const Update = ({ initialData }) => {
  const [data, setData] = useState(null);

  const handleUpdateData = async (initialData) => {
    try {
      
      const res = await axios.put(`http://localhost:3000/Assets/${initialData.id}`, );
      const updatedAsset = res.data;
      setData(updatedAsset);
      console.log("Update successful", updatedAsset);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-lg'>
          <AssetsForm
            initialData={ initialData }
            setData={setData}
            onClose={() => {
              /* Handle close functionality if needed */
            }}
            onSubmit={handleUpdateData}
          />
        </div>
      </div>
    </>
  );
};

export default Update;
