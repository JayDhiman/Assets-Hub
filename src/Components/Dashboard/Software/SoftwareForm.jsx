import Input from '../../Input';
import React from 'react';
import { useForm } from 'react-hook-form';




const SoftwareForm = ({ initialValue, onSubmit, onClose}) => {


  const { register, handleSubmit, reset  ,formState:{errors},trigger} = useForm({
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
      <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30">
        <button
          className="fixed top-[20vh] right-[22vw] text-red-400  text-xl hover:text-red-800"
          onClick={onClose}>
          X
        </button>
        <div className='flex justify-center items-center flex-wrap  mt-12 pt-12'>
          <div className="bg-gray-50 rounded-lg shadow-lg p-6 mt-12 ">
            <div className=''>
              <h1 className='text-center font-primary font-semibold text-xl my-2 pt-2'> {initialValue ? 'Update Software' : 'Add Software'}</h1>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="text-black flex items-center justify-between gap-4 flex-wrap">
                <div className='p-2 flex-1'>
                  <div className="p-2 mx-3">
                
                  </div>
                  <div className="p-2 mx-3">
                    <Input
                      label="SOFTWARE:"
                      placeholder="software"
                      type="text"
                      {...register('software', {
                        required: 'required',
                      
                       
                      })}
                      
                    />
                    {errors.software?.type === 'required' && (
                      <p className='text-red-500'>{errors.software.message}</p>
                    )}
                  </div>
                </div>
                <div className='p-2 mt-3'>
                  <div className="mx-3 px-1 pt-2 ">
                    <Input
                      label="VERSION:"
                      placeholder="version"
                      type="text"
                      {...register('version', {
                        required: 'required',
                      })}
                      
                    />
                    {errors.version?.type === 'required' && (
                      <p className='text-red-500'>{errors.version.message}</p>
                    )}
                  </div>
                  <div className="p-2 mx-3">
                    <Input
                      label="NUMBER OF ASSIGN:"
                      placeholder="Number of Assigns"
                      type="text"
                      {...register('assign', {
                        required: 'required',
                      })}
                    
                    />
                    {errors.assign?.type === 'required' && (
                      <p className='text-red-500'>{errors.assign.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <div className="p-2 text-center">
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    {initialValue ? 'Update' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SoftwareForm;

