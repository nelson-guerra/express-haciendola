import * as httpMock from 'node-mocks-http';
import { NextFunction } from 'express';
import { success, failure } from '../../../../../../src/shared/core/either';
import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { CreateProductUseCase } from '../../../../../../src/modules/products/application/useCases/createProduct/createProductUseCase';
import { CreateProductController } from '../../../../../../src/modules/products/application/useCases/createProduct/createProductController';
import { ValidateService } from '../../../../../../src/shared/infrastructure/validate/validate.service';
import { ProductErrors } from '../../../../../../src/modules/products/application/errors/productErrors';
import { UniqueEntityID } from '../../../../../../src/shared/domain/uniqueEntityID';
import { mockProduct } from '../../../../../mocks/mockproduct';

describe('Create Product - Controller', () => {
   const id = UniqueEntityID.generateId();
   let req: any, res: any, next: any;

   let createProductUseCase: CreateProductUseCase;
   let createProductController: CreateProductController;

   beforeAll(() => {
      req = httpMock.createRequest({
         method: 'POST',
         body: mockProduct(),
      });
      res = httpMock.createResponse();
      next = jest.fn() as NextFunction;

      createProductUseCase = new CreateProductUseCase(productRepository);
      createProductController = new CreateProductController(createProductUseCase);
   });

   it('should return one product', async () => {
      const spy = jest.spyOn(createProductUseCase, 'execute').mockResolvedValue(success(id));
      const spyValidate = jest.spyOn(ValidateService, 'validate').mockResolvedValue(null);

      await createProductController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(spyValidate).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({ data: { id } });
   });

   it('should return error from usecase', async () => {
      const spy = jest.spyOn(createProductUseCase, 'execute').mockResolvedValue(failure(new ProductErrors.SaveError()));

      await createProductController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ProductErrors.SaveError());
   });

   it('should return validation error', async () => {
      const spy = jest.spyOn(ValidateService, 'validate').mockResolvedValue('error');

      await createProductController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ProductErrors.ValidationError('error'));
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
