import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import themeToggleSlice  from "./ThemeToggle";
import softwareSlice from './SoftwareSlice'
import assetsSlice from './AssetsSlice'
const store  = configureStore({
    reducer:{
        auth : authSlice,
        toggleTheme: themeToggleSlice,
        software: softwareSlice,
        assets:assetsSlice
    }
})

export default store