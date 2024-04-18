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
// import bgimg from "../../assets/bgimg.jpeg"
import bgimg2 from "../../assets/bgimg2.jpeg";

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
              className=" inset-0 w-full md:h-[26vh] sm:h-[25vh] lg:-[32vh] max-sm:h-[20vh] object-cover opacity-95"
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
            <div className="md:-translate-y-12 z-30 container mx-auto px-4 sm:p- bg-red-10  ">
              <div className="flex items-center justify-center flex-wrap gap-4 p-6">
                <Link to={"/dashboard/assets"}>
                  <div className="rounded-xl shadow-md bg-white text-stone-700 flex items-center justify-center flex-wrap gap-8 w-[250px] h-[100px] hover:-translate-y-1 hover:duration-300 hover:transition">
                    <div className="p-1 rounded bg-gradient-to-t from-stone-400 to-neutral-700">
                      <MdOutlineWebAsset className="text-slate-100 lg:text-[70px] sm:text-[60px] max-sm:text-[50px]  rounded-full p-2" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold ">
                        {assetsData.length}
                      </h2>
                      <h1 className="font-light text-lg ">Assets</h1>
                    </div>
                  </div>
                </Link>

                <Link to={"/dashboard/category"}>
                  <div className="rounded-xl shadow-md bg-gradient-to-t from-stone-400 to-green-700 flex items-center justify-center flex-wrap gap-8 w-[250px] h-[100px] hover:-translate-y-1 hover:duration-300 hover:transition">
                    <div className="p-2">
                      <TbCategoryPlus className="text-white sm:text-[60px] max-sm:text-[50px]  rounded-full p-2" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {categoryData.length}
                      </h2>
                      <h1 className="font-light text-lg text-white">
                        Category
                      </h1>
                    </div>
                  </div>
                </Link>

                <Link to={"/dashboard/software"}>
                  <div className="rounded-xl shadow-md bg-gradient-to-t from-blue-400 to-blue-700 flex items-center justify-center flex-wrap gap-8 w-[250px] h-[100px] hover:-translate-y-1 hover:duration-300 hover:transition">
                    <div className="p-2">
                      <SiBmcsoftware className="text-white sm:text-[60px] max-sm:text-[50px] rounded-full p-2" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {softwareData.length}
                      </h2>
                      <h1 className="font-light text-lg text-white">
                        Software
                      </h1>
                    </div>
                  </div>
                </Link>

                <Link to={"/dashboard/employee"}>
                  <div className="rounded-xl shadow-md bg-gradient-to-t from-pink-500 to-pink-700 flex items-center justify-center flex-wrap gap-8 w-[250px] h-[100px] hover:-translate-y-1 hover:duration-300 hover:transition">
                    <div className="p-2">
                      <MdOutlineWebAsset className="text-white sm:text-[60px] max-sm:text-[50px] b rounded-full p-2" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {employeeData.length}
                      </h2>
                      <h1 className="font-light text-lg text-white">
                        Employee
                      </h1>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

  <div className="container mx-auto pr-4 w-full mt-4 max-sm:pt-7 flex flex-wrap justify-center gap-6  h-fit ">
  <div className="max-w-full sm:min-w-[55vw] lg:max-w-[50vw] xl:max-w-[60vw] rounded-lg  shadow-lg bg-white drop-shadow-xl ">
    <div className="translate-y-2 bg-gradient-to-r  rounded-lg mx-4">
      <AssetsCategoryChart />
    </div>
    <div className="pb-3">
      <div className="font-semibold text-zinc-600 text-xl mb-4 text-center uppercase max-sm:text-sm">Asset Category</div>
    </div>
  </div>

  <div className="max-w-full sm:max-w-[30vw] lg:max-w-[35vw] xl:max-w-[30vw] rounded-lg  shadow-lg bg-white drop-shadow-xl  ">
    <div className="translate-y-2 bg-gradient-to-r  rounded-lg mx-3">
      <AssetsPieChart/>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default Dashboard;
