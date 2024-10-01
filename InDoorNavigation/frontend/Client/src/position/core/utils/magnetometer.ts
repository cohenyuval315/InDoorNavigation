function getHeadingFromMagnetometer(x:number, y:number) {
    // Calculate the heading in radians
    let headingRadians = Math.atan2(y, x);

    // Convert the heading to degrees
    let headingDegrees = headingRadians * (180 / Math.PI);

    // Normalize the heading to a range of 0 to 360 degrees
    if (headingDegrees < 0) {
        headingDegrees += 360;
    }

    return headingDegrees;
}

function getNormalizedHeadingFromMagnetometer2(x:number, y:number) {
    // Calculate the heading in radians
    let headingRadians = Math.atan2(y, x);

    // Convert the heading to degrees
    let headingDegrees = headingRadians * (180 / Math.PI);

    // Normalize the heading to a range of 0 to 360 degrees
    if (headingDegrees < 0) {
        headingDegrees += 360;
    }

    // Normalize the heading to a range of 0 to 1
    let normalizedHeading = headingDegrees / 360;

    return normalizedHeading;
}