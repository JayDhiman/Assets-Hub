import React, { useState, useEffect, useMemo, useRef } from "react";
import Layout from "../../Components/Dashboard/Layout";
// import Input from "../../Components/Input";
import { IoAddOutline } from "react-icons/io5";
import Form from "../../Components/Dashboard/Form";
import Table from "../../Components/Dashboard/Table";
import Input from "../../Components/Input";
import { MdFilterList } from "react-icons/md";
import axios from "axios";

const Software = () => {

  const [softwareData, setSoftwareData] = useState([]); // state for managing the data
  const [dataID, setDataID] = useState(null);
  const [addForm, setAddForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null); // State to store the selected column for filtering
  const [filter, setFilter] = useState(false); // State to manage filter dropdown visibility
  const [globalFilterValue, setGlobalFilterValue] = useState(""); // State to store the global filter value

  const filterRef = useRef(null); // Reference to filter dropdown

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Software");
      setSoftwareData(res.data);
    } catch (error) {
      console.log(error, "Error fetching the data from the server");
    }
  };


  const handleRequestSubmit = async (data) => {
    try {
      if (dataID) {
        const response = await axios.put(`http://localhost:3000/Software/${dataID.id}`, data);
        if (response.status === 200) {
          // Data successfully updated
          fetchData();
          setDataID(null);
          setUpdateForm(false);
        } else {
          console.log("Error updating the asset:", response);
        }
      } else {
        // Proceed with creating a new asset
        const existingEmployee = softwareData.find((softwaredata) => softwaredata.id === data.id);
        if (existingEmployee) {
          alert("A user with the same ID already exists. Please choose a different ID.");
        } else {
          const response = await axios.post("http://localhost:3000/Software", { ...data, id: data.emp_id });
          if (response.status === 201) {
            // Data successfully created
            fetchData();
            setDataID(null);
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

  const handleEdit = (asset) => {
    setDataID(asset);
    setUpdateForm(true);
  };

  const handleDelete = async () => {
    try {
      if (dataID) {
        await axios.delete(`http://localhost:3000/Software/${dataID.id}`);
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
          Header: "SNO",
          accessor: "id",
        },
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

  const assetFieldsConfig = [
    { name: "id", label: "ID", placeholder: "Enter ID", type: "text", required: true },
    { name: "software", label: "SOFTWARE", placeholder: "Enter SOFTWARE", type: "text", required: true },
    { name: "version", label: "VERSION", placeholder: "Enter VERSION", type: "text", required: true },
    { name: "assign", label: "ASSIGN", placeholder: "Enter ASSIGNS", type: "text", required: true },

  ]

  const handleDropdownChange = () => setFilter(!filter);

  // Handle input change for global filtering
  const handleInputChange = (e) => {

    setGlobalFilterValue(e.target.value);
  };

  // Function to toggle checkbox selection
  const handleCheckboxToggle = (column) => {
    setSelectedColumn(selectedColumn === column ? null : column); // Toggle the selected column
  };

  // Function to filter data based on selected column and global filter value
  const filteredData = useMemo(() => {
    if (!selectedColumn && !globalFilterValue) {
      return softwareData; // Return original data if no column is selected and no global filter is applied
    }

    let filtered = softwareData;

    // Apply global filter if it's active
    if (globalFilterValue) {
      filtered = filtered.filter(asset => {

        return Object.values(asset).some(value => {

          // Check if the value contains the globalFilterValue
          return value.toString().toLowerCase().includes(globalFilterValue.toLowerCase());
        });
      });
    }

    // Apply column filter if a column is selected
    if (selectedColumn) {
      filtered = filtered.filter(softwareData => {
        const columnValue = softwareData[selectedColumn.accessor]; // Get the value of the selected column

        return columnValue.toString().toLowerCase().includes(globalFilterValue.toLowerCase());
      });
    }

    return filtered;
  }, [softwareData, selectedColumn, globalFilterValue]);

  // Close the filter dropdown when user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <Layout>
      <div className=" overflow-x-hidden">
        <div className="flex justify-between items-center overflow-y border-b">
          <div className="m-2 ">
            <h1 className="md:text-2xl sm:text-xl font-primary mx-1 font-medium max-sm:text-lg">Software</h1>
            <h2 className="uppercase md:text-[15px] sm:text-[12px] mx-1 mb-2 max-sm:text-[9px]">Dashboard / Software</h2>
          </div>
          <div className="flex px-2  md:flex-nowrap">
            <div className="py-3 px-1">
              <Input
                placeholder={` Enter a Keyword...`}
                value={globalFilterValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="m-2 pt-1 flex items-center gap-1 max-sm:m-0 ">
              <div className="inline-block relative" ref={filterRef}>
                <button
                  onClick={handleDropdownChange}
                  className="inline-flex rounded-lg px-1 py-2 text-black hover:bg-gray-200  items-center justify-center gap-1"
                >
                  <span className="py-[5px]">
                    <MdFilterList className="text-[20px]" />
                  </span>
                  <p className="font-light max-sm:hidden">Filters</p>
                </button>
                {filter && (
                  <div className="absolute min-w-[18vw] z-10 mt-2 w-auto right-1  rounded-lg bg-blue-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <h1 className="mx-auto text-center font-light mt-1">Filter</h1>
                    {columns.map((column, index) => (
                      <ul className="flex items-center gap-1 px-4 p-1 hover:bg-gray-50" key={index}>
                        <li className="">
                          <Input
                            type="checkbox"
                            checked={selectedColumn === column}
                            onChange={() => handleCheckboxToggle(column)}
                          />
                        </li>
                        <li className="font-thin">{column.Header}</li>
                      </ul>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="m-2 pt-1">
              <button
                onClick={() => {
                  setAddForm(true);
                }}
                className="rounded-xl py-[10px] bg-gray- text-black px-1  hover:bg-gray-200 flex"
              >
                <span className="text-2xl px-1">
                  <IoAddOutline />
                </span>
                <span className="max-sm:hidden text-[15px]">ADD</span>
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto w-full p-2 ">
          {/* table */}
          <Table
            columns={columns}
            data={filteredData}
            handleDeleteConfirmation={handleDeleteConfirmation}
            handleEdit={handleEdit}
            globalFilterValue={globalFilterValue} />

          {addForm && (
            <Form
              fieldsConfig={assetFieldsConfig}
              onSubmit={handleRequestSubmit}
              onClose={() => setAddForm(false)}
            />
          )}
          {updateForm && (
            <Form
              fieldsConfig={assetFieldsConfig}
              onSubmit={handleRequestSubmit}
              initialValues={dataID}
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
