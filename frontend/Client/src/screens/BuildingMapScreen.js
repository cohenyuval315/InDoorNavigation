/* eslint-disable prettier/prettier */

import { useEffect, useState,useRef } from "react";
import client from "../services/api-client";
import { View,ScrollView, Text } from "react-native";
import Svg, { SvgXml } from 'react-native-svg';
import { SvgCss} from 'react-native-svg/css';
import { PanResponder, Animated, StyleSheet, Image,Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const BuildingMap = ({building}) => {
    const [svgData, setSvgData] = useState(null);
    const [mapData,setMapData] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [lastZoom, setLastZoom] = useState(1);
    // const [lastFingerDistance,setLastFingerDistance] = useState(null);
    const lastFingerDistance = useRef(null);
    const [pan,setPan] = useState(new Animated.ValueXY());
    const MAX_ZOOM_IN = 2;
    const MAX_ZOOM_OUT = 1;
    const zoomV = useRef(1);
    const lastOffset = useRef({
        x:0,
        y:0
    })
    const offset = useRef({
        x:0,
        y:0
    })
    const panRef = useRef(new Animated.ValueXY());
    const lastDirection = useRef({

    });
    const zoomStep = 0.1
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,            
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                
                const touches = event.nativeEvent.touches;
            
                if (touches.length >= 2) {
                    // console.log('pinch')
                    // // setZoom(prev=>prev + 0.1);
                    // // We have a pinch-to-zoom movement
                    // // Track locationX/locationY to know by how much the user moved their fingers
                    // // You can implement zoom logic here based on gestureState
                    // const dx = touches[0].pageX - touches[1].pageX;
                    // const dy = touches[0].pageY - touches[1].pageY;
                    // const distance = Math.sqrt(dx * dx + dy * dy);
                    // if (lastFingerDistance.current === null){
                    //     lastFingerDistance.current = distance;
                    //     return;
                    // }
                    // if (distance < 20){
                    //     return;
                    // }
                    
                    // if (distance < lastFingerDistance.current) {
                    //     console.log('Zoom Out');
                    //     console.log('zoom:', zoomV.current)
                    //     // if((zoomV.current -= zoomStep) * screenWidth > screenWidth){

                    //     // }
                    //     if(zoomV.current > MAX_ZOOM_OUT){
                    //         setZoom(prev=>prev - zoomStep)
                    //         zoomV.current -= zoomStep;
                    //     }
                        
                    // } else if (distance > lastFingerDistance.current) {
                    //     console.log('Zoom In');
                    //     console.log('zoom:', zoomV.current)
                    //     if(zoomV.current < MAX_ZOOM_IN){
                    //         zoomV.current += zoomStep;
                    //         setZoom(prev=>prev + zoomStep);
                    //     }                        
                    // }
                    // lastFingerDistance.current = distance;
                    
                }else{

                
                    lastFingerDistance.current = null;
                    const compWidth = screenWidth;
                    if (compWidth < screenWidth){

                    }
                    const compHeight = 300;
                    const leftBoundary = (compWidth * zoomV.current - screenWidth) / 2
                    const rightBoundary = leftBoundary * -1;
                    const bottomOffset = 70;
                    const upBoundary =  screenHeight - compHeight * zoomV.current + bottomOffset;
                    const downBoundary = screenHeight - (compHeight * zoomV.current) + bottomOffset;
                                        
                    console.log('moving');
                    const { dx, dy } = gestureState;

                    let newX = dx + offset.current.x;
                    let newY = dy + offset.current.y;
                    console.log()
                    if(newX < rightBoundary){
                        newX = rightBoundary;
                    }
                    if(newX > leftBoundary){
                        newX = leftBoundary;
                    }                    
                    // if(newY > screenHeight * zoomV.current){
                    //     newY = screenHeight * zoomV.current;
                    // }
                    if(newY > downBoundary){
                        newY = downBoundary;
                    }  
                    // screen width : 384
                    // height: 300
                    // 757.3 - 300 * 2 -> 157 + 70 = 227,  310
                    // 750 - 300 => 450
                    // 320  
                    // 300 * 0.4 / 2 = 60
                    // 75 approx 
                    // 750 - 300 * 2 = 157 + 70 => 
                    // 757 - 300 * 1 -> 457 - 70 = 387 -> v
                    // 757 - 300 * 2 -> 157 -> 70 = 
                    //300 * 1.5
                    // 384 - 384 / 2 -> 192 . +-
                    // 384 - 384 / 1 -> 0. +-
                    // 384 * 2 - 384 -> 384 / 2 -> v.
                    // 384 * 1 - 384 -> 0 -> v
                    // 384 * 1.5 - 384 -> x /2 -> v
                    // 384 - 384 / 0.4 -> -576 ,  384 * 0.6 = 230 /2 -> v
                    // 384 * 0.2 = 76 /2 -> v
                    // 300 * 2 - 757 -> -157 / 2
                    // zoom = 0.4 -> left: -115, down:476 , up: -61, right:115
                    // zoom = 0.8 -> left:-37 down:416 up: -5 right:37
                    // zoom = 1 -> left: 0 ,down :389, up:24 , right:0
                    // zoom = 1.5 -> left:95 down:310 up: 97 right:-99
                    // zoom = 2 -> left:191,down: 236, up:170 ,right: -195
                    //
                    //630= 750 - 120(300 *  0.4)  - 70 = 476, -61
                    //510= 750 - 240(300 *  0.8)  - 70 = 416, -5
                    //450= 750 - 300(300 *  1)    - 70 = 389,  24
                    //300= 750 - 450(300 *  1.5)  - 70 = 310,  97
                    //150= 750 - 600(300 *  2)    - 70 = 235,  170
                    //
                    // 750

                    // 384 / 2 = 191 , -191. 170 , 50 offset down, 236 
                    // ~70
                    // ~20
                    


                    console.log("\nx:",newX,"\ny:",newY);               
                    const maxTranslateX = (screenWidth -380) * zoomV.current;
                    const maxTranslateY = screenHeight - (100 * zoomV.current);
                    console.log(panRef.current.x,panRef.current.y,dx,dy,zoomV.current,offset.current.x,offset.current.y)
                    const boundedX = Math.max(0, Math.min(newX, maxTranslateX));
                    const boundedY = Math.max(0, Math.min(newY, maxTranslateY));
                    pan.setValue({ x: newX ,  y: newY}); 
                    panRef.current.setValue({ x: newX ,  y: newY});          
                }
            },            
            onPanResponderRelease: (event, gestureState) => {
                console.log('release');
                offset.current = {
                    x: offset.current.x + gestureState.dx,
                    y: offset.current.y + gestureState.dy,
                };                
            },
          
        })
      ).current;

      const handleZoom = (event) => {
        const newZoom = event.nativeEvent.scale;
        const dzoom = newZoom / lastZoom;
        setLastZoom(newZoom);
        setZoom(zoom * dzoom);
        event.preventDefault();
      };

    useEffect(()=>{
        async function fetchMap(){
            const svgData = await client.getBuildingMap(building.id);
            const floorSvgs = svgData.floorsFiles
            setSvgData(floorSvgs);
            setMapData(svgData.data);
        }
        fetchMap();
    },[building])

    return (
        <View style={{
            flex:1,
            // position:'absolute',
            // height:'100%',
            // width:'100%',
            backgroundColor:"red"
        }}
        {...panResponder.panHandlers}
        >
            <Animated.View
                style={[
                styles.imageContainer,
                {
                    transform: [
                    { translateX: panRef.current.x },
                    { translateY: panRef.current.y },
                    { scale:  zoomV.current },
                    ],
                },
                {
                    width:screenWidth,
                    height:300,
                }
                ]}
                
            >
                 {svgData !== null && (
                    <SvgXml 
                    xml={svgData[1]} width={screenWidth} height={300} 
                    // onResponderMove={(event) => handleZoom(event)}
                    // onResponderRelease={(event) => handleZoom(event)}
                    // onPressIn={(event) => handleZoom(event)}
                    // onPressOut={(event) => handleZoom(event)}
                    />
                )}

            </Animated.View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    imageContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderColor:'black',
        borderWidth:2,
        
    },
})
export default BuildingMap;