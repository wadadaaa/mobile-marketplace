import { Order, CartItem } from '../entities';

export interface IOrderRepository {
  placeOrder(cartItems: CartItem[]): Promise<Order>;
  fetchOrders(): Promise<Order[]>;
}
