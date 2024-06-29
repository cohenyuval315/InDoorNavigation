
import createApplication from './app.js';
import connectDB from './db.js';
import logger, { setupLogger } from './lib/logger/index.js';
import setupSwagger from './swagger.js';
import { setupErrorHandler, setupGlobalError } from "./exceptions/index.js";
import http from 'http';
import { WebSocketManager } from './websockets/WebSocketManager.js';
import { WebSocketNavigationHandler } from './websockets/navigation/WebSocketNavigationHandler.js';



const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const startServer = async () => {
  try {
    setupGlobalError();
    logger.info(`Setup Mongo...`)
    await connectDB();
    logger.info(`Setup Application...`)
    const app = createApplication();
    setupErrorHandler(app);
    setupSwagger(app);
    setupLogger(app);
    logger.info(`Setup Websockets...`)
    const server = http.createServer(app);
    const websocketManager = new WebSocketManager(server);
    const navigationWebsocketHandler = new WebSocketNavigationHandler(websocketManager);
    navigationWebsocketHandler.start();
    // setupWebSocket(server);
    server.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`)
    });

  } catch (error) {
    logger.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
