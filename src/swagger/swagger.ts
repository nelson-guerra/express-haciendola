import swaggerJSDoc from 'swagger-jsdoc';

const options = {
   explorer: true,
   definition: {
      openapi: '3.0.0',
      info: {
         title: 'API Technical test',
         version: '1.0.0',
         description: 'API documentation',
      },
      components: {
         securitySchemes: {
            bearerAuth: {
               type: 'http',
               scheme: 'bearer',
               in: 'header',
            },
         },
      },
   },
   apis: ['./src/docs/*.doc.ts', './dist/docs/*.doc.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
