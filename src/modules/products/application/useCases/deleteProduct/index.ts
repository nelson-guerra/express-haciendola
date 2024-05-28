import { DeleteProductUseCase } from './deleteProductUseCase';
import { productRepository } from '../../../infrastructure/implementations';
import { DeleteProductController } from './deleteProductController';

const deleteProductUseCase = new DeleteProductUseCase(productRepository);
const deleteProductController = new DeleteProductController(deleteProductUseCase);

export { deleteProductController };
