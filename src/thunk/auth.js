import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../constant';
// ----------------SIGN UP API
export const SignUpApi = createAsyncThunk(
  'auth/SignUp',
  async (model, thunkApi) => {
    console.log('model', model);
    try {
      let response = await axios.post(`${BASE_URL}/auth/signup`, model);
      const responseData = response.data;
      console.log('#####', toString(responseData?.token));
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
// ----------------SIGN IN API
export const SignInApi = createAsyncThunk(
  'auth/SignIn',
  async (model, thunkApi) => {
    console.log('model', model);
    try {
      let response = await axios.post(`${BASE_URL}/auth/signin`, model);
      const responseData = response.data;
      // console.log('#####', toString(responseData?.token));
      if (response) {
        await AsyncStorage.setItem('token', responseData?.token);
      }
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
// ----------------FORGET PASS API
export const ForgetPassApi = createAsyncThunk(
  'auth/forgetPass',
  async (model, thunkApi) => {
    try {
      console.log('model of forget pass', model?.Email);
      let response = await axios.post(
        `${BASE_URL}/auth/forget-password`,
        model,
      );
      const responseData = response.data;
      console.log('responsedata', responseData);
      if (response) {
        await AsyncStorage.setItem('token', responseData?.token);
        await AsyncStorage.setItem('userID', responseData?.userID);
      }
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
// ----------------OTP VALIDATE API
export const OtpValidateApi = createAsyncThunk(
  'auth/OtpValidate',
  async (model, thunkApi) => {
    try {
      console.log('otp model ', model);
      let response = await axios.post(
        `${BASE_URL}/auth/otp-validate`,
        {otp: model.otp},
        {
          headers: {
            Authorization: `${model.token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const responseData = response.data;

      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
// ----------------SETUP NEW PASSWORD API
export const NewpassApi = createAsyncThunk(
  'auth/NewPassword',
  async (model, thunkApi) => {
    console.log('model', model);
    const {Password, User, token} = model;
    try {
      let response = await axios.post(
        `${BASE_URL}/auth/reset-password/${User}`,
        {Password},
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const res = response.data;
      return res;
    } catch (error) {
      console.log('new password thunk', error);
      return thunkApi.rejectWithValue(error);
    }
  },
);

// ---------------- METHOD TO LOGOUT USER
export const logout = createAsyncThunk(
  'auth/logout',
  async (model, thunkApi) => {
    try {
      let res = {data: {status: 200}};
      // await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
// ----------------METHOD TO CHECK AUTHORIZATION
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (model, thunkApi) => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
);
