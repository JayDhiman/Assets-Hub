import React from 'react';
import axios from 'axios';

const Add = ({ data, setData, setEmpForm }) => {
  const handleAddUser = async () => {
    try {
      const res = await axios.post("http://localhost:3000/Assets", data);
      console.log("Response:", res.data);

      const response = await axios.get("http://localhost:3000/Assets");
      setData(response.data);
      setEmpForm(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* Assuming you have a button to trigger the add action */}
      <button onClick={handleAddUser}>Add User</button>
    </>
  )
}

export default Add;
