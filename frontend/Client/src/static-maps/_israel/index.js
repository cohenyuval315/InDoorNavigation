import { israelLocationMapSVG } from "../../assets/israel";
import { getRelativeGlobalCoordinates,getRelativePointByGlobalCoordinatesAndMapGlobalCoordinates, globalCoordinatesToFloats, getPointInMapBySize } from "../utils";

const israelMapRelativeCoordinatesData = getRelativeGlobalCoordinates(israelLocationMapSVG.globalCoordinates);

const getIsraelPointByGlobalCoordinates = (globalCoordinates) => {
    const point = getRelativePointByGlobalCoordinatesAndMapGlobalCoordinates(globalCoordinates,israelMapRelativeCoordinatesData)
    // const newPoint = getPointInMapBySize(point,israelMapRelativeCoordinatesData.topRight,width,height);
    const newPoint = point;
    return newPoint;
}

export {
    israelLocationMapSVG,
    israelMapRelativeCoordinatesData,
    getIsraelPointByGlobalCoordinates
}