import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import authService from "../../Appwrite/Authservice";

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const user = await authService.currentUser()
      console.log(user)
      setUser(user)

    } catch (error) {
      console.log("seomething went wrong");
    }
  }

  return (
    <Layout>
      <div className="flex overflow-auto border-b">
        <div className="w-full overflow-hidden">
          <div className="m-4 ">
            <h1 className="text-2xl font-primary mx-1 font-medium ">Profile</h1>
            {/* <h2 className="uppercase text-[15px] mx-1 mb-2 ">
              Dashboard / Profile
            </h2> */}
          </div>
        </div>




      </div>
      <div>

        {user && (


          // console.log(user.email)

          <div className="flex items-center justify-center gap-1">
            <div className="">
              <div>
                <button
                  type="button"
                  className={`inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white  text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  m-[2px] px-[9px] py-[5px]
                    `}

                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
              </div>
            </div>
            <div>
            <p>Email: {user.email}</p>

            </div>


            {/* Display other user details as needed */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
