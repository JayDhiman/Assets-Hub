    import React, { useState, useEffect, useMemo } from "react";
    import Layout from "../../Components/Dashboard/Layout";
    // import Input from "../../Components/Input";
    import { IoAddOutline } from "react-icons/io5";
    import Form from "../../Components/Dashboard/Form";
    import Table from "../../Components/Dashboard/Table";
    
    const Software = () => {
    
      const [softwareData, setSoftwareData] = useState([]); // state for managing the data
      const [dataID, setDataID] = useState(null);
      const [addForm, setAddForm] = useState(false);
      const [updateForm, setUpdateForm] = useState(false);
      const [deleteForm, setDeleteForm] = useState(false);

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
            await axios.put(`http://localhost:3000/Software/${dataID.id}`, data);
            setUpdateForm(false);
          } else {
            await axios.post(`http://localhost:3000/Software`, {
              ...data,
              id:data.sNo
            });
            setAddForm(false);
          }
          fetchData();
          setDataID(null);
        } catch (error) {
          console.log("Error updating /adding the data", error);
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
        { name: "software", label: "SNO", placeholder: "Enter SNO", type: "text", required: true },
        { name: "version", label: "VERSION", placeholder: "Enter VERSION", type: "text", required: true },
        { name: "assign", label: "ASSIGN", placeholder: "Enter ASSIGNS", type: "text", required: true },

      ]
       
      return (
        <Layout>
          <div className=" overflow-hidden">
            <div className="flex items-center justify-between border-b m-1 p-1">
              <div className="m-1 ">
                <h1 className="text-2xl font-primary mx-1 font-medium mt-1">
                  Software
                </h1>
                <h2 className="uppercase text-[15px] mx-1 mb-2 ">
                  Dashboard / Software
                </h2>
              </div>
              <div className="m-1 pt-1">
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
            <div className="container mx-auto w-full p-2 ">
              {/* table */}
              <Table columns={columns} data={softwareData} handleDeleteConfirmation ={handleDeleteConfirmation} handleEdit={handleEdit} />

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
