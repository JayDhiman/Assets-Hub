import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../Components/Dashboard/Layout";
import Input from "../../Components/Input";
import { IoAddOutline } from "react-icons/io5";
import Form from "../../Components/Dashboard/Form";
import axios from "axios";
import { MdFilterList } from "react-icons/md";
import Table from "../../Components/Dashboard/Table";






const Assets = () => {
  
  const [assets, setAssets] = useState([]); // state for managing the data
  const [assetID, setAssetID] = useState(null); // State for selected asset to be updated
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [filter,setFilter] = useState(false)


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
      const res = await axios.get("http://localhost:3000/Assets");
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
        const existingEmployee = assets.find((asset) => asset.id === data.id);
        if (existingEmployee) {
          alert("A user with the same ID already exists. Please choose a different ID.");

        } else {
          const response = await axios.post("http://localhost:3000/Assets", 
          {  ...data,
             id:data.emp_id
          }
          );
         
        
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
    console.log("Selected asset:", asset);
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

      return Object.keys(assets[0] || {})
        .filter((key) => key !== "id")
        .map((key) => ({
          Header: key.toUpperCase(),
          accessor: key,
        }));
    }
  }, [assets]);
  // for adding the action buttons
  


  // filter
  const handleToggleFilter = ()=> setFilter(!filter)

  

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

        {/* filter */}
        <div className="m-4 pt-1 flex items-center gap-1 ">
          <div className="">
            <Input
            className= 'w-[15vw]' 
            placeholder = "Enter a keyword..."
            />
          </div>

           <div className=" inline-block">

          <button
          onClick={handleToggleFilter}
           className=" inline-flex rounded-lg px-3 py-2 text-black  hover:bg-gray-200  items-center justify-center gap-1"
         >
            <span className="py-[5px]">
              <MdFilterList className="text-[20px]" />
            </span>
            <p className="font-light">Filters</p>
          </button>
        
         {
           filter && (
            <div className="absolute min-w-42  z-10 mt-2 w-auto origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              Emp_ID

              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              EMP_NAME
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              PROCESSOR
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              OS
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              LICENSE
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              UPDATE
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              BRAND
              </div>
              <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
              EXPIRY
              </div>
              
          
              </div>
              </div>
          )
          }
          </div> 
          

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

        <div>
        <div className="container mx-auto w-full p-2 ">

          {/* Table Component */}
          <Table columns={columns} data={assets} handleDeleteConfirmation={handleDeleteConfirmation} handleEdit={handleEdit} />

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

export default Assets;

