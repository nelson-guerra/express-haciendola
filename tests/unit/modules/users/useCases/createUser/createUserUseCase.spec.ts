import { userRepository } from '../../../../../../src/modules/users/infrastructure/implementations';
import { CreateUserUseCase } from '../../../../../../src/modules/users/application/useCases/createUser/createUserUseCase';
import { bcryptAdapter } from '../../../../../../src/shared/infrastructure/cryptography/bcryptAdapter';
import { CreateUserDTO } from '../../../../../../src/modules/users/domain/entities/user/dto/userDTOs';
import { HttpException } from '../../../../../../src/shared/infrastructure/http/httpException';
import { mockUser } from '../../../../../mocks/mockUser';

describe('Create User - UseCase', () => {
   let createUserUseCase: CreateUserUseCase;
   const mock: CreateUserDTO = mockUser();

   beforeAll(() => {
      createUserUseCase = new CreateUserUseCase(userRepository, bcryptAdapter);
   });

   it('should return one user', async () => {
      const spyVerifyEmail = jest.spyOn(userRepository, 'isEmailExists').mockResolvedValue(false);
      const spy = jest.spyOn(userRepository, 'save').mockResolvedValue(true);

      const result = await createUserUseCase.execute(mock);

      expect(spyVerifyEmail).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(result.isSuccess()).toBeTruthy();
   });

   it('should return error from repository', async () => {
      const spyVerifyEmail = jest.spyOn(userRepository, 'isEmailExists').mockResolvedValue(false);
      const spy = jest.spyOn(userRepository, 'save').mockResolvedValue(false);

      const result = await createUserUseCase.execute(mock);

      expect(spyVerifyEmail).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(result.isFailure()).toBeTruthy();
      expect(result.value).toBeInstanceOf(HttpException);
   });

   afterAll(() => {
      jest.restoreAllMocks();
   });
});
