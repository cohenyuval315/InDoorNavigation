import { SegmentPathType } from "@/common/constants/constants";


export interface MapEdge {
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
