import { User } from '../../../../../src/modules/users/domain/entities/user/user';

describe('Create User', () => {
   it('should create a valid user', () => {
      const values = {
         name: 'demo',
         email: 'demo@gmail.com',
         password: 'demo123',
      };
      const result = User.create(values);

      expect(result).toMatchObject(values);
      expect(result).toBeInstanceOf(User);
   });
});
