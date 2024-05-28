import { LoginUserUseCase } from './loginUserUseCase';
import { userRepository } from '../../../infrastructure/implementations';
import { LoginUserController } from './loginUserController';
import { jwtAdapter } from '../../../../../shared/infrastructure/cryptography/jwtAdapter';
import { bcryptAdapter } from '../../../../../shared/infrastructure/cryptography/bcryptAdapter';

const loginUserUseCase = new LoginUserUseCase(userRepository, bcryptAdapter, jwtAdapter);
const loginUserController = new LoginUserController(loginUserUseCase);

export { loginUserController };
