/**
 * Calculates the heading direction in degrees from an orientation vector (x, y).
 * @param x The x component of the orientation vector.
 * @param y The y component of the orientation vector.
 * @returns The heading direction in degrees (range: 0 to 360).
 */
function calculateHeading(x: number, y: number): number {
    // Calculate heading angle in radians
    const headingRadians = Math.atan2(y, x);

    // Convert radians to degrees
    let headingDegrees = headingRadians * (180 / Math.PI);

    // Ensure heading is within 0 to 360 degrees
    if (headingDegrees < 0) {
        headingDegrees += 360;
    }

    return headingDegrees;
}



/**
 * Calculates the heading direction in degrees from an orientation vector (x, y) with an offset from north.
 * @param x The x component of the orientation vector.
 * @param y The y component of the orientation vector.
 * @param offsetFromNorth The angle in degrees offset from the north direction (positive y-axis).
 * @returns The heading direction in degrees (range: 0 to 360).
 */
function calculateHeadingWithNorthOffset(x: number, y: number, offsetFromNorth: number): number {
    // Calculate the angle from the positive y-axis to the orientation vector
    let headingDegrees = Math.atan2(x, y) * (180 / Math.PI);

    // Adjust for offset from north
    headingDegrees += offsetFromNorth;

    // Ensure heading is within 0 to 360 degrees
    if (headingDegrees < 0) {
        headingDegrees += 360;
    } else if (headingDegrees >= 360) {
        headingDegrees -= 360;
    }

    return headingDegrees;
}
