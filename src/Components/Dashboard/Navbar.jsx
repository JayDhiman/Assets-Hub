import React, { useState } from "react";
import logo1 from "../../assets/logo1.webp";
import LogoutBtn from "../Header/Logoutbtn";
import { CgDarkMode } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);

  return (
    <>
      <div className="bg-gray-400 w-auto h-auto">
        <nav className="w-full flex items-center justify-between">
          <div className="mx-6 flex items-center justify-center p-2">
            <div>
              <img src={logo1} alt="" className="w-[40px]" />
            </div>
            <div className="mt-3">
              <h1 className="uppercase text-xl font-primary font-light text-white">
                AssetHub
              </h1>
            </div>
          </div>

          <div className="mx-6 p-2 max-sm:hidden">
            <ul className="flex items-center justify-between gap-2">
              <li className="text-[20px] hover:scale-125 duration-200">
                <CgDarkMode />
              </li>

              {/* dropdown menu */}

              <li>
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={toggleProfileDropdown}
                    >
                      Profile
                      <div className="text-lg mt-[2px]">
                        <IoIosArrowDown />
                      </div>
                    </button>
                  </div>

                  {isProfileOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer text-sm transition-colors duration-300">
                           Profile
                        </div>
                        <div className="block px-4 py-1 text-gray-800 hover:bg-gray-100 cursor-pointer text-sm transition-colors duration-300">
                          <LogoutBtn value={"Logout"}/>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
