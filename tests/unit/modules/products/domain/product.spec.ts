import { Product } from '../../../../../src/modules/products/domain/entities/product/product';

describe('Create User - Controller', () => {
   it('should create a valid user', () => {
      const values = {
         handle: 'handle',
         title: 'title',
         description: 'description',
         sku: 12345,
         grams: 54321,
         stock: 22,
         price: 650,
         compare_price: 700,
         barcode: 4315,
      };
      const result = Product.create(values);

      expect(result).toMatchObject(values);
      expect(result).toBeInstanceOf(Product);
   });
});
