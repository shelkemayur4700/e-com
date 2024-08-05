import {createSlice} from '@reduxjs/toolkit';
import {GetAllUserReview} from '../thunk/review';

const initialState = {
  value: 0,
  reviewData: [],
  loading: false,
};

export const orderSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetAllUserReview.pending, (state, actions) => {
      state.loading = true;
    });

    builder.addCase(GetAllUserReview.fulfilled, (state, actions) => {
      console.log('action.payload');
      state.reviewData = actions?.payload;
      state.loading = false;
    });

    builder.addCase(GetAllUserReview.rejected, (state, actions) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = orderSlice.actions;

export default orderSlice.reducer;
