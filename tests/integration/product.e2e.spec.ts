import supertest from 'supertest';
import { app } from '../../src/app';
import { DatabaseBootstrap } from '../../src/bootstrap/database';
import { HttpStatusCode } from '../../src/shared/infrastructure/http/httpStatusCode';
import { CreateProductDTO } from '../../src/modules/products/domain/entities/product/dto/productDTOs';
import { jwtAdapter } from '../../src/shared/infrastructure/cryptography/jwtAdapter';
import { JwtPayload } from '../../src/modules/users/application/services/jwtInterface';
import { mockProduct } from '../mocks/mockproduct';
import { mockJwtPayload } from '../mocks/mockUser';

const database = new DatabaseBootstrap();
const server = supertest(app);

describe('Products', () => {
   let token: string;
   let productId: string;

   beforeAll(async () => {
      const payload: JwtPayload = mockJwtPayload();

      await database.initialize();
      token = await jwtAdapter.createToken(payload);
   });

   it('[200::OK] create product', async () => {
      const request: CreateProductDTO = mockProduct();

      const result = await server.post('/api/v1/products').set('Authorization', `Bearer ${token}`).send(request);
      productId = result.body.data.id;

      expect(result.statusCode).toEqual(HttpStatusCode.SUCCESS);
      expect(result.body.data).toHaveProperty('id');
   });

   it('[200::OK] get product', async () => {
      const result = await server.get(`/api/v1/products/${productId}`).set('Authorization', `Bearer ${token}`);

      expect(result.statusCode).toEqual(HttpStatusCode.SUCCESS);
      expect(result.body.data).toHaveProperty('id');
   });

   it('[200::OK] delete product', async () => {
      const result = await server.delete(`/api/v1/products/${productId}`).set('Authorization', `Bearer ${token}`);

      expect(result.statusCode).toEqual(HttpStatusCode.SUCCESS);
      expect(result.body.data).toHaveProperty('id');
   });

   afterAll(() => {
      database.close();
   });
});
