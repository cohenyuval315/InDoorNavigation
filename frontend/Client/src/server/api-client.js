import { SERVER_URL } from "./temp";


class ApiClient{
    constructor(base_url){
        this.base_url = base_url 
    }
    
    async _request(method, path, body = null, headers = null, params = null, accessToken = null) {
        const url = new URL(path, this.base_url);
      
        if (params) {
          Object.keys(params).forEach((key, index) => {
            url.searchParams.set(key, params[key]);
          });
        }
      
        const config = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(headers || {}),
          },
        };
      
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      
        if (body) {
          config.body = JSON.stringify(body);
        }
      
        try {
          const response = await fetch(url, config);
          return response;
        } catch (error) {
          console.error(error);
          throw error;
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
        const path = `/buildings/processing/routes/${buildingId}`;
        const response = await this._request("POST", path, {data:data},null,null,accessToken=accessToken);
        return response;
    }
    
    
    async getAllBuildingProcessingRoutes(buildingId,accessToken=null){
        const path = `/buildings/processing/routes/${buildingId}`;
        const response = await this._request("GET", path, null,null,null,accessToken=accessToken);
        return response;
    }   


    async getBuildingProcessingRoute(buildingId,routeName,accessToken=null){
        const path = `/buildings/processing/routes/${buildingId}/${routeName}`;
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
        accessability,
        accessToken=null){
        const path = `/navigation/${buildingId}`;
        const response = await this._request("POST", path, 
            {
                destinationPOIId,
                currentLocation,
                accessability

            },null,null,accessToken=accessToken);
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

const client = new ApiClient(SERVER_URL);
export default client;