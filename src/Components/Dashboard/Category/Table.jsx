import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const Table = ({assets ,onEdit,onDelete}) => {
  return (
    <>
       <div className="mt-12 overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-[14px] text-gray-700 uppercase bg-gray-100">
          <tr>

            <th className="p-2 px-3 m-4">MACHINE</th>
            <th className="p-2 px-3 m-4">TOTAL</th>
            <th className="p-2 px-3 m-4 uppercase">Assigned</th>
            <th className="p-2 px-3 m-4">ACTIONS</th>

           
          </tr>
        </thead>
        <tbody>
         

  
    {assets.map((asset, index) => (
   
      <tr key={index} className='bg-gray-200 hover:bg-blue-100'>

      <td className='p-2 px-3 m-4'>{asset.Machines}</td>
      <td className='p-2 px-3 m-4'>{asset.Count} </td>
      <td className='p-2 px-3 m-4'>{asset.Assigned}</td>
    <td className='p-2 px-3 m-4'>
    <button 
           onClick={() => onEdit(asset)}
           className="text-lg px-1 text-blue-500">
            <RxUpdate className="hover:scale-110 transition duration-200" />
          </button>
          <button
            onClick={()=>onDelete(asset)}
            className="text-lg px-1 text-red-500">
            <MdOutlineDelete className="hover:scale-110 transition duration-200" />
          </button>
        </td>
  
  </tr>
    ))}
  
    
   

    


        </tbody>
      </table>
      
    </div>
    </>
  )
}

export default Table