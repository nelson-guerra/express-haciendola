import { Either, success, failure } from '../../../../../shared/core/either';
import { ProductRepositoryInterface } from '../../../domain/repositories/productRepositoryInterface';
import { Product } from '../../../domain/entities/product/product';
import { ProductErrors } from '../../errors/productErrors';

type Response = Either<
   ProductErrors.ValidationError | ProductErrors.DeleteError | ProductErrors.ProductNotFound,
   string
>;

export class DeleteProductUseCase {
   constructor(private repository: ProductRepositoryInterface) {}

   async execute(id: string): Promise<Response> {
      const product: Product | null = await this.repository.getProductById(id);
      if (product === null) {
         return failure(new ProductErrors.ProductNotFound());
      }

      const deleted = await this.repository.delete(id);
      if (!deleted) {
         return failure(new ProductErrors.DeleteError());
      }

      return success(product.productId);
   }
}
