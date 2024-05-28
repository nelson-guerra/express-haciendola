import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { UpdateProductUseCase } from '../../../../../../src/modules/products/application/useCases/updateProduct/updateProductUseCase';
import { Product } from '../../../../../../src/modules/products/domain/entities/product/product';
import { UpdateProductDTO } from '../../../../../../src/modules/products/domain/entities/product/dto/productDTOs';
import { HttpException } from '../../../../../../src/shared/infrastructure/http/httpException';
import { mockProduct } from '../../../../../mocks/mockproduct';

describe('Update Product - UseCase', () => {
   let updateProductUseCase: UpdateProductUseCase;

   const mock: UpdateProductDTO = mockProduct();
   const product = Product.create(mock);
   const id = product.productId;

   beforeAll(() => {
      updateProductUseCase = new UpdateProductUseCase(productRepository);
   });

   it('should return one product', async () => {
      const spyGetProduct = jest.spyOn(productRepository, 'getProductById').mockResolvedValue(product);
      const spy = jest.spyOn(productRepository, 'update').mockResolvedValue(true);
      const result = await updateProductUseCase.execute(id, mock);

      expect(spyGetProduct).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(result.isSuccess()).toBeTruthy();
      expect(result.value).toEqual(id);
   });

   it('should return error from repository', async () => {
      const spyGetProduct = jest.spyOn(productRepository, 'getProductById').mockResolvedValue(product);
      const spy = jest.spyOn(productRepository, 'update').mockResolvedValue(false);

      const result = await updateProductUseCase.execute(id, mock);

      expect(spyGetProduct).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(result.isFailure()).toBeTruthy();
      expect(result.value).toBeInstanceOf(HttpException);
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
