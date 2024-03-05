import React from 'react';
import { useDispatch} from 'react-redux';
import { deleteAssets } from '../../../../store/AssetsSlice';

const Delete = ({ assetId, setDeleteModel }) => {
    const dispatch= useDispatch()
    
    const handleDelete = ()=>{
        dispatch(deleteAssets(assetId))
        setDeleteModel(false)
       }

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-8 rounded-lg'>
                <h1 className='text-xl font-semibold mb-4'>Delete Asset</h1>
                <p className='mb-4'>Are you sure you want to delete this asset?</p>
                <div className='flex justify-end'>
                    <button  onClick={handleDelete}  className='mr-2 px-4 py-2 bg-red-500 text-white rounded-lg focus:outline-none hover:scale-105 duration-200'>
                        Delete
                    </button>
                    <button onClick={()=>{
                        setDeleteModel(false)
                        }} className='px-4 py-2 bg-gray-300 text-gray-800 rounded-lg focus:outline-none hover:scale-105 duration-200'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Delete;
