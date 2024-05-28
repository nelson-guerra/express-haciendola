import * as httpMock from 'node-mocks-http';
import { NextFunction } from 'express';
import { success, failure } from '../../../../../../src/shared/core/either';
import { userRepository } from '../../../../../../src/modules/users/infrastructure/implementations';
import { CreateUserController } from '../../../../../../src/modules/users/application/useCases/createUser/createUserController';
import { CreateUserUseCase } from '../../../../../../src/modules/users/application/useCases/createUser/createUserUseCase';
import { ValidateService } from '../../../../../../src/shared/infrastructure/validate/validate.service';
import { UserErrors } from '../../../../../../src/modules/users/application/errors/userErrors';
import { UniqueEntityID } from '../../../../../../src/shared/domain/uniqueEntityID';
import { bcryptAdapter } from '../../../../../../src/shared/infrastructure/cryptography/bcryptAdapter';
import { mockUser } from '../../../../../mocks/mockUser';

describe('Create User - Controller', () => {
   const id = UniqueEntityID.generateId();
   let req: any, res: any, next: any;

   let createUserUseCase: CreateUserUseCase;
   let createUserController: CreateUserController;

   beforeAll(() => {
      req = httpMock.createRequest({
         method: 'POST',
         body: mockUser(),
      });
      res = httpMock.createResponse();
      next = jest.fn() as NextFunction;

      createUserUseCase = new CreateUserUseCase(userRepository, bcryptAdapter);
      createUserController = new CreateUserController(createUserUseCase);
   });

   it('should register one user', async () => {
      const spyValidate = jest.spyOn(ValidateService, 'validate').mockResolvedValue(null);
      const spy = jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(success(id));

      await createUserController.execute(req, res, next);

      expect(spyValidate).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({ status: true });
   });

   it('should return error from usecase', async () => {
      const spyValidate = jest.spyOn(ValidateService, 'validate').mockResolvedValue(null);
      const spy = jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(failure(new UserErrors.SaveError()));

      await createUserController.execute(req, res, next);

      expect(spyValidate).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new UserErrors.SaveError());
   });

   it('should return validation error', async () => {
      const spy = jest.spyOn(ValidateService, 'validate').mockResolvedValue('error');

      await createUserController.execute(req, res, next);

      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new UserErrors.ValidationError('error'));
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
