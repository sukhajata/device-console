import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import configAPI from '../../scripts/configAPI';
import authAPI from '../../scripts/authAPI';
import { setToken } from './authSlice';

const getToken = async (thunkAPI) => {
  let state = thunkAPI.getState();
  const refreshToken = await authAPI.refreshToken(state.auth.token, state.auth.username, state.auth.password);
  thunkAPI.dispatch(setToken(refreshToken));

  return refreshToken;
}

export const getConfigField = createAsyncThunk(
  'config/getConfigField',
  async (args, thunkAPI) => {
      try {
          let token = await getToken(thunkAPI);
          const response = await configAPI.getConfigField(args.deviceEUI, args.slot, args.fieldName, token);
          return response;
      } catch (err) {
          throw new Error(err.response && err.response.data ? err.response.data : err.message);
      }
  }
);

export const getAllConfig = createAsyncThunk(
  'config/getAllConfig',
  async (args, thunkAPI) => {
      try {
          let token = await getToken(thunkAPI);
          const response = await configAPI.getAllConfig(args.identifier, args.slot, token);
          return response;
      } catch (err) {
          throw new Error(err.response && err.response.data ? err.response.data : err.message);
      }
  }
);

export const setConfigField = createAsyncThunk(
  'config/setConfigField',
  async (args, thunkAPI) => {
      try {
          let token = await getToken(thunkAPI);
          const response = await configAPI.setConfigField(args.deviceEUI, args.slot, args.fieldName, args.value, token);
          return response;
      } catch (err) {
          throw new Error(err.response && err.response.data ? err.response.data : err.message);
      }
  }
);

const initialState = {
  loading: false,
  error: null,
  configField: null,
  configFields: [],
  response: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getConfigField.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
      state.configField = null;
    },
    [getConfigField.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [getConfigField.fulfilled]: (state, action) => {
      state.loading = false;
      state.configField = action.payload;
    },
    [getAllConfig.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
      state.configFields = [];
    },
    [getAllConfig.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [getAllConfig.fulfilled]: (state, action) => {
      state.loading = false;
      state.configFields = action.payload;
    },
    [setConfigField.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
      state.response = null;
    },
    [setConfigField.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [setConfigField.fulfilled]: (state, action) => {
      state.loading = false;
      state.response = action.payload;
    },
  }
});

export default configSlice.reducer;