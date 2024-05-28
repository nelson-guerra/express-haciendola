import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../../../shared/infrastructure/http/httpResponse';
import { ProductErrors } from '../../errors/productErrors';
import { GetProductByIdUseCase } from './getProductByIdUseCase';
import { ProductMapper } from '../../mappers/productMapper';
import { ProductIdValidateSchema } from '../../../infrastructure/validations/productValidateSchema';
import { ValidateService } from '../../../../../shared/infrastructure/validate/validate.service';

export class GetProductByIdController {
   constructor(private useCase: GetProductByIdUseCase) {}

   async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      const { id } = req.params;

      const error = await ValidateService.validate(ProductIdValidateSchema, { id });
      if (error) {
         return next(new ProductErrors.ValidationError(error));
      }

      try {
         const result = await this.useCase.execute(id);
         if (result.isFailure()) {
            return next(result.value);
         }

         const response = ProductMapper.fromDomainToResponse(result.value);

         return HttpResponse.success(res, 'Successfully found product.', response);
      } catch (err) {
         return next(err);
      }
   }
}
