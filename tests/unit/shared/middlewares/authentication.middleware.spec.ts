import * as httpMock from 'node-mocks-http';
import { failure } from '../../../../src/shared/core/either';
import { NextFunction } from 'express';
import { UniqueEntityID } from '../../../../src/shared/domain/uniqueEntityID';
import { jwtAdapter } from '../../../../src/shared/infrastructure/cryptography/jwtAdapter';
import { JwtPayload } from '../../../../src/modules/users/application/services/jwtInterface';
import { authenticationMiddleware } from '../../../../src/shared/infrastructure/middlewares/authentication.middleware';
import { UnauthorizedException, ForbiddenException } from '../../../../src/shared/infrastructure/http/httpException';

describe('Authorization middleware', () => {
   let token: string;

   beforeAll(async () => {
      const payload: JwtPayload = {
         id: UniqueEntityID.generateId(),
         email: 'demo@gmail.com',
      };

      token = await jwtAdapter.createToken(payload);
   });

   test('with "authorization" header', async () => {
      const req = httpMock.createRequest({
         headers: { Authorization: `Bearer ${token}` },
      });
      const next = jest.fn() as NextFunction;

      await authenticationMiddleware.ensureAuthenticated(req, next);

      expect(next).toHaveBeenCalledTimes(1);
   });

   test('without token', async () => {
      const req = httpMock.createRequest({
         headers: { Authorization: `Bearer ` },
      });
      const next = jest.fn() as NextFunction;

      await authenticationMiddleware.ensureAuthenticated(req, next);

      expect(next).toHaveBeenCalledWith(new UnauthorizedException('Unauthorized: No token provided'));
      expect(next).toHaveBeenCalledTimes(1);
   });

   test('with expired tokem', async () => {
      const spyJwt = jest.spyOn(jwtAdapter, 'verifyToken').mockResolvedValue(failure({ expired: true }));
      const req = httpMock.createRequest({
         headers: { Authorization: `Bearer ${token}` },
      });
      const next = jest.fn() as NextFunction;

      await authenticationMiddleware.ensureAuthenticated(req, next);

      expect(spyJwt).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new ForbiddenException('Unauthorized: Token expired'));
      expect(next).toHaveBeenCalledTimes(1);
   });

   test('with invalid tokem', async () => {
      const spyJwt = jest.spyOn(jwtAdapter, 'verifyToken').mockResolvedValue(failure({ invalid: true }));
      const req = httpMock.createRequest({
         headers: { Authorization: `Bearer ${token}` },
      });
      const next = jest.fn() as NextFunction;

      await authenticationMiddleware.ensureAuthenticated(req, next);

      expect(spyJwt).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(new UnauthorizedException('Unauthorized: Invalid token'));
      expect(next).toHaveBeenCalledTimes(1);
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
