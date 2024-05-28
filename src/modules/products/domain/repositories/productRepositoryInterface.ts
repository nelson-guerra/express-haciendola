import { Product } from '../entities/product/product';
//import { ProductId } from '../entities/product/value-objects/productId';

export interface ProductRepositoryInterface {
   getAllProducts: () => Promise<Product[] | null>;
   getProductById: (id: string) => Promise<Product | null>;
   save: (product: Product) => Promise<boolean>;
   update: (id: string, product: Product) => Promise<boolean>;
   delete: (id: string) => Promise<boolean>;
}
