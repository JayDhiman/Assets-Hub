import axios from 'axios';
import Input from '../../Input';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const SoftwareForm = ({ onClose, setData, softwareId, setShowUpdateForm }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (softwareId) {
          const response = await axios.get(`http://localhost:4000/Software/${softwareId}`);
          const data = response.data;
          reset(data);
        } else {
          reset();
        }
      } catch (err) {
        console.log(err, "error");
      }
    };

    fetchData();
  }, [softwareId, reset]);

  const handleForm = async (data) => {
    try {
      if (softwareId) {
        const res = await axios.put(`http://localhost:4000/Software/${softwareId}`, data);
        setData(res.data);
        setShowUpdateForm(false);
        console.log("Put-response", res.data);
      } else {
        const res = await axios.post(`http://localhost:4000/Software`, data);
        // setData(res.data);
        onClose(); // Close the form after adding new entry
        console.log("Post-response", res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset(); // Reset the form fields
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
              <h1 className='text-center font-primary font-semibold text-xl my-2 pt-2'> {softwareId ? 'Update Software' : 'Add Software'}</h1>
            </div>
            <form onSubmit={handleSubmit(handleForm)}>
              <div className="text-black flex items-center justify-between gap-4 flex-wrap">
                <div className='p-2 flex-1'>
                  <div className="p-2 mx-3">
                    <Input
                      label="ID"
                      placeholder="id"
                      type="text"
                      {...register('id', {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="p-2 mx-3">
                    <Input
                      label="SOFTWARE:"
                      placeholder="software"
                      type="text"
                      {...register('software', {
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div className='p-2 mt-3'>
                  <div className="mx-3 px-1 pt-2 ">
                    <Input
                      label="VERSION:"
                      placeholder="version"
                      type="text"
                      {...register('version', {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="p-2 mx-3">
                    <Input
                      label="NUMBER OF ASSIGN:"
                      placeholder="Number of Assigns"
                      type="text"
                      {...register('assign', {
                        required: true,
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className='flex-1'>
                <div className="p-2 text-center">
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    {softwareId ? 'Update' : 'Submit'}
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
