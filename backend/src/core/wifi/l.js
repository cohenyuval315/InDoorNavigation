// Helper functions defined earlier
function filterRSSByThreshold(rssArray, threshold) {
    return rssArray.filter(rss => rss >= threshold);
}

function linearInterpolation(rss1, rss2, n, i) {
    return ((n - i) / n) * rss1 + (i / n) * rss2;
}

function adaptiveInterpolation(rssArray, f1, f2) {
    const n = Math.floor(f1 / f2);
    let interpolatedRSS = [];
    for (let i = 0; i < rssArray.length - 1; i++) {
        for (let j = 0; j < n; j++) {
            interpolatedRSS.push(linearInterpolation(rssArray[i], rssArray[i + 1], n, j));
        }
    }
    interpolatedRSS.push(rssArray[rssArray.length - 1]); // Include the last original RSS
    return interpolatedRSS;
}

function normalize(array) {
    const mean = array.reduce((acc, val) => acc + val, 0) / array.length;
    const stdDev = Math.sqrt(array.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / array.length);
    return array.map(val => (val - mean) / stdDev);
}

function calculateWeights(rssArray) {
    const maxRSS = Math.max(...rssArray);
    return rssArray.map(rss => {
        const weight = Math.exp(rss / maxRSS); // Example weight function
        return weight;
    });
}

function computeWeightedDistance(rss, rssdb, weights) {
    const p = rss.length;
    let distance = 0;
    for (let k = 0; k < p; k++) {
        distance += weights[k] * Math.pow(rss[k] - rssdb[k], 2);
    }
    return distance;
}

function MDTWWithWLS(rss, rssdb, weights) {
    const n = rss.length;
    const m = rssdb.length;
    let d = Array.from({ length: n }, () => Array(m).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            d[i][j] = computeWeightedDistance(rss[i], rssdb[j], weights);
        }
    }

    let D = Array.from({ length: n }, () => Array(m).fill(0));
    D[0][0] = d[0][0];

    for (let i = 1; i < n; i++) {
        D[i][0] = d[i][0] + D[i - 1][0];
    }

    for (let j = 1; j < m; j++) {
        D[0][j] = d[0][j] + D[0][j - 1];
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            D[i][j] = d[i][j] + Math.min(D[i - 1][j], D[i][j - 1], D[i - 1][j - 1]);
        }
    }

    return D[n - 1][m - 1];
}

// New function to compute WLS for position estimation
function weightedLeastSquares(positions, distances, sigma) {
    const weights = distances.map(di => 1 / Math.exp(di * di / (2 * sigma * sigma)));
    const totalWeight = weights.reduce((acc, w) => acc + w, 0);

    const normalizedWeights = weights.map(w => w / totalWeight);

    let estimatedX = 0;
    let estimatedY = 0;
    positions.forEach((pos, i) => {
        estimatedX += normalizedWeights[i] * pos.x;
        estimatedY += normalizedWeights[i] * pos.y;
    });

    return { x: estimatedX, y: estimatedY };
}

// Function to match user input with database fingerprints
function matchFingerprints(userInput, databaseFingerprints) {
    let matchedRSS = [];
    let matchedDBRSS = [];

    userInput.forEach(userNetwork => {
        const dbNetwork = databaseFingerprints.find(dbNetwork => dbNetwork.ssid === userNetwork.ssid);
        if (dbNetwork) {
            matchedRSS.push(userNetwork.rss);
            matchedDBRSS.push(dbNetwork.rss);
        }
    });

    return { matchedRSS, matchedDBRSS };
}

// Function to estimate user position based on WLS
function estimatePosition(userInput, databaseFingerprints, threshold, f1, f2, sigma, r) {
    const { matchedRSS, matchedDBRSS } = matchFingerprints(userInput, databaseFingerprints);

    const filteredRSS = matchedRSS.map(rssArray => filterRSSByThreshold(rssArray, threshold));

    const interpolatedRSS = filteredRSS.map(rssArray => adaptiveInterpolation(rssArray, f1, f2));

    const normalizedRSS = interpolatedRSS.map(normalize);
    const normalizedDBRSS = matchedDBRSS.map(normalize);

    const weights = calculateWeights(interpolatedRSS.flat());

    const distances = normalizedRSS.map((rss, i) => MDTWWithWLS(rss, normalizedDBRSS[i], weights));

    const sortedDistances = distances
        .map((d, i) => ({ distance: d, position: { x: databaseFingerprints[i].x, y: databaseFingerprints[i].y } }))
        .sort((a, b) => a.distance - b.distance);

    const topR = sortedDistances.slice(0, r);

    const positions = topR.map(item => item.position);
    const distanceValues = topR.map(item => item.distance);

    const estimatedPosition = weightedLeastSquares(positions, distanceValues, sigma);

    return estimatedPosition;
}

// Example database fingerprints with positions
const databaseFingerprints = [
    {
        ssid: "network1",
        rss: [-78, -82, -85, -88, -74],
        x: 5,
        y: 10
    },
    {
        ssid: "network2",
        rss: [-61, -63, -60, -55, -52],
        x: 15,
        y: 20
    }
];

// Example user input
const userInput = [
    {
        ssid: "network1",
        rss: [-80, -75, -90, -60, -50]
    },
    {
        ssid: "network2",
        rss: [-62, -65, -67, -70, -69]
    }
];

// Parameters for position estimation
const threshold = -70;
const f1 = 0.5; // Target sampling frequency
const f2 = 0.125; // Original sampling frequency
const sigma = 1; // Configuration parameter for exponential function
const r = 2; // Number of top positions to consider

const estimatedPosition = estimatePosition(userInput, databaseFingerprints, threshold, f1, f2, sigma, r);

console.log("Estimated Position:", estimatedPosition);
