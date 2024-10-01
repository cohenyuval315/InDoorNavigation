import { useEffect, useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";

import MapOverlay from "../../../../layouts/map-overlay";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { selectMapsDims } from "../../../../app/map/map-slice";

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


const BuildingMapUserPositionOverlay = ({
    userX,
    userY,
    userHeading
}) => {
    
    if (!userX || !userY || !userHeading) {
        return null;
    }
    // const userHeading  = useRef(new Animated.Value(0)).current;
    // const userX  = useRef(new Animated.Value(500)).current;
    // const userY  = useRef(new Animated.Value(500)).current;



    const iconSize = 50;
    const mapsDims = useSelector(selectMapsDims);
    const height = mapsDims.height;
    const width = mapsDims.width;

    // console.log("Map Dimensions - Height:", height, "Width:", width);
    // console.log("User Positions - X:", userX, "Y:", userY);


    const translateX = userX.interpolate({
        inputRange: [0, width],
        outputRange: [0, width],
    });

    const translateY = userY.interpolate({
        inputRange: [0, height],
        outputRange: [0, height],
    });

    return (
        <MapOverlay styles={{
            zIndex:11
        }}>
            <Animated.View style={{
                flex:1,
                pointerEvents:'box-none',
                zIndex:11,
                position: 'absolute',
            }}>
                <Animated.View style={{
                    zIndex:11,
                    transform: [
                        { translateX },
                        { translateY },
                        { translateX: -iconSize/2 },
                        { translateY: -iconSize/2 },
                        { rotate: userHeading.interpolate({
                            inputRange: [0, 360],
                            outputRange: ['0deg', '360deg'],
                            extrapolate: 'clamp',
                        }) },
                    ],
                }}>
                    <TouchableOpacity style={{
                        zIndex:11,
                    }}>
                        <SvgXml
                            xml={userSVG}
                            width={iconSize}
                            height={iconSize}
                        />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

        </MapOverlay>
    )
}

export default BuildingMapUserPositionOverlay;