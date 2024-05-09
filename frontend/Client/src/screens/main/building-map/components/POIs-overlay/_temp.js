    // const getPath = () => {
    //   let path = '';
    //   POIMapArea.forEach((point, index) => {
    //     const { x, y } = point;
    //     if (index === 0) {
    //       path += `M${x},${y}`; // Move to the starting point
    //     } else {
    //       path += ` L${x},${y}`; // Draw a line to the next point
    //     }
    //   });
    //   path += ' Z'; // Close the path
    //   return path;
    // };    

    // return (
    //     <View style={{
    //         position:"absolute",
    //         bottom:leftestDownestPoint.y,
    //         left:leftestDownestPoint.x,
    //         zIndex:5,
    //     }}>

    //         {numOfCoordinates === 1 ? (
    //             <> 
    //                 <TouchableOpacity style={{
            
    //                 }}>
    //                     <Text style={{
    //                         color:"black"
    //                     }}>
    //                         {POI.details.title}
    //                         <Ionicons
    //                                 name={"pin"} 
    //                                 size={30} 
    //                                 color={"red"} 
    //                             />
    //                     </Text>
    //                 </TouchableOpacity>
                                         
    //             </>
    //         ) : numOfCoordinates === 2 ? (
    //             <>
    //                 <TouchableOpacity>
    //                     <Text>
    //                         {POI.details.title}
    //                         <Ionicons
    //                                 name={"pin"} 
    //                                 size={20} 
    //                                 color={"blue"} 
    //                             />
    //                     </Text>
    //                 </TouchableOpacity>
                    
    //             </>
    //         ) : (
    //             <>
    //             {POIMapArea.map((area)=>{
    //               return (
    //                 <View style={{
    //                   position:"absolute",
    //                   left:area.x,
    //                   bottom:area.y - 230
    //                 }}>
    //                   <Text style={{
    //                     backgroundColor:"red",
    //                     height:10,
    //                     width:10,
    //                   }}>
                        
    //                   </Text>
    //                 </View>
    //               )
    //             })}

    //                 {/* <Svg height="100" width="100" style={{
    //                   position:"absolute",
    //                   opacity:0.5
    //                 }}>
    //                   <Polygon
    //                     points="40,5 70,80 25,95"
    //                     fill="lime"
    //                     stroke="purple"
    //                     strokeWidth="1"
    //                   />
    //                 </Svg> 
    //                   */}
    //             </>
    //         )}

            
    //     </View>
    // )

    
const getPOIIcon = (iconName) => {

}

const getShapeType = (coordinates) => {
    switch (coordinates.length) {
      case 1:
        return "dot";
      case 2:
        return "line";
      case 3:
        return "triangle";
      default:
        return "polygon";
    }
};

import React, { useEffect, useMemo, useState } from "react";
import { Svg,Path, Polygon } from "react-native-svg";
import BuildingPOIPoint from "./BuildingPOIPoint";
import BuildingPOIPath from "./BuildingPOIPath";
import BuildingPOIPolygon from "./BuildingPOIPolygon";

function getPaths(coordinates){
    let pathData = "";
    coordinates.forEach((coordinate, index) => {
      if (index === 0) {
        pathData += `M ${coordinate.x} ${coordinate.y}`;
      } else {
        pathData += ` L ${coordinate.x} ${coordinate.y}`;
      }
    });
    return pathData;
  
}

function findCenterPoint(coordinates){

}


const ShapeRenderer = ({ coordinates }) => {
    const shapeType = getShapeType(coordinates);
    const shapePaths = getPaths(coordinates)

    if (shapeType === "dot") {
      return (
        <View  key={coordinates[0].x + coordinates[0].y}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: "blue",
              borderRadius: 5,
              position: "absolute",
              top: coordinates[0].y - 5,
              left: coordinates[0].x - 5,
            }}
          />
        </View>
      );
    }
  
    return (
      <Svg key={shapePaths}>
        <Path
          d={shapePaths}
          fill="none"
          stroke="blue"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    );
};
  
function findLeftestDownestPoint(points) {
    if(points.length === 0){
        return null;
    }
    
    let leftest = points[0].x;
    let downest = points[0].y;

    for (let i = 1; i < points.length; i++) {
        if (points[i].x < leftest) {
            leftest = points[i].x;
        }
        if (points[i].y < downest) {
            downest = points[i].y;
        }
    }

    return { x:leftest, y:downest };
}

const POIShape = ({POI}) => {
    return (
        <View>
            
        </View>
    )
}





