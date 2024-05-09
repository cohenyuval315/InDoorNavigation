import { SERVER_URL } from "./temp";


class ApiClient{
    constructor(base_url){
        this.base_url = base_url 
    }
    
    async _request(){

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
}

const client = new ApiClient(SERVER_URL);
export default client;