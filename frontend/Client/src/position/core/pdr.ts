
// @ts-ignore
function PDR(position, stepLength, heading, heightChange) {
    // Convert heading to radians
    const azimuth = heading * Math.PI / 180;
  
    // Calculate new x and y based on the step length and heading
    const newX = position.x + stepLength * Math.cos(azimuth);
    const newY = position.y + stepLength * Math.sin(azimuth);
    const newZ = position.z + heightChange;

  
    return { 
      x: newX, 
      y: newY,
      z: newZ
    };
  }

