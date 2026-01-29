import {
  selectAllOrders,
  selectOrderById,
  selectCurrentOrder,
  selectOrdersLoading,
  selectOrdersError,
} from '../ordersSelectors';
import { RootState } from '../../rootReducer';
import { Order } from '../../../domain/entities';

const mockOrder1: Order = {
  id: 'order-1',
  items: [
    { productId: 'prod-1', productName: 'Product 1', quantity: 2, price: 100 },
  ],
  totalPrice: 200,
  status: 'completed',
  createdAt: '2024-01-01T00:00:00.000Z',
};

const mockOrder2: Order = {
  id: 'order-2',
  items: [
    { productId: 'prod-2', productName: 'Product 2', quantity: 1, price: 50 },
  ],
  totalPrice: 50,
  status: 'completed',
  createdAt: '2024-01-02T00:00:00.000Z',
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

describe('ordersSelectors', () => {
  describe('selectAllOrders', () => {
    it('should return empty array when no orders', () => {
      const state = createMockState();
      expect(selectAllOrders(state)).toEqual([]);
    });

    it('should return all orders in order of ids', () => {
      const state = createMockState({
        orders: {
          items: { 'order-1': mockOrder1, 'order-2': mockOrder2 },
          ids: ['order-2', 'order-1'], // order-2 first
          currentOrder: null,
          loading: false,
          error: null,
        },
      });

      const result = selectAllOrders(state);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('order-2');
      expect(result[1].id).toBe('order-1');
    });
  });

  describe('selectOrderById', () => {
    it('should return order when found', () => {
      const state = createMockState({
        orders: {
          items: { 'order-1': mockOrder1 },
          ids: ['order-1'],
          currentOrder: null,
          loading: false,
          error: null,
        },
      });

      const selector = selectOrderById('order-1');
      expect(selector(state)).toEqual(mockOrder1);
    });

    it('should return null when order not found', () => {
      const state = createMockState();

      const selector = selectOrderById('nonexistent');
      expect(selector(state)).toBe(null);
    });
  });

  describe('selectCurrentOrder', () => {
    it('should return null when no current order', () => {
      const state = createMockState();
      expect(selectCurrentOrder(state)).toBe(null);
    });

    it('should return current order', () => {
      const state = createMockState({
        orders: {
          items: { 'order-1': mockOrder1 },
          ids: ['order-1'],
          currentOrder: 'order-1',
          loading: false,
          error: null,
        },
      });

      expect(selectCurrentOrder(state)).toEqual(mockOrder1);
    });

    it('should return null when current order id exists but order not found', () => {
      const state = createMockState({
        orders: {
          items: {},
          ids: [],
          currentOrder: 'nonexistent',
          loading: false,
          error: null,
        },
      });

      expect(selectCurrentOrder(state)).toBe(null);
    });
  });

  describe('selectOrdersLoading', () => {
    it('should return loading state', () => {
      const state = createMockState({
        orders: {
          items: {},
          ids: [],
          currentOrder: null,
          loading: true,
          error: null,
        },
      });

      expect(selectOrdersLoading(state)).toBe(true);
    });
  });

  describe('selectOrdersError', () => {
    it('should return null when no error', () => {
      const state = createMockState();
      expect(selectOrdersError(state)).toBe(null);
    });

    it('should return error message', () => {
      const state = createMockState({
        orders: {
          items: {},
          ids: [],
          currentOrder: null,
          loading: false,
          error: 'Failed to fetch orders',
        },
      });

      expect(selectOrdersError(state)).toBe('Failed to fetch orders');
    });
  });
});
