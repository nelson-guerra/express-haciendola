import dotenv from 'dotenv';
dotenv.config();

import { TInitialize } from './bootstrap/bootstrap.interface';
import { DatabaseBootstrap } from './bootstrap/database';
import { ServerBootstrap } from './bootstrap/server';

import { app } from './app';

const start = async () => {
   const server = new ServerBootstrap(app);
   const database = new DatabaseBootstrap();

   try {
      const listPromise: Array<Promise<TInitialize>> = [database.initialize(), server.initialize()];
      await Promise.all(listPromise);
      console.log('Server and database are running');
   } catch (err) {
      console.error('Error happened', err);
      database.close();
      process.exit(1);
   }
};

start();
