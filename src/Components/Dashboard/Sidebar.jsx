import React, { useEffect, useState } from 'react';
import logo1 from "../../assets/logo1.webp";
import { Link } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { FaRegUser } from 'react-icons/fa';
import { TbCategoryPlus } from 'react-icons/tb';
import { SiBmcsoftware } from 'react-icons/si';
import { MdOutlineWebAsset } from 'react-icons/md';
import authService from '../../Appwrite/Authservice';
import LogoutBtn from '../Header/Logoutbtn';
import Modal from 'react-modal';
import { IoIosCloseCircle } from "react-icons/io";
// import Loader from 'react-loader-spinner';

const Sidebar = ({ toggleSidebarOpen, sidebarOpen }) => {
  const [activeLink, setActiveLink] = useState('');
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleProfile = () => setIsProfileOpen(!isProfileOpen);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const fetchedUser = await authService.currentUser();
      setUser(fetchedUser);
    } catch (error) {
      console.log(error, "Something went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const DashboardItems = [
    { id: 1, title: 'Dashboard', slug: '/dashboard', icon: <RxDashboard /> },
    { id: 2, title: 'Employee', slug: '/dashboard/employee', icon: <FaRegUser /> },
    { id: 3, title: 'Assets', slug: '/dashboard/assets', icon: <MdOutlineWebAsset /> },
    { id: 4, title: 'Category', slug: '/dashboard/category', icon: <TbCategoryPlus /> },
    { id: 5, title: 'Software', slug: '/dashboard/software', icon: <SiBmcsoftware /> }
  ];

  return (
    <aside className={`h-screen overflow-auto bg-white ${sidebarOpen ? 'max-sm:absolute w-48 max-sm:transition max-sm:duration-300 ' : 'max-sm:hidden'} flex flex-col relative`}>
      {sidebarOpen && (
        <button
          onClick={toggleSidebarOpen}
          className="absolute right-2 -top-1 ml-2 mt-2 text-red-500 sm:hidden"
        >
          <IoIosCloseCircle />
        </button>
      )}
      <div className="p-4">
        <div className="flex items-center justify-center text-xl rounded-full 0 h-[40px] gap-1">
          <div className="mt-1">
            <img src={logo1} alt="" className="w-[40px]" />
          </div>
          <div className="uppercase font-primary font-light max-sm:hidden mt-3">
            <h1 className="text-xl pt-2">AssetHub</h1>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <ul>
          {DashboardItems.map((items) => (
            <li key={items.id} className={`flex items-center py-2 px-4 text-zinc-700 uppercase ${activeLink === items.id ? 'bg-gray-600' : ''} mx-3 hover:bg-blue-200 hover:scale-105 hover:transtion hover:duration-200`}>
              <Link to={items.slug} className="flex items-center gap-2 hover:scale-105 hover:duration-200">
                <div className={`text-xl transition-all duration-300 transform`}>{items.icon}</div>
                <span className={`block font-primary font-light text-[15px] transition-all duration-300`}>{items.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex-1 absolute bottom-7  w-full border-t mt-1 '>
        <div className="flex  relative items-center justify-center text-xl rounded-full 0 h-[40px] gap-1 mt-6">
          <nav>
            {user ? (
              <button onClick={handleProfile}>
                <div className='flex  items-center justify-center rounded-full bg-blue-100 text-black w-12 h-12'>
                  <span className='text-black'>{user.name.charAt(0)}</span>
                </div>
              </button>
            ) : (
              <button onClick={handleProfile} className="flex items-center justify-center rounded-full bg-blue-100 text-black w-12 h-12">
                {isLoading ? (
                  // <Loader type="ThreeDots" color="#3182CE" height={20} width={20} />l 
                  <button type="button" className="" disabled>
                    <svg class="animate-spin h-5 w-5 mr-3 ... text-white" viewBox="0 0 24 24">

                    </svg>

                  </button>
                ) : (
                  <span>Profile</span>
                )}
              </button>
            )}
          </nav>

          {isProfileOpen && (
            <Modal
              isOpen={isProfileOpen}
              onRequestClose={handleProfile}
              className="fixed bottom-10 left-0 translate-x-2 -translate-y-10 right-4 max-w-[160px] z-50 bg-slate-100 rounded-lg shadow-lg overflow-hidden"
              overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-90 z-40"
            >
              <div className="flex justify-end items-end px-2 py-1">
                <button onClick={handleProfile} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  <IoIosCloseCircle className="text-xl" />
                </button>
              </div>
              <div className="px-6 py-3">
                {isLoading ? (
                  <div className="flex justify-center items-center text-red-400">
                    {/* <Loader type="ThreeDots" color="#3182CE" height={50} width={50} /> */}
                    <button type="button" className="bg-indigo-500 ..." disabled>
                      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">

                      </svg>
                      Processing...
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center items-center flex-col gap-2">
                    <Link to={"/dashboard/profile"} className="text-blue-500 hover:text-blue-700 text-center hover:bg-gray-300 w-full p-2 rounded-lg font-semibold">Profile</Link>
                    <div className='"text-blue-500  text-center hover:bg-gray-300 w-full  rounded-lg font-semibold'>
                      <LogoutBtn value={"Logout"} />
                    </div>
                  </div>
                )}
              </div>
            </Modal>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
