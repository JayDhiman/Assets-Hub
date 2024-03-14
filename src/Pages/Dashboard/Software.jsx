    import React, { useState, useEffect, useMemo } from "react";
    import Layout from "../../Components/Dashboard/Layout";
    import Input from "../../Components/Input";
    import { IoAddOutline } from "react-icons/io5";
    import SoftwareForm from "../../Components/Dashboard/Software/SoftwareForm";
    import { useSortBy, useTable, usePagination } from "react-table"; // Import usePagination
    import axios from "axios";
    import { MdOutlineDelete } from "react-icons/md";
    import { RxUpdate } from "react-icons/rx";
    import { GrFormPreviousLink } from "react-icons/gr";
    import { GrFormNextLink } from "react-icons/gr";

    const Software = () => {
      const [softwareData, setSoftwareData] = useState([]); // state for managing the data
      const [dataID, setDataID] = useState(null);
      const [addForm, setAddForm] = useState(false);
      const [updateForm, setUpdateForm] = useState(false);
      const [deleteForm, setDeleteForm] = useState(false);

      useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:4000/Software");
          setSoftwareData(res.data);
        } catch (error) {
          console.log(error, "Error fetching the data from the server");
        }
      };

      const handleRequestSubmit = async (data) => {
        try {
          if (dataID) {
            await axios.put(`http://localhost:4000/Software/${dataID.id}`, data);
            setUpdateForm(false);
          } else {
            await axios.post(`http://localhost:4000/Software`, data);
            setAddForm(false);
          }
          fetchData();
          setDataID(null);
        } catch (error) {
          console.log("Error updating /adding the data", error);
        }
      };

      const handleEdit = (asset) => {
        setDataID(asset);
        setUpdateForm(true);
      };

      const handleDelete = async () => {
        try {
          if (dataID) {
            await axios.delete(`http://localhost:4000/Software/${dataID.id}`);
            fetchData(); // Fetch data after successful deletion
            setDeleteForm(false); // Close the delete confirmation popup
          }
        } catch (error) {
          console.error("Error deleting data:", error);
        }
      };

      const handleDeleteConfirmation = (asset) => {
        setDataID(asset); // Set the asset to delete
        setDeleteForm(true); // Show the delete confirmation popup
      };

      // Columns for table
      const columns = useMemo(() => {
        if (softwareData.length === 0) {
          return [
            {
              Header: "SOFTWARE",
              accessor: "software",
            },
            {
              Header: "VERSION",
              accessor: "version",
            },
            {
              Header: "ASSIGNED",
              accessor: "assign",
            },
          ];
        } else {
          return Object.keys(softwareData[0] || {})
            .filter((key) => key !== "id")
            .map((key) => ({
              Header: key.toUpperCase(),
              accessor: key,
            }));
        }
      }, [softwareData]);

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
                  className="px-1 p-1 text-blue-400 text-lg hover:scale-110 duration-200 transition"
                  onClick={() => handleEdit(row.original)}
                >
                  <RxUpdate />
                </button>

                <button
                  className="text-red-500 text-lg hover:scale-110 duration-200 transition"
                  onClick={() => handleDeleteConfirmation(row.original)}
                >
                  <MdOutlineDelete />
                </button>
              </div>
            ),
          },
        ]);
      };

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
        state: { pageIndex },
      } = useTable(
        {
          columns,
          data: softwareData,
          initialState: { pageIndex: 0, pageSize: 10 }, // Initial page index
        },
        tableHook,
        useSortBy,
        usePagination //  usePagination hook
      );

      return (
        <Layout>
          <div className=" overflow-hidden">
            <div className="flex items-center justify-between border-b m-1 p-1">
              <div className="m-1 ">
                <h1 className="text-2xl font-primary mx-1 font-medium mt-1">
                  Software
                </h1>
                <h2 className="uppercase text-[15px] mx-1 mb-2 ">
                  Dashboard / Software
                </h2>
              </div>
              <div className="m-1 pt-1">
                <button
                  className="rounded-xl py-[10px] bg-stone-800 text-white px-8  hover:bg-stone-950 flex"
                  onClick={() => {
                    setAddForm(true);
                  }}
                >
                  <span className="text-2xl px-1">
                    <IoAddOutline />
                  </span>
                  <span className="max-sm:hidden text-[15px]">ADD</span>
                </button>
              </div>
            </div>
            <div className="container mx-auto w-full p-2 ">
              {/* table */}
              <div className="w-auto h-auto m-2 overflow-y-scroll ">
                <div className="mt-1 overflow-auto ">
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
                              className="p-2 px-2 m-2 font-semibold border-r border-gray-200"
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
                <div className="flex justify-center m-4 gap-2 mb-2">
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

              {addForm && (
                <SoftwareForm
                  onSubmit={handleRequestSubmit}
                  onClose={() => setAddForm(false)}
                />
              )}
              {updateForm && (
                <SoftwareForm
                  onSubmit={handleRequestSubmit}
                  initialValue={dataID}
                  onClose={() => setUpdateForm(false)}
                />
              )}
              {deleteForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                  <div className="bg-white p-4 rounded-lg">
                    <p>Are you sure you want to delete this asset?</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setDeleteForm(false)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Layout>
      );
    };

    export default Software;
