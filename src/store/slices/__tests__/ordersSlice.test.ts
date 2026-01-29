import reducer, {
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  clearCurrentOrder,
  OrdersState,
} from '../ordersSlice';
import { Order } from '../../../domain/entities';

describe('ordersSlice', () => {
  const initialState: OrdersState = {
    items: {},
    ids: [],
    currentOrder: null,
    loading: false,
    error: null,
  };

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

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('placeOrder', () => {
    it('should handle placeOrderRequest', () => {
      const actual = reducer(initialState, placeOrderRequest());

      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    it('should handle placeOrderSuccess', () => {
      const actual = reducer(initialState, placeOrderSuccess(mockOrder));

      expect(actual.loading).toBe(false);
      expect(actual.items['order-1']).toEqual(mockOrder);
      expect(actual.ids).toContain('order-1');
      expect(actual.currentOrder).toBe('order-1');
    });

    it('should add new order to beginning of ids list', () => {
      const stateWithOrder: OrdersState = {
        ...initialState,
        items: { 'order-1': mockOrder },
        ids: ['order-1'],
      };

      const newOrder: Order = { ...mockOrder, id: 'order-2' };
      const actual = reducer(stateWithOrder, placeOrderSuccess(newOrder));

      expect(actual.ids[0]).toBe('order-2');
      expect(actual.ids[1]).toBe('order-1');
    });

    it('should not duplicate order id if already exists', () => {
      const stateWithOrder: OrdersState = {
        ...initialState,
        items: { 'order-1': mockOrder },
        ids: ['order-1'],
      };

      const actual = reducer(stateWithOrder, placeOrderSuccess(mockOrder));

      expect(actual.ids.filter((id) => id === 'order-1')).toHaveLength(1);
    });

    it('should handle placeOrderFailure', () => {
      const error = 'Payment failed';
      const actual = reducer(initialState, placeOrderFailure(error));

      expect(actual.loading).toBe(false);
      expect(actual.error).toBe(error);
    });
  });

  describe('fetchOrders', () => {
    it('should handle fetchOrdersRequest', () => {
      const actual = reducer(initialState, fetchOrdersRequest());

      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    it('should handle fetchOrdersSuccess', () => {
      const orders: Order[] = [
        mockOrder,
        { ...mockOrder, id: 'order-2', totalPrice: 50.0 },
      ];

      const actual = reducer(initialState, fetchOrdersSuccess(orders));

      expect(actual.loading).toBe(false);
      expect(actual.ids).toEqual(['order-1', 'order-2']);
      expect(Object.keys(actual.items)).toHaveLength(2);
      expect(actual.items['order-1']).toEqual(mockOrder);
    });

    it('should replace existing orders on fetchOrdersSuccess', () => {
      const stateWithOrders: OrdersState = {
        ...initialState,
        items: { 'old-order': { ...mockOrder, id: 'old-order' } },
        ids: ['old-order'],
      };

      const newOrders: Order[] = [mockOrder];
      const actual = reducer(stateWithOrders, fetchOrdersSuccess(newOrders));

      expect(actual.ids).toEqual(['order-1']);
      expect(actual.items['old-order']).toBeUndefined();
    });

    it('should handle fetchOrdersFailure', () => {
      const error = 'Network error';
      const actual = reducer(initialState, fetchOrdersFailure(error));

      expect(actual.loading).toBe(false);
      expect(actual.error).toBe(error);
    });
  });

  describe('clearCurrentOrder', () => {
    it('should clear currentOrder', () => {
      const stateWithCurrentOrder: OrdersState = {
        ...initialState,
        currentOrder: 'order-1',
      };

      const actual = reducer(stateWithCurrentOrder, clearCurrentOrder());

      expect(actual.currentOrder).toBe(null);
    });
  });
});
