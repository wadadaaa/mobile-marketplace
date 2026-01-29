import { PayloadAction } from '@reduxjs/toolkit';
import {
  placeOrderSuccess,
  placeOrderFailure,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} from '../../slices/ordersSlice';
import { clearCart } from '../../slices/cartSlice';
import { ordersApi } from '../../../data/datasources/OrdersApi';
import { Order, CartItem } from '../../../domain/entities';
import { RootState } from '../../rootReducer';

const mockOrder: Order = {
  id: 'order-1',
  items: [
    {
      productId: 'prod-1',
      productName: 'Test Product',
      quantity: 2,
      price: 99.99,
    },
  ],
  totalPrice: 199.98,
  status: 'completed',
  createdAt: '2024-01-01T00:00:00.000Z',
};

const mockCartItems: CartItem[] = [
  { productId: 'prod-1', quantity: 2, addedAt: new Date() },
];

const createMockState = (cartItems: CartItem[] = []): Partial<RootState> => ({
  cart: {
    items: cartItems,
    loading: false,
    error: null,
  },
  products: {
    items: {},
    ids: [],
    pagination: { page: 1, limit: 20, total: 0, hasMore: false },
    filters: { search: '', category: null, sortBy: 'newest' },
    loading: false,
    error: null,
  },
  orders: {
    items: {},
    ids: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
});

describe('ordersSaga', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('placeOrder', () => {
    it('should place order successfully and clear cart', async () => {
      const dispatched: PayloadAction<unknown>[] = [];
      const state = createMockState(mockCartItems);

      jest.spyOn(ordersApi, 'placeOrder').mockResolvedValue(mockOrder);

      const placeOrderWorker = async () => {
        const { items } = state.cart!;

        if (items.length === 0) {
          dispatched.push(placeOrderFailure('Cart is empty'));
          return;
        }

        try {
          const order = await ordersApi.placeOrder(items);
          dispatched.push(placeOrderSuccess(order));
          dispatched.push(clearCart());
        } catch (error) {
          dispatched.push(
            placeOrderFailure(error instanceof Error ? error.message : 'Failed to place order')
          );
        }
      };

      await placeOrderWorker();

      expect(dispatched).toContainEqual(placeOrderSuccess(mockOrder));
      expect(dispatched).toContainEqual(clearCart());
    });

    it('should fail when cart is empty', async () => {
      const dispatched: PayloadAction<unknown>[] = [];
      const state = createMockState([]); // Empty cart

      const placeOrderWorker = async () => {
        const { items } = state.cart!;

        if (items.length === 0) {
          dispatched.push(placeOrderFailure('Cart is empty'));
          return;
        }

        try {
          const order = await ordersApi.placeOrder(items);
          dispatched.push(placeOrderSuccess(order));
          dispatched.push(clearCart());
        } catch (error) {
          dispatched.push(
            placeOrderFailure(error instanceof Error ? error.message : 'Failed to place order')
          );
        }
      };

      await placeOrderWorker();

      expect(dispatched).toContainEqual(placeOrderFailure('Cart is empty'));
      expect(dispatched).not.toContainEqual(clearCart());
    });

    it('should handle API errors', async () => {
      const dispatched: PayloadAction<unknown>[] = [];
      const state = createMockState(mockCartItems);

      jest.spyOn(ordersApi, 'placeOrder').mockRejectedValue(new Error('Payment failed'));

      const placeOrderWorker = async () => {
        const { items } = state.cart!;

        if (items.length === 0) {
          dispatched.push(placeOrderFailure('Cart is empty'));
          return;
        }

        try {
          const order = await ordersApi.placeOrder(items);
          dispatched.push(placeOrderSuccess(order));
          dispatched.push(clearCart());
        } catch (error) {
          dispatched.push(
            placeOrderFailure(error instanceof Error ? error.message : 'Failed to place order')
          );
        }
      };

      await placeOrderWorker();

      expect(dispatched).toContainEqual(placeOrderFailure('Payment failed'));
      expect(dispatched).not.toContainEqual(clearCart());
    });

    it('should not clear cart if order fails', async () => {
      const dispatched: PayloadAction<unknown>[] = [];
      const state = createMockState(mockCartItems);

      jest.spyOn(ordersApi, 'placeOrder').mockRejectedValue(new Error('Server error'));

      const placeOrderWorker = async () => {
        const { items } = state.cart!;

        if (items.length === 0) {
          dispatched.push(placeOrderFailure('Cart is empty'));
          return;
        }

        try {
          const order = await ordersApi.placeOrder(items);
          dispatched.push(placeOrderSuccess(order));
          dispatched.push(clearCart());
        } catch (error) {
          dispatched.push(
            placeOrderFailure(error instanceof Error ? error.message : 'Failed to place order')
          );
        }
      };

      await placeOrderWorker();

      const clearCartAction = dispatched.find((action) => action.type === clearCart.type);
      expect(clearCartAction).toBeUndefined();
    });
  });

  describe('fetchOrders', () => {
    it('should fetch orders successfully', async () => {
      const dispatched: PayloadAction<unknown>[] = [];
      const orders: Order[] = [mockOrder];

      jest.spyOn(ordersApi, 'fetchOrders').mockResolvedValue(orders);

      const fetchOrdersWorker = async () => {
        try {
          const fetchedOrders = await ordersApi.fetchOrders();
          dispatched.push(fetchOrdersSuccess(fetchedOrders));
        } catch (error) {
          dispatched.push(
            fetchOrdersFailure(error instanceof Error ? error.message : 'Failed to fetch orders')
          );
        }
      };

      await fetchOrdersWorker();

      expect(dispatched).toContainEqual(fetchOrdersSuccess(orders));
    });

    it('should handle API errors', async () => {
      const dispatched: PayloadAction<unknown>[] = [];

      jest.spyOn(ordersApi, 'fetchOrders').mockRejectedValue(new Error('Network error'));

      const fetchOrdersWorker = async () => {
        try {
          const fetchedOrders = await ordersApi.fetchOrders();
          dispatched.push(fetchOrdersSuccess(fetchedOrders));
        } catch (error) {
          dispatched.push(
            fetchOrdersFailure(error instanceof Error ? error.message : 'Failed to fetch orders')
          );
        }
      };

      await fetchOrdersWorker();

      expect(dispatched).toContainEqual(fetchOrdersFailure('Network error'));
    });

    it('should return empty array when no orders exist', async () => {
      const dispatched: PayloadAction<unknown>[] = [];

      jest.spyOn(ordersApi, 'fetchOrders').mockResolvedValue([]);

      const fetchOrdersWorker = async () => {
        try {
          const fetchedOrders = await ordersApi.fetchOrders();
          dispatched.push(fetchOrdersSuccess(fetchedOrders));
        } catch (error) {
          dispatched.push(
            fetchOrdersFailure(error instanceof Error ? error.message : 'Failed to fetch orders')
          );
        }
      };

      await fetchOrdersWorker();

      expect(dispatched).toContainEqual(fetchOrdersSuccess([]));
    });
  });
});
