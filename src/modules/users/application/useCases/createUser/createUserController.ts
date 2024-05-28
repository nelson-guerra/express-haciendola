import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../../../shared/infrastructure/http/httpResponse';
import { UserErrors } from '../../errors/userErrors';
import { CreateUserUseCase } from './createUserUseCase';
import { CreateUserDTO } from '../../../domain/entities/user/dto/userDTOs';
import { CreateUserValidateSchema } from '../../../infrastructure/validations/userValidateSchema';
import { ValidateService } from '../../../../../shared/infrastructure/validate/validate.service';

export class CreateUserController {
   constructor(private useCase: CreateUserUseCase) {}

   async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      const data: CreateUserDTO = {
         name: req.body.name,
         password: req.body.password,
         email: req.body.email,
      };

      const error = await ValidateService.validate(CreateUserValidateSchema, data);
      if (error) {
         return next(new UserErrors.ValidationError(error));
      }

      try {
         const result = await this.useCase.execute(data);
         if (result.isFailure()) {
            return next(result.value);
         }

         return HttpResponse.success(res, 'Successfully register user.', {});
      } catch (err) {
         return next(err);
      }
   }
}
