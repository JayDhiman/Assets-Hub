import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import Delete from './Crud/Delete'
import AssetsForm from "./AssetsForm";

//setData and Data are the Props receving form the Parent component that is Assets so that this comppnent have the acces to the data
const AssetsTable = ({ data, setData }) => {
  const [deleteModel, setDeleteModel] = useState(false); //I have added the state to conditonally render the popup
  const [assetIdToDelete, setAssetIdToDelete] = useState(null); // to get the id of Particular row
  const [assetsIdToUpdate, setAssetsIdToUpdate] = useState(null); // to get the Id of Selected Row

  const columns = useMemo(() => {
    return [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "CPU",
        accessor: "cpu",
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
      {
        Header: "DETAILS",
        accessor: "details",
      },
      {
        Header: "ACTIONS",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => {
                setAssetsIdToUpdate(row.original.id);
              }}
              className="text-lg px-1 text-blue-500"
            >
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
    ];
  }, []);

  useEffect(() => {

    // fetch the Data
    const fetchAssetData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Assets");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAssetData();
  }, []);

  // const handleUpdate = (id) => {
  //   setAssetsIdToUpdate(id);
  // };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
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
                      <span>{column.render("Header")}</span>
                      {column.isSorted && (
                        <span className="ml-1">
                          {column.isSortedDesc ? (
                            <FaLongArrowAltUp />
                          ) : (
                            <FaLongArrowAltDown />
                          )}
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
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className="p-2 px-3 m-4 ">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {deleteModel && (
          <div>
            <Delete
              id= {assetIdToDelete}
              setDeleteModel={setDeleteModel}
              setData={setData}
            />
          </div>
        )}

        {assetsIdToUpdate && (
          <AssetsForm
            initialData={data.find((asset) => asset.id === assetsIdToUpdate)}
            setData={setData}
            onClose={() => setAssetsIdToUpdate(null)} // Close the form after submission
          />
        )}
      </div>
    </>
  );
};

export default AssetsTable;
