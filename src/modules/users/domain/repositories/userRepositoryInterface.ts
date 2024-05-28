import { User } from '../entities/user/user';

export interface UserRepositoryInterface {
   isEmailExists: (email: string) => Promise<boolean>;
   getAllUsers: () => Promise<User[]>;
   getUserById: (id: string) => Promise<User | null>;
   getUserByEmail: (email: string) => Promise<User | null>;
   save: (product: User) => Promise<boolean>;
}
