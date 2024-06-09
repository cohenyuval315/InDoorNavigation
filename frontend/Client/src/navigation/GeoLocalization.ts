import { useEffect, useRef, useState } from "react";
import useGPS from "../hooks/useGPS"
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBuilding, setActiveBuilding } from "../app/active/active-slice";
import { selectAllBuildings } from "../app/building/buildings-slice";
import { GeolocationResponse } from "@react-native-community/geolocation";
import { PositionError } from "../sensors/gps-service";
import { useNavigation } from "@react-navigation/native";
import { useConfirmationModal } from "../contexts/ConfirmationModalContext";

function isPointInsideArea(longitude:any, latitude:any, geoArea:any) {
  let inside = false;
  for (let i = 0, j = geoArea.length - 1; i < geoArea.length; j = i++) {
      const xi = geoArea[i].longtitude, yi = geoArea[i].langtitude;
      const xj = geoArea[j].longtitude, yj = geoArea[j].langtitude;
      
      const intersect = ((yi > latitude) !== (yj > latitude)) &&
          (longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  return inside;
}


const GeoLocalization = ({children}:{children:any}) => {
  const {openConfirm} = useConfirmationModal()
    const navigation = useNavigation();
    const {subscribeGPS,unsubscribeGPS} = useGPS();
    
    const activeBuilding = useSelector(selectActiveBuilding);
    const buildings = useSelector(selectAllBuildings);
    const dispatch = useDispatch();    
    const lastPosition = useRef<GeolocationResponse | null>(null);
    const [validPosition,setValidPosition] = useState(false);

    const isInsideBuilding = (position:GeolocationResponse) => {
        const latitude =position.coords.latitude;
        const longitude = position.coords.longitude;
        const insideBuilding = [...buildings.filter((building:any) => { 
          return isPointInsideArea(longitude,latitude,building.geoArea);
    
        })];
        if (insideBuilding.length > 1){
          console.error("INSIDE MULTIPLE BUILDINGS");
        }else{
          if (insideBuilding.length > 0){
            return insideBuilding[0];
          }else{
            return null;
          }
        }
    }

    const selectBuildingFromPosition = (position: GeolocationResponse) => {
        if (!activeBuilding){
          const building = isInsideBuilding(position);
          if (building){
            openConfirm("detected inside building","do you want to switch for building map?",() => {
              dispatch(setActiveBuilding(building));
              // @ts-ignore
              navigation.navigate('building-map')
            })
          }
        }
    }

      
    const onPosition = (position:GeolocationResponse) => {
        lastPosition.current = position;
        if(position){
          setValidPosition(true);
        }else{
          setValidPosition(false);
        }
    }

    useEffect(() => {
      if(!activeBuilding && validPosition){
          if(lastPosition.current){
            selectBuildingFromPosition(lastPosition.current);
          }
      }
    },[activeBuilding,validPosition]);

    const onPositionError = (error:PositionError) => {
      console.log("GPS Stream Error",error)
    }
    
    useEffect(() => {
        subscribeGPS(onPosition,onPositionError);
        return () => unsubscribeGPS();
    },[])

    
    return children;
}

export default GeoLocalization