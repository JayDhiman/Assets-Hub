import React, { useEffect, useState } from "react";
import Layout from "../../Components/Dashboard/Layout";
import { MdOutlineWebAsset } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { SiBmcsoftware } from "react-icons/si";
import axios from "axios";
import AssetsCategoryChart from "../../Components/Dashboard/Charts/AssetsCategoryChart";
import AssetsPieChart from "../../Components/Dashboard/Charts/AssetsDistributionPieChart";
import { Link } from "react-router-dom";
import authService from "../../Appwrite/Authservice";
import { FaUserAlt } from "react-icons/fa";
import bgimg2 from "../../assets/bgimg2.jpeg";
import { MdPhone } from "react-icons/md";

const Dashboard = () => {
  const [assetsData, setAssetsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [softwareData, setSoftwareData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [user]);

  useEffect(() => {
    fetchAssetData("Assets", setAssetsData);
    fetchAssetData("category", setCategoryData);
    fetchAssetData("Software", setSoftwareData);
    fetchAssetData("Employee", setEmployeeData);
  }, []);

  const fetchUser = async () => {
    try {
      const user = await authService.currentUser();
      setUser(user);
    } catch (error) {
      console.log(error, "Something went Wrong");
    }
  };

  const fetchAssetData = async (endpoint, setData) => {
    try {
      const res = await axios.get(`http://localhost:3000/${endpoint}`);
      setData(res.data);
    } catch (error) {
      console.log("Error getting the response from the server", error);
    }
  };

  return (
    <Layout>
      <div className=" w-auto max-sm:pb-3 ">
        <div className=" overflow-auto">
          <div className=" container mx-auto pr-4 relative">
            <img
              src={bgimg2}
              alt=""
              className=" inset-0 w-full md:h-[26vh] sm:h-[25vh] lg:-[32vh] max-sm:h-[20vh] object-cover opacity-95 rounded-xl"
            />
            <div className="absolute top-0 px-4 py-3  w-full">
              <div className=" z-10 m-2 p-2 pb-2 w-fit overflow-auto">
                {user && (
                  <div className="text-white">
                    <h1 className="text-2xl font-primary mx-1 font-medium text-white">
                      Welcome {user.name}
                    </h1>
                  </div>
                )}
                <h2 className="uppercase text-[15px] mx-1 mb-2 text-white">
                  Dashboard
                </h2>
              </div>
            </div>
          </div>
          <div className=" container mx-auto px-4">
            <div className="flex items-center justify-center flex-wrap gap-4 p-6">
              {/* First Card */}
              <Link to={"/dashboard/assets"}>
                <div className="px-3 rounded-xl shadow-lg drop-shadow-lg bg-white  flex items-center justify-between flex-wrap gap-2 w-[250px] h-[110px] hover:-translate-y-1 hover:duration-300 hover:transition">
                  {/* Icon */}

                  <div className="mx-1 rounded-lg bg-gradient-to-b from-stone-500 to-stone-800 backdrop-shadow-xl">
                    <MdOutlineWebAsset className="text-slate-100 lg:text-[60px] sm:text-[60px] max-sm:text-[50px] rounded-full p-2 m-1" />
                  </div>
                  {/* Text Content */}
                  <div className="text-start mx-4 px-3">
                    <h1 className="font-extralight text-lg text-gray-500">
                      Assets
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {assetsData.length}
                    </h2>
                  </div>
                </div>
              </Link>

              {/* Second Card */}
              <Link to={"/dashboard/category"}>
                <div className="px-3 rounded-xl shadow-lg drop-shadow-lg bg-white  flex items-center justify-between flex-wrap gap-2 w-[250px] h-[110px] hover:-translate-y-1 hover:duration-300 hover:transition">
                  {/* Icon */}
                  <div className="mx-1 rounded-lg bg-gradient-to-b from-blue-400 to-blue-800 backdrop-shadow-xl">
                    <TbCategoryPlus className="text-slate-100 lg:text-[60px] sm:text-[60px] max-sm:text-[50px] rounded-full p-3 m-1" />
                  </div>
                  {/* Text Content */}
                  <div className="text-start mx-4 px-4">
                    <h1 className="font-extralight text-lg text-gray-500">
                      Category
                    </h1>
                    <h2 className="text-xl font-semibold">
                      {categoryData.length}
                    </h2>
                  </div>
                </div>
              </Link>

              {/* Third Card */}
              <Link to={"/dashboard/software"}>
                <div className="px-3 rounded-xl shadow-lg drop-shadow-lg bg-white  flex items-center justify-between flex-wrap gap-2 w-[250px] h-[110px] hover:-translate-y-1 hover:duration-300 hover:transition">
                  {/* Icon */}
                  <div className="mx-1 rounded-lg bg-gradient-to-b from-green-500 to-green-700 backdrop-shadow-xl">
                    <SiBmcsoftware className="text-slate-100 lg:text-[60px] sm:text-[60px] max-sm:text-[50px] rounded-full p-3 m-1" />
                  </div>
                  {/* Text Content */}
                  <div className="text-start mx-4 px-4">
                    <h1 className="font-extralight text-lg text-gray-500">
                      Software
                    </h1>
                    <h2 className="text-xl font-semibold text-">
                      {softwareData.length}
                    </h2>
                  </div>
                </div>
              </Link>

              {/* Fourth Card */}
              <Link to={"/dashboard/employee"}>
                <div className="px-3 rounded-xl shadow-lg drop-shadow-lg bg-white text-stone-00 flex items-center justify-between flex-wrap  w-[250px] h-[110px] hover:-translate-y-1 hover:duration-300 hover:transition">
                  {/* Icon */}
                  <div className="mx-1 rounded-lg bg-gradient-to-b from-pink-500 to-pink-700 backdrop-shadow-xl">
                    <FaUserAlt className="text-slate-100 lg:text-[60px] sm:text-[60px] max-sm:text-[50px] rounded-full p-3 m-1" />
                  </div>
                  {/* Text Content */}
                  <div className="mx-4 px-4">
                    <h1 className="font-extralight text-lg text-gray-500">
                      Employee
                    </h1>
                    <h2 className="text-xl font-semibold ">
                      {employeeData.length}
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto  flex items-center justify-center gap-3  flex-wrap my-3 mb-">
        {/* categoryChart */}
        <div className="flex-1 bg-white shadow-xl drop-shadow-xl rounded-xl md:p-3 mx-2 sm:max-w-md md:max-w-lg lg:max-w-3xl max-sm:max-w-sm  ">
          <div className=" mx-auto md:h-[50vh] ">
            <AssetsCategoryChart />
          </div>
          <div className="text-center mt-3">
            <h1 className="font-primary text-md font-light">Asset Category</h1>
          </div>
        </div>

        <div className="  bg-white shadow-xl drop-shadow-xl rounded-xl md:p-3 mx-2 max-w-3xl max-sm:max-w-xs  mt-4 ">
          <div className="mx-auto md:h-[53vh]">
            <AssetsPieChart />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-xl drop-shadow-xl rounded-xl p-3 container lg:max-w-[80vw] sm:max-w-md md:max-w-xl mx-auto px-3 my-12">
  <h1 className="font-primary text-md font-light text-gray-800 text-center my-3 mb-5">
    Employee Data
  </h1>
  <div className="overflow-x-auto">
    <table className="w-full lg:max-w-[80vw] sm:max-w-md md:max-w-xl max-sm:w-fit border-collapse border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 font-semibold">Name</th>
          <th className="px-4 py-2 text-gray-700">Position</th>
          <th className="px-4 py-2 text-gray-700">Department</th>
          <th className="px-4 py-2 text-gray-700">Email</th>
          <th className="px-4 py-2 text-gray-700">Contact</th>
        </tr>
      </thead>
      <tbody>
        {employeeData.map((employee, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
            <td className="px-4 py-3 text-gray-700 font-light flex items-center">
              <span className="inline-block h-8 w-8 rounded-full bg-sky-100 text-center mr-2 p-1">
                {employee.full_name.charAt(0)}
              </span>
              {employee.full_name}
            </td>
            <td className="px-4 py-2 text-gray-700 font-light">{employee.position}</td>
            <td className="px-4 py-2 text-gray-700 font-light">{employee.department}</td>
            <td className="px-4 py-2 text-gray-700 font-light">{employee.email}</td>
            <td className="px-4 py-2 text-gray-700 font-light flex items-center">
              <span className="inline-block h-8 w-8 rounded-full bg-zinc-200 text-center mr-2">
                <MdPhone className="m-2 text-blue-400" />
              </span>
              {employee.phone}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



    </Layout>
  );
};

export default Dashboard;
