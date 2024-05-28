import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
   @PrimaryColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   password: string;

   @Column()
   email: string;
}
