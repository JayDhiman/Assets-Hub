import React from "react";
import Layout from "./Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="flex overflow-auto border-b">
        <div className="w-full overflow-hidden">
          <div className="m-4 ">
            <h1 className="text-2xl font-primary mx-1 font-medium ">Profile</h1>
            <h2 className="uppercase text-[15px] mx-1 mb-2 ">
              Dashboard / Profile
            </h2>
          </div>
        </div>
        {/* <div className="m-4 pt-1">
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
        </div> */}
      </div>
    </Layout>
  );
};

export default Profile;
