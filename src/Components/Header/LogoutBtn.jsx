import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../Appwrite/Authservice'
import {logout} from '../../store/AuthSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn({
  className,
  value,
  ...props
  
}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/')

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