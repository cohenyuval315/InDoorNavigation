import { UserSpatialInputData } from "../position/core/common/UserSpatialInputData";
import { UserSpatialDataStreamService } from "../services/UserSpatialDataStreamService";
import WebsocketClient from "./ws-client";

export enum NavigationRequestType {
    START = "start",
    POSITION = "position",
    END = "end"
}

export enum NavigationResponseType {
    START = "start",
    END = "end",
    REROUTE = "reroute",
    REPOSITION = "position",
    NONE = "none",
    ERROR = "error",
    STOP = "stop"
}


export class NavigationWebSocketClient extends WebsocketClient{
    private buildingId:string | undefined
    private destinationPOIId:string | undefined
    private accessibility:object | undefined
    private accessToken:string | null | undefined
    private isMock: boolean | undefined
    private sensorStreamSubscription: any;
    private socketSubscription:any
    private isInit:boolean | undefined
    private mockInitialUserPosition:object | null| undefined;
    public static instance:NavigationWebSocketClient;
    private isStreaming:boolean | undefined

    constructor(){
        super();
    }

    setup(buildingId:string,destinationPOIId:string, accessibility:object,isMock:boolean,mockInitialUserPosition:any=null,accessToken=null){
        this.buildingId = buildingId;
        this.destinationPOIId = destinationPOIId;
        this.accessibility = accessibility;
        this.accessToken = accessToken;
        this.isMock = isMock;
        this.isInit = false;
        this.mockInitialUserPosition = mockInitialUserPosition;
    }

    public static getInstance(): NavigationWebSocketClient {
        if (!NavigationWebSocketClient.instance) {
            NavigationWebSocketClient.instance = new NavigationWebSocketClient(
            )
        }
        return NavigationWebSocketClient.instance;
      }



    sendNavigationWebSocketEventRequest(type:NavigationRequestType,payload:any){
        this.send(type,payload);
    }

    sendStartNavigationRequest(){
        this.isInit = true;
        this.sendNavigationWebSocketEventRequest(NavigationRequestType.START,{
            accessToken: this.accessToken,
            buildingId: this.buildingId,
            destinationPOIId: this.destinationPOIId,
            accessibility: this.accessibility,
            isMock:this.isMock,
            mockInitialUserPosition:this.mockInitialUserPosition
        })
        

    }

    sendNavigationRequest(data:UserSpatialInputData){
        // console.log("SENDING NEW EVENT, is init:", this.isInit)
        if(!this.isInit){
            this.isInit = true;
            this.sendNavigationWebSocketEventRequest(NavigationRequestType.START,{
                accessToken: this.accessToken,
                buildingId: this.buildingId,
                destinationPOIId: this.destinationPOIId,
                accessibility: this.accessibility,
                isMock:this.isMock,
                mockInitialUserPosition:this.mockInitialUserPosition
            })
            
        }else{
            this.sendNavigationWebSocketEventRequest(NavigationRequestType.POSITION,{
                spatialData:data,
                timestamp:new Date()
            });

            
            // this.sendStartNavigationRequest();
            // console.log("send first event ")
        }

    }

    sendNavigationStopRequest(){
        return this.sendNavigationWebSocketEventRequest(NavigationRequestType.END,{});
    }

    getNavigationResponse(message:any){
        try {
            const type = message?.type;
            const payload = message?.payload;
            const response = {
                type:type,
                payload:payload
            }
            return response
        }catch(error){
            console.log("get navigation response error:",message)
        }
    }
    getNavigationRerouteResponse(message:any){
        try {
            const type = message?.type;
            const payload = message?.payload;
            if (type === NavigationResponseType.REROUTE){
                const response = {
                    routeSVG: payload.routeSVG, // :FloorRouteSVG[],
                    distance:payload.distance,
                    timeLength:payload.timeLength
                }
                return response;
            }

        }catch(error){
            console.error("getNavigationRerouteResponse:",error)
        }

    }


    async start(){
        if(this.isStreaming){
            return;
        }
        if (!UserSpatialDataStreamService.getInstance().getIsStreaming()){
            await UserSpatialDataStreamService.getInstance().startStream();
        }
        if (UserSpatialDataStreamService.getInstance().getIsStreaming()){
            this.socketSubscription = this.connect(
                () => {
                    console.error("connecting to websocket... ")
                    // this.sendStartNavigationRequest();
                }, 
                () => {
                    // UserSpatialDataStreamService.getInstance().stopStream();
                },
                false
            )
            
            this.sensorStreamSubscription = UserSpatialDataStreamService.getInstance().subscribe({
                next:(value:any) => {
                    this.sendNavigationRequest(value);
                },
                complete:() => {
                    this.disconnect();
                },
                error:() => {
                    console.error("navigation error...")
                }
            })

        }else{
            console.error("no sensors available-failed streaming data, disconnecting,...")
            
        }
        this.isStreaming = true;
    } 

    async stop(){
        this.isStreaming = false;
        this.disconnect();
        if(this.sensorStreamSubscription){
            this.sensorStreamSubscription()
            this.sensorStreamSubscription = null;
        }
        if(this.socketSubscription){
            this.socketSubscription();
            this.socketSubscription = null;
        }
        
    }
    


} 