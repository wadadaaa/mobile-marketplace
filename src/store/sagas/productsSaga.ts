import { call, put, select, takeLatest, debounce } from 'redux-saga/effects';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSearch,
  setCategory,
  setSortBy,
  loadMoreProducts,
} from '../slices/productsSlice';
import { productsApi } from '../../data/datasources/ProductsApi';
import { RootState } from '../rootReducer';
import { FetchProductsResult } from '../../domain/repositories';

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Failed to fetch products';
}

function* fetchProductsWorker(append: boolean = false) {
  try {
    const state: RootState = yield select();
    const { pagination, filters } = state.products;

    const result: FetchProductsResult = yield call(
      [productsApi, productsApi.fetchProducts],
      {
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search || undefined,
        category: filters.category || undefined,
        sortBy: filters.sortBy,
      }
    );

    yield put(
      fetchProductsSuccess({
        products: result.products,
        total: result.total,
        append,
      })
    );
  } catch (error) {
    yield put(fetchProductsFailure(getErrorMessage(error)));
  }
}

function* handleFetchProducts() {
  yield call(fetchProductsWorker, false);
}

function* handleFilterChange() {
  yield call(fetchProductsWorker, false);
}

function* handleLoadMore() {
  yield call(fetchProductsWorker, true);
}

export function* productsSaga() {
  yield takeLatest(fetchProductsRequest.type, handleFetchProducts);
  yield debounce(300, setSearch.type, handleFilterChange);
  yield takeLatest(setCategory.type, handleFilterChange);
  yield takeLatest(setSortBy.type, handleFilterChange);
  yield takeLatest(loadMoreProducts.type, handleLoadMore);
}
