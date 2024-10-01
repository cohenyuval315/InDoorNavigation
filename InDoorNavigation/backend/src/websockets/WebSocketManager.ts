import { WebSocketServer,WebSocket,RawData } from 'ws';
import { Server } from 'http';
import logger from '../lib/logger/index.js';
import { EventEmitter } from 'events';

class WebSocketManager extends EventEmitter {
    private wss: WebSocketServer;
    private clients: Map<WebSocket, string>; 


    constructor(server: Server) {
        super();
        this.wss = new WebSocketServer({ server });
        this.clients = new Map();
        this.setupWebSocket();
    }

    private setupWebSocket() {
        this.wss.on('connection', (ws:WebSocket) => {
            this.handleWebSocketConnection(ws);

            ws.on('message', (message: RawData) => {
                return this.handleWebSocketMessage(ws, message.toString());
            });
            ws.on('close', () => {
                return this.handleWebSocketClose(ws);
            });
            ws.on('error', (error: Error) => {
                return this.handleWebSocketError(ws,error);           
            });
        });
        
    }

    private handleWebSocketConnection(ws: WebSocket) {
        
        logger.info('A client connected via WebSocket');
        this.clients.set(ws, '');
        this.emit("connection",ws)
    }

    private handleWebSocketError(ws: WebSocket, error:Error) {
        logger.error('WebSocket error:', error);
        this.emit("error",ws,error);
    }

    private handleWebSocketClose(ws: WebSocket) {
        logger.info('WebSocket connection closed');
        this.clients.delete(ws);    
        this.emit("close",ws);
    }

    private handleWebSocketMessage(ws: WebSocket, message: string) {
        try {
            this.emit('message', ws, message);
        } catch (error) {
            logger.error('Error parsing data:', error);
            return;
        }
    }
    
    public disconnectClient(ws: WebSocket) {
        if (this.clients.has(ws)) {
            ws.close(); // Close the WebSocket connection
            this.clients.delete(ws); // Remove from the map
            logger.info('Client disconnected');
        } else {
            logger.warn('Client not found');
        }
    }

}

export { WebSocketManager };
