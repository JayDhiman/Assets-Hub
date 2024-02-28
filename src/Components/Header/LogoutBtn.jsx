import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../Appwrite/Authservice'
import {logout} from '../../store/AuthSlice'

function LogoutBtn({
  className,
  value,
  ...props
  
}) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className={`inline-bock  py-2  ${className} `}{...props}
    onClick={logoutHandler}
    >{value}</button>
  )
}

export default LogoutBtn