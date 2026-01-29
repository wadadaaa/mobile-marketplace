import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { Product } from '../../domain/entities';

export function selectProductsState(state: RootState) {
  return state.products;
}

export const selectAllProducts = createSelector(
  [selectProductsState],
  (productsState): Product[] => {
    return productsState.ids.map((id) => productsState.items[id]);
  }
);

export function selectProductById(productId: string) {
  return createSelector([selectProductsState], (productsState): Product | null => {
    return productsState.items[productId] ?? null;
  });
}

export function selectProductsLoading(state: RootState): boolean {
  return state.products.loading;
}

export function selectProductsError(state: RootState): string | null {
  return state.products.error;
}

export function selectHasMore(state: RootState): boolean {
  return state.products.pagination.hasMore;
}

export function selectFilters(state: RootState) {
  return state.products.filters;
}

export function selectPagination(state: RootState) {
  return state.products.pagination;
}
