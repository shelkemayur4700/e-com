import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL} from '../constant';

// METHoD TO CREATE ADDRESS
export const createAddressAPI = createAsyncThunk(
  'createAddress',
  async (model, thunkApi) => {
    try {
      console.log('model of add address', model);
      let response = await axios.post(
        `${BASE_URL}/address//add/${model.id}`,
        model,
      );
      console.log('Response from API addresss', response);
      const responseData = response?.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
// METHOD TO GET ALL ADDRESS OF SPECIFIC USER
export const getallAddressAPI = createAsyncThunk(
  'getAlladdress',
  async (model, thunkApi) => {
    try {
      console.log('model of get all  address', model);
      let response = await axios.get(
        `${BASE_URL}/address/user/${model.userid}`,
      );
      //   console.log('API RES', response);
      const responseData = response?.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
// METHOD TO GET SINGLE ADDRESS
export const getSingleAddress = createAsyncThunk(
  'getSingleaddress',
  async (model, thunkApi) => {
    try {
      console.log('model of get all  address', model);
      let response = await axios.get(`${BASE_URL}/address/${model.AddId}`);
      //   console.log('API RES', response);
      const responseData = response?.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
// METHOD TO UPDATE SINGLE ADDRESS
export const updateAddress = createAsyncThunk(
  'updateaddress',
  async (model, thunkApi) => {
    try {
      console.log('model of get all  address', model);
      let response = await axios.put(
        `${BASE_URL}/address/update/${model.AddId}`,
        model,
      );
      console.log('update API  RES', response);
      const responseData = response?.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
// METHOD TO DELETE SINGLE ADDRESS
export const deleteAddress = createAsyncThunk(
  'deleteaddress',
  async (model, thunkApi) => {
    try {
      console.log('model of delete address', model);
      let response = await axios.delete(
        `${BASE_URL}/address/delete/${model?.AddId}`,
        model,
      );
      console.log('update API  RES', response);
      const responseData = response?.data;
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

//GOOGLE MAP API CALL TO RETURN EXACT LOCATION
export const getLocation = createAsyncThunk(
  'getLocation',
  async (model, thunkApi) => {
    try {
      console.log('model of delete address', model);
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${model?.latitude},${model?.longitude}&key=AIzaSyAYcjEtvFQ38XExgdVHOL7kghZiUtb6LLw`,
      );
      const responseData = response?.data;
      // console.log('google API  RES', responseData.results[0]);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
