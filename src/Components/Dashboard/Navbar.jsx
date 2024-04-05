import React, { useState } from "react";
import LogoutBtn from "../Header/Logoutbtn";
import { CgDarkMode } from "react-icons/cg";
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/ThemeToggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.toggleTheme.theme);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);

  return (
    <>
      <div className={`w-auto h-auto dark border-b`}>
        <nav
          className={`w-full flex items-center justify-end ${
            theme === "dark" ? "dark text-white" : ""
          }`}
        >
          <div className="mx-6 max-sm:mx-3 p-2 ">
            <ul className="flex items-center justify-end gap-2">
              {/* dropdown menu */}
              <li>
                <div className={`relative inline-block text-left `}>
                  <div>
                    <button
                      type="button"
                      className={`inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white  text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  m-[2px] px-[9px] py-[5px] ${
                        theme === "dark"
                          ? "bg-stone-800 text-black hover:bg-stone-900 hover:text-white "
                          : "hover:bg-slate-200 "
                      }`}
                      onClick={toggleProfileDropdown}
                    >
                      J
                    </button>
                  </div>

                  {isProfileOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
                          <Link to={"/dashboard/profile"}>Profile</Link>
                        </div>
                        <div className="block px-4 py-1 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
                          <LogoutBtn value={"Logout"} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>

              <li
                className={`text-[27px] hover:scale-110 duration-200   ${
                  theme === "dark" ? " dark text-black" : "text-white"
                } max-sm:text-[15px]`}
              >
                <button className="pt-[4px] mt-1" onClick={handleToggleTheme}>
                  {theme === "dark" ? <MdOutlineLightMode /> : <CgDarkMode />}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
