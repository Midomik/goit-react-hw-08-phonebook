import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const { data } = await instance.post('/users/login', userData);
      setToken(data.token);

      console.log(data);
      return data;
    } catch (error) {
      console.log('sadsadsad');
      console.log(error.request.status);
      return thunkApi.rejectWithValue(error.request.status);
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      console.log(userData);
      const { data } = await instance.post('/users/signup', userData);
      setToken(data.token);

      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateThunk = createAsyncThunk(
  'auth/update',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;

      setToken(token);

      const { data } = await instance.get('/users/current');

      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (!token) return false;
      return true;
    },
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logOut',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.post('/users/logout');

      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  error: null,
  authenticated: false,
  token: null,
  userData: null,
};

const AuthSlice = createSlice({
  name: 'contacts',

  initialState,

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = payload.token;
        state.userData = payload.user;
        toast.success(`Welcome ${payload.user.name}!!! `, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authenticated = true;
        state.token = payload.token;
        state.userData = payload.user;
        toast.success(`Welcome ${payload.user.name}!!! `, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(updateThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authenticated = true;
        state.userData = payload;

        toast.success(`Welcome ${payload.name}!!! `, {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .addCase(logOutThunk.fulfilled, (state, { payload }) => {
        toast.success(`Bye ${state.userData.name} ( `, {
          position: toast.POSITION.TOP_CENTER,
        });
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          loginThunk.pending,
          registerThunk.pending,
          updateThunk.pending,
          logOutThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          registerThunk.rejected,
          updateThunk.rejected,
          logOutThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
          const err =
            payload === 400 ? 'Error: Invalid credentials!' : 'Server Error!';
          toast.error(`${err} `, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      );
  },
});

// export const { filterContactList } = Auth.actions;

export const authReducer = AuthSlice.reducer;
