import { Either, success, failure } from '../../../../../shared/core/either';
import { UserRepositoryInterface } from '../../../domain/repositories/userRepositoryInterface';
import { User } from '../../../domain/entities/user/user';
import { UserErrors } from '../../errors/userErrors';
import { CreateUserDTO } from '../../../domain/entities/user/dto/userDTOs';
import { HasherInterface } from '../../services/hasherInterface';

type Response = Either<UserErrors.ValidationError | UserErrors.SaveError | UserErrors.EmailAlreadyExists, string>;

export class CreateUserUseCase {
   constructor(
      private repository: UserRepositoryInterface,
      private hasher: HasherInterface,
   ) {}

   async execute(data: CreateUserDTO): Promise<Response> {
      const emailExists: boolean = await this.repository.isEmailExists(data.email);
      if (emailExists) {
         return failure(new UserErrors.EmailAlreadyExists());
      }

      data.password = await this.hasher.encrypt(data.password);

      const user = User.create(data);

      const saved = await this.repository.save(user);
      if (!saved) {
         return failure(new UserErrors.SaveError());
      }

      return success(user.userId);
   }
}
