import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import switchingAPI from '../../scripts/switchingAPI';
import authAPI from '../../scripts/authAPI';
import { setToken } from './authSlice';

export const sendRelayCommand = createAsyncThunk(
  'switching/sendRelayCommand',
  async (args, thunkAPI) => {
      try {
          let state = thunkAPI.getState();
          const refreshToken = await authAPI.refreshToken(state.auth.token, state.auth.username, state.auth.password);
          thunkAPI.dispatch(setToken(refreshToken));

          const response = await switchingAPI.sendRelayCommand(args.data, refreshToken);
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
};

const switchingSlice = createSlice({
    name: 'switching',
    initialState: initialState,
    reducers: {},
    extraReducers: {
      [sendRelayCommand.pending]: (state, action) => {
        state.loading = true;
        state.error = null;
        state.response = null;
      },
      [sendRelayCommand.rejected]: (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
      [sendRelayCommand.fulfilled]: (state, action) => {
        state.loading = false;
        state.response = action.payload;
      },
    }
});


export default switchingSlice.reducer;