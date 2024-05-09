import { SERVER_URL } from "./temp";


class AdminClient{
    constructor(base_url){
        this.base_url = base_url 
    }
    
    async _request(path, method, body = null, headers = null) {
        const defaultHeaders = {
            "content-type":"application/json"
        }
        const requestOptions = {
            method: method
        };
        if (headers){
            requestOptions['headers'] = headers;
        }else{
            requestOptions['headers'] = defaultHeaders;
            
        }
        if (body){
            requestOptions['body'] = JSON.stringify(body);
        }        
        try {
            const response = await fetch(this.base_url + path, requestOptions);
            if(response.ok){
                const results = await response.json();
                return results;
            }else{
                console.log('response not ok');
                const jsonData = await response.json();
                return jsonData;
            }
        } catch (error) {
            console.error(error)
        }
    }
    async getBuildings(){
        console.debug('request buildings data');
        const path = '/buildings';
        const response = await fetch(this.base_url + path,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            body:undefined
        });
        if(response.ok){
            const results = await response.json();
            return results;
        }
    }
    async getBuildingMap(buildingId){
        console.log('request buildings map data');
        const path = `/buildings/map/${buildingId}`;
        const response = await fetch(this.base_url + path,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        });
        if(response.ok){
            const results = await response.json();
            return results;
        }
    }

    async getSystemConfigurations(data){
        const path = "/system";
        const response = await fetch(this.base_url + path,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:{
                data:data
            }
        });
        if(response.ok){
            const results = await response.json();
            return results;
        }
    }





    async postCreateDataPointByBuilding(){
        
    }



}

const client = new AdminClient(SERVER_URL);
export default client;