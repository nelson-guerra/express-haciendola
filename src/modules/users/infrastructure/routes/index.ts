import express from 'express';
import { createUserController } from '../../application/useCases/createUser';
import { getAllUsersController } from '../../application/useCases/getAllUsers';
import { loginUserController } from '../../application/useCases/login';
import { refreshAccessTokenController } from '../../application/useCases/refreshAccessToken';
import { authenticationMiddleware } from '../../../../shared/infrastructure/middlewares/authentication.middleware';

const userRouter = express.Router();

userRouter.post('/users', (req, res, next) => createUserController.execute(req, res, next));
userRouter.get(
   '/users',
   (req, res, next) => authenticationMiddleware.ensureAuthenticated(req, next),
   (req, res, next) => getAllUsersController.execute(req, res, next),
);
userRouter.post('/auth/login', (req, res, next) => loginUserController.execute(req, res, next));
userRouter.post('/auth/refresh', (req, res, next) => refreshAccessTokenController.execute(req, res, next));

export { userRouter };
