import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../constant';

export const LoginApi = createAsyncThunk(
  'auth/login',
  async (model, thunkApi) => {
    try {
      let response = await axios.post(`${BASE_URL}/auth/login`, model);
      const responseData = response.data;
      // console.log('#####', toString(responseData?.token));
      if (response) {
        await AsyncStorage.setItem('token', responseData?.token);
      }
      return responseData;
    } catch (error) {
      console.log(error);
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (model, thunkAPi) => {
    try {
      let res = {data: {status: 200}};
      // await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      return res.data;
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  },
);
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
