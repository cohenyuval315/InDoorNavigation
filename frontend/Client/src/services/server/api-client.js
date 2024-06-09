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

    async getBuildingGraphMap(buildingId){
        console.log('request buildings GRAPH rmap data');
        const path = `/admin/buildings/${buildingId}/graph`;
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
    
    
    async postBuildingProcessingRoute(buildingId,data){
        console.log('upload procesing route');
        console.log(Object.keys(data))
        console.log('upload procesing route');
        const path = `/admin/processing/route/${buildingId}`;
        const response = await fetch(this.base_url + path,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data
            })
        });
        console.log(response,"postBuildingProcessingRoute")
        if(response.ok){
            const results = await response.json();
            return results;
        }
    }    

    async getAllBuildingProcessingRoutes(buildingId){
        console.log('get all procesing route');
        const path = `/admin/processing/routes/${buildingId}`;
        const response = await fetch(this.base_url + path,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });
        console.log(response,"getAllBuildingProcessingRoutes")
        if(response.ok){
            const results = await response.json();
            return results;
        }
    }   
    async getBuildingProcessingRoute(buildingId,routeName){
        console.log('get procesing route');
        const path = `/admin/processing/route/${buildingId}/${routeName}`;
        const response = await fetch(this.base_url + path,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });
        console.log(response,"getBuildingProcessingRoute")
        if(response.ok){
            const results = await response.json();
            const data = results['data'];
            return data;
        }
    }        
    async postBuildingProcessingMap(buildingId,data){
        console.log('upload procesing map');
        const path = `/admin/processing/map/${buildingId}`;
        const response = await fetch(this.base_url + path,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data
            })
        });
        console.log(response,"postBuildingProcessingMap")
        if(response.ok){
            const results = await response.json();
            return results;
        }
    }

    async getBuildingProcessingMap(buildingId,version){
        console.log('get procesing map');
        const path = `/admin/processing/map/${buildingId}/${version}`;
        const response = await fetch(this.base_url + path,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        });
        console.log(response.status,"getBuildingProcessingMap")
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
    async uploadRoute(data,buildingId,){
        const path = `/processing/route/{buildingId}`;
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