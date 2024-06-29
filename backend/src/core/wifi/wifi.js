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

function computeDistance(rss, rssdb) {
    const p = rss.length;
    let distance = 0;
    for (let k = 0; k < p; k++) {
        distance += Math.pow(rss[k] - rssdb[k], 2);
    }
    return distance;
}

function MDTW(rss, rssdb) {
    const n = rss.length;
    const m = rssdb.length;
    let d = Array.from({ length: n }, () => Array(m).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            d[i][j] = computeDistance(rss[i], rssdb[j]);
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