const RotatingView = ({rotationRef,children}) => {
  const [animatedRotation] = useState(new Animated.Value(rotationRef.current._value));
  useEffect(() => {
    const subscription = rotationRef.current.addListener((value) => {
      Animated.timing(animatedRotation, {
        toValue: -value.value,
        duration: 100, // Adjust duration as needed
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      
    });
    return () => rotationRef.current.removeListener(subscription);
  }, [rotationRef]); 
  const rotate = animatedRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });  
  return (
    <Animated.View style={{
      flex:1,
      transform: [{ rotate }]
    }}>
      {children}
    </Animated.View>
  )
}

const RotatingOriginView = ({rotationRef,rotationOriginX,rotationOriginY,children,width,height}) => {
  const [animatedRotation] = useState(new Animated.Value(rotationRef.current._value));
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const subscription = rotationRef.current.addListener((value) => {
      const rotationDifference = -value.value - rotationRef.current._value;
      // const newTranslateX = width / 2 - (width / 2) * Math.cos(rotationDifference * Math.PI / 180) + (height / 2) * Math.sin(rotationDifference * Math.PI / 180);
      // const newTranslateY = height - (height / 2) * Math.cos(rotationDifference * Math.PI / 180) - (width / 2) * Math.sin(rotationDifference * Math.PI / 180);
      // setTranslateX(newTranslateX);
      // setTranslateY(newTranslateY);      
      Animated.timing(animatedRotation, {
        toValue: -value.value,
        duration: 100, // Adjust duration as needed
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      
    });
    return () => rotationRef.current.removeListener(subscription);
  }, [rotationRef]); 
  const rotate = animatedRotation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });  
  return (
    <Animated.View style={{
      flex:1,
      backgroundColor:"blue",
      opacity:0.5,
      transform: [
      ]
    }}>
      {/**
       * 
       * 90 degree iterations to correct positon
       * ,-width/2, -height/2
       * 0,-height
       * ,width/2 , -height/2
       */}
      {children}
    </Animated.View>
  )
}

const PointIcon = ({x,y,iconSize}) => {
  const iconHalfSize = iconSize / 2;
  return (
    <View style={{ 
      position: 'absolute',
      left: x - iconHalfSize,
      bottom: y + iconHalfSize,
      zIndex:20,
      }}>
      <Text style={{
        
      }}>       
        {/* <Ionicons name={"pin"} size={iconSize} color={"black"} /> */}
        
      </Text>    
    </View>
  )
}

const BuildingPOIPoint3 = ({ POI, rotationRef }) => {
  // Define the size of the icon
  const iconSize = 20; // Set the desired size of the icon

  // Calculate the position of the icon based on its size
  const iconPositionX = POI.mapArea[0].x - iconSize / 2; // Adjust for half of the icon size
  const iconPositionY = POI.mapArea[0].y; // Adjust for the full height of the icon

  return (
    <View style={{
      position: "absolute",
      bottom: POI.mapArea[0].y,
      left: POI.mapArea[0].x ,
      zIndex: 5,
      
    }}>
      <Ionicons name={"pin"} size={iconSize} color={"black"} />
    </View>
  );
};

const transformOrigin = (
  anchorPoint,
  originalCenterPoint,
  transforms,
) => {
  const result = [
    {translateX: anchorPoint.x - originalCenterPoint.x},
    {translateY: anchorPoint.y - originalCenterPoint.y},
    ...transforms,
    {translateX: -(anchorPoint.x - originalCenterPoint.x)},
    {translateY: -(anchorPoint.y - originalCenterPoint.y)},
  ];
  return result;
};

// const BuildingPOIPoint = ({POI,rotationRef}) => {
//   // const [componentDimensions, setComponentDimensions] = useState({
//   //   width: 0,
//   //   height: 0,
//   // });

//   const iconName = POI.details.icon;
//   const iconSize = 50; 
//   const centerX = POI.center.x;
//   const centerY = POI.center.y;
//   const iconPositionX = centerX - iconSize / 2; // Adjust for half of the icon size
//   const iconPositionY = centerY - iconSize / 2;   
//   return (
//     <TouchableOpacity style={{
//       position:"absolute",
//       left:iconPositionX,
//       bottom: iconPositionY, 
//     }}>
//         <Text style={{
//           backgroundColor:"black",
//           borderRadius:30,
//         }}>
//           <MaterialCommunityIcons name={iconName}  size={iconSize} color={"white"} />
//         </Text>
//     </TouchableOpacity>    
//   )
//   console.log(POI)
//   // Set the desired size of the icon
//   const [animatedRotation] = useState(new Animated.Value(rotationRef.current._value));
//   // Calculate the position of the icon based on its size
  

