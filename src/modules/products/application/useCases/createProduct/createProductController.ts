import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../../../shared/infrastructure/http/httpResponse';
import { ProductErrors } from '../../errors/productErrors';
import { CreateProductUseCase } from './createProductUseCase';
import { CreateProductDTO } from '../../../domain/entities/product/dto/productDTOs';
import { CreateProductValidateSchema } from '../../../infrastructure/validations/productValidateSchema';
import { ValidateService } from '../../../../../shared/infrastructure/validate/validate.service';

export class CreateProductController {
   constructor(private useCase: CreateProductUseCase) {}

   async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      const data: CreateProductDTO = {
         handle: req.body.handle,
         title: req.body.title,
         description: req.body.description,
         sku: req.body.sku,
         grams: req.body.grams,
         stock: req.body.stock,
         price: req.body.price,
         compare_price: req.body.compare_price,
         barcode: req.body.barcode,
      };

      const error = await ValidateService.validate(CreateProductValidateSchema, data);
      if (error) {
         return next(new ProductErrors.ValidationError(error));
      }

      try {
         const result = await this.useCase.execute(data);
         if (result.isFailure()) {
            return next(result.value);
         }

         return HttpResponse.success(res, 'Successfully created product.', { id: result.value });
      } catch (err) {
         return next(err);
      }
   }
}
