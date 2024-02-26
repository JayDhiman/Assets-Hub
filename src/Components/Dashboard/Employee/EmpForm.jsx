import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../Input';

const EmpForm = ({onClose}) => {
  const { register, handleSubmit } = useForm();
  const handleForm = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30 ">
       

          <button
            className=" fixed top-5 right-[27vw] text-red-400  text-xl hover:text-red-800"
            onClick={onClose}>
            X
          </button>
          <div className='flex justify-center items-center flex-wrap '>

          
          <div className="bg-gray-50 rounded-lg shadow-lg p-6 mt-12 ">
          <div className=''>
            <h1 className='text-center font-primary font-semibold text-xl my-2 pt-2'>ADD Employee</h1>
            </div>
          
      
          <form onSubmit={handleSubmit(handleForm)}>
          
            <div className="text-black flex items-center justify-between gap-4 flex-wrap">

           
              <div className='p-2 flex-1'>
              {/* <div className='flex gap-4'> */}
              
              <div className="p-2 mx-3">
                <Input
                  label="CPU:"
                  placeholder="Enter CPU"
                  type="text"
                  {...register('cpu', {
                    required: true,
                  })}
                />
              </div>

              <div className="p-2 mx-3">
                <Input
                  label="OS:"
                  placeholder="Enter OS"
                  type="text"
                  {...register('OS', {
                    required: true,
                  })}
                />
              </div>
              {/* </div> */}



              
              {/* <div className='flex items-center justify-center gap-4'> */}

              <div className="mx-3 px-1 pt-2 ">
                <Input
                  label="LICENSE:"
                  placeholder="Enter License"
                  type="text"
                  {...register('LICENSE', {
                    required: true,
                  })}
                />
              </div>
              </div>

              <div className='p-2 mt-3'> 

             

              <div className="p-2 mx-3">
                <Input
                  label="UPDATE:"
                  placeholder="Enter Update"
                  type="text"
                  {...register('UPDATE', {
                    required: true,
                  })}
                />
              </div>
              {/* </div> */}

                    {/* <div className="flex gap-4"> */}

                  
              <div className="p-2 mx-3">
                <Input
                  label="BRAND:"
                  placeholder="Enter Brand"
                  type="text"
                  {...register('BRAND', {
                    required: true,
                  })}
                />
              </div>

              <div className="p-2 mx-3">
                <Input
                  label="EXPIRY:"
                  placeholder="Enter Expiry"
                  type="text"
                  {...register('EXPIRY', {
                    required: true,
                  })}
                />
              </div>
              </div>
              {/* </div> */}
           
            </div>
            <div className='flex-1'>

                   
<div className="p-2 mx-3">
  <Input
    label="DETAILS:"
    placeholder="Enter Details"
    type="text"
    {...register('DETAILS', {
      required: true,
    })}
  />
</div>

<div className="p-2 text-center">
  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
    Submit
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

export default EmpForm;
