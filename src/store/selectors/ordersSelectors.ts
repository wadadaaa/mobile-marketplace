import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { Order } from '../../domain/entities';

function selectOrdersState(state: RootState) {
  return state.orders;
}

export const selectAllOrders = createSelector(
  [selectOrdersState],
  (ordersState): Order[] => {
    return ordersState.ids.map((id) => ordersState.items[id]);
  }
);

export function selectOrderById(orderId: string) {
  return createSelector([selectOrdersState], (ordersState): Order | null => {
    return ordersState.items[orderId] ?? null;
  });
}

export const selectCurrentOrder = createSelector(
  [selectOrdersState],
  (ordersState): Order | null => {
    if (!ordersState.currentOrder) {
      return null;
    }
    return ordersState.items[ordersState.currentOrder] ?? null;
  }
);

export function selectOrdersLoading(state: RootState): boolean {
  return state.orders.loading;
}

export function selectOrdersError(state: RootState): string | null {
  return state.orders.error;
}
