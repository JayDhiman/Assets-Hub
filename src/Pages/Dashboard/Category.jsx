import React, { useState, useEffect } from "react";
import Layout from "../../Components/Dashboard/Layout";
import { IoAddOutline } from "react-icons/io5";
import Input from "../../Components/Input";
import Table from "../../Components/Dashboard/Category/Table";
import Form from "../../Components/Dashboard/Category/Form";
import axios from "axios";


const Category = () => {
  const [showAddForm, setShowAddForm] = useState(false); // state managing the Post req
  const [showEditForm, setShowEditForm] = useState(false); // state managing the put req
  const [assets, setAssets] = useState([]);  // state for storing the data
  const [selectedAsset, setSelectedAsset] = useState(null);  // state managing the id for each individual field 
  const [showDelete, setShowDeleteForm] = useState(false);  // state for managing the delete req

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("http://localhost:3001/headers");
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedAsset) {
        await axios.put(
          `http://localhost:3001/headers/${selectedAsset.id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:3001/headers", formData);
      }
      fetchAssets();
      toggleEditForm(false);
      toggleAddForm(false);
      setSelectedAsset(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setShowEditForm(true);
  };

  const handleDelete = async (asset) => {
    try {
      await axios.delete(`http://localhost:3001/headers/${asset.id}`);
      setShowDeleteForm(true);
      fetchAssets();
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  return (
    <Layout>
      <div className="flex overflow-auto">
        <div className="w-full overflow-hidden">
          <div className="m-4 border-b">
            <h1 className="text-2xl font-primary mx-1 font-medium ">
              Category
            </h1>
            <h2 className="uppercase text-[15px] mx-2 mb-2 ">
              Dashboard / Category
            </h2>
          </div>
        </div>
      </div>

      <div className="">
        <div className="container mx-auto w-full p-2 ">
          <div className="flex items-center flex-wrap gap-4 w-full">
            <div className="mx-2 max-md:w-full flex-1">
              <Input placeholder={"Search here"} />
            </div>
            <div className="">
              <button
                className="rounded-xl py-[10px] bg-stone-800 text-white px-12  hover:bg-stone-950 flex"
                onClick={toggleAddForm}
              >
                <span className="text-2xl px-1">
                  <IoAddOutline />
                </span>
                <span className="max-sm:hidden">ADD</span>
              </button>
            </div>
          </div>

          <div>
            <Table
              assets={assets}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {showAddForm && <Form onSubmit={handleFormSubmit} />}
          {showEditForm && (
            <Form
              onSubmit={handleFormSubmit}
              initialValues={selectedAsset}
              onCancel={() => setShowEditForm(false)} // Close edit form
            />
          )}
        </div>
      </div>

      {/* {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded-lg">
            <p>Are you sure you want to delete this asset?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedAsset)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </Layout>
  );
};

export default Category;
