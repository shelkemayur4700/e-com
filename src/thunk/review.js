import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../setting';
//METHOD TO GET REVIEW OF PRODUCT
export const GetReviewApi = createAsyncThunk(
  'review/Get',
  async (id, thunkApi) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/review/get-review?productid=${id}`,
      );
      const responseData = response.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
//METHOD TO CHECK WHEATHER PRODUCT IS PURCHASED BY USER OR NOT
//GET ALL PRODUCTS BOUGHT BY USER TO ADD REVIEW ON IT
export const getAllProdPurchase = createAsyncThunk(
  'review/getAllProdPurchase',
  async (model, thunkApi) => {
    try {
      console.log('model is ', model);
      const response = await axios.get(
        `${BASE_URL}/review/Allprods-User/${model?.id}`,
      );
      const responseData = response.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
//METHOD TO ADD REVIEW IN PRODUCT
export const CreateReviewApi = createAsyncThunk(
  'review/Create',
  async (model, thunkApi) => {
    try {
      console.log('model is from thunk', model);
      const response = await axios.post(
        `${BASE_URL}/review/add-review?userid=${model?.userid}&productid=${model?.productid}`,
        model.formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const responseData = response.data;
      // console.log responseData);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
//METHOD TO GET ALL REVIEW'S OF A PRODUCT
export const GetAllProductReview = createAsyncThunk(
  'review/getAllProductReview',
  async (model, thunkApi) => {
    try {
      console.log('model is from thunk', model);
      const response = await axios.get(
        `${BASE_URL}/review/get-review/${model?.id}`,
      );
      const responseData = response.data;
      // console.log('#####', responseData);

      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
//METHOD TO GET ALL REVIEW'S OF A PRODUCT
export const GetAllUserReview = createAsyncThunk(
  'review/getAllUserReview',
  async (model, thunkApi) => {
    try {
      console.log('model is from thunk', model);
      const response = await axios.get(
        `${BASE_URL}/review/getreview-user/${model?.id}`,
      );
      const responseData = response.data;
      // console.log('#####', responseData);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
