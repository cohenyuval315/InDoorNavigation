import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const RouteSVG = ({ width, height, routeCoordinates, boxSize }) => {
  // Calculate box half size for centering
  const halfBoxSize = boxSize / 2;

  // Define the path data
  const routePath = routeCoordinates.map((coord, index) => {
    const [x, y] = coord;
    if (index === 0) {
      // Move to the first coordinate
      return `M ${x} ${y}`;
    } else {
      // Draw a line to subsequent coordinates
      return `L ${x} ${y}`;
    }
  }).join(' ');

  // Render the SVG
  return (
    <View>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Draw the route path */}
        <Path d={routePath} stroke="red" strokeWidth={2} fill="none" />

        {/* Draw the boxes */}
        {routeCoordinates.map((coord, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              left: coord[0] - halfBoxSize,
              top: coord[1] - halfBoxSize,
              width: boxSize,
              height: boxSize,
              backgroundColor: 'purple',
              borderRadius: boxSize / 2,
            }}
          />
        ))}
      </Svg>
    </View>
  );
};

export default RouteSVG;
