import { Text, View } from "react-native";
import MapOverlay from "../../../../../layouts/map-overlay";
import { useSelector } from "react-redux";
import { selectEdges, selectNodes } from "../../../../../app/admin/admin-slice";
import { SvgXml } from "react-native-svg";
import { selectMapsDims, selectMinFloor } from "../../../../../app/map/map-slice";


export const generateRouteSvgString = (height,width,nodes, edges, floor) => {
    let svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" version="1.1">`;
    const nodesOnFloor = nodes.map((node,index) => {
        const nodeWithIndex = {
            ...node,
            index:index,
        }
        return nodeWithIndex
    }).filter(node => node.mapCoordinates.floor === floor);

    edges.forEach(edge => {
        const sourceNode = nodes.find(node => node.id === edge.nodeA);
        const targetNode = nodes.find(node => node.id === edge.nodeB);
        if (sourceNode && targetNode) {
          const sourceCoordinates = sourceNode.mapCoordinates;
          const targetCoordinates = targetNode.mapCoordinates;
          svgString += `<line x1="${sourceCoordinates.x}" y1="${sourceCoordinates.y}" x2="${targetCoordinates.x}" y2="${targetCoordinates.y}" stroke="black"  stroke-opacity="0.5"/>`;
        }
    });    
    nodesOnFloor.forEach((node) => {
        const { x, y } = node.mapCoordinates;
        const circleOpacity = 0.7; // Adjust opacity as needed
        svgString += `<circle cx="${x}" cy="${y}" r="10" fill="blue" fill-opacity="${circleOpacity}" />
                       <text x="${x}" y="${y + 5}" font-size="10" text-anchor="middle" fill="white" fill-opacity="${circleOpacity}">${node.index + 1}</text>`;
      });
      
    edges.forEach(edge => {
        const nodeA = nodes.find(node => node.id === edge.nodeA && node.mapCoordinates.floor !== floor);
        if (nodeA){
            const sourceCoordinates = nodeA.mapCoordinates;
            const targetNode = nodes.find(node => node.id === edge.nodeB);
            if (targetNode) {
                const targetCoordinates = targetNode.mapCoordinates;
                svgString += `<line x1="${sourceCoordinates.x}" y1="${sourceCoordinates.y}" x2="${targetCoordinates.x}" y2="${targetCoordinates.y}" stroke="red"  stroke-opacity="0.5" />`;
            }
        }
    });    
    edges.forEach(edge => {
        const nodeB = nodes.find(node => node.id === edge.nodeB && node.mapCoordinates.floor !== floor);
        if (nodeB){
            const targetCoordinates = nodeB.mapCoordinates;
            const sourceNode = nodes.find(node => node.id === edge.nodeA);
            if (sourceNode) {
                const sourceCoordinates = sourceNode.mapCoordinates;
                svgString += `<line x1="${sourceCoordinates.x}" y1="${sourceCoordinates.y}" x2="${targetCoordinates.x}" y2="${targetCoordinates.y}" stroke="red"  stroke-opacity="0.5" />`;
            }
        }
    });  
    svgString += '</svg>'; // Closing SVG tag
    return svgString;       
}

const ActiveRouteOverlay = ({route,floorIndex}) => {
    const mapsDims = useSelector(selectMapsDims)
    const nodes = useSelector(selectNodes);
    const edges = useSelector(selectEdges);
    const minFloor = useSelector(selectMinFloor);

    
    const length = route.length;
    let start = "s";
    let target = "t";
    if (length == 0){
        start = "st";
        target = "st";
    }
    if (route.length === 0){
        return null;
    }
    const svgString = generateRouteSvgString(mapsDims.height,mapsDims.width,route,edges,floorIndex + minFloor)
    return (
        <MapOverlay >
            <SvgXml
                xml={svgString}
            />
        </MapOverlay>
    )
}
export default ActiveRouteOverlay;