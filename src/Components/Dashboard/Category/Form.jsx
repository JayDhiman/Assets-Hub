import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../Input";

const Form = ({ initialValue, onSubmit, onClose }) => {

  const { register, handleSubmit, reset,formState:{errors},trigger } = useForm({
    defaultValues: initialValue  || {},
  });

  const handleFormSubmit = async (data) => {
    try {
      // Trigger validation only on submit
      await trigger();
  
      // If no errors, submit the form
      if (Object.keys(errors).length === 0) {
        onSubmit(data);
        reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center">
        <div className=" bg-gray-100 rounded-lg shadow-lg p-6 max-w-lg w-full">
          <button
            className="absolute top-2 right-2 text-red-400 text-xl hover:text-red-800"
            onClick={onClose}
          >
            X
          </button>
          <h1 className="text-center font-primary font-semibold text-xl my-2">
          {initialValue ? 'UPDATE ASSETS' : 'ADD ASSETS'}
           </h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
                      label="S.NO"
                      placeholder="id"
                      type="text"
                      {...register('s.No', {
                        required: true,
                      })}
                     
                    />
              <Input
                label="MACHINES:"
                placeholder="Enter Machines"
                type="text"
                {...register("Machines", {
                  required: 'required',
                })}
              />
               {errors.Machines?.type === 'required' && (
                      <p className='text-red-500'>{errors.Machines.message}</p>
                    )}
              <Input
                label="COUNT:"
                placeholder="Enter Count"
                type="text"
                {...register("Count", {
                  required: 'required',
                })}
              />
              {errors.Count?.type === 'required' && (
                      <p className='text-red-500'>{errors.Count.message}</p>
                    )}
              <Input
                label="ASSIGNED:"
                placeholder="Enter Assigned"
                type="text"
                {...register("Assigned", {
                  required: 'required',
                })}
              />
              {errors.Assigned?.type === 'required' && (
                      <p className='text-red-500'>{errors.Assigned.message}</p>
                    )}
            </div>
            <div className="text-center mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              {initialValue ? 'Update' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
