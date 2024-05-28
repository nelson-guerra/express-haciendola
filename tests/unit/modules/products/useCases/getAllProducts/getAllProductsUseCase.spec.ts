import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { GetAllProductsUseCase } from '../../../../../../src/modules/products/application/useCases/getAllProducts/getAllProductsUseCase';
import { Product } from '../../../../../../src/modules/products/domain/entities/product/product';
import { CreateProductDTO } from '../../../../../../src/modules/products/domain/entities/product/dto/productDTOs';
import { mockProduct } from '../../../../../mocks/mockproduct';

describe('Get All Products - UseCase', () => {
   let getAllProductsUseCase: GetAllProductsUseCase;

   const mock: CreateProductDTO = mockProduct();
   const mockList: Array<Product> = [];
   const product = Product.create(mock);
   mockList.push(product);

   beforeAll(() => {
      getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
   });

   it('should return all products', async () => {
      const spy = jest.spyOn(productRepository, 'getAllProducts').mockResolvedValue(mockList);

      const result = await getAllProductsUseCase.execute();

      expect(spy).toHaveBeenCalled();
      expect(result.value).toMatchObject(mockList);
      expect(result.isSuccess()).toBeTruthy();
   });

   it('should return error from repository', async () => {
      const spy = jest.spyOn(productRepository, 'getAllProducts').mockResolvedValue(null);

      const result = await getAllProductsUseCase.execute();

      expect(spy).toHaveBeenCalled();
      expect(result.isFailure()).toBeTruthy();
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
