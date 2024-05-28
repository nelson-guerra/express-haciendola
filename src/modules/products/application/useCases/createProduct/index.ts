import { CreateProductUseCase } from './createProductUseCase';
import { productRepository } from '../../../infrastructure/implementations';
import { CreateProductController } from './createProductController';

const createProductUseCase = new CreateProductUseCase(productRepository);
const createProductController = new CreateProductController(createProductUseCase);

export { createProductController };
