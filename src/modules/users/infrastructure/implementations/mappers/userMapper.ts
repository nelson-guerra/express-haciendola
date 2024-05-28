import { User } from '../../../domain/entities/user/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
   public static toDomain(data: UserEntity): User {
      const user = User.create({
         name: data.name,
         password: data.password,
         email: data.email,
         id: data.id,
      });

      return user;
   }

   public static toPersist(user: User) {
      const data = {
         name: user.name,
         password: user.password,
         email: user.email,
         id: user.userId,
      };

      return data;
   }
}
