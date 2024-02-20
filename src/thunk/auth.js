import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {BASE_URL} from '../constant';

export const LoginApi = createAsyncThunk(
  'auth/login',
  async (model, thunkApi) => {
    try {
      let response = await axios.post(`${BASE_URL}/auth/login`, model);
      const responseData = response.data;
      if (response) {
        // console.log('response from API....', responseData.token);
        let token = await AsyncStorage.setItem('jwt-token', responseData.token);
        // console.log('token', token);
      }
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  },
);
