import reducer, {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSearch,
  setCategory,
  setSortBy,
  clearFilters,
  ProductsState,
} from '../productsSlice';
import { Product } from '../../../domain/entities';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  category: 'electronics',
  imageUrl: 'https://example.com/image.jpg',
  rating: 4.5,
  reviewCount: 100,
  stock: 10,
  tags: ['test', 'product'],
  createdAt: new Date('2024-01-01'),
};

describe('productsSlice', () => {
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

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchProductsRequest', () => {
    const actual = reducer(initialState, fetchProductsRequest());
    expect(actual.loading).toBe(true);
    expect(actual.error).toBe(null);
  });

  it('should handle fetchProductsSuccess with append=false', () => {
    const actual = reducer(
      initialState,
      fetchProductsSuccess({
        products: [mockProduct],
        total: 1,
        append: false,
      })
    );

    expect(actual.loading).toBe(false);
    expect(actual.items['1']).toEqual(mockProduct);
    expect(actual.ids).toEqual(['1']);
    expect(actual.pagination.total).toBe(1);
    expect(actual.pagination.hasMore).toBe(false);
  });

  it('should handle fetchProductsSuccess with append=true', () => {
    const stateWithProduct: ProductsState = {
      ...initialState,
      items: { '1': mockProduct },
      ids: ['1'],
    };

    const newProduct: Product = { ...mockProduct, id: '2', name: 'Product 2' };

    const actual = reducer(
      stateWithProduct,
      fetchProductsSuccess({
        products: [newProduct],
        total: 2,
        append: true,
      })
    );

    expect(actual.ids).toEqual(['1', '2']);
    expect(actual.items['2']).toEqual(newProduct);
  });

  it('should handle fetchProductsFailure', () => {
    const error = 'Network error';
    const actual = reducer(initialState, fetchProductsFailure(error));

    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });

  it('should handle setSearch', () => {
    const searchTerm = 'laptop';
    const actual = reducer(initialState, setSearch(searchTerm));

    expect(actual.filters.search).toBe(searchTerm);
    expect(actual.pagination.page).toBe(1);
  });

  it('should handle setCategory', () => {
    const actual = reducer(initialState, setCategory('electronics'));

    expect(actual.filters.category).toBe('electronics');
    expect(actual.pagination.page).toBe(1);
  });

  it('should handle setSortBy', () => {
    const actual = reducer(initialState, setSortBy('price-asc'));

    expect(actual.filters.sortBy).toBe('price-asc');
    expect(actual.pagination.page).toBe(1);
  });

  it('should handle clearFilters', () => {
    const stateWithFilters: ProductsState = {
      ...initialState,
      filters: {
        search: 'test',
        category: 'electronics',
        sortBy: 'price-asc',
      },
      pagination: {
        ...initialState.pagination,
        page: 3,
      },
    };

    const actual = reducer(stateWithFilters, clearFilters());

    expect(actual.filters).toEqual({
      search: '',
      category: null,
      sortBy: 'newest',
    });
    expect(actual.pagination.page).toBe(1);
  });
});
