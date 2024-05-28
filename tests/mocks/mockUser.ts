import { faker } from '@faker-js/faker';
import { CreateUserDTO, LoginUserDTO } from '../../src/modules/users/domain/entities/user/dto/userDTOs';
import { JwtPayload } from '../../src/modules/users/application/services/jwtInterface';

export const mockUser = (): CreateUserDTO => ({
   name: faker.person.firstName(),
   email: faker.internet.email().toLowerCase(),
   password: faker.internet.password(),
});

export const mockJwtPayload = (): JwtPayload => ({
   id: faker.string.uuid(),
   email: faker.internet.email().toLowerCase(),
});

export const mockCredentials = (): LoginUserDTO => ({
   email: faker.internet.email().toLowerCase(),
   password: faker.internet.password(),
});
