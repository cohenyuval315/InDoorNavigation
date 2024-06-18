
import { SERVER_WSS_URL } from "./temp";
import { webSocket, WebSocketSubject,WebSocketSubjectConfig } from 'rxjs/webSocket';
import { catchError, delay, retry, take } from 'rxjs/operators';
import { of, throwError, EMPTY, Observer } from 'rxjs';

export interface WebSocketEvent {
    type: string;
    payload: any;
}

class WebsocketClient{
    static instance:WebsocketClient;
    private baseUrl:string;
    private socket$: null | WebSocketSubject<WebSocketEvent>;
    private retryAttempts: number | undefined
    private retryDelay: number | undefined
    constructor(){
        this.baseUrl = SERVER_WSS_URL
        this.socket$ = null;
        this.retryAttempts = 5; // Number of retry attempts
        this.retryDelay = 2000; // Delay in milliseconds before retrying
    }

    connect(onOpen?: () => void, onClose?: () => void,reconnect=false) {
        const wsConfig:WebSocketSubjectConfig<WebSocketEvent> = {
            url: this.baseUrl,
            openObserver: {
                next: () => {
                    console.log('WebSocket connection opened');
                    onOpen && onOpen()
                },
            },
            closeObserver: {
                next: () => {
                    console.log('WebSocket connection closed');
                    onClose && onClose()
                },
            },
            deserializer: ({ data }:{data:any}) => data
        }
        if (this.socket$ && reconnect === false){
            console.log("already listening")
        }else{
            this.socket$ = webSocket(wsConfig)
        }
        
    }

    subscribe(observerOrNext?: Partial<Observer<WebSocketEvent>> | ((value: WebSocketEvent) => void) | undefined){
        if (this.socket$){
            const subscription =  this.socket$.pipe(retry({count:this.retryAttempts,delay:this.retryDelay})).subscribe(observerOrNext);
            return subscription
        }
    }


    disconnect() {
        if (this.socket$) {
            this.socket$.complete(); // Close the WebSocket connection
            this.socket$ = null;
        }
    }

    send(eventType:string,data:any) {
        if (this.socket$) {
            this.socket$.next({ // Send data to the WebSocket server
                type:eventType,
                payload:data
            }); 
        } else {
            console.error('WebSocket is not connected');
        }
    }

}


export default WebsocketClient