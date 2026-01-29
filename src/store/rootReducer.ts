import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';

export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
