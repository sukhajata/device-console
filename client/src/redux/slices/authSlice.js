import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../../scripts/authAPI';

export const login = createAsyncThunk(
    'auth/login',
    async (args, thunkAPI) => {
        try {
            const response = await authAPI.getToken(args.username, args.password);
            
            return {
                token: response,
                username: args.username,
                password: args.password
            };
        } catch (err) {
            throw Error(err.message);
        }
    }
);

export const getDataToken = createAsyncThunk(
    'auth/getDataToken',
    async (args, thunkAPI) => {
      try {
        let state = thunkAPI.getState(); 
        
        let dataToken = state.auth.dataToken;
        if (!dataToken) {
          dataToken = await authAPI.getDataToken(args.token);
        }

        return dataToken;
      } catch(err) {
        console.log(err);
        throw Error(err.message);
      }
    }
  );

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
        password: null,
        role: null,
        token: null,
        dataToken: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state, action) {
            state.username = null;
            state.password = null;
            state.token = null;
            state.role = null;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setDataToken(state, action) {
            state.dataToken = action.payload;
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.username = null;
            state.password = null;
            state.token = null;
            state.role = null;
        },
        [login.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [login.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.loading = false;
        },
        [getDataToken.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [getDataToken.rejected]: (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        },
        [getDataToken.fulfilled]: (state, action) => {
            state.dataToken = action.payload;
            state.loading = false;
        }
    }
});

export const { logout, setToken, setDataToken } = authSlice.actions;
export default authSlice.reducer;