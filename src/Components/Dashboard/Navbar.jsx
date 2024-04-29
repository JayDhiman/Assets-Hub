import React, { useEffect, useRef, useState } from "react";
import LogoutBtn from '../HeaderFolder/LogoutBtn';
import { IoIosNotificationsOutline } from "react-icons/io";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/ThemeToggle";
import { Link } from "react-router-dom";
import authService from "../../Appwrite/Authservice";
import { RxHamburgerMenu } from "react-icons/rx";


const Navbar = ({toggleSidebarOpen}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.toggleTheme.theme);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const [user,setUser] = useState(null)
  
  useEffect(()=>{
    fetchUser()
  },[])
  
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);


  
  const fetchUser = async() =>{
    try {
      const user = await authService.currentUser()
      setUser(user)

    } catch (error) {
      console.log(error,"Something went Wrong")
    }
  }

  
  return (
    <>
      <div ref={profileRef} className={`w-auto h-auto dark`}>
        <nav
          className={`w-full  flex items-center justify-end  ${
            theme === "dark" ? "dark text-white" : ""
          } `}
        >
          <div className="sm:hidden  text-start ">
              <button
              onClick={toggleSidebarOpen}
               className="sm:hidden max-sm:block">
                <RxHamburgerMenu/>
              </button>
            </div>
          <div className="mx-6 max-sm:mx-3 p-2 ">
            
            <ul className="flex items-center justify-end gap-2">
              {/* dropdown menu */}
              <li>
                <div className={`relative inline-block text-center `}>
                  <div className=""> 
                    <button
                      type="button"
                      className={`inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white  text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  m-[2px] px-[10px] py-[5px] ${
                        theme === "dark"
                          ? "bg-stone-800 text-black hover:bg-stone-900 hover:text-white "
                          : "hover:bg-slate-200 "
                      }`}
                      onClick={toggleProfileDropdown}
                    >
                      {user &&(
                        <span>{user.name.charAt(0)}</span>
                      )}
                    </button>
                   
                  </div>

                  {isProfileOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <div className="block mx-2 px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
                          <Link to={"/dashboard/profile"}>Profile</Link>
                        </div>
                        <div className="block border-b mx-2 px-4 py-1 text-gray-800 hover:bg-gray-200 cursor-pointer text-sm transition-colors duration-300">
                          <LogoutBtn value={"Logout"} />
                        </div>
                        <div
                   className={`text-[12px] block text-center hover:scale-110 duration-200   ${
                  theme === "dark" ? " dark text-black" : "text-white"
                } max-sm:text-[15px]`}
              >
                <button className="pt-[4px] mt-1" onClick={handleToggleTheme}>
                  {/* {theme === "dark" ? <MdOutlineLightMode /> : <CgDarkMode />} */}dark
                </button>
              </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>

              <li className="">
        <div className="relative inline-block text-center">
          <IoIosNotificationsOutline
            className="text-[24px] mt-2"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Upcoming Feature"

          />
          <ReactTooltip id="my-tooltip" />
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
