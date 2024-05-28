import * as httpMock from 'node-mocks-http';
import { NextFunction } from 'express';
import { success, failure } from '../../../../../../src/shared/core/either';
import { userRepository } from '../../../../../../src/modules/users/infrastructure/implementations';
import { LoginUserController } from '../../../../../../src/modules/users/application/useCases/login/loginUserController';
import { LoginUserUseCase } from '../../../../../../src/modules/users/application/useCases/login/loginUserUseCase';
import { ValidateService } from '../../../../../../src/shared/infrastructure/validate/validate.service';
import { UserErrors } from '../../../../../../src/modules/users/application/errors/userErrors';
import { bcryptAdapter } from '../../../../../../src/shared/infrastructure/cryptography/bcryptAdapter';
import { jwtAdapter } from '../../../../../../src/shared/infrastructure/cryptography/jwtAdapter';
import { JwtPayload } from '../../../../../../src/modules/users/application/services/jwtInterface';
import { mockCredentials, mockJwtPayload } from '../../../../../mocks/mockUser';

describe('Login - Controller', () => {
   let req: any, res: any, next: any;

   let payload: JwtPayload;
   let token: string;
   let refreshToken: string;

   let loginUserUseCase: LoginUserUseCase;
   let loginUserController: LoginUserController;

   beforeAll(async () => {
      req = httpMock.createRequest({
         method: 'POST',
         body: mockCredentials(),
      });
      res = httpMock.createResponse();
      next = jest.fn() as NextFunction;

      payload = mockJwtPayload();
      token = await jwtAdapter.createToken(payload);
      refreshToken = await jwtAdapter.createRefreshToken(payload);

      loginUserUseCase = new LoginUserUseCase(userRepository, bcryptAdapter, jwtAdapter);
      loginUserController = new LoginUserController(loginUserUseCase);
   });

   it('should login', async () => {
      const spyValidate = jest.spyOn(ValidateService, 'validate').mockResolvedValue(null);
      const spy = jest.spyOn(loginUserUseCase, 'execute').mockResolvedValue(success({ token, refreshToken }));

      await loginUserController.execute(req, res, next);

      expect(spyValidate).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toMatchObject({ data: { token, refreshToken } });
   });

   it('should return error from usecase', async () => {
      const spyValidate = jest.spyOn(ValidateService, 'validate').mockResolvedValue(null);
      const spy = jest.spyOn(loginUserUseCase, 'execute').mockResolvedValue(failure(new UserErrors.InvalidEmail()));

      await loginUserController.execute(req, res, next);

      expect(spyValidate).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new UserErrors.InvalidEmail());
   });

   it('should return error from usecase', async () => {
      const spyValidate = jest.spyOn(ValidateService, 'validate').mockResolvedValue(null);
      const spy = jest.spyOn(loginUserUseCase, 'execute').mockResolvedValue(failure(new UserErrors.InvalidPassword()));

      await loginUserController.execute(req, res, next);

      expect(spyValidate).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new UserErrors.InvalidPassword());
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
