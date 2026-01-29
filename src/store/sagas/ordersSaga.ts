import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} from '../slices/ordersSlice';
import { clearCart } from '../slices/cartSlice';
import { ordersApi } from '../../data/datasources/OrdersApi';
import { RootState } from '../rootReducer';
import { Order } from '../../domain/entities';

function getErrorMessage(error: unknown, defaultMessage: string): string {
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
}

function* placeOrderWorker() {
  try {
    const state: RootState = yield select();
    const { items } = state.cart;

    if (items.length === 0) {
      yield put(placeOrderFailure('Cart is empty'));
      return;
    }

    const order: Order = yield call([ordersApi, ordersApi.placeOrder], items);

    yield put(placeOrderSuccess(order));
    yield put(clearCart());
  } catch (error) {
    yield put(placeOrderFailure(getErrorMessage(error, 'Failed to place order')));
  }
}

function* fetchOrdersWorker() {
  try {
    const orders: Order[] = yield call([ordersApi, ordersApi.fetchOrders]);
    yield put(fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(fetchOrdersFailure(getErrorMessage(error, 'Failed to fetch orders')));
  }
}

export function* ordersSaga() {
  yield takeLatest(placeOrderRequest.type, placeOrderWorker);
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersWorker);
}
