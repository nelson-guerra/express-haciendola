import { ResponseUserDTO } from '../../domain/entities/user/dto/userDTOs';
import { User } from '../../domain/entities/user/user';

export class UserMapper {
   static fromDomainToResponse(user: User): ResponseUserDTO {
      const response: ResponseUserDTO = {
         id: user.userId,
         name: user.name,
         password: user.password,
         email: user.email,
      };

      return response;
   }
}
