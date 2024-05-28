import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { DeleteProductUseCase } from '../../../../../../src/modules/products/application/useCases/deleteProduct/deleteProductUseCase';
import { Product } from '../../../../../../src/modules/products/domain/entities/product/product';
import { CreateProductDTO } from '../../../../../../src/modules/products/domain/entities/product/dto/productDTOs';
import { mockProduct } from '../../../../../mocks/mockproduct';

describe('Delete Product - UseCase', () => {
   let deleteProductUseCase: DeleteProductUseCase;

   const mock: CreateProductDTO = mockProduct();
   const product = Product.create(mock);
   const id = product.productId;

   beforeAll(() => {
      deleteProductUseCase = new DeleteProductUseCase(productRepository);
   });

   it('should return id user deleted', async () => {
      const spyGetProduct = jest.spyOn(productRepository, 'getProductById').mockResolvedValue(product);
      const spy = jest.spyOn(productRepository, 'delete').mockResolvedValue(true);
      const result = await deleteProductUseCase.execute(id);

      expect(spyGetProduct).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(result.isSuccess()).toBeTruthy();
      expect(result.value).toEqual(id);
   });

   it('should return product not found error', async () => {
      const spy = jest.spyOn(productRepository, 'getProductById').mockResolvedValue(null);
      const result = await deleteProductUseCase.execute(id);

      expect(spy).toHaveBeenCalled();
      expect(result.isFailure()).toBeTruthy();
   });

   it('should return delete error', async () => {
      const spyGetProduct = jest.spyOn(productRepository, 'getProductById').mockResolvedValue(product);
      const spy = jest.spyOn(productRepository, 'delete').mockResolvedValue(false);
      const result = await deleteProductUseCase.execute(id);

      expect(spyGetProduct).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(result.isFailure()).toBeTruthy();
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
