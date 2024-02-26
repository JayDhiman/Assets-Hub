import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'light', // Initial theme is set to 'light'
    status: false   // Initial status
};

 const themeToggleSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        // Action to toggle the theme
        toggleTheme: (state) => {
            // Toggle the theme between 'light' and 'dark'
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
    },
});

// Export the action creator
export const { toggleTheme } = themeToggleSlice.actions;

// Export the reducer
export default themeToggleSlice.reducer;