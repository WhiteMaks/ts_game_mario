export class Input {
    constructor() { }
    static isKeyboardKeyPressed(key) {
        return this.instance.isKeyboardKeyPressedImpl(key);
    }
    static isLeftMouseKeyPressed() {
        return this.instance.isLeftMouseKeyPressedImpl();
    }
    static isRightMouseKeyPressed() {
        return this.instance.isRightMouseKeyPressedImpl();
    }
}
