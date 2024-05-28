import { GetAllProductsUseCase } from './getAllProductsUseCase';
import { productRepository } from '../../../infrastructure/implementations';
import { GetAllProductsController } from './getAllProductsController';

const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const getAllProductsController = new GetAllProductsController(getAllProductsUseCase);

export { getAllProductsController };
