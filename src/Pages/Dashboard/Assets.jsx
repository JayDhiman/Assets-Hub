import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../Components/Dashboard/Layout';
import Input from '../../Components/Input';
import { IoAddOutline } from 'react-icons/io5';
import AssetsForm from '../../Components/Dashboard/AssetsData/AssetsForm';
import axios from 'axios';
import { useSortBy, useTable } from 'react-table';
import { MdOutlineDelete } from 'react-icons/md';
import { RxUpdate } from 'react-icons/rx';

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
      const res = await axios.get('http://localhost:3000/Assets');
      setAssets(res.data);
    } catch (error) {
      console.log('Error getting the response from the server', error);
    }
  };

  // function for handling the post and put request
  const handleForm = async (data) => {
    try {
      if (assetID) {
        await axios.put(`http://localhost:3000/Assets/${assetID.id}`, data);
        setEditForm(false);
      } else {
        await axios.post('http://localhost:3000/Assets', data);
        setAddForm(false);
      }
      fetchData();
      setAssetID(null);
    } catch (error) {
      console.log('Error submitting the form', error);
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
        fetchData(); // Fetch assets after successful deletion
        setDeleteForm(false); // Close the delete confirmation popup
      }
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const handleDeleteConfirmation = (asset) => {
    setAssetID(asset); // Set the asset to delete
    setDeleteForm(true); // Show the delete confirmation popup
  };

  // Table
  const columns = useMemo(
    () =>
      Object.keys(assets[0] || {}).map((key) => ({
        Header: key.toUpperCase(),
        accessor: key,
      })),
    [assets]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'action',
        Header: 'Action',
        Cell: ({ row }) => (
          <div className="">
            <button
              className="px-1 p-1 text-blue-400"
              onClick={() => handleEdit(row.original)}
            >
              <RxUpdate />
            </button>

            <button className="text-red-500" onClick={() => handleDeleteConfirmation(row.original)}>
              <MdOutlineDelete />
            </button>
          </div>
        ),
      },
    ]);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: assets,
    },
    useSortBy,
    tableHooks
  );

  return (
    <Layout>
      <div className="flex overflow-auto">
        <div className="w-full overflow-hidden">
          <div className="m-4 border-b">
            <h1 className="text-2xl font-primary mx-1 font-medium ">Assets</h1>
            <h2 className="uppercase text-[15px] mx-2 mb-2 ">Dashboard / Assets</h2>
          </div>
        </div>
      </div>

      <div className="">
        <div className="container mx-auto w-full p-2 ">
          <div className="flex items-center flex-wrap gap-4 w-full">
            <div className="mx-2 max-md:w-full flex-1">
              <Input placeholder={'Search here'} />
            </div>

            <div className="">
              <button
                className="rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950 flex"
                onClick={() => {
                  setAddForm(true);
                }}
              >
                <span className="text-2xl px-1">
                  <IoAddOutline />
                </span>
                <span className="max-sm:hidden">ADD</span>
              </button>
            </div>
          </div>

           {/* Table Component */}

          <div className="w-auto h-auto mx-3">
            <div className="mt-12 overflow-auto">
              <table
                {...getTableProps()}
                className="w-full text-sm text-left rtl:text-right text-gray-500 "
              >
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
                                {column.isSortedDesc ? ' 🔽' : ' 🔼'}
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
                      <tr
                        {...row.getRowProps()}
                        className="bg-gray-200 hover:bg-blue-100"
                      >
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
            </div>
          </div>



          {addForm && <AssetsForm onSubmit={handleForm} onClose={() => setAddForm(false)} />}
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
