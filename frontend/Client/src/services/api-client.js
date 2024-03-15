class ApiClient{
    constructor(){
        this.host = '10.0.0.9'
        this.port = 3000
        this.base_url = `http://${this.host}:${this.port}`
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
            return results.data;
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
const client = new ApiClient();
export default client;