import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex h-full">
        <div>
          <Sidebar />
        </div>
        <div className="w-full overflow-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
