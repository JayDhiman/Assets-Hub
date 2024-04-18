import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {

  const [sidebarOpen,setSidebarOpen]= useState(false)
  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen)

  return (
    <>
      <div className="flex h-screen overflow-hidden w-auto bg-zinc-100 ">
        <div className=" py-4">
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebarOpen={toggleSidebarOpen} />
        </div>

        <div className="flex flex-col w-full overflow-hidden">
          <Navbar toggleSidebarOpen={toggleSidebarOpen} />

          <div className="flex-grow flex overflow-y-auto">
            <div className="flex-grow overflow-y-auto " >{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
