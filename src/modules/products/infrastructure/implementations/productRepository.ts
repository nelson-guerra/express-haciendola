import { EntityManager } from 'typeorm';
import { ProductRepositoryInterface } from '../../domain/repositories/productRepositoryInterface';
import { Product } from '../../domain/entities/product/product';
import { ProductMapper } from './mappers/productMapper';
import { ProductEntity } from './entities/product.entity';
import { DatabaseBootstrap } from '../../../../bootstrap/database';

export class ProductRepository implements ProductRepositoryInterface {
   public async getProductById(id: string): Promise<Product | null> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;
      const product: ProductEntity | null = await entityManager.findOneBy(ProductEntity, { id });

      if (product) {
         return ProductMapper.toDomain(product);
      }

      return null;
   }

   public async getAllProducts(): Promise<Product[] | null> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;
      const allData: ProductEntity[] = await entityManager.find(ProductEntity);

      if (allData) {
         return allData.map(data => ProductMapper.toDomain(data));
      }

      return null;
   }

   public async save(entry: Product): Promise<boolean> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;

      try {
         const entryData = ProductMapper.toPersist(entry);
         const result = await entityManager.insert(ProductEntity, entryData);
         if (!result.identifiers[0].id) {
            throw new Error('Database error, failed to add record');
         }
      } catch (error) {
         return false;
      }

      return true;
   }

   public async update(id: string, entry: Product): Promise<boolean> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;

      try {
         const entryData = ProductMapper.toPersist(entry);
         const result = await entityManager.update(ProductEntity, id, entryData);
         if (!result.affected) {
            throw new Error('Database error, failed to update record');
         }
      } catch (error) {
         return false;
      }

      return true;
   }

   public async delete(id: string): Promise<boolean> {
      const entityManager: EntityManager = DatabaseBootstrap.getDataSource().manager;
      try {
         const result = await entityManager.delete(ProductEntity, id);
         if (!result.affected) {
            throw new Error('Database error, failed to delete record');
         }
      } catch (error) {
         return false;
      }

      return true;
   }
}
