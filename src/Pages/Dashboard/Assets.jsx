import React, { useState, useEffect, useMemo, useRef } from "react";
import Layout from "../../Components/Dashboard/Layout";
import { IoAddOutline } from "react-icons/io5";
import Form from "../../Components/Dashboard/Form";
import axios from "axios";
import { MdFilterList } from "react-icons/md";
import Table from "../../Components/Dashboard/Table";
import Input from "../../Components/Input";

const Assets = () => {
  const [assets, setAssets] = useState([]); // state for managing the data
  const [assetID, setAssetID] = useState(null); // State for selected asset to be updated
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [categoryData,setCategoryData]=useState([])
  const [selectedColumn, setSelectedColumn] = useState(null); // State to store the selected column for filtering
  const [filter, setFilter] = useState(false); // State to manage filter dropdown visibility
  const [globalFilterValue, setGlobalFilterValue] = useState(""); // State to store the global filter value

  const filterRef = useRef(null); // Reference to filter dropdown

  const assetFieldsConfig = [
    { name: "empId", label: "EMP ID", placeholder: "Enter emp_id..", type: "number", required: "EMP ID is required",pattern: { value: /^\d+$/, message: "Invalid EMP ID" } },
    { name: "emp Name", label: "EMP NAME", placeholder: "Enter employee name...", type: "text", required: "EMP NAME is required" },
    { name: "assetId", label: "ASSET ID", placeholder: "Enter Asset id...", type: "text", required: "ASSET ID is required" },
    { name: "asset category", label: "ASSET CATEGORY", placeholder: "Enter Asset...", type:"options", options: categoryData.map(category => ({ value: category.id, label: category.name })),required: "ASSET CATEGORY is required" },
    { name: "serial number", label: "SERIAL NUMBER", placeholder: "Enter Serial_number...", type: "text", required: "SERIAL NUMBER is required" },
    { name: "processor", label: "PROCESSOR", placeholder: "Enter Processor...", type: "text", required: "PROCESSOR is required" },
    { name: "os", label: "OS", placeholder: "Enter os...", type: "text", required: "OS is required" },
    { name: "license", label: "LICENSE", placeholder: "Enter license...", type: "text", required: "LICENSE is required" },
    { name: "brand", label: "BRAND", placeholder: "Enter brand...", type: "text", required: "Brand is required" },
    { name: "assigned date", label: "ASSIGNED DATE", placeholder: "Enter Asssigned Date...", type: "date", required: "ASSIGNED DATE is required" },
    { name: "expiry date", label: "EXPIRY DATE", placeholder: "Enter Expiry...", type: "date", required: "EXPIRY DATE is required" },
    { name: "assigned by", label: "ASSIGNED BY", placeholder: "Enter Name...", type: "text",required: "ASSIGNED BY is required" }
  ];
  


  // Function for getting the values from the server
  useEffect(() => {
    fetchData();
    fetchAssetCategories()
  }, []);
  
  const fetchAssetCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/category");
      if (Array.isArray(response.data)) {
        setCategoryData(response.data);
      } else {
        console.log("Invalid response format for asset categories:", response.data);
      }
    } catch (error) {
      console.log("Error fetching asset categories:", error);
    }
  };
  

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Assets");
      setAssets(res.data);
    } catch (error) {
      console.log("Error getting the response from the server", error);
    }
  };

  // Function for handling the post and put request
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

        const existingEmployee = assets.find((asset) => asset.id === data.empId);
        if (existingEmployee) {
          alert("A user with the same ID already exists. Please choose a different ID.");
        } else {
          const response = await axios.post("http://localhost:3000/Assets", { ...data, id: data.emp_id });
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

  // Function for editing the entity
  const handleEdit = (asset) => {
    setAssetID(asset);
    setEditForm(true);
  };

  // Function for deleting an asset
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

  // Function for showing delete confirmation
  const handleDeleteConfirmation = (asset) => {
    setAssetID(asset);
    setDeleteForm(true);
  };

  // Columns for the table
  const COLUMNS = useMemo(() => {
    if (assets.length === 0) {
      // Return placeholder columns or default column structure when no data is available
      return [
        { Header: "EMP ID", accessor: "empId" },
        { Header: "EMP NAME", accessor: "emp Name" },
        { Header: "EMP NAME", accessor: "assetId" },
        { Header: "EMP NAME", accessor: "asset name" },
        { Header: "EMP NAME", accessor: "serial number" },
        { Header: "PROCESSOR", accessor: "processor" },
        { Header: "OS", accessor: "os" },
        { Header: "LICENSE", accessor: "license" },
        { Header: "BRAND", accessor: "brand" },
        { Header: "UPDATE", accessor: "assigned date" },
        { Header: "EXPIRY", accessor: "expiry date" },
        { Header: "EXPIRY", accessor: "assigned by" },
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

  // Handle filter dropdown visibility toggle
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
      return assets; // Return original data if no column is selected and no global filter is applied
    }
    
    let filtered = assets;
    
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
      filtered = filtered.filter(asset => {
        const columnValue = asset[selectedColumn.accessor]; // Get the value of the selected column

        return columnValue.toString().toLowerCase().includes(globalFilterValue.toLowerCase());
      });
    }
    
    return filtered;
  }, [assets, selectedColumn, globalFilterValue]);

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
      <div className="overflow-x-hidden">
        <div className="flex justify-between items-center overflow-y border-b">
          <div className="m-2">
            <h1 className="md:text-2xl sm:text-xl font-primary mx-1 font-medium max-sm:text-lg">Assets</h1>
            <h2 className="uppercase md:text-[15px] sm:text-[12px] mx-1 mb-2 max-sm:text-[9px]">Dashboard / Assets</h2>
          </div>
          <div className="flex px-2 md:flex-nowrap">
            <div className="py-3 px-1">
              <Input
                placeholder={` Enter a Keyword...`}
                value={globalFilterValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="m-2 pt-1 flex items-center gap-1 ">
              <div className="inline-block relative" ref={filterRef}>
                <button
                  onClick={handleDropdownChange}
                  className="inline-flex rounded-lg px-1 py-2 text-black hover:bg-gray-200  items-center justify-center gap-1"
                >
                  <span className="py-[5px]">
                    <MdFilterList className="text-[20px]" />
                  </span>
                  <p className="font-light">Filters</p>
                </button>
                {filter && (
                  <div className="absolute min-w-[18vw] z-10 mt-2 w-auto right-1  rounded-lg bg-blue-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <h1 className="mx-auto text-center font-light mt-1">Filter</h1>
                    {COLUMNS.map((column, index) => (
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
                <span className="text-2xl px-1 max-sm:pt-1">
                  <IoAddOutline />
                </span>
                <span className="max-sm:hidden text-[15px]">ADD</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="container mx-auto w-full p-2 ">
            <Table
              columns={COLUMNS}
              data={filteredData}
              handleDeleteConfirmation={handleDeleteConfirmation}
              handleEdit={handleEdit}
              globalFilterValue={globalFilterValue}
            />
        {categoryData.length > 0 && addForm && (
              <Form
                fieldsConfig={assetFieldsConfig}
                onSubmit={handleForm}
                onClose={() => setAddForm(false)}
                categoryOptions={categoryData.map(category => ({ value: category.id, label: category.name }))}
              />
            )}
            {categoryData.length > 0 && editForm && (
              <Form
                fieldsConfig={assetFieldsConfig}
                onSubmit={handleForm}
                initialValues={assetID}
                onClose={() => setEditForm(false)}
                categoryOptions={categoryData.map(category => ({ value: category.id, label: category.name }))}
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
      </div>
    </Layout>
  );
};

export default Assets;
