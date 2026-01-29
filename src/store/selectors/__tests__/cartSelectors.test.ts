import {
  selectCartItems,
  selectCartItemsWithProducts,
  selectCartTotal,
  selectCartCount,
  selectCartLoading,
  selectCartError,
} from '../cartSelectors';
import { RootState } from '../../rootReducer';
import { Product } from '../../../domain/entities';

const mockProduct: Product = {
  id: 'prod-1',
  name: 'Test Product',
  description: 'Test Description',
  price: 100.0,
  category: 'electronics',
  imageUrl: 'https://example.com/image.jpg',
  rating: 4.5,
  reviewCount: 100,
  stock: 10,
  tags: ['test'],
  createdAt: new Date('2024-01-01'),
};

const mockProduct2: Product = {
  ...mockProduct,
  id: 'prod-2',
  name: 'Test Product 2',
  price: 50.0,
};

const createMockState = (overrides: Partial<RootState> = {}): RootState => ({
  cart: {
    items: [],
    loading: false,
    error: null,
    ...overrides.cart,
  },
  products: {
    items: {},
    ids: [],
    pagination: { page: 1, limit: 20, total: 0, hasMore: false },
    filters: { search: '', category: null, sortBy: 'newest' },
    loading: false,
    error: null,
    ...overrides.products,
  },
  orders: {
    items: {},
    ids: [],
    currentOrder: null,
    loading: false,
    error: null,
    ...overrides.orders,
  },
});

describe('cartSelectors', () => {
  describe('selectCartItems', () => {
    it('should return empty array when cart is empty', () => {
      const state = createMockState();
      expect(selectCartItems(state)).toEqual([]);
    });

    it('should return cart items', () => {
      const cartItems = [
        { productId: 'prod-1', quantity: 2, addedAt: new Date() },
        { productId: 'prod-2', quantity: 1, addedAt: new Date() },
      ];
      const state = createMockState({ cart: { items: cartItems, loading: false, error: null } });

      expect(selectCartItems(state)).toEqual(cartItems);
    });
  });

  describe('selectCartItemsWithProducts', () => {
    it('should return cart items with product data', () => {
      const cartItems = [{ productId: 'prod-1', quantity: 2, addedAt: new Date() }];
      const state = createMockState({
        cart: { items: cartItems, loading: false, error: null },
        products: {
          items: { 'prod-1': mockProduct },
          ids: ['prod-1'],
          pagination: { page: 1, limit: 20, total: 1, hasMore: false },
          filters: { search: '', category: null, sortBy: 'newest' },
          loading: false,
          error: null,
        },
      });

      const result = selectCartItemsWithProducts(state);

      expect(result).toHaveLength(1);
      expect(result[0].product).toEqual(mockProduct);
      expect(result[0].quantity).toBe(2);
    });

    it('should return null for product when product not found', () => {
      const cartItems = [{ productId: 'nonexistent', quantity: 1, addedAt: new Date() }];
      const state = createMockState({
        cart: { items: cartItems, loading: false, error: null },
      });

      const result = selectCartItemsWithProducts(state);

      expect(result[0].product).toBe(null);
    });
  });

  describe('selectCartTotal', () => {
    it('should return 0 for empty cart', () => {
      const state = createMockState();
      expect(selectCartTotal(state)).toBe(0);
    });

    it('should calculate total correctly', () => {
      const cartItems = [
        { productId: 'prod-1', quantity: 2, addedAt: new Date() }, // 2 x $100 = $200
        { productId: 'prod-2', quantity: 3, addedAt: new Date() }, // 3 x $50 = $150
      ];
      const state = createMockState({
        cart: { items: cartItems, loading: false, error: null },
        products: {
          items: { 'prod-1': mockProduct, 'prod-2': mockProduct2 },
          ids: ['prod-1', 'prod-2'],
          pagination: { page: 1, limit: 20, total: 2, hasMore: false },
          filters: { search: '', category: null, sortBy: 'newest' },
          loading: false,
          error: null,
        },
      });

      expect(selectCartTotal(state)).toBe(350); // $200 + $150
    });

    it('should skip items without product data', () => {
      const cartItems = [
        { productId: 'prod-1', quantity: 2, addedAt: new Date() },
        { productId: 'nonexistent', quantity: 1, addedAt: new Date() },
      ];
      const state = createMockState({
        cart: { items: cartItems, loading: false, error: null },
        products: {
          items: { 'prod-1': mockProduct },
          ids: ['prod-1'],
          pagination: { page: 1, limit: 20, total: 1, hasMore: false },
          filters: { search: '', category: null, sortBy: 'newest' },
          loading: false,
          error: null,
        },
      });

      expect(selectCartTotal(state)).toBe(200); // Only 2 x $100
    });
  });

  describe('selectCartCount', () => {
    it('should return 0 for empty cart', () => {
      const state = createMockState();
      expect(selectCartCount(state)).toBe(0);
    });

    it('should count total quantity of all items', () => {
      const cartItems = [
        { productId: 'prod-1', quantity: 2, addedAt: new Date() },
        { productId: 'prod-2', quantity: 3, addedAt: new Date() },
      ];
      const state = createMockState({
        cart: { items: cartItems, loading: false, error: null },
      });

      expect(selectCartCount(state)).toBe(5);
    });
  });

  describe('selectCartLoading', () => {
    it('should return loading state', () => {
      const state = createMockState({
        cart: { items: [], loading: true, error: null },
      });

      expect(selectCartLoading(state)).toBe(true);
    });
  });

  describe('selectCartError', () => {
    it('should return null when no error', () => {
      const state = createMockState();
      expect(selectCartError(state)).toBe(null);
    });

    it('should return error message', () => {
      const state = createMockState({
        cart: { items: [], loading: false, error: 'Something went wrong' },
      });

      expect(selectCartError(state)).toBe('Something went wrong');
    });
  });
});
