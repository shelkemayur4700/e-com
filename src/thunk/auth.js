import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginApi = createAsyncThunk(
  'auth/login',
  async (model, thunkApi) => {
    try {
      let response = await axios.post(`${BASE_URL}/auth/login`, model);
      const responseData = response.data;
      console.log('#####', toString(responseData?.token));
      if (response) {
        await AsyncStorage.setItem('token', responseData?.token);
      }
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data);
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
