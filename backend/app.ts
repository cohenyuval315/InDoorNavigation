
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from  'swagger-jsdoc';
import userRouter from './routes/auth';
import authRouter from './routes/user';
import adminRouter from './routes/admin';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import http from 'http';
import socketIo from 'socket.io';
import {WebSocketServer} from 'ws';

configDotenv({
  path:'./.env',
  encoding: 'utf-8', 
  debug: true, 
  override: false
});


const app = express();
const server = http.createServer(app);
// const io = socketIo(server);
const wss = new WebSocketServer({
  server
});

// const engine = MapEngine();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

/**  Logs */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}
const accessLogStream = fs.createWriteStream(path.join(logsDirectory, 'access.log'), { flags: 'a' });
const lastRunLogStream = fs.createWriteStream(path.join(logsDirectory, 'last_run.log'), { flags: 'w' });
app.use(morgan('combined', 
  { 
    stream: accessLogStream 
  }
));


/**  Mongo */

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});



/**  Swagger */
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Indoor Navigation API',
      version: '1.0.0',
      description: 'Sample API with Swagger',
    },
  },
  apis: ['./routes/*.js'],
  encoding: 'utf-8',
  failOnErrors: false,
  verbose: false,
  format: 'json', // or 'yaml'
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




app.use('/',userRouter);
app.use('/auth/',authRouter);
app.use('/admin/',adminRouter);



wss.on('connection', (ws) => {
  console.log('A client connected via WebSocket');
  // Handle events from the client
  ws.on('message', (message) => {
      console.log('Received message from client:', message);
  });
  // Send data to the client
  ws.send('Hello from server!');
});



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});