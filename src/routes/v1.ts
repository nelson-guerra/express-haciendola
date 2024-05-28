import express from 'express';
import { productRouter } from '../modules/products/infrastructure/routes';
import { userRouter } from '../modules/users/infrastructure/routes';

const v1Router = express.Router();

v1Router.use('/', productRouter);
v1Router.use('/', userRouter);

export { v1Router };
