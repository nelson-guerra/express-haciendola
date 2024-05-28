import { CreateUserUseCase } from './createUserUseCase';
import { userRepository } from '../../../infrastructure/implementations';
import { CreateUserController } from './createUserController';
import { bcryptAdapter } from '../../../../../shared/infrastructure/cryptography/bcryptAdapter';

const createUserUseCase = new CreateUserUseCase(userRepository, bcryptAdapter);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
