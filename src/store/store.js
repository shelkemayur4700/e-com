import {configureStore} from '@reduxjs/toolkit';
import productSlice from '../slice/productSlice';
import {getDefaultMiddleware} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    productStore: productSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
  // middleware: data => data({serializableCheck: false}),
});
