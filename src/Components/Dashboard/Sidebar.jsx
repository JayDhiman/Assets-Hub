import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import LogoutBtn from '../Header/Logoutbtn';
import { RxDashboard } from 'react-icons/rx';
import { FaRegUser } from 'react-icons/fa';
import { TbCategoryPlus } from 'react-icons/tb';
import { SiBmcsoftware } from 'react-icons/si';
import { MdOutlineWebAsset } from 'react-icons/md';
// import { IoIosLogOut } from "react-icons/io";
import { BiAlignRight } from "react-icons/bi";




const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  // const handleActiveLink = (id) => setActiveLink(id);

  // list items for the Dashboard Items
  const DashboardItems = [
    { id: 1, title: 'Dashboard', slug: '/dashboard', icon: <RxDashboard /> },
    // { id: 2, title: 'Employee', slug: '/dashboard/employee', icon: <FaRegUser /> },
    { id: 3, title: 'Assets', slug: '/dashboard/assets', icon: <MdOutlineWebAsset /> },
    { id: 4, title: 'Category', slug: '/dashboard/category', icon: <TbCategoryPlus /> },
    { id: 5, title: 'Software', slug: '/dashboard/software', icon: <SiBmcsoftware /> }
  ];

  return (
    <aside className={`h-screen  overflow-auto bg-gray-700 ${!sidebarOpen ? 'w-24 duration-200 ':'duration-200 w-52'} max-sm:hidden`}>
      <div className='relative'>

      <div className='absolute right-0'>
        <button onClick={handleToggleSidebar} className='text-white text-xl pt-2'><BiAlignRight/></button>
      </div>
      </div>
      <div className="p-4">
  {/* Profile image */}
  {/* <div className={`flex  items-center justify-center text-blue-600 text-xl rounded-full bg-slate-100 w-[40px] h-[40px] ${!sidebarOpen ? 'mt-3' : 'mx-auto'}`}>
    A
  </div> */}
</div>

      <div className="mt-3">
        <ul>
          {DashboardItems.map((items) => (
            <li key={items.id} className={`flex items-center py-2 px-4 text-white uppercase ${activeLink === items.id ? 'bg-gray-600' : ''} ${!sidebarOpen ? 'mx-2':'mx-3 '} hover:text-blue-200 hover:scale-105 hover:transtion hover:duration-200`}>
              <Link to={items.slug} className="flex items-center gap-2">
                <div className={`${!sidebarOpen ? 'text-2xl duration-200 transition':'text-xl duration-200 transition'} transition-all duration-300 transform hover:scale-110`}>{items.icon}</div>
                <span className={`${!sidebarOpen ? "hidden": "block font-primary text-[15px]"} transition-all duration-300 `}>{items.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>



{/* 
      <div className="absolute bottom-6 mx-3">
       <div className={`flex items-center uppercase  ${!sidebarOpen ? 'mx-2':'mx-3'}  hover:text-blue-200 hover:scale-105 hover:transtion hover:duration-200`}>
        <span className={`text-white inline-block ${!sidebarOpen ? 'text-2xl':'text-xl'} hover:scale-105`}><IoIosLogOut /></span>
        <div>
  {sidebarOpen ? (
    <LogoutBtn className="text-white text-md px-1 uppercase" value="logout" />
  ) : (
    <LogoutBtn className="text-white text-md px-1 uppercase" value="" />
  )}
</div>
        </div>
          


        
      </div> */}
    </aside>
  );
};

export default Sidebar;
