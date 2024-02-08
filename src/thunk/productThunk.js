import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllProducts = createAsyncThunk(
  'getAllProducts',
  async (model, thunkAPI) => {
    try {
      let data = await axios.get('https://fakestoreapi.com/products');
      return data;
    } catch (error) {
      return error;
    }
  },
);
