import path from 'path';

export const dbCredentials = {
   host: process.env.DB_HOST,
   port: Number(process.env.DB_PORT),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   entities: path.join(__dirname, '../../../modules/**/infrastructure/implementations/entities/*.entity.{ts,js}'),
   synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
   logging: process.env.DB_LOGGING === 'true' ? true : false,
   poolSize: Number(process.env.DB_POOL_SIZE),
   maxQueryExecutionTime: Number(process.env.DB_MAX_QUERY_EXECUTION_TIME),
};

export const serverParams = {
   port: Number(process.env.PORT),
};

export const jwtParams = {
   tokenSecret: process.env.TOKEN_KEYWORD_SECRET,
   tokenExpiresIn: process.env.TOKEN_EXPIRES_IN,
   refreshTokenSecret: process.env.REFRESH_TOKEN_KEYWORD_SECRET,
   refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
};
