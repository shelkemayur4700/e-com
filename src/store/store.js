import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../slice/auth';
import cartReducer from '../slice/cart';
import productSlice from '../slice/product';

export const store = configureStore({
  reducer: {
    productStore: productSlice,
    cartdata: cartReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
