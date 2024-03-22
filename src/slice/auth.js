import {createSlice} from '@reduxjs/toolkit';
import {LoginApi, checkAuthStatus} from '../thunk/auth';

const initialState = {
  loading: false,
  isAuth: false,
  token: null,
};
const authSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    logoutUser: state => {
      state.token = null;
    },
  },
  extraReducers: builder => {
    // login
    builder.addCase(LoginApi.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(LoginApi.fulfilled, (state, action) => {
      // console.log('payload...', action?.payload);
      state.token = action?.payload?.token;
      state.loading = false;
    });
    builder.addCase(LoginApi.rejected, (state, action) => {
      // console.log('payload...', action);
      state.loading = false;
    });

    // checkAuthStatus
    builder.addCase(checkAuthStatus.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action?.payload?.token;
      }),
      builder.addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
      });
  },
});
export const {logoutUser} = authSlice.actions;
export default authSlice.reducer;
