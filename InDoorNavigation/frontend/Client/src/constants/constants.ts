import { Direction } from "./enums";

export const GRAVITY = {
    x:0,
    y:0,
    z:9.81
};
export const EPSILON = 0.000001;
export const NS2S = 1.0 / 1000000000.0;

export const directionAngles = {
    [Direction.DOWN]: 180,
    [Direction.UP]: 0,
    [Direction.LEFT]: -90,
    [Direction.RIGHT]: 90,
    [Direction.UP_LEFT]: -45,
    [Direction.UP_RIGHT]: 45,
    [Direction.DOWN_LEFT]: -135,
    [Direction.DOWN_RIGHT]: 135,
};