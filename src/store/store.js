import {configureStore} from '@reduxjs/toolkit';
import productSlice from '../slice/productSlice';
import {getDefaultMiddleware} from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';

export const store = configureStore({
  reducer: {
    productStore: productSlice,
    cartdata: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
  // middleware: data => data({serializableCheck: false}),
});
