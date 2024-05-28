import { ResponseProductDTO } from '../../domain/entities/product/dto/productDTOs';
import { Product } from '../../domain/entities/product/product';

export class ProductMapper {
   static fromDomainToResponse(product: Product): ResponseProductDTO {
      const response: ResponseProductDTO = {
         id: product.productId,
         handle: product.handle,
         title: product.title,
         description: product.description,
         sku: product.sku,
         grams: product.grams,
         stock: product.stock,
         price: product.price,
         compare_price: product.compare_price,
         barcode: product.barcode,
      };

      return response;
   }
}
