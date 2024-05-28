import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../../../shared/infrastructure/http/httpResponse';
import { GetAllProductsUseCase } from './getAllProductsUseCase';
import { ProductMapper } from '../../mappers/productMapper';

export class GetAllProductsController {
   constructor(private useCase: GetAllProductsUseCase) {}

   async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      try {
         const result = await this.useCase.execute();
         if (result.isFailure()) {
            return next(result.value);
         }

         const response = result.value.map(data => ProductMapper.fromDomainToResponse(data));

         return HttpResponse.success(res, 'Successfully obtained products.', response);
      } catch (err) {
         return next(err);
      }
   }
}
