import * as httpMock from 'node-mocks-http';
import { NextFunction } from 'express';
import { success, failure } from '../../../../../../src/shared/core/either';
import { productRepository } from '../../../../../../src/modules/products/infrastructure/implementations';
import { DeleteProductUseCase } from '../../../../../../src/modules/products/application/useCases/deleteProduct/deleteProductUseCase';
import { DeleteProductController } from '../../../../../../src/modules/products/application/useCases/deleteProduct/deleteProductController';
import { ValidateService } from '../../../../../../src/shared/infrastructure/validate/validate.service';
import { ProductErrors } from '../../../../../../src/modules/products/application/errors/productErrors';
import { UniqueEntityID } from '../../../../../../src/shared/domain/uniqueEntityID';

describe('Delete Product - Controller', () => {
   const id = UniqueEntityID.generateId();
   let req: any, res: any, next: any;

   let deleteProductUseCase: DeleteProductUseCase;
   let deleteProductController: DeleteProductController;

   beforeAll(() => {
      req = httpMock.createRequest({
         method: 'DELETE',
         params: {
            id: id.toString(),
         },
      });
      res = httpMock.createResponse();
      next = jest.fn() as NextFunction;

      deleteProductUseCase = new DeleteProductUseCase(productRepository);
      deleteProductController = new DeleteProductController(deleteProductUseCase);
   });

   it('should return id user deleted', async () => {
      const spy = jest.spyOn(deleteProductUseCase, 'execute').mockResolvedValue(success(id));

      await deleteProductController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({
         data: { id },
      });
   });

   it('should return product not found error', async () => {
      const spy = jest
         .spyOn(deleteProductUseCase, 'execute')
         .mockResolvedValue(failure(new ProductErrors.ProductNotFound()));

      await deleteProductController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ProductErrors.ProductNotFound());
   });

   it('should return validation error', async () => {
      const spy = jest.spyOn(ValidateService, 'validate').mockResolvedValue('error');

      await deleteProductController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ProductErrors.ValidationError('error'));
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
