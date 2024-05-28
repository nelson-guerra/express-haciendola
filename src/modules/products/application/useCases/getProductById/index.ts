import { GetProductByIdUseCase } from './getProductByIdUseCase';
import { productRepository } from '../../../infrastructure/implementations';
import { GetProductByIdController } from './getProductByIdController';

const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const getProductByIdController = new GetProductByIdController(getProductByIdUseCase);

export { getProductByIdController };
