import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import functionAPI from '../../scripts/functionAPI';
import authAPI from '../../scripts/authAPI';
import { setToken } from './authSlice';

export const callDeviceFunction = createAsyncThunk(
  'function/callDeviceFunction',
  async (args, thunkAPI) => {
      try {
          let state = thunkAPI.getState();
          const refreshToken = await authAPI.refreshToken(state.auth.token, state.auth.username, state.auth.password);
          thunkAPI.dispatch(setToken(refreshToken));

          const response = await functionAPI.callDeviceFunction(args.data, refreshToken);
          return response;
      } catch (err) {
          throw new Error(err.response && err.response.data ? err.response.data : err.message);
      }
  }
);

export const getDeviceFunctions = createAsyncThunk(
  'function/getDeviceFunctions',
  async (args, thunkAPI) => {
      try {
          let state = thunkAPI.getState();
          const refreshToken = await authAPI.refreshToken(state.auth.token, state.auth.username, state.auth.password);
          thunkAPI.dispatch(setToken(refreshToken));

          const response = await functionAPI.getDeviceFunctions(refreshToken);
          return response;
      } catch (err) {
          throw new Error(err.response && err.response.data ? err.response.data : err.message);
      }
  }
);

const initialState = {
  loading: false,
  error: null,
  response: null,
  functions: null,
};

const functionSlice = createSlice({
  name: 'function',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [callDeviceFunction.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.response = null;
    },
    [callDeviceFunction.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [callDeviceFunction.fulfilled]: (state, action) => {
      state.loading = false;
      state.response = action.payload;
    },
    [getDeviceFunctions.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.functions = null;
    },
    [getDeviceFunctions.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [getDeviceFunctions.fulfilled]: (state, action) => {
      state.loading = false;
      state.functions = action.payload.functions;
    },
  }
});

//export const {  } = functionSlice.actions;
export default functionSlice.reducer;