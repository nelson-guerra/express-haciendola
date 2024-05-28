import { Product } from '../../../domain/entities/product/product';
import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
   public static toDomain(data: ProductEntity): Product {
      const product = Product.create({
         handle: data.handle,
         title: data.title,
         description: data.description,
         sku: data.sku,
         grams: data.grams,
         stock: data.stock,
         price: data.price,
         compare_price: data.compare_price,
         barcode: data.barcode,
         id: data.id,
      });

      return product;
   }

   public static toPersist(product: Product) {
      const data = {
         handle: product.handle,
         title: product.title,
         description: product.description,
         sku: product.sku,
         grams: product.grams,
         stock: product.stock,
         price: product.price,
         compare_price: product.compare_price,
         barcode: product.barcode,
         id: product.productId,
      };

      return data;
   }
}
