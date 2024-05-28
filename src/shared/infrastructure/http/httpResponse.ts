import { Response } from 'express';
import { HttpStatusCode } from './httpStatusCode';

export class HttpResponse {
   private static jsonResponse(res: Response, httpCode: number, status: boolean, message: string, data: Object = {}) {
      return res.status(httpCode).json({
         status,
         message,
         data,
      });
   }

   public static success(res: Response, message: string, data: Object = {}): Response {
      return HttpResponse.jsonResponse(res, HttpStatusCode.SUCCESS, true, message, data);
   }

   public static error(res: Response, message: string = 'An unexpected error occurred', code: number): Response {
      return HttpResponse.jsonResponse(res, code, false, message);
   }

   public static internalError(res: Response, error: Error | string | unknown): Response {
      let message = null;
      const defaultMessage = `[InternalServerError]: An unexpected error occurred`;

      if (error instanceof Error) {
         message = error.message || defaultMessage;
      } else {
         message = typeof error === 'string' ? error : defaultMessage;
      }

      return HttpResponse.jsonResponse(res, HttpStatusCode.INTERNAL_ERROR, false, message);
   }
}
