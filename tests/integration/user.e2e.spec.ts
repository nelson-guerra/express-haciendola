import supertest from 'supertest';
import { app } from '../../src/app';
import { DatabaseBootstrap } from '../../src/bootstrap/database';
import { LoginUserDTO, CreateUserDTO } from '../../src/modules/users/domain/entities/user/dto/userDTOs';
import { HttpStatusCode } from '../../src/shared/infrastructure/http/httpStatusCode';
import { mockUser } from '../mocks/mockUser';

const database = new DatabaseBootstrap();
const server = supertest(app);

describe('Users', () => {
   let userEmail: string;
   let userPasword: string;

   beforeAll(async () => {
      await database.initialize();
   });

   afterAll(() => {
      database.close();
   });

   it('[200::OK] create user', async () => {
      const request: CreateUserDTO = mockUser();
      userEmail = request.email;
      userPasword = request.password;

      const result = await server.post('/api/v1/users').send(request);

      expect(result.statusCode).toEqual(HttpStatusCode.SUCCESS);
   });

   it('[200::OK] login', async () => {
      const request: LoginUserDTO = {
         email: userEmail,
         password: userPasword,
      };

      const result = await server.post('/api/v1/auth/login').send(request);

      expect(result.statusCode).toEqual(HttpStatusCode.SUCCESS);
      expect(result.body.data).toHaveProperty('token');
      expect(result.body.data).toHaveProperty('refreshToken');
   });

   it('[400::BAD_REQUEST] login failed', async () => {
      const request: LoginUserDTO = {
         email: 'invalid@gmail.com',
         password: userPasword,
      };

      const result = await server.post('/api/v1/auth/login').send(request);

      expect(result.statusCode).toEqual(HttpStatusCode.BAD_REQUEST);
   });
});
