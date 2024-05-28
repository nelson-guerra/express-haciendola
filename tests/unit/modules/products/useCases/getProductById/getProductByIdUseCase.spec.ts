import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { GetProductByIdUseCase } from '../../../../../../src/modules/products/application/useCases/getProductById/getProductByIdUseCase';
import { Product } from '../../../../../../src/modules/products/domain/entities/product/product';
import { CreateProductDTO } from '../../../../../../src/modules/products/domain/entities/product/dto/productDTOs';
import { UniqueEntityID } from '../../../../../../src/shared/domain/uniqueEntityID';
import { mockProduct } from '../../../../../mocks/mockproduct';

describe('Get Product by Id - UseCase', () => {
   let getProductByIdUseCase: GetProductByIdUseCase;

   const mock: CreateProductDTO = mockProduct();
   const product = Product.create(mock);
   const id = UniqueEntityID.generateId();

   beforeAll(() => {
      getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
   });

   it('should return one product', async () => {
      const spy = jest.spyOn(productRepository, 'getProductById').mockResolvedValue(product);

      const result = await getProductByIdUseCase.execute(id);

      expect(spy).toHaveBeenCalled();
      expect(result.value).toMatchObject(product);
      expect(result.isSuccess()).toBeTruthy();
   });

   it('should return error from repository', async () => {
      const spy = jest.spyOn(productRepository, 'getProductById').mockResolvedValue(null);

      const result = await getProductByIdUseCase.execute(id);

      expect(spy).toHaveBeenCalled();
      expect(result.isFailure()).toBeTruthy();
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
