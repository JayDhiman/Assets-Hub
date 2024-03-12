import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";




const AssetsTable = ({ assets, onEdit, onDelete}) => {

  
  

  return (
    <div className="mt-12 overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-[14px] text-gray-700 uppercase bg-gray-100">
          <tr>

            <th className="p-2 px-3 m-4">CPU</th>
            <th className="p-2 px-3 m-4">OS</th>
            <th className="p-2 px-3 m-4">LICENSE</th>
            <th className="p-2 px-3 m-4">UPDATE</th>
            <th className="p-2 px-3 m-4">BRAND</th>
            <th className="p-2 px-3 m-4">EXPIRY</th>
            <th className="p-2 px-3 m-4">DETAILS</th>
            <th className="p-2 px-3 m-4">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
        {assets.map((asset,index) => (
            <tr key={index} className="bg-gray-200 hover:bg-blue-100">
              <td className="p-2 px-3 m-4">{asset.cpu}</td>
              <td className="p-2 px-3 m-4">{asset.os}</td>
              <td className="p-2 px-3 m-4">{asset.license}</td>
              <td className="p-2 px-3 m-4">{asset.update}</td>
              <td className="p-2 px-3 m-4">{asset.brand}</td>
              <td className="p-2 px-3 m-4">{asset.expiry}</td>
              <td className="p-2 px-3 m-4">{asset.details}</td>

              {/* Table data cells */}
              <td className="p-2 px-3 m-4">
                
                {/* Update button */}
                <button
                className="text-lg px-1 text-blue-500" 
                 onClick={() => onEdit(asset)}>
                  <RxUpdate className="hover:scale-110 transition duration-200" />
                </button>
                
                {/* Delete button */}
                <button 
                className="text-lg px-1 text-red-500" 
                onClick={() => onDelete(asset)}>
                  <MdOutlineDelete className="hover:scale-110 transition duration-200" />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      

    </div>
  );
};

export default AssetsTable;



// import React, {  useMemo } from 'react'
// import { useTable } from 'react-table';
// import { MdOutlineDelete } from "react-icons/md";
// import { RxUpdate } from "react-icons/rx";


// const AssetsTable = ({ assets, onEdit, onDelete }) => {
//   const columns = useMemo(() => [
  
//     {
//       Header: 'CPU',
//       accessor: 'cpu',
//     },
//     {
//       Header: 'OS',
//       accessor: 'os',
//     },
//     {
//       Header: 'LICENSE',
//       accessor: 'license',
//     },
//     {
//       Header: 'UPDATE',
//       accessor: 'update',
//     },
//     {
//       Header: 'BRAND',
//       accessor: 'brand',
//     },
//     {
//       Header: 'EXPIRY',
//       accessor: 'expiry',
//     },
//     {
//       Header: 'DETAILS',
//       accessor: 'details',
//     },
//     {
//       Header: 'ACTIONS',
//       accessor: 'ACTIONS',
//       Cell: row => (
//         <>
//           <button onClick={() => onEdit(row.original)}><RxUpdate/></button>
//           <button onClick={() => onDelete(row.original)}><MdOutlineDelete/></button>
//         </>
//       ),
//     },
//   ], [onEdit, onDelete]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({ columns, data: assets });

//   return (
//     <div className='mt-12 overflow-auto'>
//       <table {...getTableProps()} className='w-full text-sm text-left rtl:text-right text-gray-500 '>
//         <thead className='text-[14px] text-gray-700 uppercase bg-gray-100 '>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()} className=' '>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps()} className='p-2 px-3 m-4'>
//                   {column.render('Header')}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody {...getTableBodyProps()} className=''>
//           {rows.map(row => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()} className='bg-gray-200'>
//                 {row.cells.map(cell => (
//                   <td {...cell.getCellProps()} className='p-2 px-3 m-4'>
//                     {cell.render('Cell')}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AssetsTable;
