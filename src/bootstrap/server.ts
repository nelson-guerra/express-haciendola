import http from 'http';
import { Application } from 'express';
import { IBootstrap, TInitialize } from './bootstrap.interface';
import { serverParams } from '../shared/infrastructure/config';

export class ServerBootstrap implements IBootstrap {
   constructor(private readonly app: Application) {}

   initialize(): Promise<TInitialize> {
      const promise = new Promise((resolve, reject) => {
         const server = http.createServer(this.app);

         const port = serverParams.port;

         server
            .listen(port)
            .on('listening', () => {
               console.log(`Server is listening on port ${port}`);
               resolve(true);
            })
            .on('error', err => {
               reject(err);
            });
      });

      return promise as Promise<boolean | Error>;
   }
}
