import { UpdateProductUseCase } from './updateProductUseCase';
import { productRepository } from '../../../infrastructure/implementations';
import { UpdateProductController } from './updateProductController';

const updateProductUseCase = new UpdateProductUseCase(productRepository);
const updateProductController = new UpdateProductController(updateProductUseCase);

export { updateProductController };
