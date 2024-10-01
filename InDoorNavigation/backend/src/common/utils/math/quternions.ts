
/**
 * Represents a quaternion with components w, x, y, and z.
 */
export class Quaternion {
    constructor(public w: number, public x: number, public y: number, public z: number) {}

    /**
     * Computes the norm (magnitude) of the quaternion.
     * @returns Norm of the quaternion.
     */
    norm(): number {
        return Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
    }

    /**
     * Computes the conjugate of the quaternion.
     * @returns Conjugate of the quaternion.
     */
    conjugate(): Quaternion {
        return new Quaternion(this.w, -this.x, -this.y, -this.z);
    }

    /**
     * Computes the inverse of the quaternion.
     * @returns Inverse of the quaternion.
     * @throws Error if the quaternion has zero norm.
     */
    inverse(): Quaternion {
        const normSq = this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z;
        if (normSq === 0) {
            throw new Error('Quaternion has zero norm, cannot compute inverse.');
        }
        const conjugate = this.conjugate();
        const scalar = 1 / normSq;
        return new Quaternion(conjugate.w * scalar, conjugate.x * scalar, conjugate.y * scalar, conjugate.z * scalar);
    }

    /**
     * Multiplies two quaternions.
     * @param q Quaternion to multiply with.
     * @returns Resultant quaternion of multiplication.
     */
    multiply(q: Quaternion): Quaternion {
        const w = this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z;
        const x = this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y;
        const y = this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x;
        const z = this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w;
        return new Quaternion(w, x, y, z);
    }

    /**
     * Rotates a vector using this quaternion.
     * @param v Vector to rotate (as a quaternion with w=0).
     * @returns Rotated vector as a quaternion.
     */
    rotateVector(v: Quaternion): Quaternion {
        const p = new Quaternion(0, v.x, v.y, v.z);
        const conjugate = this.conjugate();
        const q1 = this.multiply(p).multiply(conjugate);
        return new Quaternion(0, q1.x, q1.y, q1.z);
    }

    /**
     * Creates a quaternion representing rotation around an axis.
     * @param axis Axis of rotation (unit vector).
     * @param angle Angle of rotation in radians.
     * @returns Quaternion representing the rotation.
     */
    static fromAxisAngle(axis: Quaternion, angle: number): Quaternion {
        const halfAngle = angle / 2;
        const sinHalfAngle = Math.sin(halfAngle);
        return new Quaternion(Math.cos(halfAngle), axis.x * sinHalfAngle, axis.y * sinHalfAngle, axis.z * sinHalfAngle);
    }
}

// Additional operations can be added as needed
