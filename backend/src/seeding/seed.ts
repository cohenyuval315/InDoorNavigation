import BuildingData from '../models/BuildingData'
import { BuildingSeed } from './BuildingSeed'
import afekaBuildingSeed from './afeka'
import {
    createBuildingData,
    createBuildingMapData,
    createBuildingGraphMapData,
    createBuildingMagneticMapData,
    createBuildingWifiMapData,
    getBuildingData,
    getBuildingMapData,
    getBuildingGraphMapData,
    getBuildingMagneticMapData,
    getBuildingWifiMapData
} from './../services/buildings-service';
import { ObjectId } from "mongodb";
import fs from 'fs/promises';
import path from 'path';
import { calculateEdgesWeights } from '../utils/graph-utils';
import { generateColorMap, generateGraphMaps } from '../utils/maps-generation';
import { getEdgesWithIds } from '../utils/edges';

let __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log('__dirname:', __dirname);

const isWindows = process.platform === 'win32';
if (isWindows && __dirname.startsWith('/')) {
  __dirname = __dirname.slice(1);
}

const baseBuildingAssetsPath = path.join(__dirname, '..','..','src','seeding')
console.log('__path:',baseBuildingAssetsPath)
export async function seedBuilding(buildingSeed:BuildingSeed){
    console.log(`seeding building with id {${buildingSeed.buildingId}}...`);
    const {buildingTitle,buildingId,data,graph,magnetic,map,wifi,mapFloors} = buildingSeed;
    try {
        
        const floorMapsPromises = mapFloors.map(async (mapFloor) => {
            const {floor,height,width,floorHeight} = mapFloor;
            const mapSvgPath = path.join(baseBuildingAssetsPath,buildingTitle, 'maps', `_${floor}.svg`);//.slice(3);
            const mapSvg = await fs.readFile(mapSvgPath,'utf-8')
            return {
                map:mapSvg,
                height,
                width,
                floor,
                floorHeight
            };

        })
        const mapFloorsData = await Promise.all(floorMapsPromises);
        const poisColorMap = generateColorMap(map.data.POIs,map.data.minFloor,map.data.maxFloor);
        map.data.mapFloors = mapFloorsData;
        map.data.POIsColorMap = poisColorMap
        
        const nodes = graph.data.nodes
        const edges = graph.data.edges
        const floorHeights = {}

        mapFloors.forEach((f) => {
            floorHeights[f.floor] = f.floorHeight;
        })
        
        const filteredEdges = calculateEdgesWeights(nodes,edges,floorHeights);
        const normaizedEdges = getEdgesWithIds(filteredEdges);
        graph.data.edges = normaizedEdges;
        graph.data.mapFloors = mapFloors;
        graph.data.graphMaps = generateGraphMaps(poisColorMap, nodes,edges,mapFloors)

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
        console.log(`error seeding building with id {${buildingSeed.buildingId}}... ${error.message}`);
    }

    
}

export async function seedAllBuilding(){
    try{
        console.log("seeding all buildings...")
        await seedBuilding(afekaBuildingSeed)
    }catch(error) {
        console.error("error in seeding buildings")
        console.error(error)
    }

}