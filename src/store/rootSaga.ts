import { all, fork } from 'redux-saga/effects';
import { productsSaga } from './sagas/productsSaga';
import { cartSaga } from './sagas/cartSaga';
import { ordersSaga } from './sagas/ordersSaga';

export function* rootSaga() {
  yield all([fork(productsSaga), fork(cartSaga), fork(ordersSaga)]);
}
