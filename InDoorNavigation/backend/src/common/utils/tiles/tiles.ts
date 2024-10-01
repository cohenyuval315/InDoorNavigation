import { createFolder, createPath } from "../fs";

// import xml2js from "xml2js"
// import sharp from 'sharp'

// {
//     "number": 1,
//     "svgXml": "<svg>...</svg>",
//     "overlays": [
//         {
//             "id": "poi1",
//             "x": 100,
//             "y": 200,
//             "width": 10,
//             "height": 10,
//             "color": "red"
//         }
//     ]
// }

export async function generateTiles(rootDir:string,floors:any[],tileSize:number) {
    for (const floor of floors) {
        const floorDir = createPath([rootDir,`floor_${floor.number}`]);
        await createFolder(floorDir);
        // await parseSvgAndGenerateTiles(floor.svgXml, floor.overlays, floorDir, tileSize);
    }
}


// async function parseSvgAndGenerateTiles(svgXml, overlays, outputDir, tileSize) {
//     const parser = new xml2js.Parser();
//     const builder = new xml2js.Builder();

//     parser.parseString(svgXml, async (err, result) => {
//         if (err) {
//             throw new Error('Error parsing SVG XML');
//         }

//         // Add overlays to the SVG data
//         for (const overlay of overlays) {
//             const overlayElement = {
//                 $: {
//                     id: overlay.id,
//                     points: overlay.points,
//                     fill: overlay.color,
//                 }
//             };
//             result.svg.g.push({ polygon: overlayElement }); // Assuming overlays are polygons, adjust as needed
//         }

//         const modifiedSvg = builder.buildObject(result);

//         // Save the modified SVG to a temporary file
//         const tempSvgPath = path.join(outputDir, 'temp.svg');
//         await fs.writeFile(tempSvgPath, modifiedSvg);

//         // Convert the SVG to a PNG using sharp
//         const pngBuffer = await sharp(tempSvgPath)
//             .png()
//             .toBuffer();

//         // Generate tiles from the PNG
//         await generateTilesFromPng(pngBuffer, outputDir, tileSize);

//         // Remove the temporary SVG file
//         await fs.remove(tempSvgPath);
//     });
// }
