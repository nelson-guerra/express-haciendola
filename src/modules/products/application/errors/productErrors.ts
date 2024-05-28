import { BadRequestException, InternalErrorException } from '../../../../shared/infrastructure/http/httpException';

export namespace ProductErrors {
   export class ValidationError extends BadRequestException {
      constructor(message: string) {
         super(message);
      }
   }

   export class GetProductsError extends InternalErrorException {
      constructor() {
         super(`Could not get the products`);
      }
   }

   export class ProductNotFound extends BadRequestException {
      constructor() {
         super(`Product not found`);
      }
   }

   export class SaveError extends InternalErrorException {
      constructor() {
         super(`Product not saved`);
      }
   }

   export class UpdateError extends InternalErrorException {
      constructor() {
         super(`Product not updated`);
      }
   }

   export class DeleteError extends InternalErrorException {
      constructor() {
         super(`Product not removed`);
      }
   }
}
