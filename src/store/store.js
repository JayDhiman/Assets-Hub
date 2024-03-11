import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import themeToggleSlice  from "./ThemeToggle";

import assetsSlice from './AssetsSlice'
const store  = configureStore({
    reducer:{
        auth : authSlice,
        toggleTheme: themeToggleSlice,

        assets:assetsSlice
    }
})

export default store