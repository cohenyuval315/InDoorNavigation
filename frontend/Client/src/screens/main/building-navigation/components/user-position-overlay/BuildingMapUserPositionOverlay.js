import { useEffect, useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectMap, selectMinFloor } from "../../../../../app/map/map-slice";
import MapOverlay from "../../../../../layouts/map-overlay";
import { SvgXml } from "react-native-svg";
import { calculateBottomLeftOffset, calculateDisplayDimensions } from "../../../../../utils/map-data";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../../../../utils/scaling";

import Status from "../../../../../app/status";
import { UserIndoorPositionService } from "../../../../../services/UserIndoorPositionService";
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


const BuildingMapUserPositionOverlay = ({userBuildingMapCoordinates}) => {
    return (
        <MapOverlay>
            <Animated.View style={{
                flex:1,
                pointerEvents:'box-none'
            }}>
                <Animated.View style={{
                    position:'absolute',
                    top: userBuildingMapCoordinates.y.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%']
                    }),
                    left: userBuildingMapCoordinates.x.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%']
                    }),  
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