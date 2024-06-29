import { WebSocketServer,WebSocket,RawData } from 'ws';
import { Server } from 'http';
import logger from '../lib/logger';
import { EventEmitter } from 'events';

class WebSocketManager extends EventEmitter {
    private wss: WebSocketServer;

    constructor(server: Server) {
        super();
        this.wss = new WebSocketServer({ server });
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
        this.emit("connection",ws)
    }

    private handleWebSocketError(ws: WebSocket, error:Error) {
        logger.error('WebSocket error:', error);
        this.emit("error",ws,error);
    }

    private handleWebSocketClose(ws: WebSocket) {
        logger.info('WebSocket connection closed');
        this.emit("close",ws);
    }

    private handleWebSocketMessage(ws: WebSocket, message: string) {
        logger.info('Received message from client:', message.toString());
        let requestData = undefined;
        try {
            requestData = JSON.parse(message);
        } catch (error) {
            logger.error('Error parsing data:', error);
            return;
        }
        this.emit('message', ws, requestData);
    }

}

export { WebSocketManager };
