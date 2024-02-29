import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/auth';
import cartReducer from '../slice/cartSlice';
import productSlice from '../slice/productSlice';

export const store = configureStore({
  reducer: {
    productStore: productSlice,
    cartdata: cartReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
