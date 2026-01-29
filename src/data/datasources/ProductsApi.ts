import {
  IProductRepository,
  FetchProductsParams,
  FetchProductsResult,
  SortOption,
} from '../../domain/repositories';
import { Product } from '../../domain/entities';
import { mockProducts } from './mockProducts';
import { delay } from '../../utils/delay';

export class ProductsApi implements IProductRepository {
  private products: Product[] = mockProducts;

  async fetchProducts(params: FetchProductsParams): Promise<FetchProductsResult> {
    await delay(Math.random() * 500 + 300);

    let filtered = [...this.products];

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (params.category) {
      filtered = filtered.filter((p) => p.category === params.category);
    }

    filtered = this.sortProducts(filtered, params.sortBy || 'newest');

    const total = filtered.length;
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const products = filtered.slice(start, end);

    return { products, total };
  }

  async fetchProductById(id: string): Promise<Product> {
    await delay(200);

    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return product;
  }

  private sortProducts(products: Product[], sortBy: SortOption): Product[] {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
      default:
        return sorted;
    }
  }
}

export const productsApi = new ProductsApi();
