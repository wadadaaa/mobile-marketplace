import { call, put, select, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  updateQuantityFailure,
} from '../slices/cartSlice';
import { RootState } from '../rootReducer';
import { productsApi } from '../../data/datasources/ProductsApi';
import { Product } from '../../domain/entities';

function getErrorMessage(error: unknown, defaultMessage: string): string {
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
}

function* addToCartWorker(
  action: PayloadAction<{ productId: string; quantity: number }>
) {
  try {
    const { productId, quantity } = action.payload;

    const product: Product = yield call(
      [productsApi, productsApi.fetchProductById],
      productId
    );

    if (product.stock <= 0) {
      yield put(addToCartFailure('Product is out of stock'));
      return;
    }

    const state: RootState = yield select();
    const existingItem = state.cart.items.find(
      (item) => item.productId === productId
    );
    const currentQuantity = existingItem?.quantity ?? 0;
    const newQuantity = currentQuantity + quantity;

    if (newQuantity > product.stock) {
      yield put(
        addToCartFailure(
          `Only ${product.stock} items available. You already have ${currentQuantity} in cart.`
        )
      );
      return;
    }

    yield put(addToCartSuccess({ productId, quantity }));
  } catch (error) {
    yield put(addToCartFailure(getErrorMessage(error, 'Failed to add to cart')));
  }
}

function* updateQuantityWorker(
  action: PayloadAction<{ productId: string; quantity: number }>
) {
  try {
    const { productId, quantity } = action.payload;

    if (quantity > 0) {
      const product: Product = yield call(
        [productsApi, productsApi.fetchProductById],
        productId
      );

      if (quantity > product.stock) {
        yield put(
          updateQuantityFailure(`Only ${product.stock} items available in stock`)
        );
        return;
      }
    }

    yield put(updateQuantitySuccess({ productId, quantity }));
  } catch (error) {
    yield put(updateQuantityFailure(getErrorMessage(error, 'Failed to update quantity')));
  }
}

export function* cartSaga() {
  yield takeEvery(addToCartRequest.type, addToCartWorker);
  yield takeEvery(updateQuantityRequest.type, updateQuantityWorker);
}
