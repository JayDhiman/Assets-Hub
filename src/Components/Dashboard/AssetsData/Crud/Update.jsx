import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AssetsForm from '../AssetsData/AssetsForm';

const Update = ({ id, setData }) => {
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Assets/${id}`);
        setInitialData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/Assets/${id}`, updatedData);
      setData(response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <>
      <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 rounded-lg'>
          {initialData && (
            <AssetsForm
              initialData={initialData}
              setData={setData}
              onClose={() => {
                /* Handle close functionality if needed */
                
              }}
              onSubmit={handleUpdate}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Update;
