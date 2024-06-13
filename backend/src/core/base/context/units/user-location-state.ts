import { Direction } from "../../../../constants/constants"

class UserLocationState {
    isNavigating:boolean= false
    destination:string | null
    path: []
    x:number
    y:number
    floor:number
    direction: Direction
    longtitude: number | null
    langtitude: number | null
}

export default UserLocationState;