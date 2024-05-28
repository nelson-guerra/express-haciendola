import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../../../shared/infrastructure/http/httpResponse';
import { UserErrors } from '../../errors/userErrors';
import { RefreshAccessTokenUseCase } from './refreshAccessTokenUseCase';
import { RefreshTokenDTO } from '../../../domain/entities/user/dto/userDTOs';
import { RefreshTokenValidateSchema } from '../../../infrastructure/validations/userValidateSchema';
import { ValidateService } from '../../../../../shared/infrastructure/validate/validate.service';

export class RefreshAccessTokenController {
   constructor(private useCase: RefreshAccessTokenUseCase) {}

   async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      const data: RefreshTokenDTO = {
         token: req.body.token,
      };

      const error = await ValidateService.validate(RefreshTokenValidateSchema, data);
      if (error) {
         return next(new UserErrors.ValidationError(error));
      }

      try {
         const result = await this.useCase.execute(data);

         if (result.isFailure()) {
            return next(result.value);
         }

         return HttpResponse.success(res, 'New  Access token.', { token: result.value });
      } catch (err) {
         return next(err);
      }
   }
}
