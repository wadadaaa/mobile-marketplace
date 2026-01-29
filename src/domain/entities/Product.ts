export type ProductCategory =
  | 'electronics'
  | 'clothing'
  | 'home'
  | 'books'
  | 'sports'
  | 'beauty'
  | 'toys';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  createdAt: Date;
}
