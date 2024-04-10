import React from 'react';
import { IoClose } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { PiPhoneThin } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import {  useNavigate } from 'react-router-dom';

const EmployeeDetails = ({ onClose, employee }) => {
  const navigate = useNavigate();

  // Function to handle click on "Details" button
  const handleDetailsClick = () => {
    // Redirect to the profile page of the selected employee
    navigate(`/dashboard/employeeData/${employee.id}`);
  };

  return (
    <>
      <div className="fixed inset-0 top-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center">
        <div className="bg-gray-200 rounded-lg shadow-lg p-6 max-w-lg w-full relative">
          <button
            className="absolute top-2 right-2 text-red-400 text-xl hover:text-red-800"
            onClick={onClose}
          >
            <IoClose />
          </button>

          {/* Render employee details */}
          {employee && (
            <div className="text-black text-center">
              <div className='rounded-full  flex items-center justify-center mx-auto bg-white h-12 w-12'>
                {employee.full_name.charAt(0).toUpperCase()}
              </div>
              <div className='mt-2'> {employee.full_name}</div>

              <div className='flex items-center justify-center gap-4 flex-wrap mt-3'>
                <div className='flex items-center justify-center gap-1'>
                  <div className='font-light'><CiMail /></div>
                  <h1 className='font-extralight'> {employee.email}</h1>
                </div>
                <div className='flex items-center justify-center gap-1'>
                  <div className='font-light'><PiPhoneThin /></div>
                  <h1 className='font-extralight'> {employee.phone}</h1>
                </div>
                <div className='flex items-center justify-center gap-1'>
                  <div className='font-thin'><CiLocationOn /></div>
                  <h1 className='font-extralight'> {employee.location}</h1>
                </div>
              </div>
            </div>
          )}
          <div className='mt-6 flex items-center justify-center gap-3'>
            <div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                onClick={onClose} // Close the modal
              >
                Close
              </button>
            </div>
            <div>
              {/* Call handleDetailsClick when "Details" button is clicked */}
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleDetailsClick}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
