import { KeyboardEventType } from "./KeyboardEventType";
/**
 * Класс для описания событий клавиатуры
 */
export class KeyboardEvent {
    /**
     * Конструктор для создания события клавиатуры
     * @param type тип события
     * @param code код кнопки
     */
    constructor(type, code) {
        this.type = type; //сохранение типа события
        this.code = code; //сохранение кода кнопки
    }
    isPress() {
        return this.type === KeyboardEventType.PRESS;
    }
    isRelease() {
        return this.type === KeyboardEventType.RELEASE;
    }
    isValid() {
        return this.type !== KeyboardEventType.INVALID;
    }
    getCode() {
        return this.code;
    }
}
