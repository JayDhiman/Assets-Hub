import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assetsData: [],
  status: 'idle',
  error: null
}

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAssetsStart: (state) => {
      state.status = 'loading';
    },
    addAssetsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.assetsData = [...state.assetsData, action.payload];;
    },
    addAssetsFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    updateAssetsStart: (state) => {
      state.status = 'loading';
    },
    updateAssetsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.assetsData = state.assetsData.map(asset => 
        asset.id === action.payload.id ? action.payload : asset
      );
    },
    updateAssetsFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    deleteAssetsStart: (state) => {
      state.status = 'loading';
    },
    deleteAssetsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.assetsData = state.assetsData.filter(asset => 
        asset.id !== action.payload
      );
    },
    deleteAssetsFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    getAssetsStart: (state) => {
      state.status = 'loading';
    },
    getAssetsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.assetsData = action.payload;
    },
    getAssetsFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    }
  }
});

export const {
  addAssetsStart,
  addAssetsSuccess,
  addAssetsFailure,
  updateAssetsStart,
  updateAssetsSuccess,
  updateAssetsFailure,
  deleteAssetsStart,
  deleteAssetsSuccess,
  deleteAssetsFailure,
  getAssetsStart,
  getAssetsSuccess,
  getAssetsFailure
} = assetsSlice.actions;

export default assetsSlice.reducer;

// Asynchronous action creators
export const addAssets = (assetData) => async (dispatch) => {
  try {
    dispatch(addAssetsStart());
    const response = await axios.post('http://localhost:3000/Assets', assetData);
    dispatch(addAssetsSuccess(response.data));
  } catch (error) {
    dispatch(addAssetsFailure(error.message));
  }
};

export const updateAssets = (assetData) => async (dispatch) => {
  try {
    dispatch(updateAssetsStart());
    const response = await axios.put(`http://localhost:3000/Assets/${assetData}`, assetData);
    dispatch(updateAssetsSuccess(response.data));
  } catch (error) {
    dispatch(updateAssetsFailure(error.message));
  }
};

export const deleteAssets = (assetId) => async (dispatch) => {
  try {
    dispatch(deleteAssetsStart());
    await axios.delete(`http://localhost:3000/Assets/${assetId}`);
    dispatch(deleteAssetsSuccess(assetId));
  } catch (error) {
    dispatch(deleteAssetsFailure(error.message));
  }
};

export const getAssets = () => async (dispatch) => {
  try {
    dispatch(getAssetsStart());
    const response = await axios.get('http://localhost:3000/Assets');
    dispatch(getAssetsSuccess(response.data));
  } catch (error) {
    dispatch(getAssetsFailure(error.message));
  }
};
