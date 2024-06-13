import { SegmentPathType } from "../../constants/constants";

interface MapEdge {
    id: string;
    title: string;
    nodeA: string;
    nodeB: string;
    pathType: SegmentPathType;
    isAvailable: boolean;
    visualMapArea: string | null;
    availableHeadings: string[] | null;
    weight: number | null;
}
export default MapEdge;