import { ElementEventType } from "./ElementEventType.js";
export class ElementEvent {
    constructor(type, width, height) {
        this.type = type;
        this.width = width;
        this.height = height;
    }
    isValid() {
        return this.type !== ElementEventType.INVALID;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getType() {
        return this.type;
    }
}
