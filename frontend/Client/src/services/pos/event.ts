


interface PositionData { 
    userId:string,
    buildingId:string,
    prevState:PositionData,
}



enum InDoorNavigationEvent {
    LOCALIZATION = "LOCALIZATION",
    REROUTE = "REROUTE",
    INIT = "INIT",
}

interface InDoorNavigationWebSocketEvent {
    type:InDoorNavigationEvent,
    payload: PositionData
}