//   // const iconPositionX = POI.mapArea[0].x - iconSize / 2; // Adjust for half of the icon size
//   // const iconPositionY = POI.mapArea[0].y - iconSize / 2; // Adjust for the full height of the icon
  
//   // useEffect(() => {
//   //   const subscription = rotationRef.current.addListener((value) => {
//   //     const angle = -value.value;
//   //     // Calculate the new center position after rotation
//   //     const rotatedX = Math.cos(angle * Math.PI / 180) * (POI.mapArea[0].x - centerX) - Math.sin(angle * Math.PI / 180) * (POI.mapArea[0].y - centerY) + centerX;
//   //     const rotatedY = Math.sin(angle * Math.PI / 180) * (POI.mapArea[0].x - centerX) + Math.cos(angle * Math.PI / 180) * (POI.mapArea[0].y - centerY) + centerY;
      
//   //     setCenterX(rotatedX);
//   //     setCenterY(rotatedY);

//   //     Animated.timing(animatedRotation, {
//   //       toValue: -value.value,
//   //       duration: 100, // Adjust duration as needed
//   //       easing: Easing.linear,
//   //       useNativeDriver: true,
//   //     }).start();
      
//   //   });
//   //   return () => rotationRef.current.removeListener(subscription);
//   // }, [rotationRef, centerX, centerY]); 
//   // const rotate = animatedRotation.interpolate({
//   //   inputRange: [0, 360],
//   //   outputRange: ['0deg', '360deg'],
//   // });  
//   return (
//     <>
//     <Animated.View style={{
//       position: "absolute",
//       // bottom: centerY - componentDimensions.height / 2,
//       // left: centerX - componentDimensions.width / 2,
//       bottom: centerY,
//       left: centerX,      
//       zIndex: 5,
//       position: 'absolute',   
//       // transform: [
//       //   { rotate: rotate }, // Apply rotation
//       //   // { translateX: 0 },
//       //   // { translateY: iconSize/2 },
//       // ]
      
//     }}>
//        <RotatingOriginView rotationRef={rotationRef}
//         rotationOriginX={iconPositionX}
//         rotationOriginY={iconPositionY}
//         width={iconSize}
//         height={iconSize}
//        >
//         {/* <Text>
//           text
//         </Text> */}
//         <Text
//           onLayout={event => {
//             const {width, height} = event.nativeEvent.layout;
//             // setComponentDimensions({width: width, height: height});
//           }}
//         >
//           <Text>
//           <Ionicons name={"pin"} size={iconSize} color={"black"} />
//           </Text>
//         </Text>
        
//       </RotatingOriginView>
//     </Animated.View>


//     <View style={{
//       // flex:1,
//         position:"absolute",
//         // bottom: centerY - componentDimensions.height / 2,
//         // left: centerX - componentDimensions.width / 2,
//         width:500,
//         height:500,
//         backgroundColor:"black",
//         zIndex:9999,
//         opacity:1,
//         bottom: 100,
//         left: 50,        
//     }}>
//         <Text style={{
//           fontSize:20,
//           color:"black",
//           backgroundColor:"blue",
//           width:100,
//           height:100,
//         }}>
//           hello
//       </Text>
//     </View>



//     <View style={{
//       position:"absolute",
//       bottom:POI.mapArea[0].y,
//       left:POI.mapArea[0].x,
//       zIndex:5,
//   }}>



   

//     {/* <RotatingOriginView 
//       rotationRef={rotationRef}
//       rotationOriginY={POI.mapArea[0].y}
//       rotationOriginX={POI.mapArea[0].x}
//     >
//       <Text>       
//         <Ionicons name={"pin"} size={30} color={"black"} />
//       </Text>      
//     </RotatingOriginView>
//     <RotatingView rotationRef={rotationRef}>
    
//        <TouchableOpacity style={{
//         backgroundColor:"white"
//           }}>
//               <Text style={{
//                   color:"black"
//               }}>
                  
//                   <Ionicons
//                           name={"pin"} 
//                           size={30} 
//                           color={"red"} 
//                   />
//                   {POI.details.title}
//               </Text>
//        </TouchableOpacity>
//     </RotatingView> */}

//   </View>
//   </>
//   )
// }
