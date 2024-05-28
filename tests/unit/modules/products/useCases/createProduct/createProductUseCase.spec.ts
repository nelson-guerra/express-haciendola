import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { CreateProductUseCase } from '../../../../../../src/modules/products/application/useCases/createProduct/createProductUseCase';
import { HttpException } from '../../../../../../src/shared/infrastructure/http/httpException';
import { CreateProductDTO } from '../../../../../../src/modules/products/domain/entities/product/dto/productDTOs';
import { mockProduct } from '../../../../../mocks/mockproduct';

describe('Create Product - UseCase', () => {
   let createProductUseCase: CreateProductUseCase;
   const data: CreateProductDTO = mockProduct();

   beforeAll(() => {
      createProductUseCase = new CreateProductUseCase(productRepository);
   });

   it('should return one product', async () => {
      const spySave = jest.spyOn(productRepository, 'save').mockResolvedValue(true);

      const result = await createProductUseCase.execute(data);

      expect(spySave).toHaveBeenCalled();
      expect(result.isSuccess()).toBeTruthy();
   });

   it('should return error from repository', async () => {
      const spySave = jest.spyOn(productRepository, 'save').mockResolvedValue(false);

      const result = await createProductUseCase.execute(data);

      expect(spySave).toHaveBeenCalled();
      expect(result.isFailure()).toBeTruthy();
      expect(result.value).toBeInstanceOf(HttpException);
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
