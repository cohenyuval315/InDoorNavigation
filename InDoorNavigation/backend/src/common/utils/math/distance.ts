
export function euclideanDistance(point1:number[], point2:number[]) {
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    return Math.sqrt(dx * dx + dy * dy);
}


export function minkowskiDistance(point1:number[], point2:number[], p:number) {
    if (point1.length !== point2.length) {
        throw new Error("Points must be of the same dimension");
    }
    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
        sum += Math.pow(Math.abs(point2[i] - point1[i]), p);
    }
    return Math.pow(sum, 1/p);
}

export function manhattanDistance(point1:number[], point2:number[]) {
    const dx = Math.abs(point2[0] - point1[0]);
    const dy = Math.abs(point2[1] - point1[1]);
    return dx + dy;
}


export function cosineDistance(vector1:number[], vector2:number[]) {
    const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
    const norm1 = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
    const norm2 = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));
    const cosineSimilarity = dotProduct / (norm1 * norm2);
    return 1 - cosineSimilarity;
}


export function jaccardDistance(set1:number[], set2:number[]) {
    const intersection = new Set(set1.filter(element => set2.includes(element)));
    const union = new Set([...set1, ...set2]);
    const jaccardSimilarity = intersection.size / union.size;
    return 1 - jaccardSimilarity;
}


export function hammingDistance(str1:number[], str2:number[]) {
    if (str1.length !== str2.length) {
        throw new Error("Strings must be of the same length");
    }
    let distance = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            distance++;
        }
    }
    return distance;
}


export function euclideanDistance3D(point1:number[], point2:number[]) {
    // Assuming points are arrays with [x, y, z] coordinates
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    const dz = point2[2] - point1[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}


export function manhattanDistance3D(point1:number[], point2:number[]) {
    // Assuming points are arrays with [x, y, z] coordinates
    const dx = Math.abs(point2[0] - point1[0]);
    const dy = Math.abs(point2[1] - point1[1]);
    const dz = Math.abs(point2[2] - point1[2]);
    return dx + dy + dz;
}

export function cosineDistance3D(vector1:number[], vector2:number[]) {
    // Assuming vectors are arrays of numeric values [x, y, z]
    const dotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2];
    const norm1 = Math.sqrt(vector1[0] * vector1[0] + vector1[1] * vector1[1] + vector1[2] * vector1[2]);
    const norm2 = Math.sqrt(vector2[0] * vector2[0] + vector2[1] * vector2[1] + vector2[2] * vector2[2]);
    const cosineSimilarity = dotProduct / (norm1 * norm2);
    return 1 - cosineSimilarity;
}

export function jaccardDistance3D(set1:any, set2:any) {
    // Assuming sets are arrays of arrays with [x, y, z] coordinates
    const set1Set = new Set(set1.map(point => point.join(',')));
    const set2Set = new Set(set2.map(point => point.join(',')));

    const intersectionSize = [...set1Set].filter(point => set2Set.has(point)).length;
    const unionSize = set1Set.size + set2Set.size - intersectionSize;

    const jaccardSimilarity = intersectionSize / unionSize;
    return 1 - jaccardSimilarity;
}

export function hammingDistance3D(point1:number[], point2:number[]) {
    if (point1.length !== point2.length) {
        throw new Error("Points must be of the same dimension");
    }
    let distance = 0;
    for (let i = 0; i < point1.length; i++) {
        if (point1[i] !== point2[i]) {
            distance++;
        }
    }
    return distance;
}

export function minkowskiDistance3D(point1:number[], point2:number[], p:number) {
    if (point1.length !== point2.length) {
        throw new Error("Points must be of the same dimension");
    }
    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
        sum += Math.pow(Math.abs(point2[i] - point1[i]), p);
    }
    return Math.pow(sum, 1/p);
}
