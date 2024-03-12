import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const Table = ({data ,onEdit,onDelete}) => {
  return (
    <>
    <div className="mt-12 overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-[14px] text-gray-700 uppercase bg-gray-100">
          <tr>

            <th className="p-2 px-3 m-4 uppercase">Software</th>
            <th className="p-2 px-3 m-4 uppercase">Version</th>
            <th className="p-2 px-3 m-4 uppercase">Assigned</th>
            <th className="p-2 px-3 m-4 uppercase">ACTIONS</th>

           
          </tr>
        </thead>
        <tbody>
         

  
    {data.map((asset) => (
   
      <tr key= {asset.id} className='bg-gray-200 hover:bg-blue-100'>

      <td className='p-2 px-3 m-4'>{asset.Software}</td>
      <td className='p-2 px-3 m-4'>{asset.Version} </td>
      <td className='p-2 px-3 m-4'>{asset.Assign}</td>
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
  
    
   

    


      
