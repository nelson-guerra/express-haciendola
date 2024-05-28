import {
   BadRequestException,
   InternalErrorException,
   ConflictException,
   UnauthorizedException,
} from '../../../../shared/infrastructure/http/httpException';

export namespace UserErrors {
   export class ValidationError extends BadRequestException {
      constructor(message: string) {
         super(message);
      }
   }

   export class ExpiredToken extends UnauthorizedException {
      constructor() {
         super(`Token expired, session ended`);
      }
   }

   export class InvalidToken extends UnauthorizedException {
      constructor() {
         super(`The Token is invalid`);
      }
   }

   export class InvalidEmail extends BadRequestException {
      constructor() {
         super(`The email is invalid`);
      }
   }

   export class InvalidPassword extends BadRequestException {
      constructor() {
         super(`The password is invalid`);
      }
   }

   export class EmailAlreadyExists extends ConflictException {
      constructor() {
         super(`The email has already been registered`);
      }
   }

   export class GetUsersError extends InternalErrorException {
      constructor() {
         super(`Could not get the users`);
      }
   }

   export class UserNotFound extends BadRequestException {
      constructor() {
         super(`User not found`);
      }
   }

   export class SaveError extends InternalErrorException {
      constructor() {
         super(`User not saved`);
      }
   }

   export class UpdateError extends InternalErrorException {
      constructor() {
         super(`User not updated`);
      }
   }

   export class DeleteError extends InternalErrorException {
      constructor() {
         super(`User not removed`);
      }
   }
}
