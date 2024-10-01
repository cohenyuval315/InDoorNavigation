import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Application } from 'express';
import logger from './lib/logger/index.js';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Indoor Navigation API',
      version: '1.0.0',
      description: 'Indoor Navigation API with Swagger',
    },
  },
  apis: ['./**/domains/**/*Routes.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app: Application)  => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // logger.info("swagger info")
  // logger.info(swaggerSpec)
};

export default setupSwagger;
