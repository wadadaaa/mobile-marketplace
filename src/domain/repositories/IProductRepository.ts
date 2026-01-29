import { Product, ProductCategory } from '../entities';

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface FetchProductsParams {
  page: number;
  limit: number;
  search?: string;
  category?: ProductCategory;
  sortBy?: SortOption;
}

export interface FetchProductsResult {
  products: Product[];
  total: number;
}

export interface IProductRepository {
  fetchProducts(params: FetchProductsParams): Promise<FetchProductsResult>;
  fetchProductById(id: string): Promise<Product>;
}
