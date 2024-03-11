import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../Input';

const SoftwareForm = ({ onClose, initialValues, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues || {
      
      Software: '',
      Version: '',
      Assign: ''
    }
  });

  const handleSubmitForm = (data) => {
    onSubmit(data);
    // onClose();
    reset();
  };

  return (
    <>
      <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30">
        <button
          className="fixed top-[20vh] right-[22vw] text-red-400 text-xl hover:text-red-800"
          onClick={onClose}>
          X
        </button>
        <div className='flex justify-center items-center flex-wrap mt-12 pt-12'>
          <div className="bg-gray-50 rounded-lg shadow-lg p-6 mt-12 ">
            <div className=''>
              <h1 className='text-center font-primary font-semibold text-xl my-2 pt-2'>
                {initialValues ? 'Update Software' : 'Add Software'}
              </h1>
            </div>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="text-black flex items-center justify-between gap-4 flex-wrap">
                <div className='p-2 flex-1'>
                  {/* <div className="p-2 mx-3">
                    <Input
                      label="ID"
                      placeholder="ID"
                      type="text"
                      {...register('id', { required: true })}
                    />
                  </div> */}
                  <div className="p-2 mx-3">
                    <Input
                      label="SOFTWARE"
                      placeholder="Software"
                      type="text"
                      {...register('Software', { required: true })}
                    />
                  </div>
                </div>
                <div className='p-2 mt-3'>
                  <div className="mx-3 px-1 pt-2 ">
                    <Input
                      label="VERSION"
                      placeholder="Version"
                      type="text"
                      {...register('Version', { required: true })}
                    />
                  </div>
                  <div className="p-2 mx-3">
                    <Input
                      label="NUMBER OF ASSIGN"
                      placeholder="Number of Assigns"
                      type="text"
                      {...register('Assign', { required: true })}
                    />
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <div className="p-2 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    type="submit">
                    {initialValues ? 'Update' : 'Submit'}
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
