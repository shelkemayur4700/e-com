import {configureStore} from '@reduxjs/toolkit';
import addressReducer from '../slice/address';
import authReducer from '../slice/auth';
import cartReducer from '../slice/cart';
import productSlice from '../slice/product';
export const store = configureStore({
  reducer: {
    productStore: productSlice,
    cartdata: cartReducer,
    auth: authReducer,
    address: addressReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
