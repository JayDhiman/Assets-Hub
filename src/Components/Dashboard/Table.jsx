import React, { useEffect } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from 'react-table';
import { MdOutlineDelete } from 'react-icons/md';
import { FiEdit } from "react-icons/fi";
import { GrFormPreviousLink, GrFormNextLink } from 'react-icons/gr';
import { GrView } from "react-icons/gr";

const Table = ({ columns, data, handleEdit, handleDeleteConfirmation, globalFilterValue,handleView }) => {
  // Custom hook for the Action buttons to display
  const tableHook = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'action',
        Header: 'Action',
        Cell: ({ row }) => (
          <div className="p-1 lg:text-[16px] sm:text-[12px] md:text-[14px] max-sm:text-[10px] sm:p-0">
            <button className="md:px-1   text-blue-400 max-sm:px-0" onClick={() => handleEdit(row.original)}>
              <FiEdit />
            </button>
            <button className="text-red-500 md:px-1 " onClick={() => handleDeleteConfirmation(row.original)}>
              <MdOutlineDelete />
            </button>
            {/* Conditional rendering of handleView */}
            {row.original.hasOwnProperty('employee_id') && (
              <button className="md:px-1   text-cyan-900"
              onClick={() => handleView(row.original)}><GrView/></button>
            )}
          </div>
        ),
      },
    ]);
  };

  // Table instance with filters
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    state: { pageIndex },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    tableHook,
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setGlobalFilter(globalFilterValue || '');
  }, [globalFilterValue, setGlobalFilter]);

  return (
    <>
      <div className="w-auto h-auto m-2 overflow-y-scroll overflow-auto ">
        <div className="mt-1 p overflow-auto ">
          <table
            {...getTableProps()}
            className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 rounded-lg overflow-auto shadow-xl"
          >
            {/* Table header */}
            <thead className="text-[14px] text-gray-700 uppercase bg-gray-100 border-b border-gray-200 text-center max-sm:text-[12px]">
              {headerGroups.map((headerGroup, index) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className={index % 2 === 0 ? 'bg-gray-300' : ''}
                  key={index}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="p-2 px-3 m-4 font-semibold border-r border-gray-200"
                      key={column.id}
                    >
                      <div className="flex items-center">
                        <span>{column.render('Header')}</span>
                        {column.isSorted && (
                          <span className="ml-1">{column.isSortedDesc ? ' 🔽' : ' 🔼'}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Table body */}
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-blue-100 cursor-pointer transition-colors`}
                    key={index}
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        {...cell.getCellProps()}
                        className={`p-3 border-t border-gray-200 ${
                          cellIndex === row.cells.length - 1 ? 'border-r border-gray-200' : ''
                        }`}
                        key={cellIndex}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center m-4 gap-2">
          <button
            className="rounded-xl bg-black text-white px-6 hover:bg-gray-600 hover:text-gray-100"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <GrFormPreviousLink
              className={`h-6 w-6 ${!canPreviousPage && 'opacity-50 cursor-not-allowed '}`}
            />
          </button>
          <span>
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            className="rounded-xl bg-black text-white px-6 hover:bg-gray-600 hover:text-white-100"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <GrFormNextLink className={`h-6 w-6 ${!canNextPage && 'opacity-50 cursor-not-allowed'}`} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
