import jwt from 'jsonwebtoken';
import { Either, success, failure } from '../../core/either';
import { JwtInterface, JwtPayload, JwtErrors } from '../../../modules/users/application/services/jwtInterface';
import { jwtParams } from '../config';

type Response = Either<JwtErrors, JwtPayload>;

export class JwtAdapter implements JwtInterface {
   async createToken(payload: JwtPayload): Promise<string> {
      return jwt.sign(payload, jwtParams.tokenSecret as string, {
         expiresIn: jwtParams.tokenExpiresIn,
      });
   }

   async createRefreshToken(payload: JwtPayload): Promise<string> {
      return jwt.sign(payload, jwtParams.refreshTokenSecret as string, {
         expiresIn: jwtParams.refreshTokenExpiresIn,
      });
   }

   async verifyToken(token: string): Promise<Response> {
      try {
         const decode = jwt.verify(token, jwtParams.tokenSecret as string) as JwtPayload;
         return success(decode);
      } catch (err) {
         if (err instanceof jwt.TokenExpiredError) {
            return failure({ expired: true });
         } else {
            return failure({ invalid: true });
         }
      }
   }

   async verifyRefreshToken(token: string): Promise<Response> {
      try {
         const decode = jwt.verify(token, jwtParams.refreshTokenSecret as string) as JwtPayload;
         return success(decode);
      } catch (err) {
         if (err instanceof jwt.TokenExpiredError) {
            return failure({ expired: true });
         } else {
            return failure({ invalid: true });
         }
      }
   }
}

export const jwtAdapter = new JwtAdapter();
