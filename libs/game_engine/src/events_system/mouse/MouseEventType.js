export var MouseEventType;
(function (MouseEventType) {
    MouseEventType[MouseEventType["L_PRESS"] = 0] = "L_PRESS";
    MouseEventType[MouseEventType["L_RELEASE"] = 1] = "L_RELEASE";
    MouseEventType[MouseEventType["R_PRESS"] = 2] = "R_PRESS";
    MouseEventType[MouseEventType["R_RELEASE"] = 3] = "R_RELEASE";
    MouseEventType[MouseEventType["WHEEL_UP"] = 4] = "WHEEL_UP";
    MouseEventType[MouseEventType["WHEEL_DOWN"] = 5] = "WHEEL_DOWN";
    MouseEventType[MouseEventType["MOVE"] = 6] = "MOVE";
    MouseEventType[MouseEventType["ENTER"] = 7] = "ENTER";
    MouseEventType[MouseEventType["LEAVE"] = 8] = "LEAVE";
    MouseEventType[MouseEventType["INVALID"] = 9] = "INVALID";
})(MouseEventType || (MouseEventType = {}));
