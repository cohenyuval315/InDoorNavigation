
class WebsocketClient{
    static instance;
    
    constructor(){
        if(!WebsocketClient.instance){
            this.host = '10.0.0.9'
            this.port = 3000
            this.baseUrl = `ws://${this.host}:${this.port}`
            WebsocketClient.instance = this;
        }
        return WebsocketClient.instance;
    }


    connect() {
        return new Promise((resolve, reject) => {
            this.webSocket = new WebSocket(this.baseUrl);

            this.webSocket.onopen = () => {
                console.log('WebSocket connection opened');
                resolve();
            };

            this.webSocket.onmessage = (event) => {
                console.log('WebSocket message received:', event.data);
                this.emit('message', event.data);
            };

            this.webSocket.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            };

            this.webSocket.onclose = () => {
                console.log('WebSocket connection closed');
                this.emit('close');
            };
        });
    }

    async disconnect(){
        if (this.webSocket) {
            this.webSocket.close();
            this.webSocket = null;
        }
    }

    send(data) {
        if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
            this.webSocket.send(data);
        } else {
            console.error('WebSocket is not open');
        }
    }    
}


export default WebsocketClient