import { Request, Response, NextFunction } from 'express';
import { HttpResponse } from '../../../../../shared/infrastructure/http/httpResponse';
import { GetAllUsersUseCase } from './getAllUsersUseCase';
import { UserMapper } from '../../mappers/userMapper';

export class GetAllUsersController {
   constructor(private useCase: GetAllUsersUseCase) {}

   async execute(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
      try {
         const result = await this.useCase.execute();

         if (result.isFailure()) {
            return next(result.value);
         }

         const response = result.value.map(data => UserMapper.fromDomainToResponse(data));

         return HttpResponse.success(res, 'Successfully obtained users.', response);
      } catch (err) {
         return next(err);
      }
   }
}
