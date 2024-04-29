import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../Appwrite/Authservice';
import { logout } from '../../store/AuthSlice';

const  LogoutBtn = ({ className, value, ...props }) =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            // Handle any logout errors here
            console.error('Logout failed:', error);
        }
    };

    return (
        <button
            className={`inline-bock py-2 ${className}`}
            {...props}
            onClick={logoutHandler}
        >
            {value}
        </button>
    );
}

export default LogoutBtn;
