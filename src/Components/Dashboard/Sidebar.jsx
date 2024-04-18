import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { FaRegUser } from 'react-icons/fa';
import { TbCategoryPlus } from 'react-icons/tb';
import { SiBmcsoftware } from 'react-icons/si';
import { MdOutlineWebAsset } from 'react-icons/md';
import { IoIosCloseCircle } from "react-icons/io";
import logo1 from "../../assets/logo1.webp";

const Sidebar = ({ toggleSidebarOpen, sidebarOpen }) => {
  const location = useLocation();

  const DashboardItems = [
    { id: 1, title: 'Dashboard', slug: '/dashboard', icon: <RxDashboard /> },
    { id: 2, title: 'Employee', slug: '/dashboard/employee', icon: <FaRegUser /> },
    { id: 3, title: 'Assets', slug: '/dashboard/assets', icon: <MdOutlineWebAsset /> },
    { id: 4, title: 'Category', slug: '/dashboard/category', icon: <TbCategoryPlus /> },
    { id: 5, title: 'Software', slug: '/dashboard/software', icon: <SiBmcsoftware /> }
  ];

  return (
    <aside className={`fixed bg-gradient-to-b from-neutral-600 to-neutral-900 rounded-xl h-full overflow-auto text-white ${sidebarOpen ? 'max-sm:absolute z-50 bg-zinc-700 rounded-xl w-44 max-sm:transition max-sm:duration-300' : 'max-sm:hidden'} flex flex-col relative my-1 mx-2`} >
      {sidebarOpen && (
        <button
          onClick={toggleSidebarOpen}
          className="absolute right-2 -top-1 ml-2 mt-4 text-xl text-red-400 sm:hidden"
        >
          <IoIosCloseCircle />
        </button>
      )}
      <div className="p-4">
        <Link to={"/dashboard"}>
          <div className="flex items-center justify-center text-xl rounded-full h-[40px] gap-1">
            <div className="mt-1">
              <img src={logo1} alt="" className="w-[40px]" />
            </div>
            <div className="uppercase font-primary font-light max-sm:hidden mt-3">
              <h1 className="text-xl pt-2">AssetHub</h1>
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-3">
        <ul>
          {DashboardItems.map((item) => (
            <li key={item.id} className={`flex items-center py-2 px-4 text-slate-100 uppercase ${location.pathname === item.slug ? 'bg-blue-600 rounded-lg' : ''} mx-3 hover:bg-stone-600 hover:scale-105 hover:transition hover:duration-200 hover:rounded-lg`}>
              <Link to={item.slug} className="flex items-center gap-2 hover:scale-105 hover:duration-200">
                <div className={`text-xl transition-all duration-300 transform`}>{item.icon}</div>
                <span className={`block font-primary font-light text-[15px] transition-all duration-300`}>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
