import { useEffect, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectMap, selectMinFloor } from "../../../../../app/map/map-slice";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import MapOverlay from "../../../../../layouts/map-overlay";
import { SvgXml } from "react-native-svg";
import { calculateBottomLeftOffset, calculateDisplayDimensions } from "../../../../../utils/map-data";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../../utils/scaling";
import { selectPosition,selectPositionStatus, setInitialPosition } from "../../../../../app/user/user-orientation-slice";

import Status from "../../../../../app/status";
const userSVG = `
    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 18.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
    <g>
        <g>
            <polygon points="32,0 46,32 60,64 32,50 4,64 18,32"/>
        </g>
    </g>
    </svg>
`;


const BuildingMapUserPositionOverlay = ({rotationRef}) => {

    const [mapFloor,setMapFloor] = useState(0); 
    const maps = useSelector(selectMap);
    const map = maps[mapFloor];    
    const mapWidth = map.width;
    const mapHeight = map.height;
    const {offsetX , offsetY} = calculateBottomLeftOffset(mapWidth,mapHeight,WINDOW_WIDTH,WINDOW_HEIGHT);

    const [position,setPosition] = useState({
        x:offsetX,
        y:offsetY
    })
    
    return (
        <MapOverlay>
            <Animated.View style={{
                flex:1,
                pointerEvents:'box-none'
            }}>
                <Animated.View style={{
                    position:'absolute',
                    left:position.x,
                    bottom:position.y,
                }}>
                    <TouchableOpacity>
                        <SvgXml
                            xml={userSVG}
                            width={30}
                            height={30}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

        </MapOverlay>
    )
}

export default BuildingMapUserPositionOverlay;