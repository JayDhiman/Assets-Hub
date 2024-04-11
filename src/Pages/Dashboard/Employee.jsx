


import React, { useEffect, useMemo, useState ,useRef} from 'react'
import Layout from '../../Components/Dashboard/Layout'
import axios from 'axios'
import { IoAddOutline } from "react-icons/io5";
import Form from "../../Components/Dashboard/Form";
import Table from "../../Components/Dashboard/Table";
import Input from "../../Components/Input";
import { MdFilterList } from "react-icons/md";
import EmployeeDetails from '../../Components/Dashboard/EmployeeDetails';


const Employee = () => {
const [empData,setEmpData]= useState([])
const [empId,setEmpId] = useState()
const [addForm,setAddform] =useState(false)
const [updateForm,setUpdateForm] =useState(false)
const [deleteForm,setDeleteForm] =useState(false)
const [profile,setProfile]= useState(false)
const [selectedColumn, setSelectedColumn] = useState(null); // State to store the selected column for filtering
const [filter, setFilter] = useState(false); // State to manage filter dropdown visibility
const [globalFilterValue, setGlobalFilterValue] = useState(""); // State to store the global filter value

const filterRef = useRef(null); // Reference to filter dropdown

useEffect(() => {
  fetchEmpData();
}, []);



 const fetchEmpData = async()=>{
try{
  const res = await axios.get("http://localhost:3000/Employee")
  setEmpData(res.data)
}catch(err){
  console.log(err,"error fetching employe data")
}
}

const handleRequestSubmit = async (data) => {

  try {
    if (empId) {
      const response = await axios.put(`http://localhost:3000/Employee/${empId.employee_id}`, data);
      if (response.status === 200) {
        // Data successfully updated
        fetchEmpData();
        setEmpId(null);
        setUpdateForm(false);
      } else {
        console.log("Error updating the asset:", response);
      }
    } else {
      // Proceed with creating a new asset
      const existingEmployee = empData.find((emp) => emp.id === data.id);
      if (existingEmployee) {
        alert("A user with the same ID already exists. Please choose a different ID.");
      } else {
        const response = await axios.post("http://localhost:3000/Employee",
         { ...data, id: data.employee_id });
        if (response.status === 201) {
          // Data successfully created
          fetchEmpData();
          setEmpId(null);
          setAddform(false);
        } else {
          console.log("Error creating the asset:", response);
        }
      }
    }
  } catch (error) {
    console.log("Error submitting the form", error);
  }
};

const handleEdit = (emp) => {
  setEmpId(emp);
  setUpdateForm(true);
};

const handleDelete = async () => {
  try {
    if (empId) {
      await axios.delete(`http://localhost:3000/Employee/${empId.id}`);
      fetchEmpData(); // Fetch data after successful deletion
      setDeleteForm(false); // Close the delete confirmation popup
    }
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

const handleDeleteConfirmation = (emp) => {
  setEmpId(emp); // Set the asset to delete
  setDeleteForm(true); // Show the delete confirmation popup
};

const handleView = (emp)=> {
  setEmpId(emp)
  setProfile(true)
}


const columns = useMemo(() => {
  if (empData.length === 0) {
    return [
      {
        Header: "EMPID",
        accessor: "employee_id",
      },
      {
        Header: "FULL-NAME",
        accessor: "full_name",
      },
      {
        Header: "DEPARTMENT",
        accessor: "department",
      },
      {
        Header: "POSITION",
        accessor: "position",
      },
      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "PHONE",
        accessor: "phone",
      },
      {
        Header: "LOCATION",
        accessor: "loaction",
      },
    ];
  } else {
    return Object.keys(empData[0] || {})
      .filter((key) => key !== "id")
      .map((key) => ({
        Header: key.toUpperCase(),
        accessor: key,
      }));
  }
}, [empData]);

const assetFieldsConfig = [
  { name: "employee_id", label: "EMPLOYEE-ID", placeholder: "Enter SNO", type: "text", required: true },
  { name: "full_name", label: "FULL-NAME", placeholder: "full_name", type: "text", required: true },
  { name: "department", label: "DEPARTMENT", placeholder: "Enter VERSION", type: "text", required: true },
  { name: "position", label: "POSITION", placeholder: "Enter position", type: "text", required: true },
  { name: "email", label: "EMAIL", placeholder: "Enter ASSIGNS", type: "email", required: true },
  { name: "phone", label: "PHONE", placeholder: "Enter ASSIGNS", type: "tel", required: true },
  { name: "location", label: "LOCATION", placeholder: "Enter ASSIGNS", type: "text", required: true },

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
    return empData; // Return original data if no column is selected and no global filter is applied
  }

  let filtered = empData;

  // Apply global filter if it's active
  if (globalFilterValue) {
    filtered = filtered.filter(emp => {

      return Object.values(emp).some(value => {

        // Check if the value contains the globalFilterValue
        return value.toString().toLowerCase().includes(globalFilterValue.toLowerCase());
      });
    });
  }

  // Apply column filter if a column is selected
  if (selectedColumn) {
    filtered = filtered.filter(empData => {
      const columnValue = empData[selectedColumn.accessor]; // Get the value of the selected column

      return columnValue.toString().toLowerCase().includes(globalFilterValue.toLowerCase());
    });
  }

  return filtered;
}, [empData, selectedColumn, globalFilterValue]);

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
        <div className="flex  justify-between items-center border-b">
          <div className="m-2">
            <h1 className="md:text-2xl sm:text-xl font-primary mx-1 font-medium max-sm:text-lg">Employee</h1>
            <h2 className="uppercase md:text-[15px] sm:text-[12px] mx-1 mb-2 max-sm:text-[9px]">Dashboard / Employee</h2>
          </div>
          <div className="flex  md:flex-nowrap px-2">
            <div className="py-3 px-1 ">
              <Input
                placeholder={` Enter a Keyword...`}
                value={globalFilterValue}
                onChange={handleInputChange}
              />
            </div>
          <div className="m-2 pt-1 flex items-center gap-1 max-sm:m-0">
            <div className="inline-block relative" ref={filterRef}>
              <button
                onClick={handleDropdownChange}
                className="inline-flex rounded-lg px-1 py-2 text-black hover:bg-gray-200  items-center justify-center gap-1 max-sm:gap-0"
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
          <div className="m-2 pt-1 max-sm:m-0">
            <button
              onClick={() => {
                setAddform(true);
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

      <div className="container mx-auto w-full p-2  ">

            {/* Table */}
            <Table
              columns={columns}
              data={filteredData}
              handleDeleteConfirmation={handleDeleteConfirmation}
              handleEdit={handleEdit}
              globalFilterValue={globalFilterValue}
              handleView={handleView}
            />

        {addForm && (
          <Form
            fieldsConfig={assetFieldsConfig}
            onSubmit={handleRequestSubmit}
            onClose={() => setAddform(false)}
          />
        )}
        {updateForm && (
          <Form
            fieldsConfig={assetFieldsConfig}
            onSubmit={handleRequestSubmit}
            initialValues={empId}
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

        {profile && (
          <EmployeeDetails
          employee={empId}
          onClose = {()=>setProfile(false)}
          />
        )

        }
      </div>
    </div>
  </Layout>
  )
}

export default Employee