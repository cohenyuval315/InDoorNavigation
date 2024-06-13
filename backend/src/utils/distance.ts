import { Direction } from "../constants/constants";

export function euclideanDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}


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
    throw new Error('No movement detected');
}
