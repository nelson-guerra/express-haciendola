import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../../../shared/infrastructure/http/httpResponse';
import { ProductErrors } from '../../errors/productErrors';
import { DeleteProductUseCase } from './deleteProductUseCase';
import { ProductIdValidateSchema } from '../../../infrastructure/validations/productValidateSchema';
import { ValidateService } from '../../../../../shared/infrastructure/validate/validate.service';

export class DeleteProductController {
   constructor(private useCase: DeleteProductUseCase) {}

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

         return HttpResponse.success(res, 'Product successfully removed.', { id: result.value });
      } catch (err) {
         return next(err);
      }
   }
}
