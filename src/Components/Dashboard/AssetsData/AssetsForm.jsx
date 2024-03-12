import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../Input';

const AssetsForm = ({ intialvalue ,onSubmit,onClose}) => {
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: intialvalue || {}, // Use defaultValues to pre-fill the form fields
  });

  const handleAssetForm = (data) => {
    onSubmit(data);
    reset();
  };


  return (
    <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center">
      <div className=" bg-gray-100 rounded-lg shadow-lg p-6 max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-red-400 text-xl hover:text-red-800"
          onClick={onClose}>
          X
        </button>
        <h1 className="text-center font-primary font-semibold text-xl my-2">
          {intialvalue ? 'UPDATE ASSETS' : 'ADD ASSETS'}
        </h1>
        <form onSubmit={handleSubmit(handleAssetForm)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="CPU:"
              placeholder="Enter CPU"
              type="text"
              {...register('cpu', {
                required: true,
              })}
            />
            <Input
              label="OS:"
              placeholder="Enter OS"
              type="text"
              {...register('os', {
                required: true,
                
              })}
            />
            <Input
              label="LICENSE:"
              placeholder="Enter License"
              type="text"
              {...register('license', {
                required: true,
              })}
            />
            <Input
              label="UPDATE:"
              placeholder="Enter Update"
              type="text"
              {...register('update', {
                required: true,
              })}
            />
            <Input
              label="BRAND:"
              placeholder="Enter Brand"
              type="text"
              {...register('brand', {
                required: true,
              })}
            />
            <Input
              label="EXPIRY:"
              placeholder="Enter Expiry"
              type="text"
              {...register('expiry', {
                required: true,
              })}
            />
            <Input
              label="DETAILS:"
              placeholder="Enter Details"
              type="text"
              {...register('details', {
                required: true,
              })}
            />
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              {intialvalue ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetsForm;