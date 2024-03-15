
class WebsocketClient{
    static instance;
    
    constructor(){
        if(!WebsocketClient.instance){
            this.host = '10.0.0.9'
            this.port = 3000
            this.base_url = `ws://${this.host}:${this.port}`
            WebsocketClient.instance = new WebsocketClient();
            return WebsocketClient.instance;
        }
        return WebsocketClient.instance;
    }

    async connect(){

    }

    async updateUserState(){

    }

    async updateUserNavigationState(){

    }

    async disconnect(){

    }
}


export default WebsocketClient