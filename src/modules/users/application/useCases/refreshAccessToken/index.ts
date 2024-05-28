import { RefreshAccessTokenUseCase } from './refreshAccessTokenUseCase';
import { userRepository } from '../../../infrastructure/implementations';
import { RefreshAccessTokenController } from './refreshAccessTokenController';
import { jwtAdapter } from '../../../../../shared/infrastructure/cryptography/jwtAdapter';
//import { bcryptAdapter } from '../../../../../shared/infrastructure/cryptography/bcryptAdapter';

const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(userRepository, jwtAdapter);
const refreshAccessTokenController = new RefreshAccessTokenController(refreshAccessTokenUseCase);

export { refreshAccessTokenController };
