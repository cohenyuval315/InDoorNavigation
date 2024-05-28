import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';


const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const BuildingPOIPolygon = ({POI,rotationRef,onPOIPress}) => {
  const polygonPoints = POI.mapArea;
  const calculateBoundingBox = () => {
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    polygonPoints.forEach((point) => {
      minX = Math.min(minX, point.x);
      minY = Math.min(minY, point.y);
      maxX = Math.max(maxX, point.x);
      maxY = Math.max(maxY, point.y);
    });

    return { minX, minY, maxX, maxY };
  };
  const getPolygonPathData = () => {
    let pathData = '';

    polygonPoints.forEach((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      pathData += `${command}${point.x},${point.y} `;
    });

    pathData += 'Z'; // Close the path

    return pathData;
  };

  const { minX, minY, maxX, maxY } = calculateBoundingBox();
  const center = {
    x: (maxX + minX) / 2,
    y: (maxY + minY) / 2,
  }


    return (
      <View style={{ 
          position:"absolute",
          left:center.x,
          top:center.y
        }}>
          <View style={{
            // backgroundColor:"black"
          }}>
            <Text style={{
              color:"black"
            }}>
              {POI.details.title}
            </Text>
          </View>
    </View>
    )
  }
export default BuildingPOIPolygon