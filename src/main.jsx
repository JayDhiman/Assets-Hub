import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Pages/Home'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login  from './Components/Login.jsx'
import SignupPage from './Pages/SignupPage'
import App from './App.jsx'
import AuthLayout from  './Components/AuthLayout'
import Dashboard from './Pages/Dashboard/Dashboard'
import Assets from './Pages/Dashboard/Assets'
import Category from './Pages/Dashboard/Category'
import Employee from './Pages/Dashboard/Employee'
import Software from './Pages/Dashboard/Software'
import Profile from './Components/Dashboard/Profile'
import EmployeeProfile from './Pages/Dashboard/EmployeeProfile'
import SoftwareData from './Components/Dashboard/Software/SoftwareData'
import AsssignedAssets from './Components/Dashboard/Assetss/AsssignedAssets'



const router  = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:
        <AuthLayout authentication={false}>
          <Login/>

        </AuthLayout>
      },{
        path: '/signup',
        element:
        <AuthLayout authentication={false}>
          <SignupPage/>

        </AuthLayout>
      },

      {
        path: '/dashboard',
        element:
        <AuthLayout authentication={true} >
          <Dashboard/>

        </AuthLayout>
      }
      ,{
        path: '/dashboard/assets',
        element:
        <AuthLayout authentication={true}>
          <Assets/>          

        </AuthLayout>
      }
      ,{
        path: '/dashboard/category',
        element:
        <AuthLayout authentication={true}>
          <Category/>         

        </AuthLayout>
      }
      ,{
        path: '/dashboard/employee',
        element:
        <AuthLayout authentication={true}>
          <Employee/>         

        </AuthLayout>
      }
      ,{
        path: '/dashboard/software',
        element:
        <AuthLayout authentication={true}>
          <Software/>         

        </AuthLayout>
      },{
        path: '/dashboard/profile',
        element:
        <AuthLayout authentication={true}>
          <Profile/>         

        </AuthLayout>
      },
      {
        path: "/dashboard/employeeData/:employee_id",
        element:
        <AuthLayout authentication={true}>
          <EmployeeProfile/>

        </AuthLayout>
      },
      {
        path: "/dashboard/software/:software_id",
        element:
        <AuthLayout authentication={true}>
        <SoftwareData/>

        </AuthLayout>
      },
      {
        path: "/dashboard/assets/:serialNO",
        element:
        <AuthLayout authentication={true}>
        <AsssignedAssets/>

        </AuthLayout>
      }
    ]
  }

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>

  </React.StrictMode>,
)
