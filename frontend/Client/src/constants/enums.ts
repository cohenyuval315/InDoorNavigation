

export enum RoleType{
    ADMIN = "admin",
    BUILDING_ADMIN = "building_admin",
    BUILDING_MANAGER = "building_manager",
    EMPLOYEE = "employee",
    USER = "user",
}

export enum BuildingStatus{
    WAITING = "waiting",
    PENDING = "pending",
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    FAILED = "failed",
    SUSPENDED = "suspended",
}


export enum BuildingType {
    SCHOOL = "school",
    UNIVERSITY = "university",
    MALL = "mall",
    COLLEGE = "college",
    HOSPITAL = "hospital",
}

export enum WaypointPathType{
    ENTRANCE = "entrance",
    INTERSECT = "intersect",
    CORNER = "corner"
}
export enum SegmentPathType{ 
    TRAIL = "trail",
    ELEVATOR = "elevator",
    STAIRS = "stairs",
    ESCALATORS = "escalators",
}

export enum WaypointFacilityType{
    BATHROOM = "bathroom",
    ELEVATOR = "elevator",
    STAIRS = "stairs",
    ESCALATORS = "escalators",
    ROOM_ENTRANCE = "room_entrance",
    BUILDING_ENTRANCE = "building_entrance",
    EXIT = "exit",
    EMERGENCY_EXIT = "emergency_exit",
    FIRST_AID_ROOM = "first_aid_room",
    POI = "poi",
    NONE = "none",
}


export enum POIType{
    RESTAURANT = "restaurant",
    CLASS_ROOM = "class_room",
    PATIENT_ROOM = "patient_room",
    DOCTOR_ROOM = "doctor_room",
    YARD = "yard",
    BATHROOM = "bathroom",
    LAB = "lab",
    ROOM = "ROOM",
    ELEVATOR = "elevator",
    STAIRS = "stairs",
    ESCALATORS = "escalators",
    ROOM_ENTRANCE = "room_entrance",
    BUILDING_ENTRANCE = "building_entrance",
    EXIT = "exit",
    EMERGENCY_EXIT = "emergency_exit",    
    INFORMATION_DESK = "information_desk",
    UNKNOWN = "unknown",
    VENDING_MACHINE = "vending_machine",
    SMOKING_AREA = "smoking_area",
    CAFETERIA ="cafeteria",
}

export enum AccessibilityType{
    IS_STAIRS = "is_stairs",
    IS_STAIRS_UP = "is_stairs_up",
    IS_STAIRS_DOWN = "is_stairs_down",
    IS_ELEVATOR = "is_elevator",
    IS_ESCALATOR = "is_escalator",
    IS_OUTDOOR = "is_outdoor",
    IS_EMPLOYEE = "is_employee",
}


export enum Direction{
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right",
    UP_LEFT = "up_left",
    UP_RIGHT = "up_right",
    DOWN_LEFT = "down_left",
    DOWN_RIGHT = "down_right",
}

export enum CardinalDirection{
    NORTH = "north",
    NORTH_EAST = "north_east",
    EAST = "east",
    SOUTH_EAST = "south_east",
    SOUTH = "south",
    SOUTH_WEST = "south_west",
    WEST = "west",
    NORTH_WEST = "north_west",
}

export enum DeviceMovementStateType{
    STATIC = "static",
    FREE = "free",
    DYNAMIC = "dynamic",
}

export enum MovementType{
    WALK = "walk",
    RUN = "run",
    SPRINT = "sprint",
    FREE = "free",
}

export enum DeviceOrientationType{
    FACE_UP = "Face Up",
    FACE_UP_TILTED_TOWARDS = "Face Up Tilted Towards Viewer",
    FACE_UP_TILTED_TOWARDS_TILTED_RIGHT = "Face Up Tilted Towards Viewer Tilted Right",
    FACE_UP_TILTED_TOWARDS_TILTED_LEFT = "Face Up Tilted Towards Viewer Tilted Left",
    FACE_UP_TILTED_AWAY = "Face Up Tilted Away from Viewer",
    FACE_UP_TILTED_AWAY_TILTED_RIGHT = "Face Up Tilted Away from Viewer Tilted Right",
    FACE_UP_TILTED_AWAY_TILTED_LEFT = "Face Up Tilted Away from Viewer Tilted Left",
    FACE_LEFT = "Face Left",
    FACE_LEFT_TILTED_UP = "Face Left Tilted Up",
    FACE_LEFT_TILTED_DOWN = "Face Left Tilted Down",
    FACE_RIGHT = "Face Right",
    FACE_RIGHT_TILTED_UP = "Face Right Tilted Up",
    FACE_RIGHT_TILTED_DOWN = "Face Right Tilted Down",
    FACE_DOWN = "Face Down",
    FACE_DOWN_TILTED_LEFT = "Face Down Tilted Left",
    FACE_DOWN_TILTED_RIGHT = "Face Down Tilted Right"  
}

