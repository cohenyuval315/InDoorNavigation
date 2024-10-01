// trigonometry.ts

/**
 * Converts degrees to radians.
 * @param degrees Angle in degrees.
 * @returns Angle in radians.
 */
export function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees.
 * @param radians Angle in radians.
 * @returns Angle in degrees.
 */
export function toDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}

/**
 * Calculates the sine of an angle in radians.
 * @param radians Angle in radians.
 * @returns Sine of the angle.
 */
export function sin(radians: number): number {
    return Math.sin(radians);
}

/**
 * Calculates the cosine of an angle in radians.
 * @param radians Angle in radians.
 * @returns Cosine of the angle.
 */
export function cos(radians: number): number {
    return Math.cos(radians);
}

/**
 * Calculates the tangent of an angle in radians.
 * @param radians Angle in radians.
 * @returns Tangent of the angle.
 */
export function tan(radians: number): number {
    return Math.tan(radians);
}
