import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  softwareList: [],
  status: 'idle',
  error: null,
};

// Define thunk for fetching software list from the server
export const fetchSoftwareList = createAsyncThunk('software/fetchSoftwareList', async () => {
  const response = await axios.get('http://localhost:4000/Software');
  return response.data;
});

// Define thunk for adding new software
export const addSoftware = createAsyncThunk('software/addSoftware', async (softwareData) => {
  const response = await axios.post('http://localhost:4000/Software', softwareData);
  return response.data;
});

// Define thunk for updating existing software
export const updateSoftware = createAsyncThunk('software/updateSoftware', async () => {

  const response = await axios.put(`http://localhost:4000/Software`, updatedData);
  return response.data;
});

// Define thunk for deleting software
export const deleteSoftware = createAsyncThunk('software/deleteSoftware', async (softwareId) => {
  await axios.delete(`http://localhost:4000/Software/${softwareId}`);
  return softwareId;
});

// Create software slice
const softwareSlice = createSlice({
  name: 'software',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSoftwareList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSoftwareList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.softwareList = action.payload;
      })
      .addCase(fetchSoftwareList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSoftware.fulfilled, (state, action) => {
        state.softwareList.push(action.payload);
      })
      .addCase(updateSoftware.fulfilled, (state, action) => {
        const updatedSoftware = action.payload;
        const index = state.softwareList.findIndex((software) => software.id === updatedSoftware.id);
        if (index !== -1) {
          state.softwareList[index] = updatedSoftware;
        }
      })
      .addCase(deleteSoftware.fulfilled, (state, action) => {
        state.softwareList = state.softwareList.filter((software) => software.id !== action.payload);
      });
  },
});

export default softwareSlice.reducer;

// Selectors
export const selectAllSoftware = (state) => state.software.softwareList;
export const selectSoftwareStatus = (state) => state.software.status;
export const selectSoftwareError = (state) => state.software.error;
