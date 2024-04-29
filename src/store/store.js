import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import themeToggleSlice  from "./ThemeToggle";


const store  = configureStore({
    reducer:{
        auth : authSlice,
        toggleTheme: themeToggleSlice,
   
    }
})

export default store