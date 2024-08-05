import {createSlice} from '@reduxjs/toolkit';
import {getUserOrders} from '../thunk/order';

const initialState = {
  value: 0,
  orderData: [],
  loading: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserOrders.pending, (state, actions) => {
      state.loading = true;
    });

    builder.addCase(getUserOrders.fulfilled, (state, actions) => {
      console.log('action.payload');
      state.orderData = actions?.payload;
      state.loading = false;
    });

    builder.addCase(getUserOrders.rejected, (state, actions) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = orderSlice.actions;

export default orderSlice.reducer;
