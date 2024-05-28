import * as httpMock from 'node-mocks-http';
import { NextFunction } from 'express';
import { success, failure } from '../../../../../../src/shared/core/either';
import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { UpdateProductController } from '../../../../../../src/modules/products/application/useCases/updateProduct/updateProductController';
import { UpdateProductUseCase } from '../../../../../../src/modules/products/application/useCases/updateProduct/updateProductUseCase';
import { ValidateService } from '../../../../../../src/shared/infrastructure/validate/validate.service';
import { ProductErrors } from '../../../../../../src/modules/products/application/errors/productErrors';
import { UniqueEntityID } from '../../../../../../src/shared/domain/uniqueEntityID';
import { mockProduct } from '../../../../../mocks/mockproduct';

describe('Update Product - Controller', () => {
   const id = UniqueEntityID.generateId();
   let req: any, res: any, next: any;

   let updateProductUseCase: UpdateProductUseCase;
   let updateProductController: UpdateProductController;

   beforeAll(() => {
      req = httpMock.createRequest({
         method: 'PUT',
         body: mockProduct(),
      });
      res = httpMock.createResponse();
      next = jest.fn() as NextFunction;

      updateProductUseCase = new UpdateProductUseCase(productRepository);
      updateProductController = new UpdateProductController(updateProductUseCase);
   });

   it('should return one product', async () => {
      const spyValidate = jest.spyOn(ValidateService, 'validate').mockResolvedValue(null);
      const spy = jest.spyOn(updateProductUseCase, 'execute').mockResolvedValue(success(id));

      await updateProductController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(spyValidate).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({ data: { id } });
   });

   it('should return error from usecase', async () => {
      const spy = jest
         .spyOn(updateProductUseCase, 'execute')
         .mockResolvedValue(failure(new ProductErrors.UpdateError()));

      await updateProductController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ProductErrors.UpdateError());
   });

   it('should return validation error', async () => {
      const spy = jest.spyOn(ValidateService, 'validate').mockResolvedValue('error');

      await updateProductController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ProductErrors.ValidationError('error'));
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
