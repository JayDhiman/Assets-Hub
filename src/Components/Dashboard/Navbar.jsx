import React, { useState } from "react";
import logo1 from "../../assets/logo1.webp";
import LogoutBtn from "../Header/Logoutbtn";
// import { CgDarkMode } from "react-icons/cg";
// import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/ThemeToggle";

import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.toggleTheme.theme);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // const [navMenu,setNavMenu] =useState(false) // for the hamburger menu

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Dispatch the toggleTheme action
  };

  const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);

  return (
    <>
      <div className={`w-auto h-auto dark`}>
        <nav
          className={`w-full flex items-center justify-between ${
            theme === "dark" ? "dark text-white" : "bg-stone-900"
          }`}
        >
          <div className="mx-6 flex items-center justify-center p-2">
            <div>
              <img src={logo1} alt="" className="w-[40px]" />
            </div>
            <div className="mt-3">
              <h1
                className={`uppercase text-xl font-primary font-light  ${
                  theme === "dark" ? " text-black" : "text-white"
                }  max-sm:hidden`}
              >
                AssetHub
              </h1>
            </div>
          </div>

          <div className="mx-6 max-sm:mx-3 p-2 ">
            <ul className="flex items-center justify-between gap-2">
              <li
                className={`text-[27px] hover:scale-110 duration-200   ${
                  theme === "dark" ? " dark text-black" : "text-white"
                } max-sm:text-[15px]`}
              >
                {/* <button className="pt-[4px] mt-1"
       onClick={handleToggleTheme}>
        {theme === "dark" ? <MdOutlineLightMode /> : <CgDarkMode />}
      </button> */}
              </li>

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
              {/* || (
    <div className="">
    <RiMenu3Line
    className={`sm:hidden text-white`}
    onClick={()=>setNavMenu(!navMenu)} />
</div>
  )
} */}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
