import { Request, NextFunction } from 'express';
import { jwtAdapter } from '../cryptography/jwtAdapter';
import { JwtInterface } from '../../../modules/users/application/services/jwtInterface';
import { UnauthorizedException, ForbiddenException } from '../http/httpException';

class AuthenticationMiddleware {
   constructor(private jwt: JwtInterface) {}

   async ensureAuthenticated(req: Request, next: NextFunction) {
      const { authorization } = req.headers;

      if (!authorization || authorization.split(' ')[0] !== 'Bearer' || !authorization.split(' ')[1]) {
         return next(new UnauthorizedException('Unauthorized: No token provided'));
      }

      const result = await this.jwt.verifyToken(authorization.split(' ')[1]);

      if (result.isFailure()) {
         if (result.value.expired) {
            return next(new ForbiddenException('Unauthorized: Token expired'));
         }

         if (result.value.invalid) {
            return next(new UnauthorizedException('Unauthorized: Invalid token'));
         }
      }

      return next();
   }
}

export const authenticationMiddleware = new AuthenticationMiddleware(jwtAdapter);
