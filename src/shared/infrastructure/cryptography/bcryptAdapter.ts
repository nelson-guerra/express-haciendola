import bcrypt from 'bcrypt';
import { HasherInterface } from '../../../modules/users/application/services/hasherInterface';

class BcryptAdapter implements HasherInterface {
   constructor(private readonly salt: number) {}

   async encrypt(password: string): Promise<string> {
      return await bcrypt.hash(password, this.salt);
   }

   async comparePassword(password: string, encryptedPassword: string): Promise<boolean> {
      return await bcrypt.compare(password, encryptedPassword);
   }
}

export const bcryptAdapter = new BcryptAdapter(10);
