export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string; // ISO string format for Redux serialization
}
