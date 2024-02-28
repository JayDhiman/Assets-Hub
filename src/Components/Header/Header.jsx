import React from 'react'
import logo1 from '../../assets/logo1.webp'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from './Logoutbtn'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
 
  ]


  return (
    <header className='py-3 shadow bg-transparent absolute z-10 w-full overflow-hidden '>
      
        <nav className='flex items-center justify-center gap-4'>
          <div className='mx-3'>
            
            <Link to='/'
            className='flex items-center justify-center gap-1'>
             
              <div className=''>
               <img src={logo1} alt="" width={40} className="" />
              </div>
              <div className='mt-4'>
              <h1 className='uppercase text-lg text-white max-sm:hidden'>AssetsHub</h1>
              </div>

              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name} className='max-sm:hidden'>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full text-white'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
               <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
       
    </header>
  )
}

export default Header