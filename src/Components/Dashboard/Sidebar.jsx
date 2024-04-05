import React, { useState } from 'react';
import logo1 from "../../assets/logo1.webp";
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { FaRegUser } from 'react-icons/fa';
import { TbCategoryPlus } from 'react-icons/tb';
import { SiBmcsoftware } from 'react-icons/si';
import { MdOutlineWebAsset } from 'react-icons/md';






const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  // const handleActiveLink = (id) => setActiveLink(id);

  // list items for the Dashboard Items
  const DashboardItems = [
    { id: 1, title: 'Dashboard', slug: '/dashboard', icon: <RxDashboard /> },
    { id: 2, title: 'Employee', slug: '/dashboard/employee', icon: <FaRegUser /> },
    { id: 3, title: 'Assets', slug: '/dashboard/assets', icon: <MdOutlineWebAsset /> },
    { id: 4, title: 'Category', slug: '/dashboard/category', icon: <TbCategoryPlus /> },
    { id: 5, title: 'Software', slug: '/dashboard/software', icon: <SiBmcsoftware /> }
  ];

  return (
    <aside className={`h-screen  overflow-auto bg-white w-48 max-sm:hidden`}>
      <div className='relative'>

      {/* <div className='absolute right-0'>
        <button onClick={handleToggleSidebar} className='text-white text-xl pt-2'><BiAlignRight/></button>
      </div> */}
      </div>
      <div className="p-4">
  {/* Profile image */}
 <div className={`flex  items-center justify-center text-xl rounded-full 0  h-[40px] gap-1`}>
  <div className='mt-1'>
    <img src={logo1} alt="" className="w-[40px]" />
  </div>

  <div className='uppercase  font-primary font-light  max-sm:hidden mt-3'>
   <h1 className='text-xl pt-2'>
     AssetHub
    </h1>
    

  </div>
  </div> 
</div>

      <div className="mt-3">
        <ul>
          {DashboardItems.map((items) => (
            <li key={items.id} className={`flex items-center py-2 px-4 text-zinc-700 uppercase ${activeLink === items.id ? 'bg-gray-600' : ''}  mx-3 hover:text-blue-200 hover:scale-105 hover:transtion hover:duration-200`}>
              <Link to={items.slug} className="flex items-center gap-2 hover:scale-105 hover:duration-200">
                <div className={` text-xl  transition-all duration-300 transform `}>{items.icon}</div>
                <span className={`  "block font-primary font-light text-[15px]" transition-all duration-300 `}>{items.title}</span>
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
