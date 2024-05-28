import { Either, success, failure } from '../../../../../shared/core/either';
import { ProductRepositoryInterface } from '../../../domain/repositories/productRepositoryInterface';
import { Product } from '../../../domain/entities/product/product';
import { ProductErrors } from '../../errors/productErrors';

type Response = Either<ProductErrors.ProductNotFound, Product>;

export class GetProductByIdUseCase {
   constructor(private repository: ProductRepositoryInterface) {}

   async execute(id: string): Promise<Response> {
      const product: Product | null = await this.repository.getProductById(id);
      if (product === null) {
         return failure(new ProductErrors.ProductNotFound());
      }

      return success(product);
   }
}
