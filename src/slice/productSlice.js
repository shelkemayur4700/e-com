import {createSlice} from '@reduxjs/toolkit';
import {getAllProducts} from '../thunk/productThunk';

const initialState = {
  value: 0,
  data: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllProducts.pending, (state, actions) => {});

    builder.addCase(getAllProducts.fulfilled, (state, actions) => {
      state.data = actions?.payload?.data;
    });

    builder.addCase(getAllProducts.rejected, (state, actions) => {});
  },
});

// Action creators are generated for each case reducer function
export const {} = productSlice.actions;

export default productSlice.reducer;
