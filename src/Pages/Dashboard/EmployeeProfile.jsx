import React, { useEffect, useState } from "react";
import Layout from "../../Components/Dashboard/Layout";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook

const EmployeeProfile = () => {
  const [empData, setEmpData] = useState(null);

  const { employee_id } = useParams(); // Extract employee_id from URL

  useEffect(() => {
    fetchEmpData();

  }, []);

  const fetchEmpData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/Employee/${employee_id}`
      ); // Use employee_id in the URL
      setEmpData(res.data);
    } catch (err) {
      console.log(err, "error fetching employee data");
    }
  };


  return (
    <Layout>
      <div className="  shadow-3xl rounded-primary relative mx-auto flex h-full w-full max-w-[80vw] flex-col items-center  bg-cover bg-clip-border p-[16px] ">
        {/* banner section */}
        <div className="relative top-10 mt-5 flex h-64 w-full justify-center rounded-xl bg-cover bg-blue-200 max-w-[80vw] mx-auto text-white"></div>

        <div className="static h-fit  flex  min-w-[75vw] items-start pt-2 justify-start rounded-lg border-[3px] border-white  bg-white drop-shadow-xl">
          {empData && (
            <>
              <div className="relative -top-10 flex h-[98px] w-[98px] items-center justify-center rounded-full border-[4px] border-white bg-blue-100 mx-3 ">
                <span className="text-black text-4xl">
                  {empData.full_name.charAt(0)}
                </span>
              </div>

              <div className="flex flex-col">
                <div className=" inline-block font-semibold text-xl ">
                  {empData.full_name}
                </div>

                <div className=" inline-block  font-medium text-sm  text-zinc-500">
                  {empData.position}
                </div>

                <div className="flex items-center justify-between w-full mx-12 px-12">
                  <div className="mb-12 p-4    font-medium text-[14px] mt-7 pt-4 text-zinc-500  rounded-lg drop-shadow-lg ">
                    <h1 className="text-start px-3 font-semibold text-[16px] text-zinc-900">
                      Peronal Details
                    </h1>
                    <ul className="text-black py-3 px-3 text-md">
                      <li className=" text-light font-semibold text-zinc-900 py-2 ">
                        {" "}
                        Full Name:{" "}
                        <span className=" font-light text-stone-500 px-1 ">
                          {" "}
                          {empData.full_name}
                        </span>
                      </li>
                      <li className=" text-light font-semibold text-zinc-900 py-2">
                        {" "}
                        Mobile:{" "}
                        <span className=" font-light text-stone-500 px-1">
                          {" "}
                          {empData.phone}
                        </span>
                      </li>
                      <li className=" text-light font-semibold text-zinc-900 py-2 ">
                        {" "}
                        Department:{" "}
                        <span className=" font-light text-stone-500 px-1">
                          {" "}
                          {empData.department}
                        </span>
                      </li>
                      <li className=" text-light font-semibold text-zinc-900 py-2 ">
                        {" "}
                        Location:{" "}
                        <span className=" font-light text-stone-500 px-1">
                          {" "}
                          {empData.location}
                        </span>
                      </li>
                      <li className=" text-light font-semibold text-zinc-900 py-2 ">
                        {" "}
                        Location:{" "}
                        <span className=" font-light text-stone-500 px-1">
                          {" "}
                          {empData.employee_id}
                        </span>
                      </li>
                      <li className=" text-light font-semibold text-zinc-900 py-2 ">
                        {" "}
                        Location:{" "}
                        <span className=" font-light text-stone-500 px-1">
                          {" "}
                          {empData.department}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-r min-h-[30vh]  border-l-black"></div>

                  <div className="mb-12 p-4    font-medium text-[14px] mt-7 pt-4 text-zinc-500  rounded-lg drop-shadow-lg ">
                    <h1 className="text-start px-3 font-semibold text-[16px] text-zinc-900"></h1>
                    <ul className="text-black py-3 px-3 text-md">
                      <li className=" text-light font-semibold text-zinc-900 py-2 ">
                        {" "}
                        Asset Id:{" "}
                        <span className=" font-light text-stone-500 px-1 ">
                          {" "}
                          {/* {empData.full_name} */} St02
                        </span>
                      </li>
                      <li className=" text-light font-semibold text-zinc-900 py-2">
                        {" "}
                        Asset Name:{" "}
                        <span className=" font-light text-stone-500 px-1">
                          {" "}
                          {/* {empData.phone} */} Laptop
                        </span>
                      </li>
                      <li className=" text-light font-semibold text-zinc-900 py-2 ">
                        {" "}
                        Serial NO:{" "}
                        <span className=" font-light text-stone-500 px-1">
                          {" "}
                          {/* {empData.department} */} St01sf
                        </span>
                      </li>
                      <li className=" text-light font-semibold text-zinc-900 py-2 ">
                        {" "}
                        Assigned Date:{" "}
                        <span className=" font-light text-stone-500 px-1">
                          {" "}
                          {/* {empData.location} */} 2024-04-10
                        </span>
                      </li>
                      <li className=" text-light font-semibold text-zinc-900 py-2 ">
                        {" "}
                        Expiry Date:{" "}
                        <span className=" font-light text-stone-500 px-1">
                          {" "}
                          {/* {empData.employee_id} */}2024-04-26
                        </span>
                      </li>
                     
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeProfile;
