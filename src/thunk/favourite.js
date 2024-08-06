import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../setting';

//METHOD TO ADD REVIEW IN PRODUCT
export const AddFavourite = createAsyncThunk(
  'favourite/Create',
  async (model, thunkApi) => {
    try {
      console.log('model is from thunk', model);
      const response = await axios.post(
        `${BASE_URL}/favourite/add-fav?userid=${model?.userid}&productid=${model?.productid}`,
        model?.isFavourite,
      );
      const responseData = response.data;
      // console.log responseData);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
//METHOD TO ADD REVIEW IN PRODUCT
export const GetFavourites = createAsyncThunk(
  'favourite/get',
  async (model, thunkApi) => {
    try {
      console.log('model is from thunk', model);
      const response = await axios.get(
        `${BASE_URL}/favourite/get-fav/${model}`,
      );
      const responseData = response.data;
      // console.log responseData);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
//METHOD TO ADD REVIEW IN PRODUCT
export const DeleteFavourite = createAsyncThunk(
  'favourite/delete',
  async (model, thunkApi) => {
    try {
      console.log('model is from thunk', model);
      const response = await axios.delete(
        `${BASE_URL}/favourite/delete-fav?userid=${model?.userid}&productid=${model?.productid}`,
      );
      const responseData = response.data;
      // console.log responseData);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
