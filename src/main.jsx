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
import { Login } from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import App from './App.jsx'
import AuthLayout from  './Components/AuthLayout'

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
          <Signup/>

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
