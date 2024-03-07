import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

const Table = ({apiData}) => {
  return (
    <>
       <div className="mt-12 overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-[14px] text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="p-2 px-3 m-4">ID</th>
            <th className="p-2 px-3 m-4">MACHINE</th>
            <th className="p-2 px-3 m-4">TOTAL</th>
            <th className="p-2 px-3 m-4 uppercase">Assigned</th>
            <th className="p-2 px-3 m-4">ACTIONS</th>

           
          </tr>
        </thead>
        <tbody>
          {/* {assets.map((asset,index) => (
            <tr key={index} className="bg-gray-200 hover:bg-blue-100">
              <td className="p-2 px-3 m-4">{asset.id}</td>
              <td className="p-2 px-3 m-4">{asset.cpu}</td>
              <td className="p-2 px-3 m-4">{asset.os}</td>
              <td className="p-2 px-3 m-4">{asset.license}</td>
              <td className="p-2 px-3 m-4">{asset.update}</td>
              <td className="p-2 px-3 m-4">{asset.brand}</td>
              <td className="p-2 px-3 m-4">{asset.expiry}</td>
              <td className="p-2 px-3 m-4">{asset.details}</td>
              <td className="p-2 px-3 m-4">
                <button 
                 onClick={() => handleUpdate(asset.id)}
                 className="text-lg px-1 text-blue-500">
                  <RxUpdate className="hover:scale-110 transition duration-200" />
                </button>
                <button
                  onClick={()=>handleDelete(asset.id)}
                  className="text-lg px-1 text-red-500">
                  <MdOutlineDelete className="hover:scale-110 transition duration-200" />
                </button>
              </td>
            </tr>
          ))} */}

  
    
    <tr  className='bg-gray-200 hover:bg-blue-100'>
    <td className='p-2 px-3 m-4'></td>
    <td className='p-2 px-3 m-4'></td>
    <td className='p-2 px-3 m-4'> </td>
    <td className='p-2 px-3 m-4'></td>
  <td className='p-2 px-3 m-4'>
  <button 
         onClick={() => handleUpdate(asset.id)}
         className="text-lg px-1 text-blue-500">
          <RxUpdate className="hover:scale-110 transition duration-200" />
        </button>
        <button
          onClick={()=>handleDelete(asset.id)}
          className="text-lg px-1 text-red-500">
          <MdOutlineDelete className="hover:scale-110 transition duration-200" />
        </button>
      </td>

</tr>

    


        </tbody>
      </table>
      
    </div>
    </>
  )
}

export default Table