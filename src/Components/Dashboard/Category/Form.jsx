// Form.js
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../Input';

const Form = ({ onSubmit, initialValues , onCancel }) => {
  const { register, handleSubmit, reset} = useForm({
    defaultValues: initialValues || {
      Machines: '',
      Count: '',
      Assigned: ''
    }
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();

    // Reset form fields after submission
  };

  return (
    <>
      <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center">
        <div className=" bg-gray-100 rounded-lg shadow-lg p-6 max-w-lg w-full">
          <button
            className="absolute top-2 right-2 text-red-400 text-xl hover:text-red-800"
            onClick={onCancel}>
            X
          </button>
          <h1 className="text-center font-primary font-semibold text-xl my-2">
            {initialValues ? 'Edit Category' : 'Add Category'}
          </h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="MACHINES:"
                placeholder="Enter CPU"
                type="text"
                {...register('Machines', { required: true })}
              />
              <Input
                label="COUNT:"
                placeholder="Enter OS"
                type="text"
                {...register('Count', { required: true })}
              />
              <Input
                label="ASSIGNED:"
                placeholder="Enter License"
                type="text"
                {...register('Assigned', { required: true })}
              />
            </div>
            <div className="text-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                type="submit">
                {initialValues ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
