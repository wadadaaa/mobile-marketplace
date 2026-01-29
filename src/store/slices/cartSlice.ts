import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../domain/entities';

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartRequest: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    addToCartSuccess: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId,
          quantity,
          addedAt: new Date(),
        });
      }

      state.loading = false;
    },
    addToCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateQuantityRequest: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateQuantitySuccess: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.productId !== productId);
        } else {
          item.quantity = quantity;
        }
      }

      state.loading = false;
    },
    updateQuantityFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.error = null;
    },
  },
});

export const {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  updateQuantityFailure,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
