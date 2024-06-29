import { WebSocket } from 'ws';
import { WebSocketManager } from '../WebSocketManager'; // Adjust import path as per your file structure
import logger from '../../lib/logger';
import { INavigationRequest, NavigationRequestType,
        IStartNavigationRequestPayload,
        INavigationRequestPayload
 } from './NavigationRequest';
import { MapEngine } from '@/core/MapEngine';
import { INavigationResponse, NavigationResponseType } from './NavigationResponse';
import { NavigationProcessor } from './NavigationProcessor';



class WebSocketNavigationHandler {
    private webSocketManager: WebSocketManager;
    constructor(webSocketManager: WebSocketManager) {
        this.webSocketManager = webSocketManager;
    }

    start(){
        this.webSocketManager.on('connection', (ws: WebSocket) => {
            const navigationHandler  = new NavigationProcessor()
            this.webSocketManager.on('message', async (ws: WebSocket, data: INavigationRequest<NavigationRequestType>) => {
                try{
                    const response = await navigationHandler.handleNavigationRequest(data);
                    this.sendNavigationResponse(ws, response);
                }catch(error){
                    logger.error(error);
                }
                
            });
        });
    }

    private sendNavigationResponse<T extends NavigationResponseType>(ws: WebSocket, response: INavigationResponse<T>) {
        const responseData = JSON.stringify(response);
        ws.send(responseData);
    }
}

export { WebSocketNavigationHandler };
