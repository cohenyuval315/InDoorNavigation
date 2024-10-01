// vectors.ts

/**
 * Represents a vector as an array of numbers.
 */
export type Vector = number[];

/**
 * Creates a vector from an array of values.
 * @param values Array of values.
 * @returns Vector created from the values.
 */
export function createVector(values: number[]): Vector {
    return values.slice(); // Create a shallow copy
}

/**
 * Adds two vectors element-wise.
 * @param v1 First vector.
 * @param v2 Second vector.
 * @returns Resultant vector of element-wise addition.
 * @throws Error if vectors have different lengths.
 */
export function addVectors(v1: Vector, v2: Vector): Vector {
    if (v1.length !== v2.length) {
        throw new Error('Vectors must have the same length for element-wise addition.');
    }
    return v1.map((val, index) => val + v2[index]);
}

/**
 * Subtracts one vector from another element-wise.
 * @param v1 First vector (minuend).
 * @param v2 Second vector (subtrahend).
 * @returns Resultant vector of element-wise subtraction.
 * @throws Error if vectors have different lengths.
 */
export function subtractVectors(v1: Vector, v2: Vector): Vector {
    if (v1.length !== v2.length) {
        throw new Error('Vectors must have the same length for element-wise subtraction.');
    }
    return v1.map((val, index) => val - v2[index]);
}

/**
 * Scales a vector by a scalar value.
 * @param v Vector to scale.
 * @param scalar Scalar value.
 * @returns Scaled vector.
 */
export function scaleVector(v: Vector, scalar: number): Vector {
    return v.map(val => val * scalar);
}

/**
 * Computes the dot product of two vectors.
 * @param v1 First vector.
 * @param v2 Second vector.
 * @returns Dot product of the two vectors.
 * @throws Error if vectors have different lengths.
 */
export function dotProduct(v1: Vector, v2: Vector): number {
    if (v1.length !== v2.length) {
        throw new Error('Vectors must have the same length for dot product.');
    }
    return v1.reduce((sum, val, index) => sum + val * v2[index], 0);
}

/**
 * Computes the norm (magnitude) of a vector.
 * @param v Vector.
 * @returns Norm of the vector.
 */
export function vectorNorm(v: Vector): number {
    return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
}



/**
 * Computes the cross product of two 3-dimensional vectors.
 * @param v1 First vector.
 * @param v2 Second vector.
 * @returns Cross product vector.
 * @throws Error if vectors are not 3-dimensional.
 */
export function crossProduct(v1: Vector, v2: Vector): Vector {
    if (v1.length !== 3 || v2.length !== 3) {
        throw new Error('Cross product is only defined for 3-dimensional vectors.');
    }
    const [x1, y1, z1] = v1;
    const [x2, y2, z2] = v2;
    return [y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2];
}

/**
 * Computes the angle (in radians) between two vectors.
 * @param v1 First vector.
 * @param v2 Second vector.
 * @returns Angle between the vectors in radians.
 * @throws Error if vectors are not of the same length or if their norm is zero.
 */
export function vectorAngle(v1: Vector, v2: Vector): number {
    if (v1.length !== v2.length) {
        throw new Error('Vectors must have the same length to compute angle.');
    }
    const dotProd = dotProduct(v1, v2);
    const norm1 = vectorNorm(v1);
    const norm2 = vectorNorm(v2);
    if (norm1 === 0 || norm2 === 0) {
        throw new Error('Vectors cannot have zero norm to compute angle.');
    }
    return Math.acos(dotProd / (norm1 * norm2));
}

