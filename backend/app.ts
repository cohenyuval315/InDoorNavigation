import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from  'swagger-jsdoc';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';


const app:Application = express();

const logsDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

const accessLogStream = fs.createWriteStream(path.join(logsDirectory, 'access.log'), { flags: 'a' });


const swaggerOptions: swaggerJsdoc.Options = {
  swaggerDefinition: {
    info: {
      title: 'Sample API',
      version: '1.0.0',
      description: 'Sample API with Swagger',
    },
  },
  apis: ['app.js'],
  encoding: 'utf-8',
  failOnErrors: false,
  verbose: false,
  format: 'yaml', // or 'json'
  definition: {
    info: {
      title: 'Sample API',
      version: '1.0.0',
      description: 'Sample API with Swagger',
    },
  },
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(morgan('combined', { stream: accessLogStream }));

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});