import { UniqueEntityID } from './uniqueEntityID';

export abstract class Entity {
   protected readonly id: string;

   constructor(id?: string) {
      this.id = id ? id : UniqueEntityID.generateId().toString();
   }
}
