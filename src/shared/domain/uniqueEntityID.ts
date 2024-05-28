import { v4 as uuid, validate as uuidValidate } from 'uuid';

export class UniqueEntityID {
   static generateId(value?: string): string {
      if (value) {
         this.ensureIsValidObjectId(value);
      }

      return value ? value : uuid();
   }

   static ensureIsValidObjectId(value: string): void {
      if (!uuidValidate(value)) {
         throw new Error(`El código ${value} no es válido`);
      }
   }
}
