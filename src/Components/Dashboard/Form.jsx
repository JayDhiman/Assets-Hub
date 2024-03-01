import React from 'react'

const Form = () => {

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        
      };
  return (
    <>
     <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30">
        <button>
          X
        </button>
        <div className='flex justify-center items-center flex-wrap  mt-12 pt-12'>
          <div className="bg-gray-50 rounded-lg shadow-lg p-6 mt-12 ">
            <div className=''>
              <h1 className='text-center font-primary font-semibold text-xl my-2 pt-2'> {softwareId ? 'Update Software' : 'Add Software'}</h1>
            </div>
            <form onSubmit={handleFormSubmit}>
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
  )
}

export default Form