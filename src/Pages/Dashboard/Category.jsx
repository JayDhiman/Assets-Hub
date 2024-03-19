import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../Components/Dashboard/Layout";
import { IoAddOutline } from "react-icons/io5";
import Form from "../../Components/Dashboard/Form";
import axios from "axios";
import Table from "../../Components/Dashboard/Table";


const Category = () => {
  const [categoryData, setCategoryData] = useState([]); // state for manging the data
  const [dataID, setDataID] = useState(null);
  const [addForm, setAddForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

  // const handleToggleClose = () => setForm(false)

  // function for fetching the data from the server
  useEffect(() => {
  
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/category");
      setCategoryData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error, "Error fetching the data from the server");
    }
  };

  // function for handling the Post and Put request
  const handleRequestSubmit = async (data) => {
    try {
      if (dataID) {
        await axios.put(`http://localhost:3000/category/${dataID.id}`, data);
        setUpdateForm(false);
      } else {
        await axios.post(`http://localhost:3000/category`, {
          ...data,
          id: data.sNo

        });
        setAddForm(false);
      }
      fetchData();
      setDataID(null);
    } catch (error) {
      console.log("Error updating /adding the data", error);
    }
  };
  // function for edit the data
  const handleEdit = (asset) => {
    console.log("Edit clicked:", asset);
    setDataID(asset);
    setUpdateForm(true);
  };

  const handleDelete = async () => {
    try {
      if (dataID) {
        await axios.delete(`http://localhost:3000/category/${dataID.id}`);
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
    if (categoryData.length === 0) {
      // Return placeholder columns or default column structure when no data is available
      return [
        {
          Header:"S.NO",
          accessor:"sNo"
        },
        {
         Header:"MACHINES",
         accessor:"Machines"
        },
        {
         Header:"COUNT",
         accessor:"Count"
        },
        {
         Header:"ASSIGNED",
         accessor:"Assigned"
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



     // form data
     const assetFieldsConfig = [
     { name: "sNo", label: "SNO", placeholder: "Enter SNO", type: "text", required: true },
     { name: "Machines", label: "MACHINES", placeholder: "Enter SNO", type: "text", required: true },
     { name: "Count", label: "COUNT", placeholder: "Enter COUNT", type: "text", required: true },
     { name: "Assigned", label: "ASSIGNED", placeholder: "Enter ASSIGNED", type: "text", required: true },
     
    ]

  return (
    <Layout>
         <div className="flex overflow-auto border-b">
        <div className="w-full overflow-hidden">
          <div className="m-4 ">
            <h1 className="text-2xl font-primary mx-1 font-medium ">Category</h1>
            <h2 className="uppercase text-[15px] mx-1 mb-2 ">
              Dashboard / Category
            </h2>
           
          </div>
        </div>
        <div className="m-4 pt-1">
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


      <div className="">
        <div className="container mx-auto w-full p-2 ">
          {/* table */}
          <Table columns={columns} data={categoryData} handleDeleteConfirmation={handleDeleteConfirmation} handleEdit={handleEdit} />
        



          {addForm && (
            <Form
              fieldsConfig = {assetFieldsConfig}
              onSubmit={handleRequestSubmit}
              onClose={() => setAddForm(false)}
            />
          )}

          {updateForm && (
            <Form
              fieldsConfig = {assetFieldsConfig}
              onSubmit={handleRequestSubmit}
              initialValues={dataID}// Pass the selected asset data to the form
              onClose={() => setUpdateForm(false)}
            />
          )}
        </div>
      </div>

      {/* Delete Form */}

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

export default Category;
