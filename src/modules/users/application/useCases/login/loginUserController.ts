import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../../../shared/infrastructure/http/httpResponse';
import { UserErrors } from '../../errors/userErrors';
import { LoginUserUseCase } from './loginUserUseCase';
import { LoginUserDTO } from '../../../domain/entities/user/dto/userDTOs';
import { LoginValidateSchema } from '../../../infrastructure/validations/userValidateSchema';
import { ValidateService } from '../../../../../shared/infrastructure/validate/validate.service';

export class LoginUserController {
   constructor(private useCase: LoginUserUseCase) {}

   async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      const data: LoginUserDTO = {
         email: req.body.email,
         password: req.body.password,
      };

      const error = await ValidateService.validate(LoginValidateSchema, data);
      if (error) {
         return next(new UserErrors.ValidationError(error));
      }

      try {
         const result = await this.useCase.execute(data);

         if (result.isFailure()) {
            return next(result.value);
         }

         return HttpResponse.success(res, 'Successful login.', {
            token: result.value.token,
            refreshToken: result.value.refreshToken,
         });
      } catch (err) {
         return next(err);
      }
   }
}
