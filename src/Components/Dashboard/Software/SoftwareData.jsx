import React, { useState, useEffect } from "react";
import { PiMicrosoftWordLogoFill } from "react-icons/pi";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../Layout";

const SoftwareData = () => {
  const [software, setSoftware] = useState(null);
  const { software_id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/Software/${software_id}`
      );
      setSoftware(res.data);
    } catch (error) {
      console.log("Error finding details", error);
    }
  };

  return (
    <Layout>
      {software && (
        <>
          <div className="m-2 px-4 ">
            <h1 className="md:text-2xl sm:text-xl font-primary mx-1 font-medium max-sm:text-lg">
              Software
            </h1>
            <h2 className="uppercase md:text-[15px] sm:text-[12px] mx-1 mb-2 max-sm:text-[9px]">
              Dashboard / Software / Software-Details
            </h2>
          </div>
          <div className="container h-fit pt-2 mt-6 rounded-lg border-[3px] border-white bg-white drop-shadow-sm shadow-xl w-full  p-4 mx-auto py-6 lg:w-[83vw] ">
            <div className="flex items-center pt-2">
              <div className="w-[70px] h-[70px] rounded-full border-[4px] border-white bg-blue-100 mx-3 flex items-center justify-center ">
                <PiMicrosoftWordLogoFill size={40} className="text-slate-700" />
              </div>
              <div>
                <h1 className="text-xl font-primary font-semibold">
                  {software.software}
                </h1>
                <h3 className="text-sm font-extralight">{software.vendor}</h3>
              </div>
            </div>
          </div>

          <div className="container bg-white my-7 mx-auto drop-shadow-xl shadow-xl rounded-xl lg:w-[83vw] md:min-h-[65vh] ">
            <div className="mb-12 p-3">
              <div className="p-3">
                <h1 className="text-lg font-normal border-b inline-block mx-3">
                  Software Details
                </h1>
              </div>

              <div className="flex items-center justify-evenly gap-2 ">
                <div className=" p-4 ">
                  <ul className="py-2 p-1">
                    <li className="text-base font-light text-gray-700 ">
                      <span className="font-semibold ">Software ID</span>:{" "}
                      {software.software_id}
                    </li>
                    <li className="text-base font-light text-gray-700">
                      <span className="font-semibold ">License Type</span>:{" "}
                      {software.licenseType}
                    </li>
                    <li className="text-base font-light text-gray-700">
                      <span className="font-semibold ">License Key:</span>{" "}
                      {software.licenseKey}
                    </li>
                  </ul>
                </div>
                <div className="border-r border-e-stone-400 h-28 "></div>

                <div className="w-1/2">
                  <ul>
                    <li className="text-base font-light text-gray-700">
                      <span className="font-semibold ">Support Contact:</span>{" "}
                      {software.supportContact}
                    </li>
                    <li className="text-base font-light text-gray-700">
                      <span className="font-semibold ">Status:</span>{" "}
                      {software.status}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className=" overflow-x-auto shadow-md sm:rounded-lg container lg:w-11/12 mx-auto my-4 ">
              <table className="w-full text-sm text-left rtl:text-right text-zinc-700 dark:text-gray-400">
                <thead className="text-xs  uppercase  bg-gray-200 text-zinc-700">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Laptop ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Installation Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Serial Number
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Employee ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Employee Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {software.installation.map((install, index) => (
                    <tr
                      key={index}
                      className="bg-white text-black   dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-sky-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-black">
                        {install.laptopId}
                      </td>
                      <td class="px-6 py-4">{install.installationDate}</td>
                      <td class="px-6 py-4">{install.serialNo}</td>
                      <td class="px-6 py-4">{install.employeeId}</td>
                      <td class="px-6 py-4">{install.empName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* table */}
        </>
      )}

      <div></div>
    </Layout>
  );
};

export default SoftwareData;
