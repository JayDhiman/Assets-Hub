import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import authService from './Appwrite/Authservice'
import {login, logout} from "./store/AuthSlice"
import  Header  from './Components/Header/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.currentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className=''>
      <div className='w-full block'>
       
        <main>
        <Outlet />
        </main>
       
      </div>
    </div>
  ) : null
}

export default App