import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import  themeToggleSlice  from "./ThemeToggle";
import softwareReducer from './SoftwareSlice'
const store  = configureStore({
    reducer:{
        auth : authSlice,
        toggleTheme: themeToggleSlice,
        software: softwareReducer,
    }
})

export default store