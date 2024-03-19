import React from 'react'
import { useSortBy, useTable,usePagination } from "react-table";
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";


const Table = ({columns,data,handleEdit,handleDeleteConfirmation}) => {
   // Custom hook for the Action buttons to display
   const tableHook = (hook) => {
    hook.visibleColumns.push((prev) => [
      ...prev,
      {
        id: "action",
        Header: "Action",
        Cell: ({ row }) => (
          <div className="">
            <button
              className="px-1 p-1 text-blue-400"
              onClick={() => handleEdit(row.original)} // Pass only the ID
            >
              <RxUpdate />
            </button>
  
            <button
              className="text-red-500"
              onClick={() => handleDeleteConfirmation(row.original)}
            >
              <MdOutlineDelete />
            </button>
          </div>
        ),
      },
    ]);
  };

  // form data
  const { 
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of `rows`, we'll use `page`
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    state: { pageIndex } 
  } = useTable({ 
    columns,
    data,
    initialState: { pageIndex: 0, pageSize: 10 }, // Initial page index
   },
     tableHook,
     useSortBy,
     usePagination);

  return (
   <>

<div className="w-auto h-auto m-2 overflow-y-scroll ">
            <div className="mt-1 p overflow-auto ">
              <table
                {...getTableProps()}
                className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-200 rounded-lg overflow-hidden shadow-xl"
              >
                <thead className="text-[14px] text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
                  {headerGroups.map((headerGroup, index) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      className={index % 2 === 0 ? "bg-gray-300" : ""}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="p-2 px-3 m-4 font-semibold border-r border-gray-200"
                        >
                          <div className="flex items-center">
                            <span>{column.render("Header")}</span>
                            {column.isSorted && (
                              <span className="ml-1">
                                {column.isSortedDesc ? " 🔽" : " 🔼"}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-blue-100 cursor-pointer transition-colors`}
                      >
                        {row.cells.map((cell, cellIndex) => (
                          <td
                            {...cell.getCellProps()}
                            className={`p-3 border-t border-gray-200 ${
                              cellIndex === row.cells.length - 1
                                ? "border-r border-gray-200"
                                : ""
                            }`}
                          >
                            {cell.render("Cell")}
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
                className={`h-6 w-6 ${
                  !canPreviousPage && "opacity-50 cursor-not-allowed "
                }`}
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
              <GrFormNextLink
                className={`h-6 w-6 ${
                  !canNextPage && "opacity-50 cursor-not-allowed"
                }`}
              />
            </button>
          </div>
          </div>
   </>
  )
}

export default Table