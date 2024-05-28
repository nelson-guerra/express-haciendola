import * as httpMock from 'node-mocks-http';
import { NextFunction } from 'express';
import { success, failure } from '../../../../../../src/shared/core/either';
import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { GetAllProductsUseCase } from '../../../../../../src/modules/products/application/useCases/getAllProducts/getAllProductsUseCase';
import { GetAllProductsController } from '../../../../../../src/modules/products/application/useCases/getAllProducts/getAllProductsController';
import { Product } from '../../../../../../src/modules/products/domain/entities/product/product';
import { CreateProductDTO } from '../../../../../../src/modules/products/domain/entities/product/dto/productDTOs';
import { ProductErrors } from '../../../../../../src/modules/products/application/errors/productErrors';
import { ProductMapper } from '../../../../../../src/modules/products/application/mappers/productMapper';
import { mockProduct } from '../../../../../mocks/mockproduct';

describe('Get All Products - Controller', () => {
   let req: any, res: any, next: any;

   let getAllProductsUseCase: GetAllProductsUseCase;
   let getAllProductsController: GetAllProductsController;

   const mock: CreateProductDTO = mockProduct();
   const mockList: Array<Product> = [];
   const product = Product.create(mock);
   mockList.push(product);

   beforeAll(() => {
      req = httpMock.createRequest();
      res = httpMock.createResponse();
      next = jest.fn() as NextFunction;

      getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
      getAllProductsController = new GetAllProductsController(getAllProductsUseCase);
   });

   it('should return array products', async () => {
      const spy = jest.spyOn(getAllProductsUseCase, 'execute').mockResolvedValue(success(mockList));

      await getAllProductsController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({
         data: mockList.map(data => ProductMapper.fromDomainToResponse(data)),
      });
   });

   it('should return error from usecase', async () => {
      const spy = jest
         .spyOn(getAllProductsUseCase, 'execute')
         .mockResolvedValue(failure(new ProductErrors.GetProductsError()));

      await getAllProductsController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ProductErrors.GetProductsError());
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
