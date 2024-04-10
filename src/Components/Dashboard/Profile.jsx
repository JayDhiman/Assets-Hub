import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import authService from "../../Appwrite/Authservice";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await authService.currentUser();
      console.log(userData)
      setUser(userData);
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    // <Layout>
    //   <div className="overflow-auto ">
    //     <div className="flex justify-start items-center mx-3 mb-8">
    //       <h1 className="text-2xl font-medium">Profile</h1>
    //     </div>

    //     <div className="flex items-center rounded-lg p-4 container mx-auto  ">

    //       {user && (
    //         <div className="mx-auto px-3 container bg-slate-200 rounded-lg shadow-lg">
    //           <div className="flex items-center p-3">



    //             <div className="   h-36 w-36 bg-gray-300 rounded-full flex items-center justify-center mr-4">
    //               <span className="text-[80px]">{user.name.charAt(0).toUpperCase()}</span>
    //             </div>
    //             <div>
    //               <div className="text-lg font-semibold">{user.name}</div>
    //               <div className="text-gray-600">{user.email}</div>
    //               <div className="text-sm font-semibold"> Registration -{user.registration}</div>

    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </Layout>
    <Layout>
      
    </Layout>
  );
};

export default Profile;
