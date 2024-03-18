import { useEffect, useState,useRef } from "react";
import client from "../../services/api-client";
import { View,ScrollView, Text, TouchableOpacity } from "react-native";
import Svg, { SvgXml } from 'react-native-svg';
import { SvgCss} from 'react-native-svg/css';
import { PanResponder, Animated,Easing, StyleSheet, Image,Dimensions } from 'react-native';
import ImageZoom from "react-native-image-pan-zoom";
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const iconSvgData = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="none" d="M0 0h24v24H0z"/>
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14h4v-2H10v2zm4-4H8v-1h6v1zm0-2H8V7h6v3z"/>
</svg>
`;
const userSvgData = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path fill="none" d="M0 0h24v24H0z"/>
  <path d="M16.5 15l-3.5-3.5V20h-3v-8.5L7.5 15l-1-1 6-6 6 6z"/>
  </svg>
  `;
  const routeSvgData = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <path fill="none" stroke="#00F" stroke-width="2" d="M50 50 L150 150"/> <!-- Example path -->
  <!-- Add more paths as needed -->
  </svg>
  `; 

const BuildingMapScreen = ({building}) => {
    const [svgData, setSvgData] = useState(null);
    const [mapData,setMapData] = useState(null);
    const [userPosition, setUserPosition] = useState({ x: 100, y: 150 });
    const [userHeading, setUserHeading] = useState(0);
    const [routePaths, setRoutePaths] = useState([routeSvgData]);
    const previousUserHeading = useRef(userHeading);
    const previousUserPosition = useRef(userPosition);

    const [userX, setUserX] = useState(100); // Initialize user X position
    const [userY, setUserY] = useState(150); // Initialize user Y position
    const prevUserX = useRef(userX);
    const prevUserY = useRef(userY);
    const animatedUserX = useRef(new Animated.Value(userX)).current;
    const animatedUserY = useRef(new Animated.Value(userY)).current;

    const rotation = useRef(new Animated.Value(0)).current; 

    const [isLock,setIsLock] = useState(false);
    const [isLockRotate,setIsLockRotate] = useState(false);

    useEffect(()=>{
        async function fetchMap(){
            const svgData = await client.getBuildingMap(building.id);
            const floorSvgs = svgData.floorsFiles
            setSvgData(floorSvgs);
            setMapData(svgData.data);
        }
        fetchMap();
    },[building])

    const handleIconClick = () => {
        // Handle click event here
        console.log('Icon clicked');
    };
  
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const newX = userPosition.x; 
//       const newY = userPosition.y; 
//       const newHeading = userHeading + 5;

//       setUserPosition({ x: newX, y: newY });
//       setUserHeading(newHeading);
//     }, 1); // Update every 1ms
//     return () => clearInterval(intervalId);
//   }, [userPosition, userHeading]);

useEffect(() => {
  const intervalId = setInterval(() => {
    const radians = (userHeading * Math.PI) / 180; // Convert heading to radians
    const speed = 1; // Adjust the speed of movement
    const newX = userX + Math.cos(radians) * speed;
    const newY = userY + Math.sin(radians) * speed;

    setUserX(newX);
    setUserY(newY);
  }, 1000); // Update every 1000ms (adjust as needed)

  return () => clearInterval(intervalId);
}, [userX, userY, userHeading]);

// useEffect(() => {
//     if (prevUserX.current !== userX || 
//         prevUserY.current !== userY) {
//       Animated.parallel([
//         Animated.timing(animatedUserX, {
//           toValue: userX,
//           duration: 100,
//           easing: Easing.linear,
//           useNativeDriver: true,
//         }),
//         Animated.timing(animatedUserY, {
//           toValue: userY,
//           duration: 100,
//           easing: Easing.linear,
//           useNativeDriver: true,
//         })
//       ]).start();
//       prevUserX.current = userX;
//       prevUserY.current = userY;
//     }
//   }, [userX, userY]);
  

//   function animateRotation(){
//     const rotation = new Animated.Value(userHeading)
//     Animated.timing(
//         rotation,
//         {
//           toValue: 1, 
//           duration: 1000,
//           easing: Easing.linear,
//           useNativeDriver: true, 
//         }
//       ).start();
//     const newInterpolatedRotation = rotation.interpolate({
//         inputRange: [0, 1],
//         outputRange: [`${previousUserHeading.current}deg`, `${userHeading}deg`],
//     });
//     setInterpolatedRotation(newInterpolatedRotation);
//   }  
//   useEffect(() => {
//     if(previousUserHeading.current !== userHeading){
//         animateRotation()
//         previousUserHeading.current = userHeading;
//     }
//   },[userHeading])

    useEffect(() => {
        // Animated.timing(rotation, {
        //     toValue: userHeading,
        //     duration: 100,
        //     easing: Easing.linear,
        //     useNativeDriver: true,
        // }).start();
    }, [userHeading]);

    return (
        <View style={{
            position:'absolute',
            height:'100%',
            width:'100%',
            backgroundColor:"black",
        }}
        >
        {svgData !== null && (
            <Animated.View
                style={[
                {
                    flex:1
                },
                { 
                    transform: [{ rotate: rotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }],
                },
                ]}
            >
                <ImageZoom style={{
                    flex:1,
                    backgroundColor:"black",
                }}
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={0}
                    imageWidth={Dimensions.get('window').width}
                    imageHeight={300}
                    panToMove
                >
                    <View style={{ position: 'absolute', opacity: 0.5 }}>
                        <SvgXml 
                            xml={svgData[1]} 
                            width={screenWidth} 
                            height={300} 
                        />
                    </View>

                    <SvgXml 
                        opacity={0.5}
                        xml={svgData[0]} 
                        width={screenWidth} 
                        height={300} 
                    />
                        {/* Overlay clickable icons */}
                        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                            <TouchableOpacity onPress={() => handleIconClick('icon1')} style={{ position: 'absolute', top: 50, left: 50 }}>
                            {/* Your clickable icon 1 */}
                            {/* Example: */}
                            <SvgXml xml={iconSvgData} width={30} height={30} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleIconClick('icon2')} style={{ position: 'absolute', top: 100, left: 100 }}>
                            {/* Your clickable icon 2 */}
                            {/* Example: */}
                            <SvgXml xml={iconSvgData} width={30} height={30} />
                            </TouchableOpacity>
                            {/* Add more clickable icons as needed */}
                        </View>    

                        {/* User representation */}
                        <Animated.View style={{ 
                            position: "absolute", 
                            left: animatedUserX,
                            top: animatedUserY,
                            transform: [{ rotate: rotation.interpolate({ inputRange: [0, 360], outputRange: ["0deg", "360deg"] }) }] }}>
                            <SvgXml xml={userSvgData} width={24} height={24} />
                        </Animated.View>  

                    {/* Render route paths */}
                    
                    {routePaths.map((path, index) => (
                        <View key={index}>
                        <SvgXml
                            xml={routeSvgData}
                            width={screenWidth}
                            height={300}
                            style={{ position: 'absolute', left: path.x1, top: path.y1 }}
                        />
                        </View>
                    ))}                              
                </ImageZoom>
            </Animated.View>
        )}

            <View style={{
                position:"absolute",
                backgroundColor:"white",
            }}>
                <TouchableOpacity>
                    <Ionicons name={"star-outline"} size={30} color={"black"} style={{
                      
                    }} />
                </TouchableOpacity>
            </View>
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
export default BuildingMapScreen;