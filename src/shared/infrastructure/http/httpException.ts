import { HttpStatusCode } from './httpStatusCode';

export abstract class HttpException {
   constructor(
      private httpCode: number,
      private message: string,
   ) {}

   get errorHttpCode(): number {
      return this.httpCode;
   }

   get errorMessage(): string {
      return this.message;
   }
}

export class BadRequestException extends HttpException {
   constructor(message: string = 'Bad Request') {
      super(HttpStatusCode.BAD_REQUEST, message);
   }
}

export class UnauthorizedException extends HttpException {
   constructor(message: string = 'Unauthorized access') {
      super(HttpStatusCode.UNAUTHORIZED, message);
   }
}

export class ForbiddenException extends HttpException {
   constructor(message: string = 'Permission denied') {
      super(HttpStatusCode.FORBIDDEN, message);
   }
}

export class ConflictException extends HttpException {
   constructor(message: string = 'Conflict') {
      super(HttpStatusCode.CONFLICT, message);
   }
}

export class NotFoundException extends HttpException {
   constructor(message: string = 'Not Found') {
      super(HttpStatusCode.NOT_FOUND, message);
   }
}

export class InternalErrorException extends HttpException {
   constructor(message: string = 'Internal error') {
      super(HttpStatusCode.INTERNAL_ERROR, message);
   }
}
