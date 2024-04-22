import React, { useState } from 'react';
import logo1 from '../../assets/logo1.webp';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutBtn from './Logoutbtn';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'; // Import hamburger menu icons

function Header() {
  const [showMenu, setShowMenu] = useState(false); // State variable for menu visibility
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
  
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    }
  ];

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="py-3 shadow bg-transparent absolute z-10 w-full overflow-hidden">
      <nav className="flex items-center justify-between">
        <div className="mx-3 flex items-center">
          <Link to="/" className="flex items-center gap-1">
            <div>
              <img src={logo1} alt="" width={40} className="" />
            </div>
            <div className="mt-4">
              <h1 className="uppercase text-lg text-white max-sm:hidden">AssetsHub</h1>
            </div>
          </Link>
        </div>

        <div className="mx-3 sm:hidden max-sm:">
          {showMenu ? (
            <RiCloseLine
              className="inline-block cursor-pointer text-white"
              onClick={toggleMenu}
            />
          ) : (
            <RiMenu3Line
              className="inline-block cursor-pointer text-white"
              onClick={toggleMenu}
            />
          )}
        </div>
        <ul className={`flex ml-auto ${ showMenu ? ' bg-blue-600 flex-col text-sm mx-3 mt-4  rounded-lg ' : 'max-sm:hidden '} `}>
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`block px-4 py-2 bg-blue-600 mb-2 duration-200 rounded-lg mr-3 text-white ${showMenu ? '':''} hover:bg-blue-700`}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
