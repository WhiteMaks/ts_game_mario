import { MouseEventType } from "./MouseEventType";
/**
 * Класс для описания событий мышки
 */
export class MouseEvent {
    constructor(type, leftKeyIsPressed, rightKeyIsPressed, positionX, positionY) {
        this.type = type;
        this.leftKeyIsPressed = leftKeyIsPressed;
        this.rightKeyIsPressed = rightKeyIsPressed;
        this.positionX = positionX;
        this.positionY = positionY;
    }
    isValid() {
        return this.type !== MouseEventType.INVALID;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getType() {
        return this.type;
    }
    isLeftKeyIsPressed() {
        return this.leftKeyIsPressed;
    }
    isRightKeyIsPressed() {
        return this.rightKeyIsPressed;
    }
}
