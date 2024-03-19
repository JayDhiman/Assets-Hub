import React, { useState, useEffect, useMemo } from "react"
import Layout from '../../Components/Dashboard/Layout';
import Form from '../../Components/Dashboard/Form';
import Table from '../../Components/Dashboard/Table';
import axios from "axios";



const Employee = () => {
  const [empData, setEmpData] = useState([]);
  const [empID, setEmpID] = useState(null); // State for selected asset to be updated
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);



  const assetFieldsConfig = [
    { name: "emp_id", label: "EMP_ID", placeholder: "Enter emp_id..", type: "text", required: true },
    { name: "emp_Name", label: "EMP_NAME", placeholder: "Enter employee name...", type: "text", required: true },
    { name: "processor", label: "PROCESSOR", placeholder: "Enter Processor...", type: "text", required: true },
    { name: "os", label: "OS", placeholder: "Enter os...", type: "text", required: true },
    { name: "license", label: "LICENSE", placeholder: "Enter license...", type: "text", required: true },
    { name: "update", label: "UPDATE", placeholder: "Update...", type: "text", required: true },
    { name: "brand", label: "BRAND", placeholder: "Enter brand...", type: "text", required: true },
    { name: "expiry", label: "EXPIRY", placeholder: "Enter expiry...", type: "text", required: true },
    
  ];

  // function for getting the values from the server
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Employee");
      setAssets(res.data);
    } catch (error) {
      console.log("Error getting the response from the server", error);
    }
  };

  // function for handling the post and put request
  const handleForm = async (data) => {
    
    try {
      if (empID) {
        const response = await axios.put(`http://localhost:3000/Employee/${empID.id}`, data);
        if (response.status === 200) {
          // Data successfully updated
          fetchData();
          setEmpID(null);
          setEditForm(false);
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
          {  ...data,
             id:data.emp_id
          }
          );
         
        
          if (response.status === 201) {
            // Data successfully created
            fetchData();
            setEmpID(null);
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
    console.log("Selected asset:", asset);
    setEmpID(asset);
    setEditForm(true);
  };

  const handleDelete = async () => {
    try {
      if (assetID) {
        await axios.delete(`http://localhost:3000/Employee/${empID.id}`);
        fetchData();
        setDeleteForm(false);
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };
  const handleDeleteConfirmation = (employee) => {
    setEmpID(employee);
    setDeleteForm(true);
  };


  const columns = useMemo(() => {
    if (empData.length === 0) {
      // Return placeholder columns or default column structure when no data is available
      return [
        {
          Header: "EMP_ID",
          accessor: "emp_id",
        },
        {
          Header: "EMP_NAME",
          accessor: "emp_Name",
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

      return Object.keys(empData[0] || {})
        .filter((key) => key !== "id")
        .map((key) => ({
          Header: key.toUpperCase(),
          accessor: key,
        }));
    }
  }, [empData]);
  return (
    <Layout>
      <div className='flex gap-2 overflow-auto border-b m-1'>
        <div className='w-full overflow-hidden'>
          <div className='m-4 '>
            <h1 className='text-2xl font-primary mx-1 font-medium'>Employee</h1>
            <h2 className='uppercase text-[15px] mx-2 mb-2'>Dashboard / Employee</h2>
          </div>
        </div>
        <div className='inline-block mt-4 '>
          <div className='pointer-events-none  inset-y-0 right-0 flex items-center px-2 text-white'>
          
         <div>
             
          </div>

          <div>
            
          </div>
          </div>
          <select
            className='block appearance-none bg-stone-800 border border-stone-800 text-white py-3 px-2 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-stone-900 focus:border-stone-900'
            id='filter'
            name='filter' >
            <option value='Filter'selected disabled hidden> Filter</option>
            <option value='Designation'>Designation</option>
            <option value='Brand'>Brand</option>
            <option value='Title'>Title</option>
            <option value='CPU'>CPU</option>
          </select>
        </div>
        <div className='inline-block mt-4 mx-3'>
          <button
            className='rounded-xl py-[10px] bg-stone-800 text-white px-12 hover:bg-stone-950 flex'
          >
            <span className='text-2xl px-1'></span>
            <span className='max-sm:hidden'>ADD</span>
          </button>
        </div>
      </div>

      <div className=''>
        <div className='container mx-auto w-full p-2 '>
        
        <Table columns={columns} data={empData} handleDeleteConfirmation={handleDeleteConfirmation} handleEdit={handleEdit} />

        {addForm && (
            <Form
              fieldsConfig = {assetFieldsConfig}
              onSubmit={handleForm}
              onClose={() => setAddForm(false)}
            />
          )}
          {editForm && (
            <Form
              fieldsConfig = {assetFieldsConfig}
              onSubmit={handleForm}
              initialValues={assetID} // Pass the selected asset data to the form
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

export default Employee;
