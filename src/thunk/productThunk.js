import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../constant';

export const  getAllProducts = createAsyncThunk(
  'getAllProducts',
  async (model, thunkAPI) => {
    try {
      let data = await axios.get(`${BASE_URL}/products`);
      return data;
    } catch (error) {
      return error;
    }
  },
);

export const getSingleProduct = createAsyncThunk(
  'product/SingleProduct',
  async (model, thunkApi) => {
    try {
      let res = await axios.get(`${BASE_URL}/products/${model}`);

      const responseData = res.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  },
);
