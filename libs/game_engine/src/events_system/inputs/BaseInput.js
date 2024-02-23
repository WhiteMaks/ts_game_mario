import { Input } from "./Input.js";
export class BaseInput extends Input {
    constructor(mouse, keyboard) {
        super();
        this.mouse = mouse;
        this.keyboard = keyboard;
    }
    isKeyboardKeyPressedImpl(key) {
        return this.keyboard.keyIsPressed(key);
    }
    isLeftMouseKeyPressedImpl() {
        return this.mouse.isLeftKeyPressed();
    }
    isRightMouseKeyPressedImpl() {
        return this.mouse.isRightKeyPressed();
    }
}
