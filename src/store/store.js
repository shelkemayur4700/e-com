import {configureStore} from '@reduxjs/toolkit';
import addressReducer from '../slice/address';
import authReducer from '../slice/auth';
import cartReducer from '../slice/cart';
import orderReducer from '../slice/order';
import productSlice from '../slice/product';
import reviewSlice from '../slice/review';
export const store = configureStore({
  reducer: {
    productStore: productSlice,
    cartdata: cartReducer,
    auth: authReducer,
    address: addressReducer,
    order: orderReducer,
    review: reviewSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
