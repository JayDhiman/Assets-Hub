import React, { useState, useEffect } from "react";
import Layout from "../../Components/Dashboard/Layout";
import Input from "../../Components/Input";
import { IoAddOutline } from "react-icons/io5";
import SoftwareForm from "../../Components/Dashboard/Software/SoftwareForm";
import SoftwareTable from "../../Components/Dashboard/Software/SoftwareTable";
import axios from "axios";

const Software = () => {
  const [softwareData, setSoftwareData] = useState([]); // storing the data
  const [softwareId, setSoftwareId] = useState(null); // state managing the id for each individual field
  const [addForm, setAddForm] = useState(false); // state for add form
  const [updateForm, setUpdateForm] = useState(false); //state for update form
  const [showDelete, setShowDelete] = useState(false); // state for managing the delete req

  useEffect(() => {
    fetchSoftwareData();
  }, []);

  // fetching the data form the backend
  const fetchSoftwareData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/software");
      setSoftwareData(response.data);
    } catch (error) {
      console.error("Error fetching Software:", error);
    }
  };

  // const toggleAddForm = () => {
  //   setAddForm(!addForm);
  // };

  const toggleEditForm = () => {
    setUpdateForm(!updateForm);
  };

  const handleSoftwareForm = async (formData) => {
    try {
      if (softwareId) {
        await axios.put(
          `http://localhost:4000/software/${softwareId.id}`,
          formData
        );
        toggleEditForm(false);
      } else {
        await axios.post(`http://localhost:4000/software`, formData);
        setAddForm(false);
      }
      fetchSoftwareData();
      setSoftwareId(null);
    } catch (error) {
      console.log("Error submitting the form:", error);
    }
  };
  const handleUpdate = (asset) => {
    setSoftwareId(asset);
    setUpdateForm(true);
  };

  const handleDeleteConfirmation = (asset) => {
    setSoftwareId(asset); // Set the asset to delete
    setShowDelete(true); // Show the delete confirmation popup
  };

  const handleDelete = async () => {
    try {
      if (softwareId) {
        await axios.delete(`http://localhost:4000/software/${softwareId.id}`);
        fetchSoftwareData(); // Fetch assets after successful deletion
        setShowDelete(false); // Close the delete confirmation popup
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const handleAddFormCancel = () => {
    setAddForm(false);
  };

  return (
    <Layout>
      <div className="flex overflow-auto">
        <div className="w-full overflow-hidden">
          <div className="m-4 border-b">
            <h1 className="text-2xl font-primary mx-1 font-medium">Software</h1>
            <h2 className="uppercase text-[15px] mx-2 mb-2 ">
              Dashboard / Software
            </h2>
          </div>
          <div className="container mx-auto w-full p-3 ">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="flex-1">
                <Input placeholder={"Search here"} />
              </div>
              <div className="">
                <button className="rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950">
                  Search
                </button>
              </div>
              <div className="">
                <button
                  onClick={() => setAddForm(true)}
                  className="rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950 flex"
                >
                  <span className="text-2xl px-1">
                    <IoAddOutline />
                  </span>
                  <span className="max-sm:hidden">ADD</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-auto h-auto mx-3">
            <SoftwareTable 
            data={softwareData}
            onEdit={handleUpdate}
            onDelete= {handleDeleteConfirmation} />
          </div>

          {addForm && (
            <SoftwareForm
              onSubmit={handleSoftwareForm}
              onClose={handleAddFormCancel}
              
            />
          )}

         
           {updateForm && (
            <SoftwareForm
              onSubmit={handleSoftwareForm}
              onClose={() => setUpdateForm(false)}
              initialValues={softwareId}
            />
          )}
        </div>
      </div>

      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg">
            <p>Are you sure you want to delete this asset?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDelete(false)} // Close delete confirmation
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

export default Software;
