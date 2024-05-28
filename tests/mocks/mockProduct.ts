import { faker } from '@faker-js/faker';
import { CreateProductDTO } from '../../src/modules/products/domain/entities/product/dto/productDTOs';

export const mockProduct = (): CreateProductDTO => ({
   handle: faker.commerce.product(),
   title: faker.commerce.product(),
   description: faker.commerce.productDescription(),
   sku: faker.number.int({ max: 1000000 }),
   grams: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
   stock: faker.number.int({ max: 1000 }),
   price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
   compare_price: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
   barcode: faker.number.int({ max: 1000000 }),
});
