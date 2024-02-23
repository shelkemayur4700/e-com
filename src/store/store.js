import {configureStore} from '@reduxjs/toolkit';
import productSlice from '../slice/productSlice';
import {getDefaultMiddleware} from '@reduxjs/toolkit';
import cartReducer from '../slice/cartSlice';
import authReducer from '../slice/auth';

export const store = configureStore({
  reducer: {
    productStore: productSlice,
    cartdata: cartReducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),

});
