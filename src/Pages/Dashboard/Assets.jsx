import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../Components/Dashboard/Layout";
// import Input from "../../Components/Input";
import { IoAddOutline } from "react-icons/io5";
import AssetsForm from "../../Components/Dashboard/AssetsData/AssetsForm";
import axios from "axios";
import { useSortBy, useTable, usePagination,  } from "react-table";
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { MdFilterList } from "react-icons/md";

``

const Assets = () => {
  const [assets, setAssets] = useState([]); // state for managing the data
  const [assetID, setAssetID] = useState(null); // State for selected asset to be updated
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);


  // function for getting the values from the server
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Assets");
      console.log(res)
      setAssets(res.data);
    } catch (error) {
      console.log("Error getting the response from the server", error);
    }
  };

  // function for handling the post and put request
  const handleForm = async (data) => {
    try {
      if (assetID) {
        const response = await axios.put(`http://localhost:3000/Assets/${assetID.id}`, data);
        if (response.status === 200) {
          // Data successfully updated
          fetchData();
          setAssetID(null);
          setEditForm(false);
        } else {
          console.log("Error updating the asset:", response);
        }
      } else {
        // Proceed with creating a new asset
        const existingEmployee = assets.find((asset) => asset.emp_Id === data.emp_Id);
        if (existingEmployee) {
          alert("A user with the same ID already exists. Please choose a different ID.");

        } else {
          const response = await axios.post("http://localhost:3000/Assets", data);
          if (response.status === 201) {
            // Data successfully created
            fetchData();
            setAssetID(null);
            setAddForm(false);
          } else {
            console.log("Error creating the asset:", response);
          }
        }
      }
    } catch (error) {
      console.log("Error submitting the form", error);
    }
  };
  // function for editing the entity
  const handleEdit = (asset) => {
    setAssetID(asset);
    setEditForm(true);
  };

  const handleDelete = async () => {
    try {
      if (assetID) {
        await axios.delete(`http://localhost:3000/Assets/${assetID.id}`);
        fetchData();
        setDeleteForm(false);
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };
  const handleDeleteConfirmation = (asset) => {
    setAssetID(asset);
    setDeleteForm(true);
  };

  // Table
  const columns = useMemo(() => {
    if (assets.length === 0) {
      // Return placeholder columns or default column structure when no data is available
      return [
        {
          Header: "EMP_ID",
          accessor: "empId",
        },
        {
          Header: "EMP_NAME",
          accessor: "empName",
        },
        {
          Header: "S.NO",
          accessor: "num",
        },
        {
          Header: "PROCESSOR",
          accessor: "processor",
        },
        {
          Header: "OS",
          accessor: "os",
        },
        {
          Header: "LICENSE",
          accessor: "license",
        },
        {
          Header: "UPDATE",
          accessor: "update",
        },
        {
          Header: "BRAND",
          accessor: "brand",
        },
        {
          Header: "EXPIRY",
          accessor: "expiry",
        },
      ];
    } else {
      // Return columns based on actual data

      return Object.keys(assets[0] || {})
        .filter((key) => key !== "id")
        .map((key) => ({
          Header: key.toUpperCase(),
          accessor: key,
        }));
    }
  }, [assets]);
  // for adding the action buttons
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((prev) => [
      ...prev,
      {
        id: "action",
        Header: "Action",
        Cell: ({ row }) => (
          <div className="">
            <button
              className="px-1 p-1 text-blue-400"
              onClick={() => handleEdit(row.original)}
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
      data: assets,
      initialState: { pageIndex: 0, pageSize: 10 }, // Initial page index
    },
    useSortBy,
    tableHooks,
    usePagination ,    //  usePagination hook
          
  );


  // filter


  return (
    <Layout>
      <div className="flex overflow-auto border-b">
        <div className="w-full overflow-hidden">
          <div className="m-4 ">
            <h1 className="text-2xl font-primary mx-1 font-medium ">Assets</h1>
            <h2 className="uppercase text-[15px] mx-1 mb-2 ">
              Dashboard / Assets
            </h2>
          </div>
        </div>
        <div className="m-4 pt-1 flex items-center gap-1 ">
          <button className=" inline-flex rounded-lg px-3 py-2 text-black  hover:bg-gray-200  items-center justify-center gap-1"
         >
            <span className="py-[5px]">
              <MdFilterList className="text-[20px]" />
            </span>
            <p className="font-light">Filters</p>
          </button>
        
          {/* {
           filter && (
            <div className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
             

              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              
              </div>
              
          
              </div>
              </div>
          )
          } */}
          
          

          {/* ADD button */}
          <button
            className="rounded-xl py-[10px] bg-gray- text-black px-2  hover:bg-gray-200 flex"
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

      <div className="">
        <div className="container mx-auto w-full p-2 ">
          {/* Table Component */}

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

          {addForm && (
            <AssetsForm
              onSubmit={handleForm}
              onClose={() => setAddForm(false)}
            />
          )}
          {editForm && (
            <AssetsForm
              onSubmit={handleForm}
              intialvalue={assetID} // Pass the selected asset data to the form
              onClose={() => setEditForm(false)}
            />
          )}
        </div>
      </div>

      {deleteForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg">
            <p>Are you sure you want to delete this asset?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setDeleteForm(false)} // Close delete confirmation
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete} // Call handleDelete directly
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Assets;
