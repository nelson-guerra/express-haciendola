import { EntityManager } from 'typeorm';
import { UserRepositoryInterface } from '../../domain/repositories/userRepositoryInterface';
import { User } from '../../domain/entities/user/user';
import { UserMapper } from './mappers/userMapper';
import { UserEntity } from './entities/user.entity';
import { DatabaseBootstrap } from '../../../../bootstrap/database';

export class UserRepository implements UserRepositoryInterface {
   public async isEmailExists(email: string): Promise<boolean> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;
      const exist: boolean = await entityManager.existsBy(UserEntity, { email: email });

      return exist;
   }

   public async getUserById(id: string): Promise<User | null> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;
      const user: UserEntity | null = await entityManager.findOneBy(UserEntity, { id });

      if (user) {
         return UserMapper.toDomain(user);
      }

      return null;
   }

   public async getUserByEmail(email: string): Promise<User | null> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;
      const user: UserEntity | null = await entityManager.findOneBy(UserEntity, { email });

      if (user) {
         return UserMapper.toDomain(user);
      }

      return null;
   }

   public async getAllUsers(): Promise<User[]> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;
      const allData: UserEntity[] = await entityManager.find(UserEntity);

      return allData.map(data => UserMapper.toDomain(data));
   }

   public async save(entry: User): Promise<boolean> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;

      try {
         const entryData = UserMapper.toPersist(entry);
         const result = await entityManager.insert(UserEntity, entryData);
         if (!result.identifiers[0].id) {
            throw new Error('Database error, failed to add record');
         }
      } catch (error) {
         return false;
      }

      return true;
   }
}
