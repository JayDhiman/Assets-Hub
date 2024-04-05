import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <div className="  shadow-xl">
          <Sidebar />
        </div>

        <div className="flex flex-col w-full">
          <Navbar />
          <div className="flex-grow flex overflow-hidden">
            <div className="flex-grow overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
