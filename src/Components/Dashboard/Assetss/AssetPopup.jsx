import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoClose } from "react-icons/io5";


const AssetPopup = ({Asset,handleClose}) => {
    const navigate =  useNavigate()

    const handleDetails = () => {
        navigate(`/dashboard/assets/${Asset.id}`)
    }
  return (
    <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center">
    <div className="bg-gray-400 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
    <button
  className="absolute top-2 right-2 text-red-400 text-xl hover:text-red-800"
  onClick={handleClose} 
>
  <IoClose />
</button>



      {/* Render employee details */}
      { Asset && 

      (
        <div className="text-black text-center">
          {/* <div className='rounded-full  flex items-center justify-center mx-auto bg-white h-12 w-12'>

          </div> */}
          <div className='mt-2'> {Asset.assetName}</div>

          <div className='flex items-center justify-center gap-4 flex-wrap mt-3'>
            <div className='flex items-center justify-center gap-1'>
             
              <h1 className='font-extralight'> <span className='font-light'>Status:</span> {Asset.status}</h1>
            </div>
            <div className='flex items-center justify-center gap-1'>

              {/* <h1 className='font-extralight'> {Software.status}</h1> */}
            </div>
            <div className='flex items-center justify-center gap-1'>

              <h1 className='font-extralight'>  <span className='font-light'>Category:</span> {Asset.assetCategory}</h1>
            </div>
          </div>
        </div>
      )}
      <div className='mt-6 flex items-center justify-center gap-3'>
        <div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleClose} // Close the modal
          >
            Close
          </button>
        </div>
        <div>
          {/* Call handleDetailsClick when "Details" button is clicked */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={handleDetails}
          >
            Details
          </button>

        </div>
      
      </div>
    </div>
  </div>
  )
}

export default AssetPopup