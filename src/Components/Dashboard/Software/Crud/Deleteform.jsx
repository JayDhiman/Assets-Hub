import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteSoftware } from '../../../../store/SoftwareSlice'; // Update the path to your software slice

const Deleteform = ({ softwareId, setDeleteModel}) => {
    const dispatch = useDispatch();

    const handleClose = () => setDeleteModel(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/Software/${softwareId}`);
            dispatch(deleteSoftware(softwareId)); // Dispatch Redux action to delete the software
            handleClose() 
           
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('Asset not found:', error);
            } else {
                console.error('Error deleting asset:', error);
            }
        }
    };

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-8 rounded-lg'>
                <h1 className='text-xl font-semibold mb-4'>Delete Asset</h1>
                <p className='mb-4'>Are you sure you want to delete this asset?</p>
                <div className='flex justify-end'>
                    <button onClick={handleDelete} className='mr-2 px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none hover:scale-105 duration-200'>
                        Delete
                    </button>
                    <button onClick={handleClose} className='px-4 py-2 bg-gray-300 text-gray-800 rounded-lg focus:outline-none hover:scale-105 duration-200'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Deleteform;
