import MapOverlay from '../../../../layouts/map-overlay';
import { Animated, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useEffect, useState } from 'react';
import { selectMap } from '../../../../app/map/map-slice';
import { useSelector } from 'react-redux';
import { calculateBottomLeftOffset } from '../../../../utils/map-data';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../../utils/scaling';

const PointOverlay = ({floor,x,y,color,size}) => {  
    const maps = useSelector(selectMap)
    const mapWidth = maps[floor].width;
    const mapHeight = maps[floor].height;
    const [left,setLeft] = useState(new Animated.Value(x || 0))
    const [top,setTop] = useState(new Animated.Value(y || 0))

    useEffect(()=>{
        setLeft(x)
    },[x])

    useEffect(()=>{
        setTop(y)
    },[y])

    const halfSize = size / 2;
    const translateX = -halfSize;
    const translateY = -halfSize;    
    return (
        <MapOverlay styles={{
        }}>
            <Animated.View 
                style={{
                    position: 'absolute', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    left:left,
                    top:top,
                    transform: [{ translateX }, { translateY }],

                }}
            >
                <Svg height={size} width={size} style={{ position: 'absolute', top: 0, left: 0 }}>
                    <Circle cx={size / 2} cy={size / 2} r={size} fill={color} />
                </Svg>                    
            </Animated.View>
        </MapOverlay>
    )
}

export default PointOverlay;