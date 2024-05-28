import { Either } from '../../../../shared/core/either';

export interface JwtPayload {
   id: string;
   email: string;
   iat?: number;
   exp?: number;
}

export interface JwtErrors {
   expired?: boolean;
   invalid?: boolean;
}

type Response = Either<JwtErrors, JwtPayload>;

export interface JwtInterface {
   createToken: (payload: JwtPayload) => Promise<string>;
   createRefreshToken: (payload: JwtPayload) => Promise<string>;
   verifyToken: (token: string) => Promise<Response>;
   verifyRefreshToken: (token: string) => Promise<Response>;
}
