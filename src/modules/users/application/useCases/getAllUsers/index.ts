import { GetAllUsersUseCase } from './getAllUsersUseCase';
import { userRepository } from '../../../infrastructure/implementations';
import { GetAllUsersController } from './getAllUsersController';

const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

export { getAllUsersController };
