import * as httpMock from 'node-mocks-http';
import { NextFunction } from 'express';
import { success, failure } from '../../../../../../src/shared/core/either';
import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { GetProductByIdUseCase } from '../../../../../../src/modules/products/application/useCases/getProductById/getProductByIdUseCase';
import { GetProductByIdController } from '../../../../../../src/modules/products/application/useCases/getProductById/getProductByIdController';
import { Product } from '../../../../../../src/modules/products/domain/entities/product/product';
import { CreateProductDTO } from '../../../../../../src/modules/products/domain/entities/product/dto/productDTOs';
import { ValidateService } from '../../../../../../src/shared/infrastructure/validate/validate.service';
import { ProductErrors } from '../../../../../../src/modules/products/application/errors/productErrors';
import { ProductMapper } from '../../../../../../src/modules/products/application/mappers/productMapper';
import { mockProduct } from '../../../../../mocks/mockproduct';

describe('Get Product by Id - Controller', () => {
   let req: any, res: any, next: any;

   let getProductByIdUseCase: GetProductByIdUseCase;
   let getProductByIdController: GetProductByIdController;

   const mock: CreateProductDTO = mockProduct();
   const product = Product.create(mock);

   beforeAll(() => {
      req = httpMock.createRequest();
      res = httpMock.createResponse();
      next = jest.fn() as NextFunction;

      getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
      getProductByIdController = new GetProductByIdController(getProductByIdUseCase);
   });

   it('should return one product', async () => {
      jest.spyOn(ValidateService, 'validate').mockResolvedValue(null);
      const spy = jest.spyOn(getProductByIdUseCase, 'execute').mockResolvedValue(success(product));

      await getProductByIdController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({
         data: ProductMapper.fromDomainToResponse(product),
      });
   });

   it('should return error from usecase', async () => {
      jest.spyOn(ValidateService, 'validate').mockResolvedValue(null);
      const spy = jest
         .spyOn(getProductByIdUseCase, 'execute')
         .mockResolvedValue(failure(new ProductErrors.GetProductsError()));

      await getProductByIdController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ProductErrors.GetProductsError());
   });

   it('should return validation error', async () => {
      const spy = jest.spyOn(ValidateService, 'validate').mockResolvedValue('error');

      await getProductByIdController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ProductErrors.ValidationError('error'));
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
