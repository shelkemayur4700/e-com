import {createSlice} from '@reduxjs/toolkit';
import {getAllProducts} from '../thunk/product';

const initialState = {
  value: 0,
  data: [],
  loading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllProducts.pending, (state, actions) => {
      state.loading = true;
    });

    builder.addCase(getAllProducts.fulfilled, (state, actions) => {
      state.data = actions?.payload?.data;
      state.loading = false;
    });

    builder.addCase(getAllProducts.rejected, (state, actions) => {
      state.loading = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = productSlice.actions;

export default productSlice.reducer;
