import { DataSource } from 'typeorm';
import { dbCredentials } from '../shared/infrastructure/config';
import { IBootstrap, TInitialize } from './bootstrap.interface';

export class DatabaseBootstrap implements IBootstrap {
   private static appDataSource: DataSource;

   initialize(): Promise<TInitialize> {
      const AppDataSource = new DataSource({
         type: 'mysql',
         host: dbCredentials.host,
         port: dbCredentials.port,
         entities: [dbCredentials.entities],
         username: dbCredentials.username,
         password: dbCredentials.password,
         database: dbCredentials.database,
         synchronize: dbCredentials.synchronize,
         maxQueryExecutionTime: dbCredentials.maxQueryExecutionTime,
      });

      DatabaseBootstrap.appDataSource = AppDataSource;

      return AppDataSource.initialize();
   }

   static getDataSource(): DataSource {
      return DatabaseBootstrap.appDataSource;
   }

   close() {
      DatabaseBootstrap.appDataSource?.destroy();
   }
}
