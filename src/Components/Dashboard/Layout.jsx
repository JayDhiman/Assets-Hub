import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {

  const [sidebarOpen,setSidebarOpen]= useState(false)
  const toggleSidebarOpen = () => setSidebarOpen(!sidebarOpen)

  return (
    <>
      <div className="flex h-screen overflow-auto w-auto bg-gray-50">
        <div className=" shadow-xl">
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebarOpen={toggleSidebarOpen} />
        </div>

        <div className="flex flex-col w-full overflow-hidden">
          {/* <Navbar toggleSidebarOpen={toggleSidebarOpen} /> */}
          <div className="flex-grow flex overflow-hidden">
            <div className="flex-grow overflow-auto bg-slate-100">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
