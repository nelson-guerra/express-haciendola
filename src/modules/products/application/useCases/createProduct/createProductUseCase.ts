import { Either, success, failure } from '../../../../../shared/core/either';
import { ProductRepositoryInterface } from '../../../domain/repositories/productRepositoryInterface';
import { Product } from '../../../domain/entities/product/product';
import { ProductErrors } from '../../errors/productErrors';
import { CreateProductDTO } from '../../../domain/entities/product/dto/productDTOs';

type Response = Either<ProductErrors.ValidationError | ProductErrors.SaveError, string>;

export class CreateProductUseCase {
   constructor(private repository: ProductRepositoryInterface) {}

   async execute(data: CreateProductDTO): Promise<Response> {
      const product = Product.create(data);

      const saved = await this.repository.save(product);
      if (!saved) {
         return failure(new ProductErrors.SaveError());
      }

      return success(product.productId);
   }
}
