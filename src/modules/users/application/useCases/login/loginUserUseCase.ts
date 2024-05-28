import { Either, success, failure } from '../../../../../shared/core/either';
import { UserRepositoryInterface } from '../../../domain/repositories/userRepositoryInterface';
import { User } from '../../../domain/entities/user/user';
import { UserErrors } from '../../errors/userErrors';
import { LoginUserDTO } from '../../../domain/entities/user/dto/userDTOs';
import { JwtInterface, JwtPayload } from '../../services/jwtInterface';
import { HasherInterface } from '../../services/hasherInterface';

type Response = Either<UserErrors.InvalidEmail | UserErrors.InvalidPassword, { token: string; refreshToken: string }>;

export class LoginUserUseCase {
   constructor(
      private repository: UserRepositoryInterface,
      private hasher: HasherInterface,
      private jwt: JwtInterface,
   ) {}

   async execute(data: LoginUserDTO): Promise<Response> {
      const user: User | null = await this.repository.getUserByEmail(data.email);
      if (user === null) {
         return failure(new UserErrors.InvalidEmail());
      }

      const isPasswordValid = await this.hasher.comparePassword(data.password, user.password);
      if (!isPasswordValid) {
         return failure(new UserErrors.InvalidPassword());
      }

      const payload: JwtPayload = {
         id: user.userId,
         email: user.email,
      };

      const token = await this.jwt.createToken(payload);
      const refreshToken = await this.jwt.createRefreshToken(payload);

      return success({ token, refreshToken });
   }
}
