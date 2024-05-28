import { Either, success, failure } from '../../../../../shared/core/either';
import { ProductRepositoryInterface } from '../../../domain/repositories/productRepositoryInterface';
import { Product } from '../../../domain/entities/product/product';
import { ProductErrors } from '../../errors/productErrors';
import { UpdateProductDTO } from '../../../domain/entities/product/dto/productDTOs';

type Response = Either<
   ProductErrors.ValidationError | ProductErrors.UpdateError | ProductErrors.ProductNotFound,
   string
>;

export class UpdateProductUseCase {
   constructor(private repository: ProductRepositoryInterface) {}

   async execute(id: string, data: UpdateProductDTO): Promise<Response> {
      const product: Product | null = await this.repository.getProductById(id);
      if (product === null) {
         return failure(new ProductErrors.ProductNotFound());
      }

      product.update(data);

      const updated = await this.repository.update(id, product);
      if (!updated) {
         return failure(new ProductErrors.UpdateError());
      }

      return success(product.productId);
   }
}
