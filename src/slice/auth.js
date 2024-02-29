import {createSlice} from '@reduxjs/toolkit';
import {LoginApi} from '../thunk/auth';

const initialState = {
  loading: false,
  isAuth: false,
  token: null,
};
const authSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(LoginApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(LoginApi.fulfilled, (state, action) => {
        console.log('payload...', action?.payload);
        state.token = action?.payload?.token;
        state.loading = false;
      })
      .addCase(LoginApi.rejected, (state, action) => {
        console.log('payload...', action);
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
