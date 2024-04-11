import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import authService from "../../Appwrite/Authservice";
import bg from '../../assets/bg.jpeg'

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await authService.currentUser();

      setUser(userData);
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <Layout>
   <div className="relative w-full container max-w-[80vw] mx-auto drop-shadow-xl">
  <div className="bg-slate-200 w-full h-48 drop-shadow-xl rounded-lg py-2 my-6 mt-10 relative">
    {/* Background Image */}
    <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover rounded-lg" />

    {/* User Profile */}
    {user && (
      <div className="absolute bottom-0 left-0 flex items-center justify-start gap-3 p-6">
        <div className="flex items-center justify-center rounded-full bg-blue-100 w-32 h-32 md:w-20 md:h-20 sm:w-14 sm:h-14 max-sm:w-12 max-sm:h-12 border-[1px] text-5xl">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-semibold text-xl text-white">
            Name: <span className="font-light">{user.name}</span>
          </div>
          <div className="text-[15px] text-white">
            Email: <span className="text-white">{user.email}</span>
          </div>
        </div>
      </div>
    )}
  </div>
</div>


 {/* Details section */}
      <div className="flex items-center justify-start w-full  container max-w-[80vw] mx-auto gap-4 h-auto ">
       
        <div className=" bg-white w-full h-full drop-shadow-2xl rounded-lg py-2 flex items-center justify-center gap-2 ">
       
       <div className="flex items-center justify-center  gap-3">
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

       <div className="border-r h-48  border-l-black"></div>

       <div className="flex items-center justify-center  gap-3">
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
       <div className="border-r h-48  border-l-black"></div>

       <div className="flex items-center justify-center  gap-3">
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
      </div>
    </Layout>
  );
};

export default Profile;
