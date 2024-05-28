import { Either, success, failure } from '../../../../../shared/core/either';
import { UserRepositoryInterface } from '../../../domain/repositories/userRepositoryInterface';
import { User } from '../../../domain/entities/user/user';
import { UserErrors } from '../../errors/userErrors';

type Response = Either<UserErrors.ValidationError | UserErrors.GetUsersError, User[]>;

export class GetAllUsersUseCase {
   constructor(private repository: UserRepositoryInterface) {}

   async execute(): Promise<Response> {
      const products: User[] | null = await this.repository.getAllUsers();
      if (products === null) {
         return failure(new UserErrors.GetUsersError());
      }

      return success(products);
   }
}
