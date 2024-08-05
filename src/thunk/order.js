import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../setting';

//API CALL TO SAVE ORDER DETAILS IN DATABSE
export const SaveOrderDataApi = createAsyncThunk(
  'order/Save',
  async (model, thunkApi) => {
    console.log('model of payment api', model);
    try {
      let response = await axios.post(
        `${BASE_URL}/order/create-order/${model?.id}`,
        model,
      );
      const responseData = response.data;
      // console.log('#####', responseData);
      return responseData;
    } catch (error) {}
  },
);
//API CALL TO GET ALL ORDERS OF USER--
export const getUserOrders = createAsyncThunk(
  'order/AllordersOfUser',
  async (model, thunkApi) => {
    console.log('model of get all users orders', model);
    try {
      let response = await axios.get(
        `${BASE_URL}/order/getUserOrders/${model?.id}`
      );
      const responseData = response.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
//API CALL TO GET ALL DETAILS OF ORDER
export const getOrderDetails = createAsyncThunk(
  'order/OrderDetails',
  async (model, thunkApi) => {
    console.log('model of payment api', model);
    try {
      let response = await axios.get(
        `${BASE_URL}/order/getSingleOrder/${model?.id}`,
        model,
      );
      const responseData = response.data;
      // console.log('#####', responseData);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
//API CALL TO START PAYMENT PROCESS
export const PaymentApi = createAsyncThunk(
  'order/payment',
  async (model, thunkApi) => {
    console.log('model of payment api', model);
    try {
      let response = await axios.post(`${BASE_URL}/order/payment`, model);
      const responseData = response.data;
      // console.log('#####', responseData);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
