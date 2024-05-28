import { AggregateRoot } from '../../../../../shared/domain/aggregateRoot';
import { CreateUserDTO } from './dto/userDTOs';

export class User extends AggregateRoot {
   private constructor(
      public name: string,
      public password: string,
      public email: string,
      id?: string,
   ) {
      super(id);
   }

   get userId(): string {
      return this.id;
   }

   public static create(data: CreateUserDTO): User {
      const user = new User(data.name, data.password, data.email, data.id);

      return user;
   }
}
