import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';
import SoftwareForm from './SoftwareForm';
import Deleteform from './Crud/Deleteform';

const SoftwareTable = ({ data, setData }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [deleteModel, setDeleteModel] = useState(false); //I have added the state to conditonally render the popup
    const [assetIdToDelete, setAssetIdToDelete] = useState(null); 
    const [softwareId,setSoftwareId] =useState(null)

    // const dataArray = Array.isArray(data) ? data : Object.keys(data).map(key => data[key]);

    
    // Ensure data is always an array before proceeding
   
    const columns = useMemo(() => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'VERSION',
        accessor: 'version',
      },
      {
        Header: 'SOFTWARE',
        accessor: 'software',
      },
      {
        Header: 'NUMBER OF ASSIGNS',
        accessor: 'assign',
      },
      {
        Header: 'ACTIONS',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div>
            <button onClick={() => {
              setSoftwareId(row.original.id)
              setShowUpdateForm(true);
            }
          }
            
               className="text-lg px-1 text-blue-500">
              <RxUpdate className="hover:scale-110 transition duration-200" />
            </button>
            <button
              onClick={() => {
                setAssetIdToDelete(row.original.id);
                setDeleteModel(true);
              }}
              className="text-lg px-1 text-red-500"
            >
              <MdOutlineDelete className="hover:scale-110 transition duration-200" />
            </button>
          </div>
        ),
      },
    ],[]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy);
 


  return (
    <div className="mt-6 overflow-auto m-3 p-3">
      <table {...getTableProps()} className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-[14px] text-gray-700 uppercase bg-gray-100 ">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className=" ">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-2 px-3 m-4 "
                >
                  <div className="flex items-center">
                    <span>{column.render('Header')}</span>
                    {column.isSorted && (
                      <span className="ml-1">
                        {column.isSortedDesc ? <FaLongArrowAltUp /> : <FaLongArrowAltDown />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="bg-gray-200 hover:bg-blue-100">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="p-2 px-3 m-4 ">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        </table>

      {showUpdateForm  && (
        <SoftwareForm
        onClose={() => setShowUpdateForm(false)}
        setData={setData}
        softwareId={softwareId}
        setShowUpdateForm={setShowUpdateForm}
        />
        )}

      {deleteModel && (
        <div>
            <Deleteform
              id={assetIdToDelete}
              setDeleteModel={setDeleteModel}
              setData={setData}
              />
          </div>
        )}

  

    </div>
  );
};

export default SoftwareTable;
