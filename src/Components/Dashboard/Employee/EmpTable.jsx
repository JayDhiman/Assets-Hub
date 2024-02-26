import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';

const EmpTable = () => {
const [data , setData ] = useState([])


const columns = useMemo(()=>{
    return [ 
       {
           Header: 'ID',
           accessor: 'id',
       },
       {
           Header: 'CPU',
           accessor: 'CPU',
       },
       {
           Header: 'OS',
           accessor: 'OS',
       },
       {
           Header: 'LICENSE',
           accessor: 'LICENSE',
       },
       {
           Header: 'UPADTE',
           accessor: 'UPADTE',
       },
       {
           Header: 'BRAND',
           accessor: 'BRAND',
       },
       {
           Header: 'EXPIRY',
           accessor: 'EXPIRY',
       },
       {
           Header: 'DETAILS',
           accessor: 'DETAILS',
       },
   ];
},[]);


useEffect(() => {
    try {
        const fetchEmpData = async () => {
            const response = await axios.get("http://localhost:8000/employee");
            setData(response.data);
        };
        fetchEmpData();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}, []);


const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });
  return (
    <>
        <div className='mt-12 overflow-auto'>
            <table {...getTableProps()} className='w-full text-sm text-left rtl:text-right text-gray-500 '>
                <thead className='text-[14px] text-gray-700 uppercase bg-gray-100 '>
                {headerGroups.map((headerGroup)=>(
                    <tr { ...headerGroup.getHeaderGroupProps()} className=' '>
                        {headerGroup.headers.map((column)=>(
                            <th {...column.getHeaderProps()} className='p-2 px-3 m-4'>
                                {column.render('Header')}
                                 </th>
            
            ))}

                    </tr>
                ))}
                </thead>

                      

                <tbody {...getTableBodyProps()} className=''>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className='bg-gray-200 '>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} className='p-2 px-3 m-4'>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}

                </tbody>

            </table>


        </div>
    </>
  )
}

export default EmpTable