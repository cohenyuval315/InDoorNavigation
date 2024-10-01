
import { webSocket, WebSocketSubject,WebSocketSubjectConfig } from 'rxjs/webSocket';
import { catchError, delay, filter, map, merge, retry, share, take, tap, throttleTime } from 'rxjs/operators';
import Config from "../config/Config";

//@ts-ignore
import { Observer } from 'rxjs'; 


export interface WebSocketEvent {
    type: string;
    payload: any;       
    name?: string;  
    id?: string;        
    timestamp?: any
}

class WebsocketClient{
    static instance:WebsocketClient;
    private baseUrl:string;
    private socket$: null | WebSocketSubject<WebSocketEvent>;
    private socketStream$:any
    private retryAttempts: number | undefined
    private retryDelay: number | undefined
    constructor(){
        this.baseUrl = Config.SERVER_WSS_URL
        this.socket$ = null;
        this.retryAttempts = 1; // Number of retry attempts
        this.retryDelay = 1000; // Delay in milliseconds before retrying
    }

    connect(onOpen:any=null,onClose:any=null,reconnect=false) {
        const wsConfig:WebSocketSubjectConfig<WebSocketEvent> = {
            url: this.baseUrl,
            openObserver: {
                next: () => {
                    console.log('WebSocket connection opened');
                },
            },
            closeObserver: {
                next: () => {
                    console.log('WebSocket connection closed');
                },
            },
            deserializer: ({ data }:{data:any}) => data,
            
        }
        if (this.socket$ && reconnect === false){
            console.log("already listening")
        }else{
            this.socket$ = webSocket(wsConfig);
            this.socketStream$ = this.socket$.pipe(
                retry({count:this.retryAttempts,delay:this.retryDelay}),
                share(),
                map((value:any) => JSON.parse(value))
            );
            // const baseSocketStream$ = this.socket$.pipe(
            //     retry(),
            //     share(),
            //     map((value:any) => JSON.parse(value))
            // );
            // const throttledStream$  = baseSocketStream$.pipe(
            //     filter((event: any) => event.type === "position"),
            //     throttleTime(1000)
            // );
            // const immediateStream$ = baseSocketStream$.pipe(
            //     filter((event: any) => event.type !== "position"),
            // );
            // this.socketStream$ = merge(throttledStream$, immediateStream$);
        }


        
    }

    subscribe(observerOrNext?: Partial<Observer<WebSocketEvent>> | ((value: WebSocketEvent) => void) | undefined){
        if (this.socket$ && this.socketStream$) {
            // this.socketStream$ = this.socket$.pipe(retry({delay:this.retryDelay}),share()).subscribe(observerOrNext);
            this.socketStream$.subscribe(observerOrNext);
        } else {
            console.warn('WebSocket connection is not established');
            return null;
        }
    }


    disconnect() {
        if (this.socket$) {
            this.socket$.complete(); // Close the WebSocket connection
            this.socket$ = null;
        }
    }

    send(eventType:string,data:any) {

        if (this.socket$) {// Send data to the WebSocket server
            const value = { 
                type:eventType,
                payload:data,
                // timestamp:"",
                // name:"",
                // id;""
            }
            const event = JSON.stringify(value)
            this.socket$.next(event); 
            
        } else {
            console.warn('WebSocket is not connected');
        }
    }

}


export default WebsocketClient