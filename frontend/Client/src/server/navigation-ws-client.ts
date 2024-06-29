import { UserSpatialDataStreamService } from "../services/UserSpatialDataStreamService";
import WebsocketClient from "./ws-client";


class NavigationWebSocketClient extends WebsocketClient{
    private buildingId:string;
    private destinationPOIId:string
    private accessibility:object
    private accessToken:string | null

    constructor(buildingId:string,destinationPOIId:string, accessibility:object,accessToken=null){
        super();
        this.buildingId = buildingId;
        this.destinationPOIId = destinationPOIId;
        this.accessibility = accessibility;
        this.accessToken = accessToken;
    }


    async sendInitialMessage(){
        const response = this.send();    
    }
    async sendData(){

    }

    async parseEvent(){
        
    }

    async start(){
        if (!UserSpatialDataStreamService.getInstance().getIsStreaming()){
            await UserSpatialDataStreamService.getInstance().startStream();
        }
        this.connect(async () => {
            console.log("socket starting...")
            console.log("sending initialMessage...")
            await this.sendInitialMessage();
        }, () => {
            UserSpatialDataStreamService.getInstance().stopStream();
        },false)
        
        if (!UserSpatialDataStreamService.getInstance().getIsStreaming()){
            UserSpatialDataStreamService.getInstance().subscribe({
                next:(value) => {
                    if(value){
                        const response = this.send("",value);
                        if(response){
                            switch(response.json){

                            }
                        }
                        
                    }
                }
            })
        }
    } 
} 