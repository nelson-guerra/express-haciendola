export abstract class ValueObject<T> {
   public readonly value: T;

   constructor(value: T) {
      this.value = value;
   }

   ensureValueIsDefined(value: T, field: string): void {
      console.log(value);
      if (value === null || value === undefined) {
         throw new Error(`the ${field} field must be defined`);
      }
   }

   equals(other: ValueObject<T>): boolean {
      return other.constructor.name === this.constructor.name && other.value === this.value;
   }
}
