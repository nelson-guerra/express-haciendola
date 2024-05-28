import { Either, success, failure } from '../../../../../shared/core/either';
import { UserRepositoryInterface } from '../../../domain/repositories/userRepositoryInterface';
import { User } from '../../../domain/entities/user/user';
import { UserErrors } from '../../errors/userErrors';
import { RefreshTokenDTO } from '../../../domain/entities/user/dto/userDTOs';
import { JwtInterface, JwtPayload } from '../../services/jwtInterface';

type Response = Either<UserErrors.InvalidEmail | UserErrors.InvalidToken | UserErrors.ExpiredToken, string>;

export class RefreshAccessTokenUseCase {
   constructor(
      private repository: UserRepositoryInterface,
      private jwt: JwtInterface,
   ) {}

   async execute(data: RefreshTokenDTO): Promise<Response> {
      const result = await this.jwt.verifyRefreshToken(data.token);

      if (result.isFailure()) {
         if (result.value.expired) {
            return failure(new UserErrors.ExpiredToken());
         }

         if (result.value.invalid) {
            return failure(new UserErrors.InvalidToken());
         }
      }

      const user: User | null = await this.repository.getUserById((result.value as JwtPayload).id);
      if (user === null) {
         return failure(new UserErrors.InvalidToken());
      }

      const payload: JwtPayload = {
         id: user.userId,
         email: user.email,
      };

      const accessToken = await this.jwt.createToken(payload);

      return success(accessToken);
   }
}
