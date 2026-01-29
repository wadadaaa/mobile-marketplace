import { IOrderRepository } from '../../domain/repositories';
import { Order, CartItem, OrderItem } from '../../domain/entities';
import { delay } from '../../utils/delay';
import { productsApi } from './ProductsApi';

export class OrdersApi implements IOrderRepository {
  private orders: Order[] = [];

  async placeOrder(cartItems: CartItem[]): Promise<Order> {
    await delay(1000);

    if (Math.random() < 0.1) {
      throw new Error('Payment processing failed. Please try again.');
    }

    const orderItems: OrderItem[] = [];
    let totalPrice = 0;

    for (const item of cartItems) {
      const product = await productsApi.fetchProductById(item.productId);
      orderItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
      });
      totalPrice += product.price * item.quantity;
    }

    const order: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      items: orderItems,
      totalPrice,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    this.orders.push(order);
    return order;
  }

  async fetchOrders(): Promise<Order[]> {
    await delay(300);
    return [...this.orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const ordersApi = new OrdersApi();
