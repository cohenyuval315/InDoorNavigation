import { CardinalDirection, Direction, MovementType } from "../constants/constants";

class UserState {
    private static instance:UserState;

    private deviceHeading:{
        cardinalDirection:CardinalDirection,
        direction:Direction
    }
    private userHeading:{
        cardinalDirection:CardinalDirection,
        direction:Direction
    };
    private movementType:MovementType;
    private speed:number;

    private position: { 
        x: number, 
        y: number 
    };

    constructor(){
        if(!UserState.instance){
            UserState.instance = new UserState();
        }
        return UserState.instance;
    }

    public static getInstance(): UserState {
        return new UserState();
    }

    public setPosition(x: number, y: number): void {
        this.position.x = x;
        this.position.y = y;
    }

    public getPosition(): { x: number, y: number } {
        return this.position;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(speed:number): void {
        this.speed = speed;
    }

    public getMovementType(): MovementType {
        return this.movementType;
    }

    public setMovementType(movementType:MovementType): void {
        this.movementType = movementType;
    }

    public getUserHeading(): {
        cardinalDirection:CardinalDirection;
        direction:Direction
    } {
        return this.userHeading;
    }

    public setUserHeading(
        cardinalDirection:CardinalDirection = null,
        direction:Direction = null
    ): void {
        const updatedUserHeading = {}
        if (cardinalDirection){
            updatedUserHeading['cardinalDirection'] = cardinalDirection;
        }
        if (direction){
            updatedUserHeading['direction'] = direction;
        }
        this.userHeading = {
            ...this.userHeading,
            ...updatedUserHeading
        }
    }

    public getDeviceHeading(): {
        cardinalDirection:CardinalDirection;
        direction:Direction
    } {
        return this.deviceHeading;
    }

    public setDeviceHeading(
        cardinalDirection:CardinalDirection = null,
        direction:Direction = null
    ): void {
        const updatedDeviceHeading = {}
        if (cardinalDirection){
            updatedDeviceHeading['cardinalDirection'] = cardinalDirection;
        }
        if (direction){
            updatedDeviceHeading['direction'] = direction;
        }
        this.deviceHeading = {
            ...this.deviceHeading,
            ...updatedDeviceHeading
        }
    }
}

const userState = new UserState();
export default userState;