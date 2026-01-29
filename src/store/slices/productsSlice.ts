import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductCategory } from '../../domain/entities';
import { SortOption } from '../../domain/repositories';

export interface ProductsState {
  items: Record<string, Product>;
  ids: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  filters: {
    search: string;
    category: ProductCategory | null;
    sortBy: SortOption;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: {},
  ids: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    hasMore: true,
  },
  filters: {
    search: '',
    category: null,
    sortBy: 'newest',
  },
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (
      state,
      action: PayloadAction<{ products: Product[]; total: number; append: boolean }>
    ) => {
      const { products, total, append } = action.payload;

      if (!append) {
        state.items = {};
        state.ids = [];
      }

      products.forEach((product) => {
        state.items[product.id] = product;
        if (!state.ids.includes(product.id)) {
          state.ids.push(product.id);
        }
      });

      state.pagination.total = total;
      state.pagination.hasMore = state.ids.length < total;
      state.loading = false;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      state.pagination.page = 1;
    },
    setCategory: (state, action: PayloadAction<ProductCategory | null>) => {
      state.filters.category = action.payload;
      state.pagination.page = 1;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.filters.sortBy = action.payload;
      state.pagination.page = 1;
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: null,
        sortBy: 'newest',
      };
      state.pagination.page = 1;
    },
    loadMoreProducts: (state) => {
      if (state.pagination.hasMore && !state.loading) {
        state.pagination.page += 1;
      }
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setPage,
  setSearch,
  setCategory,
  setSortBy,
  clearFilters,
  loadMoreProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
