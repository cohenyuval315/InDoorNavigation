import { BuildingSeed } from './BuildingSeed.js'
import afekaBuildingSeed from './afeka/afeka.js'
import fs from 'fs/promises';
import path from 'path';
import { createBuildingData } from '../domains/buildings/data/domain/buildingService.js';
import { createBuildingMapData } from '../domains/buildings/map/domain/buildingMapService.js';
import { createBuildingGraphMapData } from '../domains/buildings/graph/domain/buildingGraphService.js';
import { createBuildingMagneticMapData } from '../domains/buildings/magnetic/domain/buildingMagneticService.js';
import { createBuildingWifiMapData } from '../domains/buildings/wifi/domain/buildingWifiService.js';
import { logger } from '@/lib/logger/logger.js';
import { generateColorMap, generatePOIsMaps } from '@/common/utils/POI/map.js';
import { calculatePOIsCenterPoint } from '@/common/utils/POI/normalize.js';
import { MapFloor } from '@/common/interfaces/MapFloor.js';
import { getMaxFloor, getMinFloor } from '@/common/utils/floor.js';
import { calculateEdgesWeights, getEdgesWithIds } from '@/common/utils/utils.js';
import { generateGraphMaps } from '@/common/utils/graph/graph-svg.js';

let __dirname = path.dirname(new URL(import.meta.url).pathname);
logger.log('__dirname:', __dirname);

const isWindows = process.platform === 'win32';
if (isWindows && __dirname.startsWith('/')) {
  __dirname = __dirname.slice(1);
}

const baseBuildingAssetsPath = path.join(__dirname, '..','seed')
logger.info('__path:',baseBuildingAssetsPath)


export async function seedBuilding(buildingSeed:BuildingSeed){
    logger.info(`seeding building with id {${buildingSeed.buildingId}}...`);
    const {buildingTitle,buildingId,data,graph,magnetic,map,wifi} = buildingSeed;
    try {
        const mapFloors = map.data.mapFloors;

        // normalize pois
        const normalPois = calculatePOIsCenterPoint(map.data.POIs);
        map.data.POIs = normalPois;

        // svg colors 
        const poisColorMap = generateColorMap(map.data.POIs,getMinFloor(mapFloors),getMaxFloor(mapFloors));
        map.data.POIsColorMap = poisColorMap

        // normalize edges and ids 
        const {edges,nodes} = graph.data;
        const filteredEdges = calculateEdgesWeights(nodes,edges,mapFloors);
        const normaizedEdges = getEdgesWithIds(filteredEdges);
        graph.data.edges = normaizedEdges;

        // svg graph maps
        graph.data.graphMaps = generateGraphMaps(poisColorMap, nodes,edges,mapFloors)

        // svg poi maps
        const poisMaps = generatePOIsMaps(poisColorMap,map.data.POIs,mapFloors);
        map.data.POIsMaps = poisMaps;

                
        // svg map floor
        const floorMapsPromises = map.data.mapFloors.map(async (mapFloor:MapFloor) => {
            const floor = mapFloor.floor;
            const mapSvgPath = path.join(baseBuildingAssetsPath,buildingTitle, 'maps', `_${floor}.svg`);//.slice(3);
            const mapSvg = await fs.readFile(mapSvgPath,'utf-8')
            return {
                ...mapFloor,
                map:mapSvg
            };

        })
        const mapFloorsData = await Promise.all(floorMapsPromises);
        map.data.mapFloors = mapFloorsData;



        await createBuildingData(buildingId,data.data,data.override);
        await createBuildingMapData(buildingId,map.data,map.override);
        await createBuildingGraphMapData(buildingId,graph.data,graph.override);
        await createBuildingMagneticMapData(buildingId,magnetic.data,magnetic.override);
        await createBuildingWifiMapData(buildingId,wifi.data,wifi.override);
        // const buildingData = await getBuildingData(buildingId)
        // const buildingMapData = await getBuildingMapData(buildingId)
        // const graphMap = await getBuildingGraphMapData(buildingId)
        // const magneticMap = await getBuildingMagneticMapData(buildingId)
        // const wifiMap = await getBuildingWifiMapData(buildingId)
        
    }catch(error){
        logger.info(`error seeding building with id {${buildingSeed.buildingId}}... ${error.message}`);
    }

    
}

export async function seedAllBuilding(){
    try{
        logger.info("seeding all buildings...")
        await seedBuilding(afekaBuildingSeed)
    }catch(error) {
        logger.error("error in seeding buildings")
        logger.error(error)
    }

}