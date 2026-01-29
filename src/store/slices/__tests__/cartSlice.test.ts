import reducer, {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  updateQuantityFailure,
  removeFromCart,
  clearCart,
  CartState,
} from '../cartSlice';

describe('cartSlice', () => {
  const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
  };

  const mockDate = new Date('2024-01-01');

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addToCart', () => {
    it('should handle addToCartRequest', () => {
      const actual = reducer(initialState, addToCartRequest({ productId: '1', quantity: 2 }));
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    it('should handle addToCartSuccess for new item', () => {
      const actual = reducer(
        initialState,
        addToCartSuccess({ productId: '1', quantity: 2 })
      );

      expect(actual.loading).toBe(false);
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0]).toEqual({
        productId: '1',
        quantity: 2,
        addedAt: mockDate,
      });
    });

    it('should handle addToCartSuccess for existing item (increment quantity)', () => {
      const stateWithItem: CartState = {
        ...initialState,
        items: [{ productId: '1', quantity: 2, addedAt: mockDate }],
      };

      const actual = reducer(
        stateWithItem,
        addToCartSuccess({ productId: '1', quantity: 3 })
      );

      expect(actual.items).toHaveLength(1);
      expect(actual.items[0].quantity).toBe(5);
    });

    it('should handle addToCartFailure', () => {
      const error = 'Out of stock';
      const actual = reducer(initialState, addToCartFailure(error));

      expect(actual.loading).toBe(false);
      expect(actual.error).toBe(error);
    });
  });

  describe('updateQuantity', () => {
    const stateWithItem: CartState = {
      ...initialState,
      items: [{ productId: '1', quantity: 5, addedAt: mockDate }],
    };

    it('should handle updateQuantityRequest', () => {
      const actual = reducer(stateWithItem, updateQuantityRequest({ productId: '1', quantity: 3 }));
      expect(actual.loading).toBe(true);
      expect(actual.error).toBe(null);
    });

    it('should handle updateQuantitySuccess', () => {
      const actual = reducer(
        stateWithItem,
        updateQuantitySuccess({ productId: '1', quantity: 3 })
      );

      expect(actual.loading).toBe(false);
      expect(actual.items[0].quantity).toBe(3);
    });

    it('should remove item when quantity is 0', () => {
      const actual = reducer(
        stateWithItem,
        updateQuantitySuccess({ productId: '1', quantity: 0 })
      );

      expect(actual.items).toHaveLength(0);
    });

    it('should remove item when quantity is negative', () => {
      const actual = reducer(
        stateWithItem,
        updateQuantitySuccess({ productId: '1', quantity: -1 })
      );

      expect(actual.items).toHaveLength(0);
    });

    it('should handle updateQuantityFailure', () => {
      const error = 'Exceeds stock';
      const actual = reducer(stateWithItem, updateQuantityFailure(error));

      expect(actual.loading).toBe(false);
      expect(actual.error).toBe(error);
    });

    it('should not modify items if productId not found', () => {
      const actual = reducer(
        stateWithItem,
        updateQuantitySuccess({ productId: 'nonexistent', quantity: 10 })
      );

      expect(actual.items).toEqual(stateWithItem.items);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item by productId', () => {
      const stateWithItems: CartState = {
        ...initialState,
        items: [
          { productId: '1', quantity: 2, addedAt: mockDate },
          { productId: '2', quantity: 1, addedAt: mockDate },
        ],
      };

      const actual = reducer(stateWithItems, removeFromCart('1'));

      expect(actual.items).toHaveLength(1);
      expect(actual.items[0].productId).toBe('2');
    });

    it('should handle removing non-existent item gracefully', () => {
      const stateWithItem: CartState = {
        ...initialState,
        items: [{ productId: '1', quantity: 2, addedAt: mockDate }],
      };

      const actual = reducer(stateWithItem, removeFromCart('nonexistent'));

      expect(actual.items).toHaveLength(1);
    });
  });

  describe('clearCart', () => {
    it('should clear all items and error', () => {
      const stateWithItems: CartState = {
        items: [
          { productId: '1', quantity: 2, addedAt: mockDate },
          { productId: '2', quantity: 1, addedAt: mockDate },
        ],
        loading: false,
        error: 'Some error',
      };

      const actual = reducer(stateWithItems, clearCart());

      expect(actual.items).toHaveLength(0);
      expect(actual.error).toBe(null);
    });
  });
});
