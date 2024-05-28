import { Request, Response, NextFunction } from 'express';
import { HttpException, NotFoundException } from './httpException';
import { HttpResponse } from './httpResponse';

export const pathNotFound = (req: Request, res: Response, next: NextFunction) => {
   next(new NotFoundException());
};

export const errorHandler = (err: HttpException | Error, req: Request, res: Response, next: NextFunction): Response => {
   if (err instanceof HttpException) {
      return HttpResponse.error(res, err.errorMessage, err.errorHttpCode);
   }

   return HttpResponse.internalError(res, err);
};
