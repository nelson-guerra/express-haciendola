import { validate, ValidationError } from 'class-validator';

export class ValidateService {
   static async validate<T extends object>(constructor: { new (): T }, data: object): Promise<null | string> {
      const dtoRequest = new constructor();
      Object.assign(dtoRequest, data);
      const errors: ValidationError[] = await validate(dtoRequest, { validationError: { target: false } });

      let error = null;

      if (errors.length) {
         error = Object.values(errors[0].constraints as object)[0];
      }

      return error;
   }
}
