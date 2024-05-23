import {createSlice} from '@reduxjs/toolkit';
import {
  getLocation,
  getSingleAddress,
  getallAddressAPI,
} from '../thunk/address';

const initialState = {
  noOfAddress: null,
  PrefferedAdd: '',
  loading: false,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getallAddressAPI.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getallAddressAPI.fulfilled, (state, action) => {
      state.noOfAddress = action?.payload?.ADD?.length;
      state.loading = true;
      console.log('no fo address', action?.payload?.add);
    });
    builder.addCase(getallAddressAPI.rejected, (state, action) => {
      state.loading = false;
    });
    //SINGLE ADDRESS SLICE
    builder.addCase(getSingleAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSingleAddress.fulfilled, (state, action) => {
      state.PrefferedAdd = action?.payload?.add;
      state.loading = false;
      console.log('preffered address', action?.payload?.add);
    });
    builder.addCase(getSingleAddress.rejected, (state, action) => {
      state.loading = false;
    });
    //GOOGLE API TO GET EXACT LOCATION
    builder.addCase(getLocation.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.loading = false;
      console.log('preffered address', action?.payload?.add);
    });
    builder.addCase(getLocation.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default addressSlice.reducer;
