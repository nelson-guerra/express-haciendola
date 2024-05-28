import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes/';
import { errorHandler, pathNotFound } from './shared/infrastructure/http/errorHandler';
import { swaggerSpec } from './swagger/swagger';

const app: Application = express();

const origin = {
   origin: '*',
};

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(origin));
app.use(compression());

app.use('/', router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(pathNotFound);
app.use(errorHandler);

export { app };
