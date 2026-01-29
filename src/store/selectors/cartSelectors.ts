import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

function selectCartState(state: RootState) {
  return state.cart;
}

function selectProductsState(state: RootState) {
  return state.products;
}

export function selectCartItems(state: RootState) {
  return state.cart.items;
}

export const selectCartItemsWithProducts = createSelector(
  [selectCartItems, selectProductsState],
  (cartItems, productsState) => {
    return cartItems.map((item) => ({
      ...item,
      product: productsState.items[item.productId] ?? null,
    }));
  }
);

export const selectCartTotal = createSelector(
  [selectCartItemsWithProducts],
  (cartItemsWithProducts): number => {
    return cartItemsWithProducts.reduce((total, item) => {
      if (item.product) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  }
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems): number => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }
);

export function selectCartLoading(state: RootState): boolean {
  return state.cart.loading;
}

export function selectCartError(state: RootState): string | null {
  return state.cart.error;
}
