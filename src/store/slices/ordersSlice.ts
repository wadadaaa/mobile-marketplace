import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../domain/entities';

export interface OrdersState {
  items: Record<string, Order>;
  ids: string[];
  currentOrder: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: {},
  ids: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action: PayloadAction<Order>) => {
      const order = action.payload;
      state.items[order.id] = order;
      if (!state.ids.includes(order.id)) {
        state.ids.unshift(order.id);
      }
      state.currentOrder = order.id;
      state.loading = false;
    },
    placeOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      const orders = action.payload;
      state.items = {};
      state.ids = [];

      orders.forEach((order) => {
        state.items[order.id] = order;
        state.ids.push(order.id);
      });

      state.loading = false;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const {
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  clearCurrentOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
