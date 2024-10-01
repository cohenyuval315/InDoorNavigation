import { WebSocket } from 'ws';
import { WebSocketManager } from '../WebSocketManager.js'; // Adjust import path as per your file structure
import logger from '../../lib/logger/index.js';
import { INavigationRequest, NavigationRequestType,
        IStartNavigationRequestPayload,
        INavigationRequestPayload
 } from './NavigationRequest.js';
import { INavigationResponse, NavigationResponseType } from './NavigationResponse.js';
import { NavigationProcessor } from './NavigationProcessor.js';



class WebSocketNavigationHandler {
    private webSocketManager: WebSocketManager;
    constructor(webSocketManager: WebSocketManager) {
        this.webSocketManager = webSocketManager;
        // @ts-ignore
        this.webSocketManager.setMaxListeners(11);
    }

    start(){
        this.webSocketManager.on('connection', (ws: WebSocket) => {
            const navigationHandler  = new NavigationProcessor()
            this.webSocketManager.on('message', async (ws: WebSocket, data: INavigationRequest<NavigationRequestType>) => {
                try{
                    const response = await navigationHandler.handleNavigationRequest(data);
                    this.sendNavigationResponse(ws, response);
                    if(response.type === NavigationResponseType.END){
                        this.webSocketManager.disconnectClient(ws);
                    }
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
