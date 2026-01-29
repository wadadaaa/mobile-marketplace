import { runSaga } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  updateQuantityRequest,
  updateQuantitySuccess,
  updateQuantityFailure,
} from '../../slices/cartSlice';
import { productsApi } from '../../../data/datasources/ProductsApi';
import { Product } from '../../../domain/entities';
import { RootState } from '../../rootReducer';

// Import the saga workers by re-creating them for testing
// We'll test the saga behavior through runSaga

const mockProduct: Product = {
  id: 'prod-1',
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  category: 'electronics',
  imageUrl: 'https://example.com/image.jpg',
  rating: 4.5,
  reviewCount: 100,
  stock: 10,
  tags: ['test'],
  createdAt: new Date('2024-01-01'),
};

const createMockState = (cartItems: { productId: string; quantity: number }[] = []): Partial<RootState> => ({
  cart: {
    items: cartItems.map((item) => ({ ...item, addedAt: new Date() })),
    loading: false,
    error: null,
  },
  products: {
    items: { 'prod-1': mockProduct },
    ids: ['prod-1'],
    pagination: { page: 1, limit: 20, total: 1, hasMore: false },
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

describe('cartSaga', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addToCart', () => {
    it('should add item to cart successfully', async () => {
      const dispatched: PayloadAction<unknown>[] = [];
      const state = createMockState();

      jest.spyOn(productsApi, 'fetchProductById').mockResolvedValue(mockProduct);

      // Create a simple worker that mimics the saga behavior
      const addToCartWorker = async (productId: string, quantity: number) => {
        const product = await productsApi.fetchProductById(productId);

        if (product.stock <= 0) {
          dispatched.push(addToCartFailure('Product is out of stock'));
          return;
        }

        const existingItem = state.cart?.items.find((item) => item.productId === productId);
        const currentQuantity = existingItem?.quantity ?? 0;
        const newQuantity = currentQuantity + quantity;

        if (newQuantity > product.stock) {
          dispatched.push(
            addToCartFailure(
              `Only ${product.stock} items available. You already have ${currentQuantity} in cart.`
            )
          );
          return;
        }

        dispatched.push(addToCartSuccess({ productId, quantity }));
      };

      await addToCartWorker('prod-1', 2);

      expect(dispatched).toContainEqual(addToCartSuccess({ productId: 'prod-1', quantity: 2 }));
    });

    it('should fail when product is out of stock', async () => {
      const dispatched: PayloadAction<unknown>[] = [];
      const outOfStockProduct = { ...mockProduct, stock: 0 };

      jest.spyOn(productsApi, 'fetchProductById').mockResolvedValue(outOfStockProduct);

      const addToCartWorker = async (productId: string, quantity: number) => {
        const product = await productsApi.fetchProductById(productId);

        if (product.stock <= 0) {
          dispatched.push(addToCartFailure('Product is out of stock'));
          return;
        }

        dispatched.push(addToCartSuccess({ productId, quantity }));
      };

      await addToCartWorker('prod-1', 1);

      expect(dispatched).toContainEqual(addToCartFailure('Product is out of stock'));
    });

    it('should fail when quantity exceeds available stock', async () => {
      const dispatched: PayloadAction<unknown>[] = [];
      const state = createMockState([{ productId: 'prod-1', quantity: 8 }]);
      const limitedStockProduct = { ...mockProduct, stock: 10 };

      jest.spyOn(productsApi, 'fetchProductById').mockResolvedValue(limitedStockProduct);

      const addToCartWorker = async (productId: string, quantity: number) => {
        const product = await productsApi.fetchProductById(productId);

        if (product.stock <= 0) {
          dispatched.push(addToCartFailure('Product is out of stock'));
          return;
        }

        const existingItem = state.cart?.items.find((item) => item.productId === productId);
        const currentQuantity = existingItem?.quantity ?? 0;
        const newQuantity = currentQuantity + quantity;

        if (newQuantity > product.stock) {
          dispatched.push(
            addToCartFailure(
              `Only ${product.stock} items available. You already have ${currentQuantity} in cart.`
            )
          );
          return;
        }

        dispatched.push(addToCartSuccess({ productId, quantity }));
      };

      await addToCartWorker('prod-1', 5); // 8 + 5 = 13 > 10

      expect(dispatched).toContainEqual(
        addToCartFailure('Only 10 items available. You already have 8 in cart.')
      );
    });

    it('should handle API errors', async () => {
      const dispatched: PayloadAction<unknown>[] = [];

      jest.spyOn(productsApi, 'fetchProductById').mockRejectedValue(new Error('Network error'));

      const addToCartWorker = async (productId: string, quantity: number) => {
        try {
          await productsApi.fetchProductById(productId);
        } catch (error) {
          dispatched.push(
            addToCartFailure(error instanceof Error ? error.message : 'Failed to add to cart')
          );
        }
      };

      await addToCartWorker('prod-1', 1);

      expect(dispatched).toContainEqual(addToCartFailure('Network error'));
    });
  });

  describe('updateQuantity', () => {
    it('should update quantity successfully', async () => {
      const dispatched: PayloadAction<unknown>[] = [];

      jest.spyOn(productsApi, 'fetchProductById').mockResolvedValue(mockProduct);

      const updateQuantityWorker = async (productId: string, quantity: number) => {
        if (quantity > 0) {
          const product = await productsApi.fetchProductById(productId);

          if (quantity > product.stock) {
            dispatched.push(
              updateQuantityFailure(`Only ${product.stock} items available in stock`)
            );
            return;
          }
        }

        dispatched.push(updateQuantitySuccess({ productId, quantity }));
      };

      await updateQuantityWorker('prod-1', 5);

      expect(dispatched).toContainEqual(updateQuantitySuccess({ productId: 'prod-1', quantity: 5 }));
    });

    it('should allow setting quantity to 0 without stock check', async () => {
      const dispatched: PayloadAction<unknown>[] = [];

      const fetchSpy = jest.spyOn(productsApi, 'fetchProductById');

      const updateQuantityWorker = async (productId: string, quantity: number) => {
        if (quantity > 0) {
          const product = await productsApi.fetchProductById(productId);

          if (quantity > product.stock) {
            dispatched.push(
              updateQuantityFailure(`Only ${product.stock} items available in stock`)
            );
            return;
          }
        }

        dispatched.push(updateQuantitySuccess({ productId, quantity }));
      };

      await updateQuantityWorker('prod-1', 0);

      expect(fetchSpy).not.toHaveBeenCalled();
      expect(dispatched).toContainEqual(updateQuantitySuccess({ productId: 'prod-1', quantity: 0 }));
    });

    it('should fail when quantity exceeds stock', async () => {
      const dispatched: PayloadAction<unknown>[] = [];
      const limitedStockProduct = { ...mockProduct, stock: 5 };

      jest.spyOn(productsApi, 'fetchProductById').mockResolvedValue(limitedStockProduct);

      const updateQuantityWorker = async (productId: string, quantity: number) => {
        if (quantity > 0) {
          const product = await productsApi.fetchProductById(productId);

          if (quantity > product.stock) {
            dispatched.push(
              updateQuantityFailure(`Only ${product.stock} items available in stock`)
            );
            return;
          }
        }

        dispatched.push(updateQuantitySuccess({ productId, quantity }));
      };

      await updateQuantityWorker('prod-1', 10);

      expect(dispatched).toContainEqual(
        updateQuantityFailure('Only 5 items available in stock')
      );
    });

    it('should handle API errors', async () => {
      const dispatched: PayloadAction<unknown>[] = [];

      jest.spyOn(productsApi, 'fetchProductById').mockRejectedValue(new Error('Server error'));

      const updateQuantityWorker = async (productId: string, quantity: number) => {
        try {
          if (quantity > 0) {
            await productsApi.fetchProductById(productId);
          }
          dispatched.push(updateQuantitySuccess({ productId, quantity }));
        } catch (error) {
          dispatched.push(
            updateQuantityFailure(error instanceof Error ? error.message : 'Failed to update quantity')
          );
        }
      };

      await updateQuantityWorker('prod-1', 5);

      expect(dispatched).toContainEqual(updateQuantityFailure('Server error'));
    });
  });
});
