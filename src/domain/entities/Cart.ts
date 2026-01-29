export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
