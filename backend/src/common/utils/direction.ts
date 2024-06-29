import { Direction } from "@/common/enums/Direction";
import { MapCoordinates } from "@/common/interfaces/MapCoordinates";

export function calculateDirection(from: MapCoordinates, to: MapCoordinates): Direction {
    const deltaX = to.x - from.x;
    const deltaY = to.y - from.y;

    if (deltaY > 0) {
        if (deltaX > 0) return Direction.UP_RIGHT;
        else if (deltaX < 0) return Direction.UP_LEFT;
        else return Direction.UP;
    } else if (deltaY < 0) {
        if (deltaX > 0) return Direction.DOWN_RIGHT;
        else if (deltaX < 0) return Direction.DOWN_LEFT;
        else return Direction.DOWN;
    } else {
        if (deltaX > 0) return Direction.RIGHT;
        else if (deltaX < 0) return Direction.LEFT;
    }
    return null;
}
