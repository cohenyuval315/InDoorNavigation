
// import express from "express";
// import cors from 'cors';
// import morgan from "morgan";

// import swaggerUi from 'swagger-ui-express';
// import swaggerJsdoc from  'swagger-jsdoc';
// import authRouter from './routes/auth-routes';
// import userRouter from './routes/user-routes';
// import adminRouter from './routes/admin-routes';
// // import morgan from 'morgan';
// // import path from 'path';
// // import { fileURLToPath } from 'url';
// // import fs from 'fs';
// import mongoose from 'mongoose';

// import http from 'http';
// // import socketIo from 'socket.io';
// import {WebSocketServer} from 'ws';
// import {errorHandler} from './middlewares/error-handler';
// import { ErrorHandlingMiddlewareFunction } from "mongoose";
// import bodyParser from "body-parser";
// // import { initAWSConfigurations } from "./config/aws-config";
// import { initConfig } from "./config/config";




// initConfig();
// // initAWSConfigurations();

// export const app = express();

// app.use(bodyParser.json())
// app.use(morgan('dev'));

// app.use(cors()); 
// const server = http.createServer(app);
// // const io = socketIo(server);
// const wss = new WebSocketServer({
//   server
// });

// // const engine = MapEngine();
// const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// /**  Logs */
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);
// // const logsDirectory = path.join(__dirname, 'logs');
// // if (!fs.existsSync(logsDirectory)) {
// //     fs.mkdirSync(logsDirectory);
// // }
// // const accessLogStream = fs.createWriteStream(path.join(logsDirectory, 'access.log'), { flags: 'a' });
// // const lastRunLogStream = fs.createWriteStream(path.join(logsDirectory, 'last_run.log'), { flags: 'w' });
// // app.use(morgan('combined', 
// //   { 
// //     stream: accessLogStream 
// //   }
// // ));


// /**  Mongo */

// if (process.env.MONGODB_URI){
//     mongoose.connect(process.env.MONGODB_URI);
//     mongoose.connection.on('connected', () => {
//       console.log('MongoDB connected successfully');
//     });  
//     mongoose.connection.on('disconnected', () => {
//       console.log('MongoDB disconnected');
//     });      
//     process.on('SIGINT',async () => {
//       try {
//         await mongoose.connection.close();
//         console.log('MongoDB connection closed due to application termination');
//         process.exit(0);
//     } catch (error) {
//         console.error('Error closing MongoDB connection:', error);
//         process.exit(1); 
//     }
//     });    
//     mongoose.connection.on('error', (err) => {
//       console.error(err);
//       console.log('%s MongoDB connection error. Please make sure MongoDB is running.', err);
//       process.exit();
//     });   
// }else{
//     console.error("fail to connect mongo")
// }



// /**  Swagger */
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'Indoor Navigation API',
//       version: '1.0.0',
//       description: 'Sample API with Swagger',
//     },
//   },
//   apis: ['./routes/*.ts'],
//   encoding: 'utf-8',
//   failOnErrors: false,
//   verbose: false,
//   format: 'json', // or 'yaml'
//   definition: {
//     info: {
//       title: 'Sample API',
//       version: '1.0.0',
//       description: 'Sample API with Swagger',
//     },
//   },
// };
// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// app.get('/', (req, res) => {
//   // res.sendStatus(200)
//   res.send('Hello World from Express!');
// });

// app.use('/',userRouter);
// app.use('/auth',authRouter);
// app.use('/admin',adminRouter);



// wss.on('connection', (ws) => {
//   console.log('A client connected via WebSocket');
//   // Handle events from the client
//   ws.on('message', (message) => {
//       console.log('Received message from client:', message);
//   });
//   // Send data to the client
//   ws.send('Hello from server!');
// });

// app.use(errorHandler)


// const appServer = server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// export default appServer;

