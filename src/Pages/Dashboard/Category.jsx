import React, { useEffect, useState, useMemo, useRef } from "react";
import Layout from "../../Components/Dashboard/Layout";
import { IoAddOutline } from "react-icons/io5";
import Form from "../../Components/Dashboard/Form";
import axios from "axios";
import Table from "../../Components/Dashboard/Table";
import { MdFilterList } from "react-icons/md";
import Input from "../../Components/Input";


const Category = () => {
  const [categoryData, setCategoryData] = useState([]); // state for managing the data
  const [dataID, setDataID] = useState(null);
  const [addForm, setAddForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  const [selectedColumn, setSelectedColumn] = useState(null); // State to store the selected column for filtering
  const [globalFilterValue,setGlobalFilterValue] = useState("");
  const [filter, setFilter] = useState(false); // State to manage filter dropdown visibility


  const filterRef = useRef(null); // Reference to filter dropdown

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

  // Fetch data function
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/category");
      setCategoryData(res.data);
    } catch (error) {
      console.log("Error fetching data from the server:", error);
    }
  };

  // Handle form submission for adding/editing data
  const handleRequestSubmit = async (data) => {
    try {
      if (dataID) {
        await axios.put(`http://localhost:3000/category/${dataID.id}`, data);
        setUpdateForm(false);
      } else {
        await axios.post(`http://localhost:3000/category`, {
          ...data,
          id: data.sNo,
        });
        setAddForm(false);
      }
      fetchData();
      setDataID(null);
    } catch (error) {
      console.log("Error updating/adding data:", error);
    }
  };

  // Edit data function
  const handleEdit = (asset) => {
    setDataID(asset);
    setUpdateForm(true);
  };

  // Delete data function
  const handleDelete = async () => {
    try {
      if (dataID) {
        await axios.delete(`http://localhost:3000/category/${dataID.id}`);
        fetchData();
        setDeleteForm(false);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Show delete confirmation function
  const handleDeleteConfirmation = (asset) => {
    setDataID(asset);
    setDeleteForm(true);
  };

  // Columns for table
  const columns = useMemo(() => {
    if (categoryData.length === 0) {
      // Return placeholder columns or default column structure when no data is available
      return [
        {
          Header: "S.NO",
          accessor: "sNo",
        },
        {
          Header: "MACHINES",
          accessor: "Machines",
        },
        {
          Header: "COUNT",
          accessor: "Count",
        },
        {
          Header: "ASSIGNED",
          accessor: "Assigned",
        },
      ];
    } else {
      // Return columns based on actual data
      return Object.keys(categoryData[0] || {})
        .filter((key) => key !== "id")
        .map((key) => ({
          Header: key.toUpperCase(),
          accessor: key,
      
        }));
    }
  }, [categoryData]);

 

  // Handle filter dropdown visibility toggle
  const handleDropdownChange = () => setFilter(!filter);
  

  // Handle input change for filtering
  
  const handleInputChange = (e) => setGlobalFilterValue(e.target.value)

  // Handle checkbox change
  const handleCheckboxToggle = (column) => {
    setSelectedColumn(selectedColumn === column ? null : column); // Toggle the selected column
  };


  // Function to filter data based on selected column and global filter value
  const filteredData = useMemo(() => {
    if (!selectedColumn && !globalFilterValue) {
      return categoryData; // Return original data if no column is selected and no global filter is applied
    }
    
    let filtered = categoryData;
    
    // Apply global filter if it's active
    if (globalFilterValue) {
      filtered = filtered.filter(data => {

        return Object.values(data).some(value => {

          // Check if the value contains the globalFilterValue
          return value.toString().toLowerCase().includes(globalFilterValue.toLowerCase());
        });
      });
    }
    
    // Apply column filter if a column is selected
    if (selectedColumn) {
      filtered = filtered.filter(data => {
        const columnValue = data[selectedColumn.accessor]; // Get the value of the selected column

        return columnValue.toString().toLowerCase().includes(globalFilterValue.toLowerCase());
      });
    }
    
    return filtered;
  }, [categoryData, selectedColumn, globalFilterValue]);

  const assetFieldsConfig = [
    { name: "sNo", label: "SNO", placeholder: "Enter SNO", type: "text", required: "Enter SNO" },
    { name: "Machines", label: "MACHINES", placeholder: "Enter SNO", type: "text", required: "Enter Machine" },
    { name: "Count", label: "COUNT", placeholder: "Enter COUNT", type: "number", required: "Enter Count" },
    { name: "Assigned", label: "ASSIGNED", placeholder: "Enter ASSIGNED", type: "number", required: "Enter Assigned" },
    
   ]


  return (
    <Layout>
      <div className="flex justify-between items-center overflow-y border-b p-3">
          <div className="m-2 ">
            <h1 className="md:text-2xl sm:text-xl font-primary mx-1 font-medium max-sm:text-lg">Category</h1>
            <h2 className="uppercase md:text-[15px] sm:text-[12px] mx-1 mb-2 max-sm:text-[9px]">Dashboard / Category</h2>
          </div>
          <div className="flex  md:flex-nowrap px-2">
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
                  <div className="absolute min-w-[18vw] z-10 mt-2 w-auto  2xl:right-0 lg:right-0 max-sm:-left-12  rounded-lg bg-blue-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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

      <div className="">
        <div className="container mx-auto w-full p-2 ">
          <Table
            columns={columns}
            data={filteredData}
            handleDeleteConfirmation={handleDeleteConfirmation}
            handleEdit={handleEdit}
            globalFilterValue={globalFilterValue}
          />

          {/* Form for adding new data */}
          {addForm && (
            <Form fieldsConfig={assetFieldsConfig} onSubmit={handleRequestSubmit} onClose={() => setAddForm(false)} />
          )}

          {/* Form for updating existing data */}
          {updateForm && (
            <Form
              fieldsConfig={assetFieldsConfig}
              onSubmit={handleRequestSubmit}
              initialValues={dataID}
              onClose={() => setUpdateForm(false)}
            />
          )}
        </div>
      </div>

      {/* Delete Form */}
      {deleteForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg my-2 pb-2"> Are you sure you want to delete this asset?</p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setDeleteForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded text-md "
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-md"
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

export default Category;
