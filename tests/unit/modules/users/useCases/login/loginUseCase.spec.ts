import { userRepository } from '../../../../../../src/modules/users/infrastructure/implementations';
import { LoginUserUseCase } from '../../../../../../src/modules/users/application/useCases/login/loginUserUseCase';
import { bcryptAdapter } from '../../../../../../src/shared/infrastructure/cryptography/bcryptAdapter';
import { jwtAdapter } from '../../../../../../src/shared/infrastructure/cryptography/jwtAdapter';
import { LoginUserDTO, CreateUserDTO } from '../../../../../../src/modules/users/domain/entities/user/dto/userDTOs';
import { User } from '../../../../../../src/modules/users/domain/entities/user/user';
import { mockUser } from '../../../../../mocks/mockUser';

describe('Login - UseCase', () => {
   let loginUserUseCase: LoginUserUseCase;

   const mock: CreateUserDTO = mockUser();
   const mockCredentials: LoginUserDTO = {
      email: mock.email,
      password: mock.password,
   };

   beforeAll(() => {
      loginUserUseCase = new LoginUserUseCase(userRepository, bcryptAdapter, jwtAdapter);
   });

   it('should return token', async () => {
      const user = User.create(mock);

      const spy = jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValue(user);
      const spyBcrypt = jest.spyOn(bcryptAdapter, 'comparePassword').mockResolvedValue(true);

      const result = await loginUserUseCase.execute(mockCredentials);

      expect(spyBcrypt).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(result.isSuccess()).toBeTruthy();
      expect(result.value).toHaveProperty('token');
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
