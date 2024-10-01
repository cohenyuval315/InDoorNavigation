// matrices.ts

/**
 * Represents a matrix as a 2D array of numbers.
 */
export type Matrix = number[][];

/**
 * Creates a matrix from a 2D array of data.
 * @param data 2D array of numeric data.
 * @returns Matrix created from the data.
 */
export function createMatrix(data: number[][]): Matrix {
    return data.map(row => row.slice()); // Create a shallow copy
}

/**
 * Adds two matrices element-wise.
 * @param m1 First matrix.
 * @param m2 Second matrix.
 * @returns Resultant matrix of element-wise addition.
 * @throws Error if matrices have different dimensions.
 */
export function addMatrices(m1: Matrix, m2: Matrix): Matrix {
    if (m1.length !== m2.length || m1[0].length !== m2[0].length) {
        throw new Error('Matrices must have the same dimensions for element-wise addition.');
    }
    return m1.map((row, i) => row.map((val, j) => val + m2[i][j]));
}

/**
 * Subtracts one matrix from another element-wise.
 * @param m1 First matrix (minuend).
 * @param m2 Second matrix (subtrahend).
 * @returns Resultant matrix of element-wise subtraction.
 * @throws Error if matrices have different dimensions.
 */
export function subtractMatrices(m1: Matrix, m2: Matrix): Matrix {
    if (m1.length !== m2.length || m1[0].length !== m2[0].length) {
        throw new Error('Matrices must have the same dimensions for element-wise subtraction.');
    }
    return m1.map((row, i) => row.map((val, j) => val - m2[i][j]));
}

/**
 * Multiplies two matrices.
 * @param m1 First matrix.
 * @param m2 Second matrix.
 * @returns Resultant matrix of matrix multiplication.
 * @throws Error if matrices are not conformable for multiplication.
 */
export function multiplyMatrices(m1: Matrix, m2: Matrix): Matrix {
    if (m1[0].length !== m2.length) {
        throw new Error('Matrices are not conformable for multiplication.');
    }
    return m1.map((row1, i) => m2[0].map((_, j) =>
        row1.reduce((sum, cell1, k) => sum + cell1 * m2[k][j], 0)
    ));
}

/**
 * Scales a matrix by a scalar value.
 * @param m Matrix to scale.
 * @param scalar Scalar value.
 * @returns Scaled matrix.
 */
export function scaleMatrix(m: Matrix, scalar: number): Matrix {
    return m.map(row => row.map(val => val * scalar));
}

/**
 * Transposes a matrix.
 * @param m Matrix to transpose.
 * @returns Transposed matrix.
 */
export function transposeMatrix(m: Matrix): Matrix {
    return m[0].map((_, colIndex) => m.map(row => row[colIndex]));
}

/**
 * Computes the inverse of a matrix.
 * @param m Matrix.
 * @returns Inverse of the matrix.
 * @throws Error if the matrix is not invertible.
 */
export function matrixInverse(m: Matrix): Matrix {
    const det = matrixDeterminant(m);
    if (det === 0) {
        throw new Error('Matrix is not invertible.');
    }
    const n = m.length;
    const adjugate = new Array(n).fill(null).map(() => new Array(n).fill(null));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const minor = getMatrixMinor(m, i, j);
            adjugate[j][i] = Math.pow(-1, i + j) * matrixDeterminant(minor);
        }
    }
    const scalar = 1 / det;
    return adjugate.map(row => row.map(val => val * scalar));
}

/**
 * Computes the determinant of a matrix.
 * @param m Matrix.
 * @returns Determinant of the matrix.
 * @throws Error if the matrix is not square.
 */
export function matrixDeterminant(m: Matrix): number {
    if (m.length !== m[0].length) {
        throw new Error('Matrix must be square to compute determinant.');
    }
    const n = m.length;
    if (n === 1) {
        return m[0][0];
    }
    if (n === 2) {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];
    }
    let determinant = 0;
    for (let j = 0; j < n; j++) {
        determinant += Math.pow(-1, j) * m[0][j] * matrixDeterminant(getMatrixMinor(m, 0, j));
    }
    return determinant;
}

/**
 * Gets the minor of a matrix with a specified row and column removed.
 * @param m Matrix.
 * @param rowToRemove Row index to remove.
 * @param colToRemove Column index to remove.
 * @returns Minor of the matrix.
 */
function getMatrixMinor(m: Matrix, rowToRemove: number, colToRemove: number): Matrix {
    return m.filter((_, i) => i !== rowToRemove)
           .map(row => row.filter((_, j) => j !== colToRemove));
}


/**
 * Checks if a matrix is symmetric.
 * @param m Matrix.
 * @returns True if the matrix is symmetric, false otherwise.
 * @throws Error if the matrix is not square.
 */
export function isMatrixSymmetric(m: Matrix): boolean {
    if (m.length !== m[0].length) {
        throw new Error('Matrix must be square to check symmetry.');
    }
    const n = m.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (m[i][j] !== m[j][i]) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Computes the trace (sum of diagonal elements) of a matrix.
 * @param m Matrix.
 * @returns Trace of the matrix.
 * @throws Error if the matrix is not square.
 */
export function matrixTrace(m: Matrix): number {
    if (m.length !== m[0].length) {
        throw new Error('Matrix must be square to compute trace.');
    }
    return m.reduce((sum, row, i) => sum + row[i], 0);
}
