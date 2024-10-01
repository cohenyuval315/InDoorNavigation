// @ts-nocheck 
import Config from "../config/Config";


class ApiClient{
    base_url: string;
    constructor(base_url:string){
        this.base_url = base_url 
        this.controller = new AbortController();
        this.defaultHeaders = {
            "Content-Type": "application/json"
        };            
        this.defaultTimeout = 10000
    }
    
    abortRequestsByTimeLength(timeLength:number) {
        setTimeout(() => {
            this.controller.abort(); 
            this.controller = new AbortController();
        }, timeLength);
    }

    _abortRequests() {
        this.controller.abort(); 
        this.controller = new AbortController();
    }

    async _request(method:string,path:string, body:object = null, headers:object = null,params:object=null,accessToken:string=null,timeout:number=null) {
        const url = new URL(path, this.base_url);

        const requestOptions = {
            method: method,
            headers: headers ? headers : this.defaultHeaders,
            signal: this.controller.signal 
        };

        if (accessToken) {
            requestOptions.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (body){
            if(body instanceof FormData){
                requestOptions['body'] = body;
            }else{
                requestOptions['body'] = JSON.stringify(body);   
            }
            
        }   
        
        if (params) {
            Object.keys(params).forEach((key, index) => {
              url.searchParams.set(key, params[key]);
            });
        }

        
        try {
            // console.log(url)
            const response = await Promise.race([
                fetch(url, requestOptions),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), timeout ? timeout : this.defaultTimeout)
                ),
            ]);

            if (response instanceof Error && response.message === 'Timeout') {
                this.abortRequests();
                throw new Error('Request timed out');
            }            

            return response

        } catch (error) {
            if (error.message === 'Request timed out') {
                console.error("request time out.")
            }else {
                console.error(error)
                throw error
            }
        }
    }



    async ping(timeout=3000){
        try{
            const path = '/api/ping';
            const response = await this._request("GET", path, null,null,null,null,timeout);
            if(response.ok){
                return true;
            }
        }catch(error){
            console.log(error)
            return false;
        }

    }

    async getAppData(accessToken=null){
        const path = '/app';
        const response = await this._request("GET", path, null,null,null,accessToken=accessToken);
        return response;
    }

    async getBuildings(accessToken=null){
        console.debug('request buildings data');
        const path = '/buildings/data';
        const response = await this._request("GET", path, null,null,null,accessToken=accessToken);
        return response;
    }

    async getBuildingData(buildingId,accessToken=null){
        const path = `/buildings/data/${buildingId}`;
        const response = await this._request("GET", path, null,null,null,accessToken=accessToken);
        return response;
    }


    async getBuildingGraphData(buildingId,accessToken=null){
        console.log('request graph buildings data');
        const path = `/buildings/graph/${buildingId}`;
        const response = await this._request("GET", path, null,null,null,accessToken=accessToken);
        return response;
    }


    async getBuildingMapData(buildingId,accessToken=null){
        console.log('request map buildings data');
        const path = `/buildings/map/${buildingId}`;
        const response = await this._request("GET", path, null,null,null,accessToken=accessToken);
        return response;
    }

    async createBuildingProcessingRoute(buildingId,data,accessToken=null){
        const path = `/processing/routes/${buildingId}`;
        const response = await this._request("POST", path, {data:data},null,null,accessToken=accessToken);
        return response;
    }
    
    
    async getAllBuildingProcessingRoutes(buildingId,accessToken=null){
        const path = `/processing/routes/${buildingId}`;
        const response = await this._request("GET", path, null,null,null,accessToken=accessToken);
        return response;
    }   


    async getBuildingProcessingRoute(buildingId,routeName,accessToken=null){
        const path = `/processing/routes/${buildingId}/${routeName}`;
        const response = await this._request("GET", path, null,null,null,accessToken=accessToken);
        return response;
    }

    async createBuildingProcessingPoints(buildingId,data,accessToken=null){
        const path = `/buildings/processing/points/${buildingId}`;
        const response = await this._request("POST", path, {data:data},null,null,accessToken=accessToken);
        return response;
    }

    async getBuildingProcessingPoints(buildingId,version,accessToken=null){
        const path = `/buildings/processing/points/${buildingId}/${version}`;
        const response = await this._request("GET", path, null,null,null,accessToken=accessToken);
        return response;
    }


    async getNavigationRoute(
        buildingId,
        destinationPOIId,
        currentLocation,
        accessibility,
        accessToken=null){
        const path = `/navigation/${buildingId}`;
        const body = {
            destinationPOIId,
            currentLocation,
            accessibility
        }
        const response = await this._request("POST", path,body,null,null,accessToken=accessToken);
        return response;
    }


    async getUserWifiLocation(buildingId,userState,wifiScanData,accessToken=null){
        const path =  `/localization/${buildingId}`;
        const response = await this._request("POST", path, {
            userState,
            wifiScanData
        },null,null,accessToken=accessToken);
        return response;
    }

    
    async getUserInitialWifiLocation(buildingId,wifiScanData,accessToken=null){
        const path =  `/localization/${buildingId}`;
        const response = await this._request("POST", path, {
            userState,
            wifiScanData
        },null,null,accessToken=accessToken);
        return response;
    }

    async getUserMagneticLocation(buildingId,magnetic,accessToken=nullData){
        return null;
        // const path =  `/localization/${buildingId}`;
        // const response = await this._request("POST", path, {
        //     userState,
        //     wifiScanData
        // },null,null,accessToken=accessToken);
        // return response;
    }
}

const client = new ApiClient(Config.SERVER_URL);
export default client;