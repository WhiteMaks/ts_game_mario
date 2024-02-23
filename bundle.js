/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/libs/game_engine/src/Time.ts
class Time {
    constructor(timestamp = 0) {
        this.timestamp = timestamp;
        this.deltaTime = 0;
    }
    update(timestamp) {
        this.deltaTime = timestamp - this.timestamp;
        this.timestamp = timestamp;
    }
    getTimestamp() {
        return this.timestamp;
    }
    getDeltaTimeMs() {
        return this.deltaTime;
    }
    getDeltaTimeSec() {
        return this.deltaTime / 1000;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/layer/impl/BaseLayerStack.ts
class BaseLayerStack {
    constructor() {
        this.layers = [];
        this.layerInsert = 0;
    }
    push(layer) {
        this.layers.splice(this.layerInsert, 0, layer);
        layer.attach();
        this.layerInsert++;
    }
    pushOverlay(layer) {
        this.layers.push(layer);
        layer.attach();
    }
    clean() {
        while (this.layers.length > 0) {
            this.layers.pop();
        }
    }
    getLayers() {
        return this.layers;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/element/ElementEventType.ts
var ElementEventType;
(function (ElementEventType) {
    ElementEventType[ElementEventType["RESIZE"] = 0] = "RESIZE";
    ElementEventType[ElementEventType["INVALID"] = 1] = "INVALID";
})(ElementEventType || (ElementEventType = {}));

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/element/ElementEvent.ts

class ElementEvent {
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

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/structures/impl/BaseQueue.ts
/**
 * Класс реализации базовой очереди
 */
class BaseQueue {
    constructor() {
        this.array = [];
    }
    peek() {
        return this.array[0];
    }
    poll() {
        let result = this.array.shift();
        if (!result) {
            throw new Error("Нет элементов в очереди");
        }
        return result;
    }
    push(element) {
        this.array.push(element);
    }
    size() {
        return this.array.length;
    }
    flush() {
        //пока в очереди есть записи, берем первый из очереди
        while (this.size() !== 0) {
            this.poll();
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/element/Element.ts



class Element {
    constructor(bufferSize) {
        this.bufferSize = bufferSize;
        this.buffer = new BaseQueue();
        this.width = 0;
        this.height = 0;
    }
    read() {
        //если в буфере есть записи, то возвращается первая из очереди
        if (this.buffer.size() > 0) {
            return this.buffer.poll();
        }
        return this.generateEvent(ElementEventType.INVALID);
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    onResize(width, height) {
        if (this.width !== width || this.height !== height) {
            this.width = width;
            this.height = height;
            this.buffer.push(this.generateEvent(ElementEventType.RESIZE));
            this.trimBuffer();
        }
    }
    flush() {
        this.buffer.flush();
    }
    trimBuffer() {
        //пока в буфере больше записей, чем в значении bufferSize, берем первый из очереди
        while (this.buffer.size() > this.bufferSize) {
            this.buffer.poll();
        }
    }
    generateEvent(type) {
        return new ElementEvent(type, this.width, this.height);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/keyboard/Key.ts
/**
 * Перечисления клавиш
 */
var Key;
(function (Key) {
    Key["A"] = "KeyA";
    Key["B"] = "KeyB";
    Key["C"] = "KeyC";
    Key["D"] = "KeyD";
    Key["E"] = "KeyE";
    Key["F"] = "KeyF";
    Key["G"] = "KeyG";
    Key["H"] = "KeyH";
    Key["I"] = "KeyI";
    Key["J"] = "KeyJ";
    Key["K"] = "KeyK";
    Key["L"] = "KeyL";
    Key["M"] = "KeyM";
    Key["N"] = "KeyN";
    Key["O"] = "KeyO";
    Key["P"] = "KeyP";
    Key["Q"] = "KeyQ";
    Key["R"] = "KeyR";
    Key["S"] = "KeyS";
    Key["T"] = "KeyT";
    Key["U"] = "KeyU";
    Key["V"] = "KeyV";
    Key["W"] = "KeyW";
    Key["X"] = "KeyX";
    Key["Y"] = "KeyY";
    Key["Z"] = "KeyZ";
    Key["ARROW_RIGHT"] = "ArrowRight";
    Key["ARROW_LEFT"] = "ArrowLeft";
    Key["ARROW_UP"] = "ArrowUp";
    Key["ARROW_DOWN"] = "ArrowDown";
    Key["LEFT_SHIFT"] = "ShiftLeft";
    Key["LEFT_CTR"] = "ControlLeft";
    Key["SPACE"] = "Space";
})(Key || (Key = {}));

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/inputs/Input.ts

class Input {
    constructor() { }
    static getHorizontalAxis() {
        let leftValue = 0;
        let rightValue = 0;
        if (this.isKeyboardKeyPressed(Key.A) || this.isKeyboardKeyPressed(Key.ARROW_LEFT)) {
            leftValue = -1;
        }
        if (this.isKeyboardKeyPressed(Key.D) || this.isKeyboardKeyPressed(Key.ARROW_RIGHT)) {
            rightValue = 1;
        }
        return leftValue + rightValue;
    }
    static getVerticalAxis() {
        let upValue = 0;
        let downValue = 0;
        if (this.isKeyboardKeyPressed(Key.W) || this.isKeyboardKeyPressed(Key.ARROW_UP)) {
            upValue = 1;
        }
        if (this.isKeyboardKeyPressed(Key.S) || this.isKeyboardKeyPressed(Key.ARROW_DOWN)) {
            downValue = -1;
        }
        return downValue + upValue;
    }
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

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/inputs/BaseInput.ts

class BaseInput extends Input {
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

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/keyboard/KeyboardEventType.ts
var KeyboardEventType;
(function (KeyboardEventType) {
    KeyboardEventType[KeyboardEventType["PRESS"] = 0] = "PRESS";
    KeyboardEventType[KeyboardEventType["RELEASE"] = 1] = "RELEASE";
    KeyboardEventType[KeyboardEventType["INVALID"] = 2] = "INVALID";
})(KeyboardEventType || (KeyboardEventType = {}));

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/keyboard/KeyboardEvent.ts

/**
 * Класс для описания событий клавиатуры
 */
class KeyboardEvent {
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

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/keyboard/Keyboard.ts



/**
 * Класс для работы с событиями клавиатуры
 */
class Keyboard {
    /**
     * Конструктор для создания объекта клавиатуры
     */
    constructor(bufferSize) {
        /**
         * Размер буфера хранения событий клавиатуры
         * @private
         */
        this.bufferSize = 16;
        this.bufferSize = bufferSize;
        //инициализация буфера хранения событий клавиатуры
        this.keyBuffer = new BaseQueue();
        //инициализация буфера хранения введенных символов
        this.charBuffer = new BaseQueue();
        //инициализация статуса кнопок
        this.keyStates = new Map();
    }
    /**
     * Проверка нажата ли данная кнопка на клавиатуре
     * @param key кнопка для проверки
     */
    keyIsPressed(key) {
        let result = this.keyStates.get(key);
        //если в Map не храниться записи по данному ключу, то сохраняем новую запись с параметром false и возвращаем false
        if (!result) {
            this.keyStates.set(key, false);
            return false;
        }
        return result;
    }
    /**
     * Получение из буфера событие от клавиатуры
     */
    readKey() {
        //если в буфере есть записи, то возвращается первая из очереди
        if (this.keyBuffer.size() > 0) {
            return this.keyBuffer.poll();
        }
        return new KeyboardEvent(KeyboardEventType.INVALID, ""); //инициализация пустого события
    }
    /**
     * Проверка есть ли записи в буфере событий клавиатуры
     */
    keyIsEmpty() {
        return this.keyBuffer.size() === 0;
    }
    /**
     * Получение из буфера введенный символ
     */
    readChar() {
        //если в буфере есть записи, то возвращается первый их очереди
        if (this.charBuffer.size() > 0) {
            return this.charBuffer.poll();
        }
        return ""; //инициализация пустого символа
    }
    /**
     * Проверка есть ли записи в буфере введенных символов
     */
    charIsEmpty() {
        return this.charBuffer.size() === 0;
    }
    /**
     * Отчистка буфера событий клавиатуры
     */
    flushKey() {
        this.keyBuffer.flush();
    }
    /**
     * Отчистка буфера введенных символов
     */
    flushChar() {
        this.charBuffer.flush();
    }
    /**
     * Отчистка буферов
     */
    flush() {
        this.flushKey();
        this.flushChar();
    }
    /**
     * Сохранение события нажатия по кнопке на клавиатуре
     * @param keycode название кнопки
     */
    onKeyPressed(keycode) {
        this.keyStates.set(keycode, true);
        this.keyBuffer.push(new KeyboardEvent(KeyboardEventType.PRESS, keycode));
        this.trimBuffer(this.keyBuffer);
    }
    /**
     * Сохранение события отжатия по кнопке на клавиатуре
     * @param keycode название кнопки
     */
    onKeyReleased(keycode) {
        this.keyStates.set(keycode, false);
        this.keyBuffer.push(new KeyboardEvent(KeyboardEventType.RELEASE, keycode));
        this.trimBuffer(this.keyBuffer);
    }
    /**
     * Сохранение события ввода символа
     * @param char введенный символ
     */
    onChar(char) {
        this.charBuffer.push(char);
        this.trimBuffer(this.charBuffer);
    }
    /**
     * Удаление устаревших записей в выбранном буфере
     * @param buffer выбранный буфер
     * @private
     */
    trimBuffer(buffer) {
        //пока в буфере больше записей, чем в значении bufferSize, берем первый из очереди
        while (buffer.size() > this.bufferSize) {
            buffer.poll();
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/mouse/MouseEventType.ts
var MouseEventType;
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

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/mouse/MouseEvent.ts

/**
 * Класс для описания событий мышки
 */
class MouseEvent {
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

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/mouse/Mouse.ts



/**
 * Класс для работы с событиями мышки
 */
class Mouse {
    /**
     * Конструктор для создания объекта мышки
     */
    constructor(bufferSize) {
        this.bufferSize = bufferSize;
        //инициализация буфера хранения событий мышки
        this.buffer = new BaseQueue();
        //инициализация направления мышки
        this.directionX = 0;
        this.directionY = 0;
        this.positionX = 0; //инициализация начального положения мышки по оси X
        this.positionY = 0; //инициализация начального положения мышки по оси Y
        this.previousPositionX = 0; //инициализация предыдущего положения мышки по оси X
        this.previousPositionY = 0; //инициализация предыдущего положения мышки по оси Y
        this.leftKeyIsPressed = false; //инициализация статуса нажатия левой кнопки мышки
        this.rightKeyIsPressed = false; //инициализация статуса нажатия правой кнопки мышки
        this.inFocus = false; //инициализация статуса нахождения в графическом элементе
    }
    /**
     * Получение позиции мышки по оси X
     */
    getPositionX() {
        return this.positionX;
    }
    /**
     * Получение позиции мышки по оси Y
     */
    getPositionY() {
        return this.positionY;
    }
    /**
     * Получение статуса идентификатора нахождения в фокусе
     */
    isInFocus() {
        return this.inFocus;
    }
    /**
     * Получение статуса нажатия левой кнопки мышки
     */
    isLeftKeyPressed() {
        return this.leftKeyIsPressed;
    }
    /**
     * Получение статуса нажатия правой кнопки мышки
     */
    isRightKeyPressed() {
        return this.rightKeyIsPressed;
    }
    /**
     * Получение из буфера событие от мышки
     */
    read() {
        //если в буфере есть записи, то возвращается первая из очереди
        if (this.buffer.size() > 0) {
            return this.buffer.poll();
        }
        return this.generateEvent(MouseEventType.INVALID);
    }
    /**
     * Отчистка буфера событий мышки
     */
    flush() {
        this.buffer.flush();
    }
    /**
     * Сохранение события перемещения мышки
     * @param newPositionX новая координата мышки по оси X
     * @param newPositionY новая координата мышки по оси Y
     */
    onMouseMove(newPositionX, newPositionY) {
        this.positionX = newPositionX; //сохранение новой координаты по оси X
        this.positionY = newPositionY; //сохранение новой координаты по оси Y
        this.buffer.push(this.generateEvent(MouseEventType.MOVE));
        this.trimBuffer();
    }
    /**
     * Сохранение события выхода мышки за пределы фокуса
     */
    onMouseLeave() {
        this.inFocus = false; //переключения статуса
        this.buffer.push(this.generateEvent(MouseEventType.LEAVE));
        this.trimBuffer();
    }
    /**
     * Сохранение события перемещения мышки внутрь фокуса
     */
    onMouseEnter() {
        this.inFocus = true; //переключения статуса
        this.buffer.push(this.generateEvent(MouseEventType.ENTER));
        this.trimBuffer();
    }
    /**
     * Сохранение события нажатия на левую кнопку мыши
     * @param positionX позиция нажатия кнопки мыши по оси X
     * @param positionY позиция нажатия кнопки мыши по оси Y
     */
    onLeftKeyPressed(positionX, positionY) {
        this.leftKeyIsPressed = true;
        this.buffer.push(this.generateEvent(MouseEventType.L_PRESS));
        this.trimBuffer();
    }
    /**
     * Сохранение события отжатия левой кнопки мыши
     * @param positionX позиция отжатия кнопки мыши по оси X
     * @param positionY позиция отжатия кнопки мыши по оси Y
     */
    onLeftKeyReleased(positionX, positionY) {
        this.leftKeyIsPressed = false;
        this.buffer.push(this.generateEvent(MouseEventType.L_RELEASE));
        this.trimBuffer();
    }
    /**
     * Сохранение события нажатия на правую кнопку мыши
     * @param positionX позиция нажатия кнопки мыши по оси X
     * @param positionY позиция нажатия кнопки мыши по оси Y
     */
    onRightKeyPressed(positionX, positionY) {
        this.rightKeyIsPressed = true;
        this.buffer.push(this.generateEvent(MouseEventType.R_PRESS));
        this.trimBuffer();
    }
    /**
     * Сохранение события отжатия правой кнопки мыши
     * @param positionX позиция отжатия кнопки мыши по оси X
     * @param positionY позиция отжатия кнопки мыши по оси Y
     */
    onRightKeyReleased(positionX, positionY) {
        this.rightKeyIsPressed = false;
        this.buffer.push(this.generateEvent(MouseEventType.R_RELEASE));
        this.trimBuffer();
    }
    /**
     * Сохранение события прокрутки барабанчика вверх
     * @param positionX позиция прокрутки мыши по оси X
     * @param positionY позиция прокрутки мыши по оси Y
     */
    onWheelUp(positionX, positionY) {
        this.buffer.push(this.generateEvent(MouseEventType.WHEEL_UP));
        this.trimBuffer();
    }
    /**
     * Сохранение события прокрутки барабанчика вниз
     * @param positionX позиция прокрутки мыши по оси X
     * @param positionY позиция прокрутки мыши по оси Y
     */
    onWheelDown(positionX, positionY) {
        this.buffer.push(this.generateEvent(MouseEventType.WHEEL_DOWN));
        this.trimBuffer();
    }
    /**
     * Обновление вектора направления мышки
     */
    updateDirection() {
        this.directionX = 0;
        this.directionY = 0;
        if (this.previousPositionX > 0 && this.previousPositionY > 0) {
            this.directionX = this.positionY - this.previousPositionY;
            this.directionY = this.positionX - this.previousPositionX;
        }
        this.previousPositionX = this.positionX;
        this.previousPositionY = this.positionY;
    }
    /**
     * Получение направления мышки по оси X
     */
    getDirectionX() {
        return this.directionX;
    }
    /**
     * Получение направления мышки по оси Y
     */
    getDirectionY() {
        return this.directionY;
    }
    /**
     * Удаление устаревших записей в буфере событий мышки
     * @private
     */
    trimBuffer() {
        //пока в буфере больше записей, чем в значении bufferSize, берем первый из очереди
        while (this.buffer.size() > this.bufferSize) {
            this.buffer.poll();
        }
    }
    generateEvent(type) {
        return new MouseEvent(type, this.leftKeyIsPressed, this.rightKeyIsPressed, this.positionX, this.positionY);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/index.ts













;// CONCATENATED MODULE: ./src/libs/game_engine/src/events_system/namespace/event_system.ts



;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/maths/impl/Vector2.ts
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static up() {
        return new Vector2(0, 1);
    }
    static down() {
        return new Vector2(0, -1);
    }
    static right() {
        return new Vector2(1, 0);
    }
    static left() {
        return new Vector2(-1, 0);
    }
    /**
     * Установка значения компоненты вектора X
     * @param x новое значение компонента X для вектора
     */
    setX(x) {
        this.x = x;
    }
    /**
     * Установка значения компоненты вектора Y
     * @param y новое значение компонента Y для вектора
     */
    setY(y) {
        this.y = y;
    }
    /**
     * Получение значения компоненты X
     */
    getX() {
        return this.x;
    }
    /**
     * Получение значения компоненты Y
     */
    getY() {
        return this.y;
    }
    getInversionLength() {
        return 1 / this.getLength();
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    getNormalization() {
        const inversionLength = this.getInversionLength();
        return new Vector2(this.x * inversionLength, this.y * inversionLength);
    }
    plus(vector) {
        return new Vector2(this.x + vector.getX(), this.y + vector.getY());
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/maths/impl/Vector3.ts

/**
 * Класс для работы с векторами
 */
class Vector3 extends Vector2 {
    /**
     * Конструктор для создания нового вектора
     * @param x компонента вектора X
     * @param y компонента вектора Y
     * @param z компонента вектора Z
     */
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
    /**
     * Установка значения компоненты вектора Z
     * @param z новое значение компонента Z для вектора
     */
    setZ(z) {
        this.z = z;
    }
    /**
     * Получение значения компоненты Z
     */
    getZ() {
        return this.z;
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    getNormalization() {
        const inversionLength = this.getInversionLength();
        return new Vector3(this.x * inversionLength, this.y * inversionLength, this.z * inversionLength);
    }
    plus(vector) {
        return new Vector3(this.x + vector.getX(), this.y + vector.getY(), this.z + vector.getZ());
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/maths/impl/Vector4.ts

/**
 * Класс для работы с векторами
 */
class Vector4 extends Vector3 {
    /**
     * Конструктор для создания нового вектора
     * @param x компонента вектора X
     * @param y компонента вектора Y
     * @param z компонента вектора Z
     * @param w компонента вектора W
     */
    constructor(x, y, z, w) {
        super(x, y, z);
        this.w = w;
    }
    /**
     * Получение значения компоненты W
     */
    getW() {
        return this.w;
    }
    /**
     * Установка значения компоненты вектора W
     * @param w новое значение компонента W для вектора
     */
    setW(w) {
        this.w = w;
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    getNormalization() {
        const inversionLength = this.getInversionLength();
        return new Vector4(this.x * inversionLength, this.y * inversionLength, this.z * inversionLength, this.w * inversionLength);
    }
    plus(vector) {
        return new Vector4(this.x + vector.getX(), this.y + vector.getY(), this.z + vector.getZ(), this.w + vector.getW());
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/maths/impl/Matrix4.ts

class Matrix4 {
    constructor(arrayMatrix) {
        this.arrayMatrix = arrayMatrix;
    }
    /**
     * Единичная матрица 4x4
     */
    static identity() {
        return new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }
    getArray() {
        return this.arrayMatrix;
    }
    multiplyMatrix(matrix) {
        const a11 = this.a11() * matrix.a11() + this.a12() * matrix.a21() + this.a13() * matrix.a31() + this.a14() * matrix.a41();
        const a12 = this.a11() * matrix.a12() + this.a12() * matrix.a22() + this.a13() * matrix.a32() + this.a14() * matrix.a42();
        const a13 = this.a11() * matrix.a13() + this.a12() * matrix.a23() + this.a13() * matrix.a33() + this.a14() * matrix.a43();
        const a14 = this.a11() * matrix.a14() + this.a12() * matrix.a24() + this.a13() * matrix.a34() + this.a14() * matrix.a44();
        const a21 = this.a21() * matrix.a11() + this.a22() * matrix.a21() + this.a23() * matrix.a31() + this.a24() * matrix.a41();
        const a22 = this.a21() * matrix.a12() + this.a22() * matrix.a22() + this.a23() * matrix.a32() + this.a24() * matrix.a42();
        const a23 = this.a21() * matrix.a13() + this.a22() * matrix.a23() + this.a23() * matrix.a33() + this.a24() * matrix.a43();
        const a24 = this.a21() * matrix.a14() + this.a22() * matrix.a24() + this.a23() * matrix.a34() + this.a24() * matrix.a44();
        const a31 = this.a31() * matrix.a11() + this.a32() * matrix.a21() + this.a33() * matrix.a31() + this.a34() * matrix.a41();
        const a32 = this.a31() * matrix.a12() + this.a32() * matrix.a22() + this.a33() * matrix.a32() + this.a34() * matrix.a42();
        const a33 = this.a31() * matrix.a13() + this.a32() * matrix.a23() + this.a33() * matrix.a33() + this.a34() * matrix.a43();
        const a34 = this.a31() * matrix.a14() + this.a32() * matrix.a24() + this.a33() * matrix.a34() + this.a34() * matrix.a44();
        const a41 = this.a41() * matrix.a11() + this.a42() * matrix.a21() + this.a43() * matrix.a31() + this.a44() * matrix.a41();
        const a42 = this.a41() * matrix.a12() + this.a42() * matrix.a22() + this.a43() * matrix.a32() + this.a44() * matrix.a42();
        const a43 = this.a41() * matrix.a13() + this.a42() * matrix.a23() + this.a43() * matrix.a33() + this.a44() * matrix.a43();
        const a44 = this.a41() * matrix.a14() + this.a42() * matrix.a24() + this.a43() * matrix.a34() + this.a44() * matrix.a44();
        return new Matrix4([
            a11, a12, a13, a14,
            a21, a22, a23, a24,
            a31, a32, a33, a34,
            a41, a42, a43, a44,
        ]);
    }
    multiplyVector(vector) {
        return new Vector4(this.a11() * vector.getX() + this.a12() * vector.getY() + this.a13() * vector.getZ() + this.a14() * vector.getW(), this.a21() * vector.getX() + this.a22() * vector.getY() + this.a23() * vector.getZ() + this.a24() * vector.getW(), this.a31() * vector.getX() + this.a32() * vector.getY() + this.a33() * vector.getZ() + this.a34() * vector.getW(), this.a41() * vector.getX() + this.a42() * vector.getY() + this.a43() * vector.getZ() + this.a44() * vector.getW());
    }
    a11() {
        return this.arrayMatrix[0];
    }
    a12() {
        return this.arrayMatrix[1];
    }
    a13() {
        return this.arrayMatrix[2];
    }
    a14() {
        return this.arrayMatrix[3];
    }
    a21() {
        return this.arrayMatrix[4];
    }
    a22() {
        return this.arrayMatrix[5];
    }
    a23() {
        return this.arrayMatrix[6];
    }
    a24() {
        return this.arrayMatrix[7];
    }
    a31() {
        return this.arrayMatrix[8];
    }
    a32() {
        return this.arrayMatrix[9];
    }
    a33() {
        return this.arrayMatrix[10];
    }
    a34() {
        return this.arrayMatrix[11];
    }
    a41() {
        return this.arrayMatrix[12];
    }
    a42() {
        return this.arrayMatrix[13];
    }
    a43() {
        return this.arrayMatrix[14];
    }
    a44() {
        return this.arrayMatrix[15];
    }
    transpose() {
        return new Matrix4([
            this.a11(), this.a21(), this.a31(), this.a41(),
            this.a12(), this.a22(), this.a32(), this.a42(),
            this.a13(), this.a23(), this.a33(), this.a43(),
            this.a14(), this.a24(), this.a34(), this.a44()
        ]);
    }
    /*
               | a11  a12  a13  a14 |         | a22  a23  a24 |         | a21  a23  a24 |         | a21  a22  a24 |         | a21  a22  a23 |
        detA = | a21  a22  a23  a24 | = a11 * | a32  a33  a34 | - a12 * | a31  a33  a34 | + a13 * | a31  a32  a34 | - a14 * | a31  a32  a33 | = a11 * (a22 * | a33  a34 | - a23 * | a32  a34 | + a24 * | a32  a33 |) - a12 * (a21 * | a33  a34 | - a23 * | a31  a34 | + a24 * | a31  a33 |) + a13 * (a21 * | a32  a34 | - a22 * | a31  a34 | + a24 * | a31  a32 |) - a14 * (a21 * | a32  a33 | - a22 * | a31  a33 | + a23 * | a31  a32 |) =
               | a31  a32  a33  a34 |         | a42  a43  a44 |         | a41  a43  a44 |         | a41  a42  a44 |         | a41  a42  a43 |                | a43  a44 |         | a42  a44 |         | a42  a43 |                 | a43  a44 |         | a41  a44 |         | a41  a43 |                 | a42  a44 |         | a41  a44 |         | a41  a42 |                 | a42  a43 |         | a41  a43 |         | a41  a42 |
               | a41  a42  a43  a44 |

             = a11 * (a22 * (a33 * a44 - a43 * a34) - a23 * (a32 * a44 - a42 * a34) + a24 * (a32 * a43 - a42 * a33)) - a12 * (a21 * (a33 * a44 - a43 * a34) - a23 * (a31 * a44 - a41 * a34) + a24 * (a31 * a43 - a41 * a33)) + a13 * (a21 * (a32 * a44 - a42 * a34) - a22 * (a31 * a44 - a41 * a34) + a24 * (a31 * a42 - a41 * a32)) - a14 * (a21 * (a32 * a43 - a42 * a33) - a22 * (a31 * a43 - a41 * a33) + a23 * (a31 * a42 - a41 * a32)) =
             = a11 * (a22 * a33a44_43a34 - a23 * a32a44_a42a34 + a24 * a32a43_a42a33) - a12 * (a21 * a33a44_43a34 - a23 * a31a44_a41a34 + a24 * a31a43_a41a33) + a13 * (a21 * a32a44_a42a34 - a22 * a31a44_a41a34 + a24 * a31a42_a41a32) - a14 * (a21 * a32a43_a42a33 - a22 * a31a43_a41a33 + a23 * a31a42_a41a32)
     */
    determinant() {
        const a33a44_43a34 = this.a33() * this.a44() - this.a43() * this.a34();
        const a32a44_a42a34 = this.a32() * this.a44() - this.a42() * this.a34();
        const a32a43_a42a33 = this.a32() * this.a43() - this.a42() * this.a33();
        const a31a44_a41a34 = this.a31() * this.a44() - this.a41() * this.a34();
        const a31a43_a41a33 = this.a31() * this.a43() - this.a41() * this.a33();
        const a31a42_a41a32 = this.a31() * this.a42() - this.a41() * this.a32();
        return this.a11() * (this.a22() * a33a44_43a34 - this.a23() * a32a44_a42a34 + this.a24() * a32a43_a42a33) - this.a12() * (this.a21() * a33a44_43a34 - this.a23() * a31a44_a41a34 + this.a24() * a31a43_a41a33) + this.a13() * (this.a21() * a32a44_a42a34 - this.a22() * a31a44_a41a34 + this.a24() * a31a42_a41a32) - this.a14() * (this.a21() * a32a43_a42a33 - this.a22() * a31a43_a41a33 + this.a23() * a31a42_a41a32);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/maths/support/Transformation.ts


/**
 * Класс для работы с трансформациями
 */
class Transformation {
    /**
     * Получение мировой матрицы (матрицы модели)
     * @param translationVector вектор перемещения
     * @param rotationVector вектор поворота
     * @param scale вектор масштабирования
     */
    static getWorldMatrix(translationVector, rotationVector, scale) {
        const translationMatrix = this.getTranslationMatrix(Matrix4.identity(), translationVector);
        const rotationXMatrix = this.rotationX(translationMatrix, Transformation.degreesToRadians(rotationVector.getX()));
        const rotationXYMatrix = this.rotationY(rotationXMatrix, Transformation.degreesToRadians(rotationVector.getY()));
        const rotationXYZMatrix = this.rotationZ(rotationXYMatrix, Transformation.degreesToRadians(rotationVector.getZ()));
        return this.scale(rotationXYZMatrix, scale);
    }
    /**
     * Получение матрицы перспективной проекции (для корректного отображения 3D пространства)
     * @param aspectRatio отношение между высотой и шириной экрана
     * @param fieldOfView угол поля зрения (в радианах)
     * @param zNear расстояние до ближней плоскости
     * @param zFar расстояние до дальней плоскости
     */
    static getPerspectiveProjectionMatrix(aspectRatio, fieldOfView, zNear, zFar) {
        const f = 1 / Math.tan(fieldOfView / 2);
        const nf = 1 / (zNear - zFar);
        return new Matrix4([
            f / aspectRatio, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (zFar + zNear) * nf, -1,
            0, 0, 2 * zFar * zNear * nf, 0
        ]);
    }
    /**
     * Получение матрицы ортогональной проекции (для корректного отображения 2D пространства)
     * @param left левая граница усеченного конуса
     * @param right правая граница усеченного конуса
     * @param bottom нижняя граница усеченного конуса
     * @param top верхняя граница усеченного конуса
     * @param near ближайшая граница усеченного конуса
     * @param far дальняя граница усеченного конуса
     */
    static getOrthogonalProjectionMatrix(left, right, bottom, top, near, far) {
        const leftMinusRight = 1 / (left - right);
        const bottomMinusTop = 1 / (bottom - top);
        const farMinusNear = 1 / (far - near);
        return new Matrix4([
            (-2) * leftMinusRight, 0, 0, 0,
            0, (-2) * bottomMinusTop, 0, 0,
            0, 0, (-2) * farMinusNear, 0,
            (left + right) * leftMinusRight, (top + bottom) * bottomMinusTop, (-1) * (far + near) * farMinusNear, 1
        ]);
    }
    /**
     * Получение матрицы просмотра
     * @param position позиция с которой необходимо получить матрицу
     * @param rotation поворот по которому необходимо получить матрицу
     */
    static getViewMatrix(position, rotation) {
        const rotationXMatrix = this.getRotationMatrix(Matrix4.identity(), Transformation.degreesToRadians(rotation.getX()), new Vector3(1, 0, 0));
        const rotationXYMatrix = this.getRotationMatrix(rotationXMatrix, Transformation.degreesToRadians(rotation.getY()), new Vector3(0, 1, 0));
        return this.getTranslationMatrix(rotationXYMatrix, new Vector3(-position.getX(), -position.getY(), -position.getZ()));
    }
    /**
     * Перевод градусов в радианы
     * @param angle значение угла в градусах
     */
    static degreesToRadians(angle) {
        return angle * (Math.PI / 180);
    }
    /**
     * Получение матрицы перемещения
     * @param matrix матрица, которую необходимо преобразовать
     * @param translationVector вектор перемещения
     */
    static getTranslationMatrix(matrix, translationVector) {
        return new Matrix4([
            matrix.a11(), matrix.a12(), matrix.a13(), matrix.a14(),
            matrix.a21(), matrix.a22(), matrix.a23(), matrix.a24(),
            matrix.a31(), matrix.a32(), matrix.a33(), matrix.a34(),
            translationVector.getX(), translationVector.getY(), translationVector.getZ(), matrix.a44()
        ]);
    }
    static translate(matrix, translation) {
        return new Matrix4([
            matrix.a11(), matrix.a12(), matrix.a13(), translation.getX(),
            matrix.a21(), matrix.a22(), matrix.a23(), translation.getY(),
            matrix.a31(), matrix.a32(), matrix.a33(), translation.getZ(),
            matrix.a41(), matrix.a42(), matrix.a43(), matrix.a44(),
        ]);
    }
    /**
     * Получение матрицы поворота по оси X
     * @param matrix матрица, которую необходимо преобразовать
     * @param angleX угол по оси X (в радианах) на который необходимо повернуть
     */
    static rotationX(matrix, angleX) {
        const sinAngle = Math.sin(angleX);
        const cosAngle = Math.cos(angleX);
        const tempMatrix = new Matrix4([
            1, 0, 0, 0,
            0, cosAngle, -sinAngle, 0,
            0, sinAngle, cosAngle, 0,
            0, 0, 0, 1
        ]);
        return matrix.multiplyMatrix(tempMatrix);
    }
    /**
     * Получение матрицы поворота по оси Y
     * @param matrix матрица, которую необходимо преобразовать
     * @param angleY угол по оси Y (в радианах) на который необходимо повернуть
     */
    static rotationY(matrix, angleY) {
        const sinAngle = Math.sin(angleY);
        const cosAngle = Math.cos(angleY);
        const tempMatrix = new Matrix4([
            cosAngle, 0, sinAngle, 0,
            0, 1, 0, 0,
            -sinAngle, 0, cosAngle, 0,
            0, 0, 0, 1
        ]);
        return matrix.multiplyMatrix(tempMatrix);
    }
    /**
     * Получение матрицы поворота по оси Z
     * @param matrix матрица, которую необходимо преобразовать
     * @param angleZ угол по оси Z (в радианах) на который необходимо повернуть
     */
    static rotationZ(matrix, angleZ) {
        const sinAngle = Math.sin(angleZ);
        const cosAngle = Math.cos(angleZ);
        const tempMatrix = new Matrix4([
            cosAngle, -sinAngle, 0, 0,
            sinAngle, cosAngle, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
        return matrix.multiplyMatrix(tempMatrix);
    }
    /**
     * Получение матрицы масштабирования
     * @param matrix матрица, которую необходимо преобразовать
     * @param scale вектор масштабирования
     */
    static scale(matrix, scale) {
        return new Matrix4([
            matrix.a11() * scale.getX(), matrix.a12() * scale.getX(), matrix.a13() * scale.getX(), matrix.a14() * scale.getX(),
            matrix.a21() * scale.getY(), matrix.a22() * scale.getY(), matrix.a23() * scale.getY(), matrix.a24() * scale.getY(),
            matrix.a31() * scale.getZ(), matrix.a32() * scale.getZ(), matrix.a33() * scale.getZ(), matrix.a34() * scale.getZ(),
            matrix.a41(), matrix.a42(), matrix.a43(), matrix.a44()
        ]);
    }
    /**
     * Получение матрицы поворота по заданной оси вращения
     * @param matrix матрица, которую необходимо преобразовать
     * @param angle угол поворота (в радианах)
     * @param axis вектор оси вращения
     * @private
     */
    static getRotationMatrix(matrix, angle, axis) {
        const sinAngle = Math.sin(angle);
        const cosAngle = Math.cos(angle);
        const oneMinusCosAngle = 1 - cosAngle;
        const normalizedVector = axis.getNormalization();
        const a = normalizedVector.getX() * normalizedVector.getX() * oneMinusCosAngle + cosAngle;
        const b = normalizedVector.getY() * normalizedVector.getX() * oneMinusCosAngle + normalizedVector.getZ() * sinAngle;
        const c = normalizedVector.getZ() * normalizedVector.getX() * oneMinusCosAngle - normalizedVector.getY() * sinAngle;
        const d = normalizedVector.getX() * normalizedVector.getY() * oneMinusCosAngle - normalizedVector.getZ() * sinAngle;
        const e = normalizedVector.getY() * normalizedVector.getY() * oneMinusCosAngle + cosAngle;
        const f = normalizedVector.getZ() * normalizedVector.getY() * oneMinusCosAngle + normalizedVector.getX() * sinAngle;
        const g = normalizedVector.getX() * normalizedVector.getZ() * oneMinusCosAngle + normalizedVector.getY() * sinAngle;
        const h = normalizedVector.getY() * normalizedVector.getZ() * oneMinusCosAngle - normalizedVector.getX() * sinAngle;
        const i = normalizedVector.getZ() * normalizedVector.getZ() * oneMinusCosAngle + cosAngle;
        return new Matrix4([
            matrix.a11() * a + matrix.a21() * b + matrix.a31() * c, matrix.a12() * a + matrix.a22() * b + matrix.a32() * c, matrix.a13() * a + matrix.a23() * b + matrix.a33() * c, matrix.a14() * a + matrix.a24() * b + matrix.a34() * c,
            matrix.a11() * d + matrix.a21() * e + matrix.a31() * f, matrix.a12() * d + matrix.a22() * e + matrix.a32() * f, matrix.a13() * d + matrix.a23() * e + matrix.a33() * f, matrix.a14() * d + matrix.a24() * e + matrix.a34() * f,
            matrix.a11() * g + matrix.a21() * h + matrix.a31() * i, matrix.a12() * g + matrix.a22() * h + matrix.a32() * i, matrix.a13() * g + matrix.a23() * h + matrix.a33() * i, matrix.a14() * g + matrix.a24() * h + matrix.a34() * i,
            matrix.a41(), matrix.a42(), matrix.a43(), matrix.a44()
        ]);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/camera/impl/BaseCamera.ts


class BaseCamera {
    constructor(projectionMatrix, width, height) {
        this.projectionMatrix = projectionMatrix;
        this.width = width;
        this.height = height;
        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
        this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
    }
    getPosition() {
        return this.position;
    }
    getProjectionMatrix() {
        return this.projectionMatrix;
    }
    getRotation() {
        return this.rotation;
    }
    getViewMatrix() {
        return this.viewMatrix;
    }
    getViewProjectionMatrix() {
        return this.viewProjectionMatrix;
    }
    setPosition(position) {
        this.position = position;
    }
    setRotation(rotation) {
        this.rotation = rotation;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/camera/ext/PerspectiveCamera.ts


class PerspectiveCamera extends BaseCamera {
    constructor(width, height, fieldOfView, zNear, zFar) {
        super(Transformation.getPerspectiveProjectionMatrix(width / height, Transformation.degreesToRadians(fieldOfView), zNear, zFar), width, height);
        this.zNear = zNear;
        this.zFar = zFar;
        this.fieldOfView = Transformation.degreesToRadians(fieldOfView);
    }
    update() {
        this.recalculateViewMatrix();
        this.recalculateViewProjectionMatrix();
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.projectionMatrix = Transformation.getPerspectiveProjectionMatrix(this.width / this.height, this.fieldOfView, this.zNear, this.zFar);
    }
    recalculateViewMatrix() {
        this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
    }
    recalculateViewProjectionMatrix() {
        this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/camera/ext/OrthographicCamera.ts


class OrthographicCamera extends BaseCamera {
    constructor(width, height, zoomLevel = 1) {
        super(Transformation.getOrthogonalProjectionMatrix((-1) * width / height * zoomLevel, width / height * zoomLevel, -1 * zoomLevel, zoomLevel, -1.0, 1.0), width, height);
        this.zoomLevel = zoomLevel;
    }
    update() {
        this.recalculateViewMatrix();
        this.recalculateViewProjectionMatrix();
    }
    setZoomLevel(zoomLevel) {
        if (zoomLevel <= 1) {
            this.zoomLevel = 1;
            return;
        }
        this.zoomLevel = zoomLevel;
        this.resize(this.width, this.height);
    }
    getZoomLevel() {
        return this.zoomLevel;
    }
    recalculateViewMatrix() {
        this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
    }
    recalculateViewProjectionMatrix() {
        this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        const aspectRation = this.width / this.height;
        this.projectionMatrix = Transformation.getOrthogonalProjectionMatrix((-1) * aspectRation * this.zoomLevel, aspectRation * this.zoomLevel, -1 * this.zoomLevel, this.zoomLevel, -1.0, 1.0);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/renderer/RendererAPI.ts
var RendererAPI;
(function (RendererAPI) {
    RendererAPI[RendererAPI["WEB_GL"] = 0] = "WEB_GL";
})(RendererAPI || (RendererAPI = {}));

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/renderer/Renderer.ts

class Renderer {
    static getAPI() {
        return this.rendererAPI;
    }
    static setAPI(api) {
        Renderer.rendererAPI = api;
    }
}
Renderer.rendererAPI = RendererAPI.WEB_GL;

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/support/NumberType.ts
var NumberType;
(function (NumberType) {
    NumberType[NumberType["FLOAT"] = 4] = "FLOAT";
    NumberType[NumberType["INT"] = 4] = "INT";
    NumberType[NumberType["UNSIGNED_INT"] = 4] = "UNSIGNED_INT";
})(NumberType || (NumberType = {}));

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/shader/ShaderDataType.ts

var ShaderDataType;
(function (ShaderDataType) {
    ShaderDataType[ShaderDataType["FLOAT_1"] = NumberType.FLOAT.valueOf()] = "FLOAT_1";
    ShaderDataType[ShaderDataType["FLOAT_2"] = NumberType.FLOAT.valueOf() * 2] = "FLOAT_2";
    ShaderDataType[ShaderDataType["FLOAT_3"] = NumberType.FLOAT.valueOf() * 3] = "FLOAT_3";
    ShaderDataType[ShaderDataType["FLOAT_4"] = NumberType.FLOAT.valueOf() * 4] = "FLOAT_4";
    ShaderDataType[ShaderDataType["INT_1"] = NumberType.INT.valueOf()] = "INT_1";
    ShaderDataType[ShaderDataType["INT_2"] = NumberType.INT.valueOf() * 2] = "INT_2";
    ShaderDataType[ShaderDataType["INT_3"] = NumberType.INT.valueOf() * 3] = "INT_3";
    ShaderDataType[ShaderDataType["INT_4"] = NumberType.INT.valueOf() * 4] = "INT_4";
})(ShaderDataType || (ShaderDataType = {}));
function getComponentCountFromShaderDataType(type) {
    switch (type) {
        case ShaderDataType.FLOAT_1: return 1;
        case ShaderDataType.FLOAT_2: return 2;
        case ShaderDataType.FLOAT_3: return 3;
        case ShaderDataType.FLOAT_4: return 4;
        case ShaderDataType.INT_1: return 1;
        case ShaderDataType.INT_2: return 2;
        case ShaderDataType.INT_3: return 3;
        case ShaderDataType.INT_4: return 4;
    }
    throw new Error("ShaderDataType [ " + type + " ] not supported");
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/buffer/WebGLVertexArrayBuffer.ts

class WebGLVertexArrayBuffer {
    constructor(gl) {
        this.gl = gl;
        this.vertexBuffers = [];
        this.indexBuffer = null;
        this.buffer = gl.createVertexArray();
        this.bind();
    }
    getCount() {
        return 0;
    }
    addVertexBuffer(buffer) {
        this.bind();
        buffer.bind();
        const layout = buffer.getLayout();
        const elements = buffer.getLayout().getElements();
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            this.gl.enableVertexAttribArray(i);
            switch (element.type) {
                case ShaderDataType.FLOAT_4:
                case ShaderDataType.FLOAT_3:
                case ShaderDataType.FLOAT_2:
                case ShaderDataType.FLOAT_1: {
                    this.gl.vertexAttribPointerFloat(i, getComponentCountFromShaderDataType(element.type), element.normalized, layout.getStride(), element.offset);
                    break;
                }
                case ShaderDataType.INT_4:
                case ShaderDataType.INT_3:
                case ShaderDataType.INT_2:
                case ShaderDataType.INT_1: {
                    this.gl.vertexAttribPointerUint(i, getComponentCountFromShaderDataType(element.type), element.normalized, layout.getStride(), element.offset);
                    break;
                }
                default: {
                    throw new Error("ShaderDataType [ " + element.type + " ] not supported");
                }
            }
        }
        this.vertexBuffers.push(buffer);
    }
    setIndexBuffer(buffer) {
        this.bind();
        buffer.bind();
        this.indexBuffer = buffer;
    }
    bind() {
        this.gl.bindVertexArray(this.buffer);
    }
    unbind() {
        this.gl.unbindVertexArray();
    }
    clean() {
        var _a;
        this.gl.deleteVertexArray(this.buffer);
        for (const buffer of this.vertexBuffers) {
            buffer.clean();
        }
        (_a = this.indexBuffer) === null || _a === void 0 ? void 0 : _a.clean();
    }
    setLayout(layout) {
        throw new Error("setLayout: not implemented method");
    }
    getLayout() {
        throw new Error("getLayout: not implemented method");
    }
    getVertexBuffers() {
        return this.vertexBuffers;
    }
    getIndexBuffer() {
        return this.indexBuffer;
    }
    setFloat32Data(data) {
        throw new Error("Vertex Array buffer not supported setFloat32Data");
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/buffer/WebGLIndexStaticBuffer.ts
class WebGLIndexStaticBuffer {
    constructor(gl, data, count) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.count = count;
        this.bind();
        gl.elementArrayBufferStaticData(data);
    }
    bind() {
        this.gl.bindElementArrayBuffer(this.buffer);
    }
    unbind() {
        this.gl.bindElementArrayBuffer(this.buffer);
    }
    getCount() {
        return this.count;
    }
    clean() {
        this.gl.deleteBuffer(this.buffer);
    }
    setLayout(layout) {
        throw new Error("setLayout: not implemented method");
    }
    getLayout() {
        throw new Error("getLayout: not implemented method");
    }
    setFloat32Data(data) {
        throw new Error("Index Static buffer not supported setFloat32Data");
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/buffer/WebGLUint16IndexStaticBuffer.ts

class WebGLUint16IndexStaticBuffer extends WebGLIndexStaticBuffer {
    constructor(gl, data) {
        super(gl, data, data.length);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/buffer/WebGLVertexStaticBuffer.ts
class WebGLVertexStaticBuffer {
    constructor(gl, data, count) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.count = count;
        this.layout = null;
        this.bind();
        gl.arrayBufferStaticData(data);
    }
    bind() {
        this.gl.bindArrayBuffer(this.buffer);
    }
    unbind() {
        this.gl.unbindArrayBuffer();
    }
    getCount() {
        return this.count;
    }
    clean() {
        this.gl.deleteBuffer(this.buffer);
    }
    setLayout(layout) {
        this.layout = layout;
    }
    getLayout() {
        return this.layout;
    }
    setFloat32Data(data) {
        throw new Error("Vertex Static buffer not supported setFloat32Data");
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/buffer/WebGLFloat32VertexStaticBuffer.ts

class WebGLFloat32VertexStaticBuffer extends WebGLVertexStaticBuffer {
    constructor(gl, data) {
        super(gl, data, data.length);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/buffer/WebGLVertexDynamicBuffer.ts
class WebGLVertexDynamicBuffer {
    constructor(gl, size) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.layout = null;
        this.bind();
        gl.arrayBufferDynamicData(size);
    }
    bind() {
        this.gl.bindArrayBuffer(this.buffer);
    }
    unbind() {
        this.gl.unbindArrayBuffer();
    }
    getCount() {
        throw new Error("getCount not supported in Vertex Buffer");
    }
    clean() {
        this.gl.deleteBuffer(this.buffer);
    }
    setLayout(layout) {
        this.layout = layout;
    }
    getLayout() {
        return this.layout;
    }
    setFloat32Data(data) {
        this.bind();
        this.gl.arrayBufferSubData(data);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/buffer/WebGLFloat32VertexDynamicBuffer.ts

class WebGLFloat32VertexDynamicBuffer extends WebGLVertexDynamicBuffer {
    constructor(gl, size) {
        super(gl, size);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/buffer/FrameBuffer.ts
class FrameBuffer {
    constructor(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/buffer/WebGLFrameBuffer.ts

class WebGLFrameBuffer extends FrameBuffer {
    constructor(gl, data) {
        super(data);
        this.gl = gl;
        this.frameBuffer = null;
        this.colorAttachment = null;
        this.depthAttachment = null;
        this.init();
    }
    init() {
        this.frameBuffer = this.gl.createFrameBuffers();
        this.bind();
        this.colorAttachment = this.gl.createTexture();
        this.gl.bindTexture2D(this.colorAttachment);
        this.gl.textImage2DRGBA8Ubyte(0, this.data.width, this.data.height, 0, null);
        this.gl.tex2DParameteriMinFilterLinear();
        this.gl.tex2DParameteriMagFilterLinear();
        this.gl.frameBufferTexture2DColorAttachment0(this.colorAttachment, 0);
        this.depthAttachment = this.gl.createTexture();
        this.gl.bindTexture2D(this.depthAttachment);
        // this.gl.texStorage2DDepth24Stencil8(0, this.data.width, this.data.height);
        this.gl.textImage2DDepth24Stencil8Uint24_8(0, this.data.width, this.data.height, 0, null);
        this.gl.frameBufferTexture2DDepthStencilAttachment(this.depthAttachment, 0);
        this.gl.checkFrameBufferStatusComplete();
        this.unbind();
    }
    bind() {
        this.gl.bindFrameBuffer(this.frameBuffer);
        //this.gl.setViewport(0, 0, this.data.width, this.data.height);
    }
    unbind() {
        this.gl.unbindFrameBuffer();
    }
    clean() {
        this.gl.deleteFrameBuffer(this.frameBuffer);
        this.gl.deleteTexture(this.colorAttachment);
        this.gl.deleteTexture(this.depthAttachment);
    }
    resize(width, height) {
        this.clean();
        this.data.width = width;
        this.data.height = height;
        this.init();
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/factories/BufferFactory.ts







class BufferFactory {
    static createFloat32VertexDynamicBuffer(graphicsContext, size) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLFloat32VertexDynamicBuffer(gl, size);
            }
        }
    }
    static createFloat32VertexStaticBuffer(graphicsContext, data) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLFloat32VertexStaticBuffer(gl, data);
            }
        }
    }
    static createUint16IndexStaticBuffer(graphicsContext, data) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLUint16IndexStaticBuffer(gl, data);
            }
        }
    }
    static createVertexArrayBuffer(graphicsContext) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLVertexArrayBuffer(gl);
            }
        }
    }
    static createFrameBuffer(graphicsContext, data) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGLFrameBuffer(gl, data);
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/wrappers/WebGLExt.ts
/**
 * Класс обертка над стандартными методами WebGL
 */
class WebGLExt {
    /**
     * Конструктор создания объекта WebGL
     * @param context выбранный контекст для работы с WebGL
     */
    constructor(context) {
        this.context = context; //сохранение контекста
        this.clearColor(0, 0, 0, 1);
        const debugInfo = this.context.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            this.vendor = this.context.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            this.renderer = this.context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
        else {
            this.vendor = "HIDDEN";
            this.renderer = "HIDDEN";
        }
    }
    /**
     * Включение тесты глубины
     */
    enableDepthTest() {
        this.context.enable(this.context.DEPTH_TEST);
    }
    /**
     * Включение смешивания пикселей
     */
    enableBlend() {
        this.context.enable(this.context.BLEND);
    }
    /**
     * Выключение смешивания пикселей
     */
    disableBlend() {
        this.context.disable(this.context.BLEND);
    }
    /**
     * Включение прозрачности пикселей
     */
    blendFuncSrcAlphaOneMinusSrcAlpha() {
        //Функция для математического преобразования цвета для получения итогового цвета смешивания
        this.context.blendFunc(this.context.SRC_ALPHA, //SRC; Канал для математических преобразований (в данном случае канал отвечающий за прозрачность (A) в RGBA)
        this.context.ONE_MINUS_SRC_ALPHA //DEST: для получения правильного цвета смешивания нужно из единицы вычесть канал A
        );
        //R = (R(SCR) * SRC) + (R(DEST) * (1 - DEST))
        //G = (G(SCR) * SRC) + (G(DEST) * (1 - DEST))
        //B = (B(SCR) * SRC) + (B(DEST) * (1 - DEST))
        //A = (A(SCR) * SRC) + (A(DEST) * (1 - DEST))
        //
        //К примеру есть цветовой вектор красного цвета на половину прозрачный (канал A = 0.5) (1.0, 0.0, 0.0, 0.5)
        //SRC(red) = 0.5
        //DEST(red) = 1.0 - 0.5 = 0.5
        //И есть цветовой вектор синего цвета не прозрачный (канал A = 1.0) (0.0, 0.0, 1.0, 1.0)
        //Тогда итоговый цвет будет равен
        //R = ((1.0 * 0.5) + (0.0 * (1 - 0.5))) = 0.5
        //G = ((0.0 * 0.5) + (0.0 * (1 - 0.5))) = 0.0
        //B = ((0.0 * 0.5) + (1.0 * (1 - 0.5))) = 0.5
        //A = ((0.5 * 0.5) + (1.0 * (1 - 0.5))) = 0.75
    }
    /**
     * Заливка экрана выбранным цветом с прозрачностью
     * @param red значение красного цвета
     * @param green значение зеленого цвета
     * @param blue значение синего цвета
     * @param alpha значение прозрачности цвета
     */
    clearColor(red, green, blue, alpha) {
        this.context.clearColor(red, green, blue, alpha);
    }
    /**
     * Отчистка буфера цвета
     */
    clearColorBuffer() {
        this.context.clear(this.context.COLOR_BUFFER_BIT);
    }
    /**
     * Отчистка буфера глубины
     */
    clearDepthBuffer() {
        this.context.clear(this.context.DEPTH_BUFFER_BIT);
    }
    /**
     * Установка новой области просмотра
     * @param x значение x левого нижнего угла
     * @param y значение y левого нижнего угла
     * @param width значение ширины окна
     * @param height значение высоты окна
     */
    setViewport(x, y, width, height) {
        this.context.viewport(0, 0, width, height);
    }
    /**
     * Создание объекта для хранения вершинного шейдера
     */
    createVertexShader() {
        let result = this.context.createShader(this.context.VERTEX_SHADER);
        //если возникла ошибка во время создания шейдера, то Exception
        if (!result) {
            throw new Error("Ошибка создания вершинного шейдера");
        }
        return result;
    }
    /**
     * Создание объекта для хранения фрагментного шейдера
     */
    createFragmentShader() {
        let result = this.context.createShader(this.context.FRAGMENT_SHADER);
        //если возникла ошибка во время создания шейдера, то Exception
        if (!result) {
            throw new Error("Ошибка создания фрагментного шейдера");
        }
        return result;
    }
    /**
     * Удаление шейдера
     * @param shader
     */
    deleteShader(shader) {
        this.context.deleteShader(shader);
    }
    /**
     * Установка исходного кода для шейдера
     * @param shader шейдер в котором необходимо установить исходный код
     * @param sourceCode исходный код для шейдера
     */
    setShaderSource(shader, sourceCode) {
        this.context.shaderSource(shader, sourceCode);
        this.context.compileShader(shader);
        //если возникла ошибка при компиляции шейдера, то подсказка будет в консоли
        if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
            const shaderLog = this.context.getShaderInfoLog(shader);
            this.deleteShader(shader);
            throw new Error(shaderLog !== null && shaderLog !== void 0 ? shaderLog : "Ошибка компиляции шейдера");
        }
    }
    /**
     * Создание программы
     */
    createProgram() {
        let result = this.context.createProgram();
        //если возникла ошибка во время создания программы, то Exception
        if (!result) {
            throw new Error("Ошибка создания программы");
        }
        return result;
    }
    /**
     * Удаление программы
     */
    deleteProgram(program) {
        this.context.deleteProgram(program);
    }
    /**
     * Прикрепление шейдера к программе
     * @param program шейдерная программа
     * @param shader шейдер для прикрепления к программе
     */
    attachShader(program, shader) {
        this.context.attachShader(program, shader);
    }
    /**
     * Связывание программы с шейдерами
     * @param program
     */
    linkProgram(program) {
        this.context.linkProgram(program);
        //если возникла ошибка при связывании шейдеров с программой, то подсказка будет в консоли
        if (!this.context.getProgramParameter(program, this.context.LINK_STATUS)) {
            const programLog = this.context.getProgramInfoLog(program);
            throw new Error(programLog !== null && programLog !== void 0 ? programLog : "Ошибка связывания программы с шейдерами");
        }
    }
    /**
     * Установка программы как часть текущего состояния рендеринга
     * @param program программа для использования
     */
    useProgram(program) {
        this.context.useProgram(program);
    }
    /**
     * Удаление программы из текущего состояния рендеринга
     */
    removeProgram() {
        this.context.useProgram(null);
    }
    /**
     * Создание VAO
     */
    createVertexArray() {
        let result = this.context.createVertexArray();
        //если возникла ошибка во время создания VAO, то Exception
        if (!result) {
            throw new Error("Ошибка создания VAO");
        }
        return result;
    }
    /**
     * Удаление VAO
     * @param vao
     */
    deleteVertexArray(vao) {
        this.context.deleteVertexArray(vao);
    }
    /**
     * Связывание VAO с массивом имен
     * @param vao
     */
    bindVertexArray(vao) {
        this.context.bindVertexArray(vao);
    }
    /**
     * Отвязывание VAO от массива имен
     */
    unbindVertexArray() {
        this.context.bindVertexArray(null);
    }
    /**
     * Создание текстуры
     */
    createTexture() {
        const result = this.context.createTexture();
        //если возникла ошибка во время создания текстуры, то Exception
        if (!result) {
            throw new Error("Ошибка создания текстуры");
        }
        return result;
    }
    /**
     * Создание буфера кадров
     */
    createFrameBuffers() {
        const result = this.context.createFramebuffer();
        //если возникла ошибка во время создания буфера, то Exception
        if (!result) {
            throw new Error("Ошибка создания буфера кадра");
        }
        return result;
    }
    textImage2DRGBA8Ubyte(level, width, height, border, pixels) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.RGBA8, width, height, border, this.context.RGBA, this.context.UNSIGNED_BYTE, pixels);
    }
    textImage2DDepth24Stencil8Uint24_8(level, width, height, border, pixels) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.DEPTH24_STENCIL8, width, height, border, this.context.DEPTH_STENCIL, this.context.UNSIGNED_INT_24_8, pixels);
    }
    /**
     * Удаление буфера кадров
     * @param frameBuffer
     */
    deleteFrameBuffer(frameBuffer) {
        this.context.deleteFramebuffer(frameBuffer);
    }
    /**
     * Связать буфер кадров с целью буфера кадров
     */
    bindFrameBuffer(frameBuffer) {
        this.context.bindFramebuffer(this.context.FRAMEBUFFER, frameBuffer);
    }
    /**
     * Отвязать буфер кадров от цели буфера кадров
     */
    unbindFrameBuffer() {
        this.context.bindFramebuffer(this.context.FRAMEBUFFER, null);
    }
    checkFrameBufferStatusComplete() {
        if (this.context.checkFramebufferStatus(this.context.FRAMEBUFFER) !== this.context.FRAMEBUFFER_COMPLETE) {
            throw new Error("Буфер кадров не готов");
        }
    }
    frameBufferTexture2DColorAttachment0(texture, level) {
        this.context.framebufferTexture2D(this.context.FRAMEBUFFER, this.context.COLOR_ATTACHMENT0, this.context.TEXTURE_2D, texture, level);
    }
    frameBufferTexture2DDepthStencilAttachment(texture, level) {
        this.context.framebufferTexture2D(this.context.FRAMEBUFFER, this.context.DEPTH_STENCIL_ATTACHMENT, this.context.TEXTURE_2D, texture, level);
    }
    texStorage2DDepth24Stencil8(levels, width, height) {
        this.context.texStorage2D(this.context.TEXTURE_2D, levels, this.context.DEPTH24_STENCIL8, width, height);
    }
    /**
     * Удаление текстуры
     */
    deleteTexture(texture) {
        this.context.deleteTexture(texture);
    }
    /**
     * Отвязывание текстуры от цели текстурирования
     */
    unbindTexture2D() {
        this.context.bindTexture(this.context.TEXTURE_2D, null);
    }
    /**
     * Связывание текстуры к цели текстурирования
     * @param texture текстура для связывания
     */
    bindTexture2D(texture) {
        this.context.bindTexture(this.context.TEXTURE_2D, texture);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriMinFilterLinear() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.LINEAR);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriMagFilterLinear() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.LINEAR);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriMagFilterNearest() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.NEAREST);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriWrapSClampToEdge() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
    }
    /**
     * Установка параметра для текстуры
     */
    tex2DParameteriWrapTClampToEdge() {
        this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
    }
    texImage2DRGBAUbyteWithPixels(level, texture, pixels) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.RGBA8, texture.width, texture.height, 0, this.context.RGBA, this.context.UNSIGNED_BYTE, pixels);
    }
    /**
     * Установка 2D изображение текстуры
     * @param level уровень детализации
     * @param texture изображение текстуры
     */
    texImage2DRGBAUbyte(level, texture) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.RGBA8, texture.width, texture.height, 0, this.context.RGBA, this.context.UNSIGNED_BYTE, texture);
    }
    /**
     * Установка 2D изображение текстуры
     * @param level уровень детализации
     * @param texture изображение текстуры
     */
    texImage2DRGBUbyte(level, texture) {
        this.context.texImage2D(this.context.TEXTURE_2D, level, this.context.RGB8, texture.width, texture.height, 0, this.context.RGB, this.context.UNSIGNED_BYTE, texture);
    }
    /**
     * Генерация MIM карты для указанной цели текстурирования
     */
    generateMipmap2D() {
        this.context.generateMipmap(this.context.TEXTURE_2D);
    }
    /**
     * Создание буфера
     */
    createBuffer() {
        const result = this.context.createBuffer();
        //если возникла ошибка во время создания буфера, то Exception
        if (!result) {
            throw new Error("Ошибка создания буфера");
        }
        return result;
    }
    /**
     * Удаление буфера
     * @param buffer буфер для удаления
     */
    deleteBuffer(buffer) {
        this.context.deleteBuffer(buffer);
    }
    /**
     * Связывание объекта буфера с атрибутами вершин
     * @param vbo буфер который необходимо связать
     */
    bindArrayBuffer(vbo) {
        this.context.bindBuffer(this.context.ARRAY_BUFFER, vbo);
    }
    /**
     * Отвязывание объекта буфера от атрибутов вершин
     */
    unbindArrayBuffer() {
        this.context.bindBuffer(this.context.ARRAY_BUFFER, null);
    }
    /**
     * Связывание объекта буфера с элементами атрибутов вершин
     * @param vbo буфер который необходимо связать
     */
    bindElementArrayBuffer(vbo) {
        this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, vbo);
    }
    /**
     * Создание нового динамического хранилища данных для буфера
     * @param size размер буфера
     */
    arrayBufferDynamicData(size) {
        this.context.bufferData(this.context.ARRAY_BUFFER, size, this.context.DYNAMIC_DRAW);
    }
    /**
     * Размер используемого буфера
     */
    getArrayBufferSize() {
        return this.context.getBufferParameter(this.context.ARRAY_BUFFER, this.context.BUFFER_SIZE);
    }
    /**
     * Обновление хранилища данных
     * @param data
     */
    arrayBufferSubData(data) {
        this.context.bufferSubData(this.context.ARRAY_BUFFER, 0, data);
    }
    /**
     * Создание нового статического хранилища данных для буфера с атрибутами вершин
     * @param data массив данных
     */
    arrayBufferStaticData(data) {
        this.context.bufferData(this.context.ARRAY_BUFFER, data, this.context.STATIC_DRAW);
    }
    /**
     * Создание нового статического хранилища данных для буфера с элементами атрибутов вершин
     * @param data массив данных
     */
    elementArrayBufferStaticData(data) {
        this.context.bufferData(this.context.ELEMENT_ARRAY_BUFFER, data, this.context.STATIC_DRAW);
    }
    /**
     * Включение массива атрибутов вершин по указанному индексу
     * @param index индекс для включения
     */
    enableVertexAttribArray(index) {
        this.context.enableVertexAttribArray(index);
    }
    /**
     * Выключение массива атрибутов вершин по указанному индексу
     * @param index индекс для выключения
     */
    disableVertexAttribArray(index) {
        this.context.disableVertexAttribArray(index);
    }
    vertexAttribDivisor(index, divisor) {
        this.context.vertexAttribDivisor(index, divisor);
    }
    /**
     * Определение массива данных типа Float атрибутов вершин
     * @param index индекс на котором будет расположен массив данных
     * @param size количество компонентов на компонент (если в массиве на одну точку приходиться координаты x, y, z, то size должен быть равен 3)
     * @param normalized
     * @param stride шаг от одного атрибута к другом (если все идет по порядку (x1, y1, z1, x2, y2, z2, ...), то stride должен быть равен 0)
     * @param offset смещение первого компонента
     */
    vertexAttribPointerFloat(index, size, normalized, stride, offset) {
        this.context.vertexAttribPointer(index, size, this.context.FLOAT, normalized, stride, offset);
    }
    /**
     * Определение массива данных типа UNSIGNED_INT атрибутов вершин
     * @param index индекс на котором будет расположен массив данных
     * @param size количество компонентов на компонент (если в массиве на одну точку приходиться координаты x, y, z, то size должен быть равен 3)
     * @param normalized
     * @param stride шаг от одного атрибута к другом (если все идет по порядку (x1, y1, z1, x2, y2, z2, ...), то stride должен быть равен 0)
     * @param offset смещение первого компонента
     */
    vertexAttribPointerUint(index, size, normalized, stride, offset) {
        this.context.vertexAttribPointer(index, size, this.context.UNSIGNED_INT, normalized, stride, offset);
    }
    /**
     * Визуализация треугольников из VAO
     * @param first начальный индекс
     * @param count количество треугольников для визуализации
     */
    drawTriangleArrays(first, count) {
        this.context.drawArrays(this.context.TRIANGLES, first, count);
    }
    /**
     * Визуализация треугольников из элементов VAO
     * @param count количество треугольников для визуализации
     * @param offset смещение
     */
    drawTriangleElementsUshort(count, offset) {
        this.context.drawElements(this.context.TRIANGLES, count, this.context.UNSIGNED_SHORT, offset);
    }
    /**
     * Визуализация треугольников из элементов VAO
     * @param count количество треугольников для визуализации
     * @param offset смещение
     */
    drawTriangleElementsUint(count, offset) {
        this.context.drawElements(this.context.TRIANGLES, count, this.context.UNSIGNED_INT, offset);
    }
    /**
     * Визуализация линий из элементов VAO
     * @param count количество линий для визуализации
     * @param offset смещение
     */
    drawLineElementsUshort(count, offset) {
        this.context.drawElements(this.context.LINES, count, this.context.UNSIGNED_SHORT, offset);
    }
    /**
     * Получение местоположения униформы в программе
     * @param program программа
     * @param name имя униформы
     */
    getUniformLocation(program, name) {
        const result = this.context.getUniformLocation(program, name);
        //если возникла ошибка во время получение униформы, то Exception
        if (!result) {
            throw new Error("Ошибка получения униформы с именем [ " + name + " ]");
        }
        return result;
    }
    /**
     * Установка данных в униформу для текущего объекта программы
     * @param location положение униформы
     * @param transpose нужно ли транспонировать матрицу
     * @param data данные для установки в униформу
     */
    uniformMatrix4fv(location, transpose, data) {
        this.context.uniformMatrix4fv(location, transpose, data);
    }
    /**
     * Установка данных в униформу для текущего объекта программы
     * @param location положение униформы
     * @param vector вектор с тремя компонентами
     */
    uniform3f(location, vector) {
        this.context.uniform3f(location, vector.getX(), vector.getY(), vector.getZ());
    }
    /**
     * Установка данных в униформу для текущего объекта программы
     * @param location положение униформы
     * @param vector вектор с четырьмя компонентами
     */
    uniform4f(location, vector) {
        this.context.uniform4f(location, vector.getX(), vector.getY(), vector.getZ(), vector.getW());
    }
    /**
     * Установка данных на заданную позицию
     * @param location положение униформы
     * @param values позиции
     */
    uniform1iv(location, values) {
        this.context.uniform1iv(location, new Int32Array(values));
    }
    /**
     * Установка данных на заданную позицию
     * @param location положение униформы
     * @param value позиция
     */
    uniform1i(location, value) {
        this.context.uniform1i(location, value);
    }
    /**
     * Установка данных на заданную позицию
     * @param location положение униформы
     * @param value позиция
     */
    uniformF(location, value) {
        this.context.uniform1f(location, value);
    }
    /**
     * Использование текстурного регистра в слоте
     * @param slot слот который необходимо использовать
     */
    activeTexture(slot) {
        this.context.activeTexture(this.context.TEXTURE0 + slot);
    }
    getVendor() {
        return this.vendor;
    }
    getRenderer() {
        return this.renderer;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/renderer/WebGLContext.ts

class WebGLContext {
    constructor(canvasElement) {
        this.canvasElement = canvasElement;
        const webGLContext = this.canvasElement.getContext("webgl2"); //получение контекста для работы с WebGL
        //если выбранный контекст не проинициализирован, значит либо его не существует, либо браузер не может с ним работать
        if (!webGLContext) {
            throw new Error("Невозможно проинициализировать WebGL. Данный браузер не поддерживает данный контекст [ webgl2 ]");
        }
        //инициализация объекта WebGL с выбранным контекстом
        this.gl = new WebGLExt(webGLContext //выбранный контекст
        );
    }
    init() {
    }
    setViewport(x, y, width, height) {
        this.gl.setViewport(x, y, width, height);
    }
    printDebugInfo() {
        console.log("Vendor: " + this.gl.getVendor());
        console.log("Renderer: " + this.gl.getRenderer());
    }
    getGL() {
        return this.gl;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/factories/GraphicsContextFactory.ts



class GraphicsContextFactory {
    static createContext(canvasElement) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: return new WebGLContext(canvasElement);
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/support/Random.ts
class Random {
    static uuid() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => {
            const value = Number(c);
            const randomValue = value ^ crypto.getRandomValues(new Uint8Array(1))[0];
            const modRandomValue = randomValue & 15;
            return (modRandomValue >> value / 4).toString(16);
        });
    }
    static int(maxValue) {
        return Math.floor(Math.random() * maxValue);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/resource/WebGL2DTexture.ts

class WebGL2DTexture {
    constructor(gl, image, channels, isEmpty = false) {
        this.gl = gl;
        this.id = Random.uuid();
        this.image = image;
        this.texture = this.gl.createTexture();
        if (isEmpty) {
            this.prepareTexture();
            this.gl.texImage2DRGBAUbyteWithPixels(0, image, new Uint8Array([255, 255, 255, 255]));
            return;
        }
        const listener = () => {
            this.prepareTexture();
            if (channels === 4) {
                this.gl.texImage2DRGBAUbyte(0, image);
            }
            if (channels === 3) {
                this.gl.texImage2DRGBUbyte(0, image);
            }
            image.removeEventListener("load", listener);
        };
        image.addEventListener("load", listener);
    }
    bind(slot) {
        this.gl.activeTexture(slot);
        this.gl.bindTexture2D(this.texture);
    }
    unbind() {
        this.gl.unbindTexture2D();
    }
    clean() {
        this.gl.deleteTexture(this.texture);
    }
    equal(other) {
        return this.id === other.getId();
    }
    prepareTexture() {
        this.gl.bindTexture2D(this.texture);
        this.gl.tex2DParameteriMinFilterLinear();
        this.gl.tex2DParameteriMagFilterNearest();
        this.gl.tex2DParameteriWrapSClampToEdge();
        this.gl.tex2DParameteriWrapTClampToEdge();
    }
    getHeight() {
        return this.image.height;
    }
    getId() {
        return this.id;
    }
    getWidth() {
        return this.image.width;
    }
    getImage() {
        return this.image;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/resource/Sprite2D.ts

class Sprite2D {
    constructor(texture) {
        this.texture = texture;
        this.coordinates = new Array(4);
        this.coordinates[0] = new Vector2(0, 0);
        this.coordinates[1] = new Vector2(0, 0);
        this.coordinates[2] = new Vector2(0, 0);
        this.coordinates[3] = new Vector2(0, 0);
    }
    updateCoordinates(bottomLeft, topRight) {
        this.coordinates[0] = new Vector2(bottomLeft.getX(), bottomLeft.getY());
        this.coordinates[1] = new Vector2(topRight.getX(), bottomLeft.getY());
        this.coordinates[2] = new Vector2(topRight.getX(), topRight.getY());
        this.coordinates[3] = new Vector2(bottomLeft.getX(), topRight.getY());
    }
    getTexture() {
        return this.texture;
    }
    getCoordinates() {
        return this.coordinates;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/factories/ResourceFactory.ts





class ResourceFactory {
    static create2DFullWhiteTexture(graphicsContext) {
        const image = new Image(1, 1);
        return ResourceFactory.create2DTexture(graphicsContext, image, 4, true);
    }
    static create2DTexture(graphicsContext, image, channels, isEmpty = false) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGL2DTexture(gl, image, channels, isEmpty);
            }
        }
    }
    static createSprite2D(texture, coords, textureSize, size = new Vector2(1, 1)) {
        const result = new Sprite2D(texture);
        const offset = 0.5; //чтобы не было пересечения смежных текстур
        if (texture.getWidth() === 0 || texture.getHeight() === 0) {
            const listener = () => {
                ResourceFactory.updateSpriteCoordinates(result, coords, textureSize, size, texture, offset);
                texture.getImage().removeEventListener("load", listener);
            };
            texture.getImage().addEventListener("load", listener);
        }
        else {
            ResourceFactory.updateSpriteCoordinates(result, coords, textureSize, size, texture, offset);
        }
        return result;
    }
    static updateSpriteCoordinates(sprite, coords, textureSize, size, texture, offset) {
        const bottomLeftX = (coords.getX() * textureSize.getX() + offset) / texture.getWidth();
        const bottomLeftY = (coords.getY() * textureSize.getY() + offset) / texture.getHeight();
        const bottomLeft = new Vector2(bottomLeftX, bottomLeftY);
        const topRightX = ((coords.getX() + size.getX()) * textureSize.getX() - offset) / texture.getWidth();
        const topRightY = ((coords.getY() + size.getY()) * textureSize.getY() - offset) / texture.getHeight();
        const topRight = new Vector2(topRightX, topRightY);
        sprite.updateCoordinates(bottomLeft, topRight);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/buffer/BufferLayout.ts
class BufferLayout {
    constructor(elements) {
        this.elements = elements;
        this.stride = 0;
        this.calculateStride();
    }
    getElements() {
        return this.elements;
    }
    getStride() {
        return this.stride;
    }
    sizeof() {
        let result = 0;
        for (const element of this.elements) {
            result += element.size;
        }
        return result;
    }
    calculateStride() {
        let offset = 0;
        for (const element of this.elements) {
            element.offset = offset;
            offset += element.size;
            this.stride += element.size;
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/buffer/BufferElement.ts
function NewBufferElement(type, name, normalized = false) {
    return {
        type: type,
        name: name,
        size: type.valueOf(),
        offset: 0,
        normalized: normalized
    };
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/renderer/RendererStatistics.ts
class RendererStatistics {
    constructor() {
        this.drawMethodCallsCount = 0;
        this.quadsCount = 0;
        this.textureSlotsCount = 0;
    }
    increaseDrawMethodCallsCount() {
        this.drawMethodCallsCount++;
    }
    increaseQuadsCount() {
        this.quadsCount++;
    }
    increaseTextureSlotsCount() {
        this.textureSlotsCount++;
    }
    reset() {
        this.drawMethodCallsCount = 0;
        this.quadsCount = 0;
    }
    getDrawMethodCallsCount() {
        return this.drawMethodCallsCount;
    }
    getQuadsCount() {
        return this.quadsCount;
    }
    getTextureSlotsCount() {
        return this.textureSlotsCount;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/renderer/Renderer2D.ts










class Renderer2D {
    constructor() {
        this.quadVertexBuffer = new Float32Array(0);
        this.quadVertexBufferIndex = 0;
        this.quadIndexCount = 0;
        this.textureSlots = new Array(Renderer2D.maxTextureSlots);
        this.textureSlotIndex = 1;
        this.quadPositions = [
            new Vector4(-0.5, -0.5, 0.0, 1.0),
            new Vector4(0.5, -0.5, 0.0, 1.0),
            new Vector4(0.5, 0.5, 0.0, 1.0),
            new Vector4(-0.5, 0.5, 0.0, 1.0)
        ];
        this.textureCoordinates = [
            new Vector2(0.0, 0.0),
            new Vector2(1.0, 0.0),
            new Vector2(1.0, 1.0),
            new Vector2(0.0, 1.0)
        ];
        this.statistics = new RendererStatistics();
    }
    init(context, shaderProgram) {
        this.shaderProgram = shaderProgram;
        this.whiteColor = new Vector4(1.0, 1.0, 1.0, 1.0);
        this.whiteTexture = ResourceFactory.create2DFullWhiteTexture(context);
        this.initImpl();
        const bufferLayout = new BufferLayout([
            NewBufferElement(ShaderDataType.FLOAT_3, "a_Position"),
            NewBufferElement(ShaderDataType.FLOAT_4, "a_Color"),
            NewBufferElement(ShaderDataType.FLOAT_2, "a_TextureCoordinate"),
            NewBufferElement(ShaderDataType.FLOAT_1, "a_TextureIndex"),
            NewBufferElement(ShaderDataType.FLOAT_3, "a_Translate"),
            NewBufferElement(ShaderDataType.FLOAT_3, "a_Rotation"),
            NewBufferElement(ShaderDataType.FLOAT_3, "a_Scale"),
        ]);
        this.vertexBuffer = BufferFactory.createFloat32VertexDynamicBuffer(context, Renderer2D.maxVertices * bufferLayout.sizeof());
        this.vertexBuffer.setLayout(bufferLayout);
        this.quadVertexBuffer = new Float32Array(Renderer2D.maxVertices * bufferLayout.sizeof());
        const indexes = new Uint16Array(Renderer2D.maxIndices);
        let offset = 0;
        for (let i = 0; i < indexes.length; i += 6) {
            indexes[i] = offset;
            indexes[i + 1] = offset + 1;
            indexes[i + 2] = offset + 2;
            indexes[i + 3] = offset + 2;
            indexes[i + 4] = offset + 3;
            indexes[i + 5] = offset;
            offset += 4;
        }
        const indexBuffer = BufferFactory.createUint16IndexStaticBuffer(context, indexes);
        this.vertexArray = BufferFactory.createVertexArrayBuffer(context);
        this.vertexArray.addVertexBuffer(this.vertexBuffer);
        this.vertexArray.setIndexBuffer(indexBuffer);
        this.vertexArray.unbind();
        this.vertexBuffer.unbind();
        indexBuffer.unbind();
        const samplers = new Array(Renderer2D.maxTextureSlots);
        for (let i = 0; i < Renderer2D.maxTextureSlots; i++) {
            samplers[i] = i;
        }
        this.shaderProgram.bind();
        this.shaderProgram.setValueArrayI("u_Textures", samplers);
        this.shaderProgram.unbind();
        this.textureSlots[0] = this.whiteTexture;
        this.statistics.increaseTextureSlotsCount();
    }
    begin(camera) {
        this.shaderProgram.bind();
        this.shaderProgram.setMatrix4f("u_ViewProjectionMatrix", camera.getViewProjectionMatrix());
        this.quadIndexCount = 0;
        this.quadVertexBufferIndex = 0;
        this.textureSlotIndex = 1;
    }
    drawQuadWithColor(position, rotation, scale, color) {
        this.drawQuad(position, rotation, scale, color, this.whiteTexture, this.textureCoordinates);
    }
    drawQuadWithTexture(position, rotation, scale, texture) {
        this.drawQuad(position, rotation, scale, this.whiteColor, texture, this.textureCoordinates);
    }
    drawQuadWithSprite(position, rotation, scale, sprite) {
        this.drawQuad(position, rotation, scale, this.whiteColor, sprite.getTexture(), sprite.getCoordinates());
    }
    drawQuad(position, rotation, scale, color, texture, textureCoordinates) {
        if (this.quadIndexCount >= Renderer2D.maxIndices) {
            this.newBatch();
        }
        let textIndex = -1;
        for (let i = 0; this.textureSlotIndex; i++) {
            if (!this.textureSlots[i]) {
                break;
            }
            if (this.textureSlots[i].equal(texture)) {
                textIndex = i;
                break;
            }
        }
        if (textIndex === -1) {
            textIndex = this.textureSlotIndex;
            this.textureSlots[this.textureSlotIndex] = texture;
            this.statistics.increaseTextureSlotsCount();
            this.textureSlotIndex++;
        }
        const rotationInRadians = new Vector3(Transformation.degreesToRadians(rotation.getX()), Transformation.degreesToRadians(rotation.getY()), Transformation.degreesToRadians(rotation.getZ()));
        this.fillQuadVertexBuffer(this.quadPositions[0], color, textureCoordinates[0], textIndex, position, rotationInRadians, scale);
        this.fillQuadVertexBuffer(this.quadPositions[1], color, textureCoordinates[1], textIndex, position, rotationInRadians, scale);
        this.fillQuadVertexBuffer(this.quadPositions[2], color, textureCoordinates[2], textIndex, position, rotationInRadians, scale);
        this.fillQuadVertexBuffer(this.quadPositions[3], color, textureCoordinates[3], textIndex, position, rotationInRadians, scale);
        this.quadIndexCount += 6;
        this.statistics.increaseQuadsCount();
    }
    end() {
        this.vertexBuffer.setFloat32Data(this.quadVertexBuffer.subarray(0, this.quadVertexBufferIndex));
        this.vertexArray.bind();
        for (let i = 0; i < Renderer2D.maxTextureSlots; i++) {
            const textureSlot = this.textureSlots[i];
            if (!textureSlot) {
                break;
            }
            textureSlot.bind(i);
        }
        this.drawTrianglesImpl(this.vertexArray, this.quadIndexCount);
        this.statistics.increaseDrawMethodCallsCount();
    }
    newBatch() {
        this.end();
        this.quadIndexCount = 0;
        this.quadVertexBufferIndex = 0;
        this.textureSlotIndex = 1;
    }
    fillQuadVertexBuffer(position, color, textureCoordinates, textureIndex, translate, rotation, scale) {
        this.quadVertexBuffer[this.quadVertexBufferIndex] = position.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 1] = position.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 2] = position.getZ();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 3] = color.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 4] = color.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 5] = color.getZ();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 6] = color.getW();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 7] = textureCoordinates.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 8] = textureCoordinates.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 9] = textureIndex;
        this.quadVertexBuffer[this.quadVertexBufferIndex + 10] = translate.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 11] = translate.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 12] = translate.getZ();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 13] = rotation.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 14] = rotation.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 15] = rotation.getZ();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 16] = scale.getX();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 17] = scale.getY();
        this.quadVertexBuffer[this.quadVertexBufferIndex + 18] = scale.getZ();
        this.quadVertexBufferIndex += 19;
    }
    getStatics() {
        return this.statistics;
    }
    resetStatistics() {
        this.statistics.reset();
    }
    clean() {
        this.vertexBuffer.clean();
        this.vertexArray.clean();
        for (const textureSlot of this.textureSlots) {
            if (!textureSlot) {
                break;
            }
            textureSlot.clean();
        }
        this.shaderProgram.clean();
    }
}
Renderer2D.maxQuads = 10000;
Renderer2D.maxVertices = Renderer2D.maxQuads * 4;
Renderer2D.maxIndices = Renderer2D.maxQuads * 6;
Renderer2D.maxTextureSlots = 16;

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/renderer/WebGL2DRenderer.ts

class WebGL2DRenderer extends Renderer2D {
    constructor(gl) {
        super();
        this.gl = gl;
    }
    clear() {
        this.gl.clearColorBuffer();
        this.gl.clearDepthBuffer();
    }
    setClearColor(color) {
        this.gl.clearColor(color.getX(), color.getY(), color.getZ(), color.getW());
    }
    drawTrianglesImpl(arrayBuffer, indexCount = 0) {
        const count = indexCount === 0 ? arrayBuffer.getCount() : indexCount;
        this.gl.drawTriangleElementsUshort(count, 0);
    }
    initImpl() {
        this.gl.enableDepthTest(); //включение проверки удаленности объектов
        this.gl.enableBlend(); //включение смешивания пикселей
        this.gl.blendFuncSrcAlphaOneMinusSrcAlpha(); //включение прозрачности
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/factories/RendererFactory.ts



class RendererFactory {
    static create2D(graphicsContext) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                return new WebGL2DRenderer(gl);
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/shader/WebGLVertexShader.ts
class WebGLVertexShader {
    constructor(gl, code) {
        this.gl = gl;
        this.vs = this.gl.createVertexShader();
        this.gl.setShaderSource(this.vs, code);
    }
    getShader() {
        return this.vs;
    }
    clean() {
        this.gl.deleteShader(this.vs);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/shader/WebGLFragmentShader.ts
class WebGLFragmentShader {
    constructor(gl, code) {
        this.gl = gl;
        this.vs = this.gl.createFragmentShader();
        this.gl.setShaderSource(this.vs, code);
    }
    getShader() {
        return this.vs;
    }
    clean() {
        this.gl.deleteShader(this.vs);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/api/gl/shader/WebGLShaderProgram.ts
class WebGLShaderProgram {
    constructor(gl, name, vertexShader, fragmentShader) {
        this.locationsCache = new Map();
        this.gl = gl;
        this.name = name;
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vertexShader.getShader());
        this.gl.attachShader(this.program, this.fragmentShader.getShader());
        this.gl.linkProgram(this.program);
        this.vertexShader.clean();
        this.fragmentShader.clean();
    }
    getName() {
        return this.name;
    }
    bind() {
        this.gl.useProgram(this.program);
    }
    unbind() {
        this.gl.removeProgram();
    }
    setVector3f(name, vector) {
        this.gl.uniform3f(this.getUniformLocation(name), vector);
    }
    setVector4f(name, vector) {
        this.gl.uniform4f(this.getUniformLocation(name), vector);
    }
    setValue1i(name, value) {
        this.gl.uniform1i(this.getUniformLocation(name), value);
    }
    setValueArrayI(name, values) {
        this.gl.uniform1iv(this.getUniformLocation(name), values);
    }
    setMatrix4f(name, matrix) {
        this.gl.uniformMatrix4fv(this.getUniformLocation(name), false, new Float32Array(matrix.getArray()));
    }
    getUniformLocation(name) {
        let location = this.locationsCache.get(name);
        if (!location) {
            location = this.gl.getUniformLocation(this.program, name);
            this.locationsCache.set(name, location);
        }
        return location;
    }
    clean() {
        this.vertexShader.clean();
        this.fragmentShader.clean();
        this.gl.deleteProgram(this.program);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/factories/ShaderProgramFactory.ts





class ShaderProgramFactory {
    static createProgram(graphicsContext, programName, vertexShaderCode, fragmentShaderCode) {
        switch (Renderer.getAPI()) {
            case RendererAPI.WEB_GL: {
                const gl = graphicsContext.getGL();
                const vertexShader = new WebGLVertexShader(gl, vertexShaderCode);
                const fragmentShader = new WebGLFragmentShader(gl, fragmentShaderCode);
                return new WebGLShaderProgram(gl, programName, vertexShader, fragmentShader);
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/graphics/GraphicsElement.ts

/**
 * Класс для создания нового графического элемента и взаимодействия с ним
 */
class GraphicsElement {
    /**
     * Конструктор для создания объекта графического элемента в родительском элементе
     * @param parentElement родительский элемент
     */
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.canvasElement = document.createElement("canvas"); //создание вэб элемента canvas
        this.canvasElement.style.display = "block";
        this.canvasElement.style.width = "100%";
        this.canvasElement.style.height = "100%";
        //запрет на получение контекст меню при нажатии на правую кнопку мыши, так как права кнопка мыши может быть использована для вращения камерой
        this.canvasElement.oncontextmenu = function () {
            return false;
        };
        this.graphicsContext = GraphicsContextFactory.createContext(this.canvasElement);
    }
    /**
     * Проверка на то что графического элемента уже не существует
     */
    notExist() {
        return this.canvasElement.offsetParent == null;
    }
    /**
     * Инициализация графического элемента
     */
    init() {
        this.embedToElement();
        this.graphicsContext.init();
    }
    /**
     * Отрисовка графического элемента
     */
    render() {
    }
    /**
     * Получение объекта графического контекста
     */
    getGraphicsContext() {
        return this.graphicsContext;
    }
    /**
     * Получение ширины графического элемента
     */
    getWidth() {
        return this.canvasElement.width;
    }
    /**
     * Получение высоты графического элемента
     */
    getHeight() {
        return this.canvasElement.height;
    }
    /**
     * Обновление графического элемента
     */
    update() {
    }
    /**
     * Уничтожение графического элемента
     */
    destroy() {
        this.canvasElement.remove();
    }
    getCanvasElement() {
        return this.canvasElement;
    }
    /**
     * Встраивание графического элемента (canvas) в родительский элемент
     * @private
     */
    embedToElement() {
        this.parentElement.append(this.canvasElement); //встраивание canvas элемента внутрь родительского
        this.resize(); //заполнение canvas элемента под размер родительского
    }
    /**
     * Обновление области просмотра
     * @private
     */
    updateViewport() {
        this.graphicsContext.setViewport(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
    /**
     * Обновление размеров canvas элемента
     */
    resize() {
        this.canvasElement.width = this.parentElement.offsetWidth; //задание длины для canvas элемента таким же как у родительского, таким образом canvas всегда будет занимать все пространство родительского элемента
        this.canvasElement.height = this.parentElement.offsetHeight; //задание высоты для canvas элемента таким же как у родительского, таким образом canvas всегда будет занимать все пространство родительского элемента
        this.updateViewport();
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/graphics/GraphicsApplication.ts

/**
 * Класс графического приложения
 */
class GraphicsApplication {
    /**
     * Конструктор для создания объекта графического приложения
     */
    constructor(parentElement) {
        this.graphicElement = new GraphicsElement(parentElement);
        this.frame = 0;
        this.shouldBeClosed = false;
    }
    /**
     * Запуск графического приложения
     */
    start() {
        this.init();
        this.startNewFrame();
    }
    /**
     * Остановка графического приложения
     */
    stop() {
        this.shouldBeClosed = true;
    }
    /**
     * Инициализация графического приложения внутри родительского вэб элемента
     */
    init() {
        this.graphicElement.init();
    }
    /**
     * Отправить запрос на отрисовку нового кадра
     * @private
     */
    startNewFrame() {
        if (this.graphicElement.notExist() || this.shouldBeClosed) {
            window.cancelAnimationFrame(this.frame);
            this.clean();
            return;
        }
        this.frame = window.requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
    /**
     * Цикл рендеринга
     * @param timestamp времени с момента старта цикла
     * @private
     */
    loop(timestamp) {
        this.input();
        this.update(timestamp);
        this.render();
        this.endFrame();
        this.startNewFrame();
    }
    /**
     * Обработка ввода
     */
    input() {
    }
    /**
     * Обновление кадра
     * @param timestamp времени с момента старта цикла
     */
    update(timestamp) {
        this.graphicElement.update();
    }
    /**
     * Отрисовка кадра
     */
    render() {
        this.graphicElement.render();
    }
    /**
     * Завершить отрисовку кадра
     * @private
     */
    endFrame() {
    }
    /**
     * Отчистка ресурсов графического приложения
     */
    clean() {
        this.graphicElement.destroy();
    }
    getGraphicsElement() {
        return this.graphicElement;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/shader/ShaderProgramLibrary.ts
class ShaderProgramLibrary {
    constructor() {
        this.shaderPrograms = new Map();
    }
    add(shaderProgram) {
        this.shaderPrograms.set(shaderProgram.getName(), shaderProgram);
    }
    get(name) {
        const result = this.shaderPrograms.get(name);
        if (!result) {
            throw new Error("Shader program by name [ " + name + " ] not found in library");
        }
        return result;
    }
    clean() {
        this.shaderPrograms.clear();
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/support/Default2DShader.ts
class Default2DShader {
    static getVertexShader() {
        return `#version 300 es
				layout (location = 0) in vec4 a_Position;
				layout (location = 1) in vec4 a_Color;
				layout (location = 2) in vec2 a_TextCoord;
				layout (location = 3) in float a_TextIndex;
				layout (location = 4) in vec3 a_Translate;
				layout (location = 5) in vec3 a_Rotation;
				layout (location = 6) in vec3 a_Scale;
				
				out vec4 v_Color;
				out vec2 v_TextCoord;
				out float v_TextIndex;
				
				uniform mat4 u_ViewProjectionMatrix;
				
				mat4 getWorldMatrix() {
					mat4 translationMatrix = mat4(1.0);
					
					translationMatrix[3] = vec4(a_Translate, 1.0);
					
					mat4 rotationMatrixX = mat4(
						1.0, 0.0, 0.0, 0.0,
						0.0, cos(a_Rotation.x), -sin(a_Rotation.x), 0.0,
						0.0, sin(a_Rotation.x), cos(a_Rotation.x), 0.0,
						0.0, 0.0, 0.0, 1.0
					);
					
					mat4 rotationMatrixY = mat4(
						cos(a_Rotation.y), 0.0, sin(a_Rotation.y), 0.0,
						0.0, 1.0, 0.0, 0.0,
						-sin(a_Rotation.y), 0.0, cos(a_Rotation.y), 0.0,
						0.0, 0.0, 0.0, 1.0
					);
					
					mat4 rotationMatrixZ = mat4(
						cos(a_Rotation.z), -sin(a_Rotation.z), 0.0, 0.0,
						sin(a_Rotation.z), cos(a_Rotation.z), 0.0, 0.0,
						0.0, 0.0, 1.0, 0.0,
						0.0, 0.0, 0.0, 1.0
					);
					
					mat4 scaleMatrix = mat4(
						a_Scale.x, 0.0, 0.0, 0.0,
						0.0, a_Scale.y, 0.0, 0.0,
						0.0, 0.0, a_Scale.z, 0.0,
						0.0, 0.0, 0.0, 1.0
					);
				
					return translationMatrix * rotationMatrixX * rotationMatrixY * rotationMatrixZ * scaleMatrix;
				}
				
				void main() {
					v_TextCoord = vec2(a_TextCoord.x, 1.0f - a_TextCoord.y);
					v_TextIndex = a_TextIndex;
					v_Color = a_Color;
					
					mat4 worldMatrix = getWorldMatrix();
					gl_Position = u_ViewProjectionMatrix * worldMatrix * a_Position;
				}`;
    }
    static getFragmentShader() {
        return `#version 300 es
				precision lowp float; //модификатор точности для фрагментного шейдера
				
				in vec4 v_Color;
				in vec2 v_TextCoord;
				in float v_TextIndex;
				
				uniform sampler2D u_Textures[16];
				
				out vec4 fragColor; //выходная переменная итогового цвета
				
				vec4 getColorByTexture() {
					int index = int(v_TextIndex);
					
					//amd, intel, nvidia support
					switch (index) {
						case 0: return texture(u_Textures[0], v_TextCoord);
						case 1: return texture(u_Textures[1], v_TextCoord);
						case 2: return texture(u_Textures[2], v_TextCoord);
						case 3: return texture(u_Textures[3], v_TextCoord);
						case 4: return texture(u_Textures[4], v_TextCoord);
						case 5: return texture(u_Textures[5], v_TextCoord);
						case 6: return texture(u_Textures[6], v_TextCoord);
						case 7: return texture(u_Textures[7], v_TextCoord);
						case 8: return texture(u_Textures[8], v_TextCoord);
						case 9: return texture(u_Textures[9], v_TextCoord);
						case 10: return texture(u_Textures[10], v_TextCoord);
						case 11: return texture(u_Textures[11], v_TextCoord);
						case 12: return texture(u_Textures[12], v_TextCoord);
						case 13: return texture(u_Textures[13], v_TextCoord);
						case 14: return texture(u_Textures[14], v_TextCoord);
						case 15: return texture(u_Textures[15], v_TextCoord);
					};
					
					return vec4(1.0, 1.0, 1.0, 1.0);
				}
				
				void main() {
					fragColor = v_Color * getColorByTexture();
				}`;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/index.ts







































;// CONCATENATED MODULE: ./src/libs/game_engine/src/graphics_engine/namespace/graphics_engine.ts



;// CONCATENATED MODULE: ./src/libs/game_engine/src/Engine.ts




class Engine extends GraphicsApplication {
    constructor(parentElement, api = RendererAPI.WEB_GL) {
        super(parentElement);
        Renderer.setAPI(api);
        this.shaderProgramLibrary = new ShaderProgramLibrary();
        this.layerStack = new BaseLayerStack();
        this.element = new Element(16);
        this.mouse = new Mouse(16);
        this.keyboard = new Keyboard(16);
        this.time = new Time();
        Input.instance = new BaseInput(this.mouse, this.keyboard);
    }
    init() {
        super.init();
        const graphicsElement = this.getGraphicsElement();
        this.element.onResize(graphicsElement.getWidth(), graphicsElement.getHeight());
        const canvasElement = graphicsElement.getCanvasElement();
        this.addMouseListener(canvasElement);
        this.addKeyboardListener(canvasElement);
        this.addElementListener(graphicsElement);
    }
    input() {
        super.input();
        const layers = this.layerStack.getLayers()
            .reverse();
        const mouseEvent = this.mouse.read();
        if (mouseEvent.isValid()) {
            for (let layer of layers) {
                layer.mouseInput(mouseEvent);
            }
        }
        const keyboardEvent = this.keyboard.readKey();
        if (keyboardEvent.isValid()) {
            for (let layer of layers) {
                layer.keyboardInput(keyboardEvent);
            }
        }
        const elementEvent = this.element.read();
        if (elementEvent.isValid()) {
            for (let layer of layers) {
                layer.elementInput(elementEvent);
            }
        }
    }
    update(timestamp) {
        super.update(timestamp);
        this.time.update(timestamp);
        const layers = this.layerStack.getLayers();
        for (let layer of layers) {
            layer.update(this.time);
        }
        this.mouse.updateDirection();
    }
    render() {
        const layers = this.layerStack.getLayers();
        for (let layer of layers) {
            layer.render();
        }
    }
    clean() {
        this.mouse.flush();
        this.keyboard.flush();
        this.element.flush();
        const layers = this.layerStack.getLayers();
        for (let layer of layers) {
            layer.clean();
        }
        this.shaderProgramLibrary.clean();
        Engine.renderer2D.clean();
        super.clean();
    }
    init2DRenderer(shaderProgram = null) {
        const context = this.getContext();
        if (shaderProgram === null) {
            shaderProgram = ShaderProgramFactory.createProgram(context, "2D Default Shader Program", Default2DShader.getVertexShader(), Default2DShader.getFragmentShader());
        }
        this.saveShaderProgram(shaderProgram);
        Engine.renderer2D = RendererFactory.create2D(context);
        Engine.renderer2D.init(context, shaderProgram);
    }
    saveShaderProgram(shaderProgram) {
        this.shaderProgramLibrary.add(shaderProgram);
    }
    pushLayer(layer) {
        this.layerStack.push(layer);
    }
    pushOverlayLayer(layer) {
        this.layerStack.pushOverlay(layer);
    }
    getContext() {
        return this.getGraphicsElement().getGraphicsContext();
    }
    addMouseListener(canvasElement) {
        canvasElement.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.mouse.onLeftKeyPressed(event.offsetX, event.offsetY);
                return;
            }
            if (event.button === 2) {
                this.mouse.onRightKeyPressed(event.offsetX, event.offsetY);
                return;
            }
        });
        canvasElement.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                this.mouse.onLeftKeyReleased(event.offsetX, event.offsetY);
                return;
            }
            if (event.button === 2) {
                this.mouse.onRightKeyReleased(event.offsetX, event.offsetY);
                return;
            }
        });
        canvasElement.addEventListener('mousemove', (event) => this.mouse.onMouseMove(event.offsetX, event.offsetY));
        canvasElement.addEventListener('mouseenter', () => this.mouse.onMouseEnter());
        canvasElement.addEventListener('mouseleave', () => this.mouse.onMouseLeave());
    }
    addKeyboardListener(canvasElement) {
        document.addEventListener("keydown", (event) => this.keyboard.onKeyPressed(event.code), false);
        document.addEventListener("keyup", (event) => this.keyboard.onKeyReleased(event.code), false);
        document.addEventListener("keypress", (event) => this.keyboard.onChar(event.key), false);
    }
    addElementListener(graphicsElement) {
        window.addEventListener("resize", () => {
            graphicsElement.resize();
            this.element.onResize(graphicsElement.getWidth(), graphicsElement.getHeight());
        });
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/Component.ts
class Component {
    constructor(entity) {
        this.entity = entity;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/GameComponent.ts

class GameComponent extends Component {
    constructor(entity) {
        super(entity);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/System.ts
class System {
    constructor() {
        this.components = new Array();
    }
    saveComponent(component) {
        this.components.push(component);
    }
    removeComponent(component) {
        const index = this.components.indexOf(component);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    }
    clean() {
        for (const component of this.components) {
            component.remove();
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/GameSystemComponent.ts

class GameSystemComponent extends System {
    constructor() {
        super();
    }
    update(time) {
        for (const component of this.components) {
            component.update(time);
        }
    }
    render() {
        for (const component of this.components) {
            component.render();
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/ext/TransformSystemComponent.ts

class TransformSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!TransformSystemComponent.instance) {
            TransformSystemComponent.instance = new TransformSystemComponent();
        }
        return TransformSystemComponent.instance;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/ext/TransformComponent.ts



class TransformComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        this.position = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);
        TransformSystemComponent.getInstance().saveComponent(this);
    }
    update(time) {
    }
    render() {
    }
    remove() {
        TransformSystemComponent.getInstance().removeComponent(this);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/ext/TagSystemComponent.ts

class TagSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!TagSystemComponent.instance) {
            TagSystemComponent.instance = new TagSystemComponent();
        }
        return TagSystemComponent.instance;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/ext/TagComponent.ts


class TagComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        TagSystemComponent.getInstance().saveComponent(this);
    }
    remove() {
        TagSystemComponent.getInstance().removeComponent(this);
    }
    render() {
    }
    update(time) {
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/ext/TypeScriptSystemComponent.ts

class TypeScriptSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!TypeScriptSystemComponent.instance) {
            TypeScriptSystemComponent.instance = new TypeScriptSystemComponent();
        }
        return TypeScriptSystemComponent.instance;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/ext/TypeScriptComponent.ts


class TypeScriptComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        this.instanceFn = () => { };
        this.destroyFn = () => { };
        this.onInitFn = () => { };
        this.onUpdateFn = (time) => { };
        this.onDestroyFn = () => { };
        TypeScriptSystemComponent.getInstance().saveComponent(this);
    }
    bind(componentClass) {
        this.instanceFn = () => {
            this.script = new componentClass(this.entity);
        };
        this.destroyFn = () => {
            this.script = null;
            this.instanceFn = () => { };
            this.destroyFn = () => { };
            this.onInitFn = () => { };
            this.onUpdateFn = (time) => { };
            this.onDestroyFn = () => { };
        };
        this.onInitFn = () => {
            this.script.init();
        };
        this.onUpdateFn = (time) => {
            this.script.update(time);
        };
        this.onDestroyFn = () => {
            this.script.destroy();
        };
    }
    remove() {
        this.onDestroyFn();
        this.destroyFn();
        TypeScriptSystemComponent.getInstance().removeComponent(this);
    }
    render() {
    }
    update(time) {
        if (!this.script) {
            this.instanceFn();
            this.onInitFn();
        }
        this.onUpdateFn(time);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/ext/CameraSystemComponent.ts

class CameraSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!CameraSystemComponent.instance) {
            CameraSystemComponent.instance = new CameraSystemComponent();
        }
        return CameraSystemComponent.instance;
    }
    resize(width, height) {
        for (const component of this.components) {
            component.camera.resize(width, height);
        }
    }
    getPrimaryCamera() {
        for (const component of this.components) {
            if (component.primary) {
                return component.camera;
            }
        }
        return null;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/ext/CameraComponent.ts


class CameraComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        CameraSystemComponent.getInstance().saveComponent(this);
    }
    render() {
    }
    update(time) {
        const cameraComponent = this.entity.getComponent(CameraComponent);
        if (cameraComponent.primary) {
            cameraComponent.camera.update();
        }
    }
    remove() {
        CameraSystemComponent.getInstance().removeComponent(this);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/ext/Sprite2DRendererSystemComponent.ts


class Sprite2DRendererSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    saveComponent(component) {
        super.saveComponent(component);
        this.components = this.components.sort((a, b) => {
            const aZ = a.entity.getComponent(TransformComponent).position.getZ();
            const bZ = b.entity.getComponent(TransformComponent).position.getZ();
            return aZ - bZ;
        });
    }
    static getInstance() {
        if (!Sprite2DRendererSystemComponent.instance) {
            Sprite2DRendererSystemComponent.instance = new Sprite2DRendererSystemComponent();
        }
        return Sprite2DRendererSystemComponent.instance;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/ext/Sprite2DRendererComponent.ts




class Sprite2DRendererComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        Sprite2DRendererSystemComponent.getInstance().saveComponent(this);
    }
    update(time) {
    }
    render() {
        const transformComponent = this.entity.getComponent(TransformComponent);
        Engine.renderer2D.drawQuadWithSprite(transformComponent.position, transformComponent.rotation, transformComponent.scale, this.sprite);
    }
    remove() {
        Sprite2DRendererSystemComponent.getInstance().removeComponent(this);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/ext/Texture2DRendererSystemComponent.ts


class Texture2DRendererSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    saveComponent(component) {
        super.saveComponent(component);
        this.components = this.components.sort((a, b) => {
            const aZ = a.entity.getComponent(TransformComponent).position.getZ();
            const bZ = b.entity.getComponent(TransformComponent).position.getZ();
            return aZ - bZ;
        });
    }
    static getInstance() {
        if (!Texture2DRendererSystemComponent.instance) {
            Texture2DRendererSystemComponent.instance = new Texture2DRendererSystemComponent();
        }
        return Texture2DRendererSystemComponent.instance;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/ext/Texture2DRendererComponent.ts




class Texture2DRendererComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        Texture2DRendererSystemComponent.getInstance().saveComponent(this);
    }
    remove() {
        Texture2DRendererSystemComponent.getInstance().removeComponent(this);
    }
    render() {
        const transformComponent = this.entity.getComponent(TransformComponent);
        Engine.renderer2D.drawQuadWithTexture(transformComponent.position, transformComponent.rotation, transformComponent.scale, this.texture);
    }
    update(time) {
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/ext/ColorRendererSystemComponent.ts


class ColorRendererSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    saveComponent(component) {
        super.saveComponent(component);
        this.components = this.components.sort((a, b) => {
            const aZ = a.entity.getComponent(TransformComponent).position.getZ();
            const bZ = b.entity.getComponent(TransformComponent).position.getZ();
            return aZ - bZ;
        });
    }
    static getInstance() {
        if (!ColorRendererSystemComponent.instance) {
            ColorRendererSystemComponent.instance = new ColorRendererSystemComponent();
        }
        return ColorRendererSystemComponent.instance;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/ext/ColorRendererComponent.ts





class ColorRendererComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        this.color = new Vector4(1, 1, 1, 1);
        ColorRendererSystemComponent.getInstance().saveComponent(this);
    }
    update(time) {
    }
    render() {
        const transformComponent = this.entity.getComponent(TransformComponent);
        Engine.renderer2D.drawQuadWithColor(transformComponent.position, transformComponent.rotation, transformComponent.scale, this.color);
    }
    remove() {
        ColorRendererSystemComponent.getInstance().removeComponent(this);
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/system/ext/State2DAnimationMachineSystemComponent.ts

class State2DAnimationMachineSystemComponent extends GameSystemComponent {
    constructor() {
        super();
    }
    static getInstance() {
        if (!State2DAnimationMachineSystemComponent.instance) {
            State2DAnimationMachineSystemComponent.instance = new State2DAnimationMachineSystemComponent();
        }
        return State2DAnimationMachineSystemComponent.instance;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/component/ext/State2DAnimationMachineComponent.ts



class State2DAnimationMachineComponent extends GameComponent {
    constructor(entity) {
        super(entity);
        this.defaultStateName = "";
        this.states = [];
        State2DAnimationMachineSystemComponent.getInstance().saveComponent(this);
        this.spriteComponent = this.entity.getComponent(Sprite2DRendererComponent);
    }
    addState(state) {
        this.states.push(state);
    }
    play(stateName) {
        if (this.currentState.getName() === stateName) {
            return;
        }
        for (const state of this.states) {
            if (state.getName() === stateName) {
                this.currentState = state;
                break;
            }
        }
    }
    remove() {
        State2DAnimationMachineSystemComponent.getInstance().removeComponent(this);
    }
    render() {
    }
    update(time) {
        this.currentState.update(time);
        this.spriteComponent.sprite = this.currentState.getCurrentFrame().getSprite();
    }
    setDefaultStateName(defaultStateName) {
        this.defaultStateName = defaultStateName;
        for (const state of this.states) {
            if (state.getName() === this.defaultStateName) {
                this.currentState = state;
                break;
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/entity/Entity.ts
class Entity {
    constructor(id, scene) {
        this.id = id;
        this.scene = scene;
        this.components = new Map();
    }
    addComponent(componentClass) {
        const component = new componentClass(this);
        this.components.set(componentClass.name, component);
        return component;
    }
    hasComponent(componentClass) {
        return this.components.has(componentClass.name);
    }
    getComponent(componentClass) {
        const componentType = componentClass.name;
        if (this.hasComponent(componentClass)) {
            return this.components.get(componentClass.name);
        }
        throw new Error("Component by type [ " + componentType + " ] not found into entity [ " + this.id + " ]");
    }
    removeComponent(componentClass) {
        const component = this.getComponent(componentClass);
        component.remove();
        this.components.delete(componentClass.name);
    }
    getScene() {
        return this.scene;
    }
    clean() {
        for (const component of this.components.values()) {
            component.remove();
        }
        this.components.clear();
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/script/BaseScript.ts
class BaseScript {
    constructor(entity) {
        this.entity = entity;
    }
    getComponent(componentClass) {
        return this.entity.getComponent(componentClass);
    }
    addComponent(componentClass) {
        return this.entity.addComponent(componentClass);
    }
    getScene() {
        return this.entity.getScene();
    }
    init() { }
    destroy() { }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/support/animation/Animation2DSpriteFrame.ts
class Animation2DSpriteFrame {
    constructor(sprite, time) {
        this.sprite = sprite;
        this.time = time;
    }
    getTime() {
        return this.time;
    }
    getSprite() {
        return this.sprite;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/support/animation/Animation2DSpriteState.ts

class Animation2DSpriteState {
    constructor(name) {
        this.name = name;
        this.frames = [];
        this.currentFrameIndex = 0;
        this.timeTracker = 0;
    }
    addFrame(sprite, frameTime) {
        this.frames.push(new Animation2DSpriteFrame(sprite, frameTime));
    }
    update(time) {
        this.timeTracker -= time.getDeltaTimeMs();
        if (this.timeTracker < 0) {
            this.currentFrameIndex++;
            if (this.currentFrameIndex >= this.frames.length) {
                this.currentFrameIndex = 0;
            }
            this.timeTracker = this.frames[this.currentFrameIndex].getTime();
        }
    }
    getCurrentFrame() {
        return this.frames[this.currentFrameIndex];
    }
    getName() {
        return this.name;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/index.ts

























;// CONCATENATED MODULE: ./src/libs/game_engine/src/entity_component_system/namespace/ecs.ts



;// CONCATENATED MODULE: ./src/libs/game_engine/src/Scene.ts


class Scene {
    constructor(width, height) {
        this.transformSystemComponent = TransformSystemComponent.getInstance();
        this.sprite2DRendererSystemComponent = Sprite2DRendererSystemComponent.getInstance();
        this.tagSystemComponent = TagSystemComponent.getInstance();
        this.cameraSystemComponent = CameraSystemComponent.getInstance();
        this.texture2DRendererSystemComponent = Texture2DRendererSystemComponent.getInstance();
        this.colorRendererSystemComponent = ColorRendererSystemComponent.getInstance();
        this.typeScriptSystemComponent = TypeScriptSystemComponent.getInstance();
        this.state2DMachineSystemComponent = State2DAnimationMachineSystemComponent.getInstance();
        this.width = width;
        this.height = height;
        this.entities = [];
    }
    createEntity(name = "Entity") {
        const result = new Entity(Scene.entityId++, this);
        result.addComponent(TransformComponent);
        result.addComponent(TagComponent).tag = name;
        this.entities.push(result);
        return result;
    }
    resizeCamera() {
        this.cameraSystemComponent.resize(this.width, this.height);
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.resizeCamera();
    }
    update(time) {
        this.transformSystemComponent.update(time);
        this.sprite2DRendererSystemComponent.update(time);
        this.tagSystemComponent.update(time);
        this.cameraSystemComponent.update(time);
        this.colorRendererSystemComponent.update(time);
        this.texture2DRendererSystemComponent.update(time);
        this.typeScriptSystemComponent.update(time);
        this.state2DMachineSystemComponent.update(time);
    }
    render() {
        const primaryCamera = this.cameraSystemComponent.getPrimaryCamera();
        if (primaryCamera) {
            Engine.renderer2D.begin(primaryCamera);
            this.colorRendererSystemComponent.render();
            this.texture2DRendererSystemComponent.render();
            this.sprite2DRendererSystemComponent.render();
            Engine.renderer2D.end();
        }
    }
    clean() {
        this.transformSystemComponent.clean();
        this.sprite2DRendererSystemComponent.clean();
        this.tagSystemComponent.clean();
        this.cameraSystemComponent.clean();
        this.texture2DRendererSystemComponent.clean();
        this.colorRendererSystemComponent.clean();
        this.typeScriptSystemComponent.clean();
        this.state2DMachineSystemComponent.clean();
    }
    getEntities() {
        return this.entities;
    }
}
Scene.entityId = 1;

;// CONCATENATED MODULE: ./src/libs/game_engine/src/layer/impl/BaseLayer.ts
class BaseLayer {
    constructor(name = "layer") {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

;// CONCATENATED MODULE: ./src/libs/game_engine/src/layer/index.ts





;// CONCATENATED MODULE: ./src/libs/game_engine/src/index.ts








;// CONCATENATED MODULE: ./src/libs/game_engine/src/namespace/game_engine.ts



;// CONCATENATED MODULE: ./src/game/Game.ts

class Game extends Engine {
    constructor(parentElement) {
        super(parentElement);
    }
}
/* harmony default export */ const game_Game = (Game);

;// CONCATENATED MODULE: ./src/resources/decoration_and_block_spritesheet.png
/* harmony default export */ const decoration_and_block_spritesheet = (__webpack_require__.p + "73fb29bb69182dff4442752dca889c96.png");
;// CONCATENATED MODULE: ./src/resources/character_spritesheet.png
/* harmony default export */ const character_spritesheet = (__webpack_require__.p + "a29134208ca372ec3037f95e39a9d541.png");
;// CONCATENATED MODULE: ./src/game/scripts/WorldCreatorScript.ts

class WorldCreatorScript extends BaseScript {
    init() {
        const scene = this.getScene();
        const spriteSheetComponent = this.getComponent(Texture2DRendererComponent);
        const spriteSheetTexture = spriteSheetComponent.texture;
        const spriteSize = new Vector2(16, 16);
        this.createDecorations(scene, spriteSheetTexture, spriteSize);
        this.createObstacles(scene, spriteSheetTexture, spriteSize);
        spriteSheetComponent.remove();
    }
    update(time) {
    }
    createObstacles(scene, spriteSheetTexture, spriteSize) {
        const floorSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(0, 11), spriteSize);
        const topLeftPipeSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(2, 2), spriteSize);
        const topRightPipeSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(3, 2), spriteSize);
        const bottomLeftPipeSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(5, 3), spriteSize);
        const bottomRightPipeSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(6, 3), spriteSize);
        this.createFloor(scene, floorSprite, -8, 61);
        this.createSmallPipe(scene, topLeftPipeSprite, topRightPipeSprite, bottomLeftPipeSprite, bottomRightPipeSprite, 20, 0);
        this.createMediumPipe(scene, topLeftPipeSprite, topRightPipeSprite, bottomLeftPipeSprite, bottomRightPipeSprite, 30, 0);
        this.createBigPipe(scene, topLeftPipeSprite, topRightPipeSprite, bottomLeftPipeSprite, bottomRightPipeSprite, 38, 0);
        this.createBigPipe(scene, topLeftPipeSprite, topRightPipeSprite, bottomLeftPipeSprite, bottomRightPipeSprite, 49, 0);
    }
    createDecorations(scene, spriteSheetTexture, spriteSize) {
        const leftBigHillSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(3, 5), spriteSize);
        const centreLeftBigHillSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(4, 5), spriteSize);
        const centreBigHillSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(3, 6), spriteSize);
        const centreRightBigHillSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(5, 6), spriteSize);
        const rightBigHillSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(5, 5), spriteSize);
        const topBigHillSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(4, 6), spriteSize);
        const leftBushSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(6, 5), spriteSize);
        const centerBushSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(6, 6), spriteSize);
        const rightBushSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(6, 7), spriteSize);
        const topLeftCloudSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(3, 4), spriteSize);
        const topCenterCloudSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(4, 4), spriteSize);
        const topRightCloudSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(5, 4), spriteSize);
        const bottomLeftCloudSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(2, 3), spriteSize);
        const bottomCenterCloudSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(3, 3), spriteSize);
        const bottomRightCloudSprite = ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(4, 3), spriteSize);
        this.createBigHill(scene, leftBigHillSprite, centreLeftBigHillSprite, centreBigHillSprite, centreRightBigHillSprite, rightBigHillSprite, topBigHillSprite, -8, 0, -0.5);
        this.createBigBush(scene, leftBushSprite, centerBushSprite, rightBushSprite, 3, 0, -0.5);
        this.createSmallHill(scene, leftBigHillSprite, centreLeftBigHillSprite, rightBigHillSprite, topBigHillSprite, 8, 0, -0.5);
        this.createSmallBush(scene, leftBushSprite, centerBushSprite, rightBushSprite, 15, 0, -0.5);
        this.createMediumBush(scene, leftBushSprite, centerBushSprite, rightBushSprite, 33, 0, -0.5);
        this.createBigHill(scene, leftBigHillSprite, centreLeftBigHillSprite, centreBigHillSprite, centreRightBigHillSprite, rightBigHillSprite, topBigHillSprite, 40, 0, -0.5);
        this.createBigBush(scene, leftBushSprite, centerBushSprite, rightBushSprite, 51, 0, -0.5);
        this.createSmallHill(scene, leftBigHillSprite, centreLeftBigHillSprite, rightBigHillSprite, topBigHillSprite, 56, 0, -0.5);
        this.createSmallCloud(scene, topLeftCloudSprite, topCenterCloudSprite, topRightCloudSprite, bottomLeftCloudSprite, bottomCenterCloudSprite, bottomRightCloudSprite, 0, 9, -0.5);
        this.createSmallCloud(scene, topLeftCloudSprite, topCenterCloudSprite, topRightCloudSprite, bottomLeftCloudSprite, bottomCenterCloudSprite, bottomRightCloudSprite, 11, 10, -0.5);
        this.createBigCloud(scene, topLeftCloudSprite, topCenterCloudSprite, topRightCloudSprite, bottomLeftCloudSprite, bottomCenterCloudSprite, bottomRightCloudSprite, 19, 9, -0.5);
        this.createMediumCloud(scene, topLeftCloudSprite, topCenterCloudSprite, topRightCloudSprite, bottomLeftCloudSprite, bottomCenterCloudSprite, bottomRightCloudSprite, 28, 10, -0.5);
        this.createSmallCloud(scene, topLeftCloudSprite, topCenterCloudSprite, topRightCloudSprite, bottomLeftCloudSprite, bottomCenterCloudSprite, bottomRightCloudSprite, 48, 9, -0.5);
        this.createSmallCloud(scene, topLeftCloudSprite, topCenterCloudSprite, topRightCloudSprite, bottomLeftCloudSprite, bottomCenterCloudSprite, bottomRightCloudSprite, 59, 10, -0.5);
    }
    createMediumCloud(scene, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight, x, y, z) {
        const topLeftEntity = scene.createEntity("Medium cloud [topLeft] entity");
        const topLeftTransformComponent = topLeftEntity.getComponent(TransformComponent);
        topLeftTransformComponent.position.setX(x);
        topLeftTransformComponent.position.setY(y + 1);
        topLeftTransformComponent.position.setZ(z);
        const topLeftSpriteComponent = topLeftEntity.addComponent(Sprite2DRendererComponent);
        topLeftSpriteComponent.sprite = topLeft;
        const topCenterEntity = scene.createEntity("Medium cloud [topCenter] entity");
        const topCenterTransformComponent = topCenterEntity.getComponent(TransformComponent);
        topCenterTransformComponent.position.setX(x + 1);
        topCenterTransformComponent.position.setY(y + 1);
        topCenterTransformComponent.position.setZ(z);
        const topCenterSpriteComponent = topCenterEntity.addComponent(Sprite2DRendererComponent);
        topCenterSpriteComponent.sprite = topCenter;
        const topCenter2Entity = scene.createEntity("Medium cloud [topCenter 2] entity");
        const topCenter2TransformComponent = topCenter2Entity.getComponent(TransformComponent);
        topCenter2TransformComponent.position.setX(x + 2);
        topCenter2TransformComponent.position.setY(y + 1);
        topCenter2TransformComponent.position.setZ(z);
        const topCenter2SpriteComponent = topCenter2Entity.addComponent(Sprite2DRendererComponent);
        topCenter2SpriteComponent.sprite = topCenter;
        const topRightEntity = scene.createEntity("Medium cloud [topRight] entity");
        const topRightTransformComponent = topRightEntity.getComponent(TransformComponent);
        topRightTransformComponent.position.setX(x + 3);
        topRightTransformComponent.position.setY(y + 1);
        topRightTransformComponent.position.setZ(z);
        const topRightSpriteComponent = topRightEntity.addComponent(Sprite2DRendererComponent);
        topRightSpriteComponent.sprite = topRight;
        const bottomLeftEntity = scene.createEntity("Medium cloud [bottomLeft] entity");
        const bottomLeftTransformComponent = bottomLeftEntity.getComponent(TransformComponent);
        bottomLeftTransformComponent.position.setX(x);
        bottomLeftTransformComponent.position.setY(y);
        bottomLeftTransformComponent.position.setZ(z);
        const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(Sprite2DRendererComponent);
        bottomLeftSpriteComponent.sprite = bottomLeft;
        const bottomCenterEntity = scene.createEntity("Medium cloud [bottomCenter] entity");
        const bottomCenterTransformComponent = bottomCenterEntity.getComponent(TransformComponent);
        bottomCenterTransformComponent.position.setX(x + 1);
        bottomCenterTransformComponent.position.setY(y);
        bottomCenterTransformComponent.position.setZ(z);
        const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(Sprite2DRendererComponent);
        bottomCenterSpriteComponent.sprite = bottomCenter;
        const bottomCenter2Entity = scene.createEntity("Medium cloud [bottomCenter 2] entity");
        const bottomCenter2TransformComponent = bottomCenter2Entity.getComponent(TransformComponent);
        bottomCenter2TransformComponent.position.setX(x + 2);
        bottomCenter2TransformComponent.position.setY(y);
        bottomCenter2TransformComponent.position.setZ(z);
        const bottomCenter2SpriteComponent = bottomCenter2Entity.addComponent(Sprite2DRendererComponent);
        bottomCenter2SpriteComponent.sprite = bottomCenter;
        const bottomRightEntity = scene.createEntity("Medium cloud [bottomRight] entity");
        const bottomRightTransformComponent = bottomRightEntity.getComponent(TransformComponent);
        bottomRightTransformComponent.position.setX(x + 3);
        bottomRightTransformComponent.position.setY(y);
        bottomRightTransformComponent.position.setZ(z);
        const bottomRightSpriteComponent = bottomRightEntity.addComponent(Sprite2DRendererComponent);
        bottomRightSpriteComponent.sprite = bottomRight;
    }
    createBigCloud(scene, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight, x, y, z) {
        const topLeftEntity = scene.createEntity("Bid cloud [topLeft] entity");
        const topLeftTransformComponent = topLeftEntity.getComponent(TransformComponent);
        topLeftTransformComponent.position.setX(x);
        topLeftTransformComponent.position.setY(y + 1);
        topLeftTransformComponent.position.setZ(z);
        const topLeftSpriteComponent = topLeftEntity.addComponent(Sprite2DRendererComponent);
        topLeftSpriteComponent.sprite = topLeft;
        const topCenterEntity = scene.createEntity("Bid cloud [topCenter] entity");
        const topCenterTransformComponent = topCenterEntity.getComponent(TransformComponent);
        topCenterTransformComponent.position.setX(x + 1);
        topCenterTransformComponent.position.setY(y + 1);
        topCenterTransformComponent.position.setZ(z);
        const topCenterSpriteComponent = topCenterEntity.addComponent(Sprite2DRendererComponent);
        topCenterSpriteComponent.sprite = topCenter;
        const topCenter2Entity = scene.createEntity("Bid cloud [topCenter 2] entity");
        const topCenter2TransformComponent = topCenter2Entity.getComponent(TransformComponent);
        topCenter2TransformComponent.position.setX(x + 2);
        topCenter2TransformComponent.position.setY(y + 1);
        topCenter2TransformComponent.position.setZ(z);
        const topCenter2SpriteComponent = topCenter2Entity.addComponent(Sprite2DRendererComponent);
        topCenter2SpriteComponent.sprite = topCenter;
        const topCenter3Entity = scene.createEntity("Bid cloud [topCenter 3] entity");
        const topCenter3TransformComponent = topCenter3Entity.getComponent(TransformComponent);
        topCenter3TransformComponent.position.setX(x + 3);
        topCenter3TransformComponent.position.setY(y + 1);
        topCenter3TransformComponent.position.setZ(z);
        const topCenter3SpriteComponent = topCenter3Entity.addComponent(Sprite2DRendererComponent);
        topCenter3SpriteComponent.sprite = topCenter;
        const topRightEntity = scene.createEntity("Big cloud [topRight] entity");
        const topRightTransformComponent = topRightEntity.getComponent(TransformComponent);
        topRightTransformComponent.position.setX(x + 4);
        topRightTransformComponent.position.setY(y + 1);
        topRightTransformComponent.position.setZ(z);
        const topRightSpriteComponent = topRightEntity.addComponent(Sprite2DRendererComponent);
        topRightSpriteComponent.sprite = topRight;
        const bottomLeftEntity = scene.createEntity("Big cloud [bottomLeft] entity");
        const bottomLeftTransformComponent = bottomLeftEntity.getComponent(TransformComponent);
        bottomLeftTransformComponent.position.setX(x);
        bottomLeftTransformComponent.position.setY(y);
        bottomLeftTransformComponent.position.setZ(z);
        const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(Sprite2DRendererComponent);
        bottomLeftSpriteComponent.sprite = bottomLeft;
        const bottomCenterEntity = scene.createEntity("Big cloud [bottomCenter] entity");
        const bottomCenterTransformComponent = bottomCenterEntity.getComponent(TransformComponent);
        bottomCenterTransformComponent.position.setX(x + 1);
        bottomCenterTransformComponent.position.setY(y);
        bottomCenterTransformComponent.position.setZ(z);
        const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(Sprite2DRendererComponent);
        bottomCenterSpriteComponent.sprite = bottomCenter;
        const bottomCenter2Entity = scene.createEntity("Big cloud [bottomCenter 2] entity");
        const bottomCenter2TransformComponent = bottomCenter2Entity.getComponent(TransformComponent);
        bottomCenter2TransformComponent.position.setX(x + 2);
        bottomCenter2TransformComponent.position.setY(y);
        bottomCenter2TransformComponent.position.setZ(z);
        const bottomCenter2SpriteComponent = bottomCenter2Entity.addComponent(Sprite2DRendererComponent);
        bottomCenter2SpriteComponent.sprite = bottomCenter;
        const bottomCenter3Entity = scene.createEntity("Big cloud [bottomCenter 3] entity");
        const bottomCenter3TransformComponent = bottomCenter3Entity.getComponent(TransformComponent);
        bottomCenter3TransformComponent.position.setX(x + 3);
        bottomCenter3TransformComponent.position.setY(y);
        bottomCenter3TransformComponent.position.setZ(z);
        const bottomCenter3SpriteComponent = bottomCenter3Entity.addComponent(Sprite2DRendererComponent);
        bottomCenter3SpriteComponent.sprite = bottomCenter;
        const bottomRightEntity = scene.createEntity("Big cloud [bottomRight] entity");
        const bottomRightTransformComponent = bottomRightEntity.getComponent(TransformComponent);
        bottomRightTransformComponent.position.setX(x + 4);
        bottomRightTransformComponent.position.setY(y);
        bottomRightTransformComponent.position.setZ(z);
        const bottomRightSpriteComponent = bottomRightEntity.addComponent(Sprite2DRendererComponent);
        bottomRightSpriteComponent.sprite = bottomRight;
    }
    createSmallCloud(scene, topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight, x, y, z) {
        const topLeftEntity = scene.createEntity("Small cloud [topLeft] entity");
        const topLeftTransformComponent = topLeftEntity.getComponent(TransformComponent);
        topLeftTransformComponent.position.setX(x);
        topLeftTransformComponent.position.setY(y + 1);
        topLeftTransformComponent.position.setZ(z);
        const topLeftSpriteComponent = topLeftEntity.addComponent(Sprite2DRendererComponent);
        topLeftSpriteComponent.sprite = topLeft;
        const topCenterEntity = scene.createEntity("Small cloud [topCenter] entity");
        const topCenterTransformComponent = topCenterEntity.getComponent(TransformComponent);
        topCenterTransformComponent.position.setX(x + 1);
        topCenterTransformComponent.position.setY(y + 1);
        topCenterTransformComponent.position.setZ(z);
        const topCenterSpriteComponent = topCenterEntity.addComponent(Sprite2DRendererComponent);
        topCenterSpriteComponent.sprite = topCenter;
        const topRightEntity = scene.createEntity("Small cloud [topRight] entity");
        const topRightTransformComponent = topRightEntity.getComponent(TransformComponent);
        topRightTransformComponent.position.setX(x + 2);
        topRightTransformComponent.position.setY(y + 1);
        topRightTransformComponent.position.setZ(z);
        const topRightSpriteComponent = topRightEntity.addComponent(Sprite2DRendererComponent);
        topRightSpriteComponent.sprite = topRight;
        const bottomLeftEntity = scene.createEntity("Small cloud [bottomLeft] entity");
        const bottomLeftTransformComponent = bottomLeftEntity.getComponent(TransformComponent);
        bottomLeftTransformComponent.position.setX(x);
        bottomLeftTransformComponent.position.setY(y);
        bottomLeftTransformComponent.position.setZ(z);
        const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(Sprite2DRendererComponent);
        bottomLeftSpriteComponent.sprite = bottomLeft;
        const bottomCenterEntity = scene.createEntity("Small cloud [bottomCenter] entity");
        const bottomCenterTransformComponent = bottomCenterEntity.getComponent(TransformComponent);
        bottomCenterTransformComponent.position.setX(x + 1);
        bottomCenterTransformComponent.position.setY(y);
        bottomCenterTransformComponent.position.setZ(z);
        const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(Sprite2DRendererComponent);
        bottomCenterSpriteComponent.sprite = bottomCenter;
        const bottomRightEntity = scene.createEntity("Small cloud [bottomRight] entity");
        const bottomRightTransformComponent = bottomRightEntity.getComponent(TransformComponent);
        bottomRightTransformComponent.position.setX(x + 2);
        bottomRightTransformComponent.position.setY(y);
        bottomRightTransformComponent.position.setZ(z);
        const bottomRightSpriteComponent = bottomRightEntity.addComponent(Sprite2DRendererComponent);
        bottomRightSpriteComponent.sprite = bottomRight;
    }
    createSmallBush(scene, left, center, right, x, y, z) {
        const leftEntity = scene.createEntity("Small Bush [left] entity");
        const leftTransformComponent = leftEntity.getComponent(TransformComponent);
        leftTransformComponent.position.setX(x);
        leftTransformComponent.position.setY(y);
        leftTransformComponent.position.setZ(z);
        const leftSpriteComponent = leftEntity.addComponent(Sprite2DRendererComponent);
        leftSpriteComponent.sprite = left;
        const centerEntity = scene.createEntity("Small Bush [center] entity");
        const centerTransformComponent = centerEntity.getComponent(TransformComponent);
        centerTransformComponent.position.setX(x + 1);
        centerTransformComponent.position.setY(y);
        centerTransformComponent.position.setZ(z);
        const centerSpriteComponent = centerEntity.addComponent(Sprite2DRendererComponent);
        centerSpriteComponent.sprite = center;
        const rightEntity = scene.createEntity("Small Bush [right] entity");
        const rightTransformComponent = rightEntity.getComponent(TransformComponent);
        rightTransformComponent.position.setX(x + 2);
        rightTransformComponent.position.setY(y);
        rightTransformComponent.position.setZ(z);
        const rightSpriteComponent = rightEntity.addComponent(Sprite2DRendererComponent);
        rightSpriteComponent.sprite = right;
    }
    createMediumBush(scene, left, center, right, x, y, z) {
        const leftEntity = scene.createEntity("Big Bush [left] entity");
        const leftTransformComponent = leftEntity.getComponent(TransformComponent);
        leftTransformComponent.position.setX(x);
        leftTransformComponent.position.setY(y);
        leftTransformComponent.position.setZ(z);
        const leftSpriteComponent = leftEntity.addComponent(Sprite2DRendererComponent);
        leftSpriteComponent.sprite = left;
        const centerLeftEntity = scene.createEntity("Big Bush [center left] entity");
        const centerLeftTransformComponent = centerLeftEntity.getComponent(TransformComponent);
        centerLeftTransformComponent.position.setX(x + 1);
        centerLeftTransformComponent.position.setY(y);
        centerLeftTransformComponent.position.setZ(z);
        const centerLeftSpriteComponent = centerLeftEntity.addComponent(Sprite2DRendererComponent);
        centerLeftSpriteComponent.sprite = center;
        const centerRightEntity = scene.createEntity("Big Bush [center right] entity");
        const centerRightTransformComponent = centerRightEntity.getComponent(TransformComponent);
        centerRightTransformComponent.position.setX(x + 2);
        centerRightTransformComponent.position.setY(y);
        centerRightTransformComponent.position.setZ(z);
        const centerRightSpriteComponent = centerRightEntity.addComponent(Sprite2DRendererComponent);
        centerRightSpriteComponent.sprite = center;
        const rightEntity = scene.createEntity("Big Bush [right] entity");
        const rightTransformComponent = rightEntity.getComponent(TransformComponent);
        rightTransformComponent.position.setX(x + 3);
        rightTransformComponent.position.setY(y);
        rightTransformComponent.position.setZ(z);
        const rightSpriteComponent = rightEntity.addComponent(Sprite2DRendererComponent);
        rightSpriteComponent.sprite = right;
    }
    createBigBush(scene, left, center, right, x, y, z) {
        const leftEntity = scene.createEntity("Big Bush [left] entity");
        const leftTransformComponent = leftEntity.getComponent(TransformComponent);
        leftTransformComponent.position.setX(x);
        leftTransformComponent.position.setY(y);
        leftTransformComponent.position.setZ(z);
        const leftSpriteComponent = leftEntity.addComponent(Sprite2DRendererComponent);
        leftSpriteComponent.sprite = left;
        const centerLeftEntity = scene.createEntity("Big Bush [center left] entity");
        const centerLeftTransformComponent = centerLeftEntity.getComponent(TransformComponent);
        centerLeftTransformComponent.position.setX(x + 1);
        centerLeftTransformComponent.position.setY(y);
        centerLeftTransformComponent.position.setZ(z);
        const centerLeftSpriteComponent = centerLeftEntity.addComponent(Sprite2DRendererComponent);
        centerLeftSpriteComponent.sprite = center;
        const centerEntity = scene.createEntity("Big Bush [center] entity");
        const centerTransformComponent = centerEntity.getComponent(TransformComponent);
        centerTransformComponent.position.setX(x + 2);
        centerTransformComponent.position.setY(y);
        centerTransformComponent.position.setZ(z);
        const centerSpriteComponent = centerEntity.addComponent(Sprite2DRendererComponent);
        centerSpriteComponent.sprite = center;
        const centerRightEntity = scene.createEntity("Big Bush [center right] entity");
        const centerRightTransformComponent = centerRightEntity.getComponent(TransformComponent);
        centerRightTransformComponent.position.setX(x + 3);
        centerRightTransformComponent.position.setY(y);
        centerRightTransformComponent.position.setZ(z);
        const centerRightSpriteComponent = centerRightEntity.addComponent(Sprite2DRendererComponent);
        centerRightSpriteComponent.sprite = center;
        const rightEntity = scene.createEntity("Big Bush [right] entity");
        const rightTransformComponent = rightEntity.getComponent(TransformComponent);
        rightTransformComponent.position.setX(x + 4);
        rightTransformComponent.position.setY(y);
        rightTransformComponent.position.setZ(z);
        const rightSpriteComponent = rightEntity.addComponent(Sprite2DRendererComponent);
        rightSpriteComponent.sprite = right;
    }
    createSmallHill(scene, left, center, right, top, x, y, z) {
        const bottomLeftEntity = scene.createEntity("Small Hill [bottom left] entity");
        const bottomLeftTransformComponent = bottomLeftEntity.getComponent(TransformComponent);
        bottomLeftTransformComponent.position.setX(x);
        bottomLeftTransformComponent.position.setY(y);
        bottomLeftTransformComponent.position.setZ(z);
        const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(Sprite2DRendererComponent);
        bottomLeftSpriteComponent.sprite = left;
        const bottomCenterEntity = scene.createEntity("Small Hill [bottom center] entity");
        const bottomCenterTransformComponent = bottomCenterEntity.getComponent(TransformComponent);
        bottomCenterTransformComponent.position.setX(x + 1);
        bottomCenterTransformComponent.position.setY(y);
        bottomCenterTransformComponent.position.setZ(z);
        const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(Sprite2DRendererComponent);
        bottomCenterSpriteComponent.sprite = center;
        const bottomRightEntity = scene.createEntity("Small Hill [bottom right] entity");
        const bottomRightTransformComponent = bottomRightEntity.getComponent(TransformComponent);
        bottomRightTransformComponent.position.setX(x + 2);
        bottomRightTransformComponent.position.setY(y);
        bottomRightTransformComponent.position.setZ(z);
        const bottomRightSpriteComponent = bottomRightEntity.addComponent(Sprite2DRendererComponent);
        bottomRightSpriteComponent.sprite = right;
        const topEntity = scene.createEntity("Small Hill [top] entity");
        const topTransformComponent = topEntity.getComponent(TransformComponent);
        topTransformComponent.position.setX(x + 1);
        topTransformComponent.position.setY(y + 1);
        topTransformComponent.position.setZ(z);
        const topSpriteComponent = topEntity.addComponent(Sprite2DRendererComponent);
        topSpriteComponent.sprite = top;
    }
    createBigHill(scene, left, centerLeft, center, centerRight, right, top, x, y, z) {
        const bottomLeftEntity = scene.createEntity("Big Hill [bottom left] entity");
        const bottomLeftTransformComponent = bottomLeftEntity.getComponent(TransformComponent);
        bottomLeftTransformComponent.position.setX(x);
        bottomLeftTransformComponent.position.setY(y);
        bottomLeftTransformComponent.position.setZ(z);
        const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(Sprite2DRendererComponent);
        bottomLeftSpriteComponent.sprite = left;
        const bottomCenterLeftEntity = scene.createEntity("Big Hill [bottom center left] entity");
        const bottomCenterLeftTransformComponent = bottomCenterLeftEntity.getComponent(TransformComponent);
        bottomCenterLeftTransformComponent.position.setX(x + 1);
        bottomCenterLeftTransformComponent.position.setY(y);
        bottomCenterLeftTransformComponent.position.setZ(z);
        const bottomCenterLeftSpriteComponent = bottomCenterLeftEntity.addComponent(Sprite2DRendererComponent);
        bottomCenterLeftSpriteComponent.sprite = centerLeft;
        const bottomCenterEntity = scene.createEntity("Big Hill [bottom center] entity");
        const bottomCenterTransformComponent = bottomCenterEntity.getComponent(TransformComponent);
        bottomCenterTransformComponent.position.setX(x + 2);
        bottomCenterTransformComponent.position.setY(y);
        bottomCenterTransformComponent.position.setZ(z);
        const bottomCenterSpriteComponent = bottomCenterEntity.addComponent(Sprite2DRendererComponent);
        bottomCenterSpriteComponent.sprite = center;
        const bottomCenterRightEntity = scene.createEntity("Big Hill [bottom center right] entity");
        const bottomCenterRightTransformComponent = bottomCenterRightEntity.getComponent(TransformComponent);
        bottomCenterRightTransformComponent.position.setX(x + 3);
        bottomCenterRightTransformComponent.position.setY(y);
        bottomCenterRightTransformComponent.position.setZ(z);
        const bottomCenterRightSpriteComponent = bottomCenterRightEntity.addComponent(Sprite2DRendererComponent);
        bottomCenterRightSpriteComponent.sprite = centerRight;
        const bottomRightEntity = scene.createEntity("Big Hill [bottom right] entity");
        const bottomRightTransformComponent = bottomRightEntity.getComponent(TransformComponent);
        bottomRightTransformComponent.position.setX(x + 4);
        bottomRightTransformComponent.position.setY(y);
        bottomRightTransformComponent.position.setZ(z);
        const bottomRightSpriteComponent = bottomRightEntity.addComponent(Sprite2DRendererComponent);
        bottomRightSpriteComponent.sprite = right;
        const topLeftEntity = scene.createEntity("Big Hill [top left] entity");
        const topLeftTransformComponent = topLeftEntity.getComponent(TransformComponent);
        topLeftTransformComponent.position.setX(x + 1);
        topLeftTransformComponent.position.setY(y + 1);
        topLeftTransformComponent.position.setZ(z);
        const topLeftSpriteComponent = topLeftEntity.addComponent(Sprite2DRendererComponent);
        topLeftSpriteComponent.sprite = left;
        const topCentreEntity = scene.createEntity("Big Hill [top centre] entity");
        const topCenterTransformComponent = topCentreEntity.getComponent(TransformComponent);
        topCenterTransformComponent.position.setX(x + 2);
        topCenterTransformComponent.position.setY(y + 1);
        topCenterTransformComponent.position.setZ(z);
        const topCenterSpriteComponent = topCentreEntity.addComponent(Sprite2DRendererComponent);
        topCenterSpriteComponent.sprite = centerLeft;
        const topRightEntity = scene.createEntity("Big Hill [top right] entity");
        const topRightTransformComponent = topRightEntity.getComponent(TransformComponent);
        topRightTransformComponent.position.setX(x + 3);
        topRightTransformComponent.position.setY(y + 1);
        topRightTransformComponent.position.setZ(z);
        const topRightSpriteComponent = topRightEntity.addComponent(Sprite2DRendererComponent);
        topRightSpriteComponent.sprite = right;
        const topEntity = scene.createEntity("Big Hill [top] entity");
        const topTransformComponent = topEntity.getComponent(TransformComponent);
        topTransformComponent.position.setX(x + 2);
        topTransformComponent.position.setY(y + 2);
        topTransformComponent.position.setZ(z);
        const topSpriteComponent = topEntity.addComponent(Sprite2DRendererComponent);
        topSpriteComponent.sprite = top;
    }
    createFloor(scene, sprite, fromX, toX) {
        for (let row = -1; row > -3; row--) {
            for (let column = fromX; column < toX; column++) {
                const blockEntity = scene.createEntity("Floor[" + row + "][" + column + "] entity");
                const blockTransformComponent = blockEntity.getComponent(TransformComponent);
                blockTransformComponent.position.setX(column);
                blockTransformComponent.position.setY(row);
                const blockSpriteComponent = blockEntity.addComponent(Sprite2DRendererComponent);
                blockSpriteComponent.sprite = sprite;
            }
        }
    }
    createBigPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y, z = 0.1) {
        this.createMediumPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y + 1, z);
        const bottomLeftEntity = scene.createEntity("Big Pipe [bottom left] entity");
        const bottomLeftTransformComponent = bottomLeftEntity.getComponent(TransformComponent);
        bottomLeftTransformComponent.position.setX(x);
        bottomLeftTransformComponent.position.setY(y);
        bottomLeftTransformComponent.position.setZ(z);
        const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(Sprite2DRendererComponent);
        bottomLeftSpriteComponent.sprite = bottomLeft;
        const bottomRightEntity = scene.createEntity("Big Pipe [bottom right] entity");
        const bottomRightTransformComponent = bottomRightEntity.getComponent(TransformComponent);
        bottomRightTransformComponent.position.setX(x + 1);
        bottomRightTransformComponent.position.setY(y);
        bottomRightTransformComponent.position.setZ(z);
        const bottomRightSpriteComponent = bottomRightEntity.addComponent(Sprite2DRendererComponent);
        bottomRightSpriteComponent.sprite = bottomRight;
    }
    createMediumPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y, z = 0.1) {
        this.createSmallPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y + 1, z);
        const bottomLeftEntity = scene.createEntity("Medium Pipe [bottom left] entity");
        const bottomLeftTransformComponent = bottomLeftEntity.getComponent(TransformComponent);
        bottomLeftTransformComponent.position.setX(x);
        bottomLeftTransformComponent.position.setY(y);
        bottomLeftTransformComponent.position.setZ(z);
        const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(Sprite2DRendererComponent);
        bottomLeftSpriteComponent.sprite = bottomLeft;
        const bottomRightEntity = scene.createEntity("Medium Pipe [bottom right] entity");
        const bottomRightTransformComponent = bottomRightEntity.getComponent(TransformComponent);
        bottomRightTransformComponent.position.setX(x + 1);
        bottomRightTransformComponent.position.setY(y);
        bottomRightTransformComponent.position.setZ(z);
        const bottomRightSpriteComponent = bottomRightEntity.addComponent(Sprite2DRendererComponent);
        bottomRightSpriteComponent.sprite = bottomRight;
    }
    createSmallPipe(scene, topLeft, topRight, bottomLeft, bottomRight, x, y, z = 0.1) {
        const bottomLeftEntity = scene.createEntity("Small Pipe [bottom left] entity");
        const bottomLeftTransformComponent = bottomLeftEntity.getComponent(TransformComponent);
        bottomLeftTransformComponent.position.setX(x);
        bottomLeftTransformComponent.position.setY(y);
        bottomLeftTransformComponent.position.setZ(z);
        const bottomLeftSpriteComponent = bottomLeftEntity.addComponent(Sprite2DRendererComponent);
        bottomLeftSpriteComponent.sprite = bottomLeft;
        const bottomRightEntity = scene.createEntity("Small Pipe [bottom right] entity");
        const bottomRightTransformComponent = bottomRightEntity.getComponent(TransformComponent);
        bottomRightTransformComponent.position.setX(x + 1);
        bottomRightTransformComponent.position.setY(y);
        bottomRightTransformComponent.position.setZ(z);
        const bottomRightSpriteComponent = bottomRightEntity.addComponent(Sprite2DRendererComponent);
        bottomRightSpriteComponent.sprite = bottomRight;
        const topLeftEntity = scene.createEntity("Small Pipe [top left] entity");
        const topLeftTransformComponent = topLeftEntity.getComponent(TransformComponent);
        topLeftTransformComponent.position.setX(x);
        topLeftTransformComponent.position.setY(y + 1);
        topLeftTransformComponent.position.setZ(z);
        const topLeftSpriteComponent = topLeftEntity.addComponent(Sprite2DRendererComponent);
        topLeftSpriteComponent.sprite = topLeft;
        const topRightEntity = scene.createEntity("Small Pipe [top right] entity");
        const topRightTransformComponent = topRightEntity.getComponent(TransformComponent);
        topRightTransformComponent.position.setX(x + 1);
        topRightTransformComponent.position.setY(y + 1);
        topRightTransformComponent.position.setZ(z);
        const topRightSpriteComponent = topRightEntity.addComponent(Sprite2DRendererComponent);
        topRightSpriteComponent.sprite = topRight;
    }
}

;// CONCATENATED MODULE: ./src/game/scripts/PlayerControllerScript.ts

class PlayerControllerScript extends BaseScript {
    init() {
        this.marioAnimationStateComponent = this.getComponent(State2DAnimationMachineComponent);
        this.marioTransformComponent = this.getComponent(TransformComponent);
        this.cameraComponent = this.getComponent(CameraComponent);
        this.cameraComponent.camera.getPosition().setY(5.5);
        this.marioRunSpeed = 5;
    }
    update(time) {
        const deltaTime = time.getDeltaTimeSec();
        const marioPosition = this.marioTransformComponent.position;
        const marioRotation = this.marioTransformComponent.rotation;
        const horizontalAxis = Input.getHorizontalAxis();
        if (horizontalAxis < 0) {
            marioRotation.setY(180);
        }
        else if (horizontalAxis > 0) {
            marioRotation.setY(0);
        }
        if (horizontalAxis === 0) {
            this.playIdleAnimation();
        }
        else {
            this.playRunAnimation();
        }
        marioPosition.setX(marioPosition.getX() + this.marioRunSpeed * deltaTime * horizontalAxis);
        this.cameraComponent.camera.getPosition().setX(marioPosition.getX());
    }
    playRunAnimation() {
        this.marioAnimationStateComponent.play("Run");
    }
    playIdleAnimation() {
        this.marioAnimationStateComponent.play("Idle");
    }
}

;// CONCATENATED MODULE: ./src/game/scripts/EnemyCreatorScript.ts

class EnemyCreatorScript extends BaseScript {
    init() {
        const spriteSheetComponent = this.getComponent(Texture2DRendererComponent);
        const spriteSheetTexture = spriteSheetComponent.texture;
        const spriteSize = new Vector2(16, 16);
        this.enemyRunSpriteIndex = 0;
        this.enemyRunSpriteFlipTime = 0.25;
        this.enemyRunSpriteFlipTimeLeft = 0;
        this.enemyRunSprites = [];
        this.enemyRunSprites.push(ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(0, 0), spriteSize));
        this.enemyRunSprites.push(ResourceFactory.createSprite2D(spriteSheetTexture, new Vector2(1, 0), spriteSize));
        this.enemySpriteComponent = this.addComponent(Sprite2DRendererComponent);
        this.enemySpriteComponent.sprite = this.enemyRunSprites[this.enemyRunSpriteIndex];
        spriteSheetComponent.remove();
    }
    update(time) {
        const deltaTime = time.getDeltaTimeSec();
        this.updateRunFrame(deltaTime);
    }
    updateRunFrame(deltaTime) {
        this.enemyRunSpriteFlipTimeLeft -= deltaTime;
        if (this.enemyRunSpriteFlipTimeLeft < 0) {
            this.enemyRunSpriteFlipTimeLeft = this.enemyRunSpriteFlipTime;
            this.enemyRunSpriteIndex++;
            if (this.enemyRunSpriteIndex >= this.enemyRunSprites.length) {
                this.enemyRunSpriteIndex = 0;
            }
            this.enemySpriteComponent.sprite = this.enemyRunSprites[this.enemyRunSpriteIndex];
        }
    }
}

;// CONCATENATED MODULE: ./src/game/Level.ts






class Level {
    constructor(scene, graphicsElement) {
        this.scene = scene;
        this.graphicsElement = graphicsElement;
        this.color = new Vector4(0.41, 0.57, 0.96, 1.0);
        const context = this.graphicsElement.getGraphicsContext();
        context.printDebugInfo();
        const decorationAndBlockSpriteSheetImage = new Image();
        decorationAndBlockSpriteSheetImage.src = decoration_and_block_spritesheet;
        const decorationAndBlockSpriteSheetTexture = ResourceFactory.create2DTexture(context, decorationAndBlockSpriteSheetImage, 4);
        const characterSpriteSheetImage = new Image();
        characterSpriteSheetImage.src = character_spritesheet;
        const characterSpriteSheetTexture = ResourceFactory.create2DTexture(context, characterSpriteSheetImage, 4);
        const characterSpriteSize = new Vector2(16, 16);
        this.addWorldOnScene(decorationAndBlockSpriteSheetTexture);
        this.addMarioOnScene(characterSpriteSheetTexture, characterSpriteSize);
        this.addEnemiesOnScene(characterSpriteSheetTexture);
    }
    resize(width, height) {
        this.scene.resize(width, height);
    }
    keyboardInput(event) {
    }
    mouseInput(event) {
    }
    update(time) {
        this.scene.update(time);
        // console.log(1 / time.getDeltaTimeSec());
    }
    render() {
        Engine.renderer2D.resetStatistics();
        Engine.renderer2D.setClearColor(this.color);
        Engine.renderer2D.clear();
        this.scene.render();
        // console.log(GameEngine.Engine.renderer2D.getStatics());
    }
    clean() {
        this.scene.clean();
    }
    addWorldOnScene(decorationAndBlockSpriteSheetTexture) {
        const worldEntity = this.scene.createEntity("World");
        const worldTextureComponent = worldEntity.addComponent(Texture2DRendererComponent);
        worldTextureComponent.texture = decorationAndBlockSpriteSheetTexture;
        worldEntity.addComponent(TypeScriptComponent).bind(WorldCreatorScript);
    }
    addEnemiesOnScene(characterSpriteSheetTexture) {
        const enemyEntity = this.scene.createEntity("Enemy");
        const enemyTransformComponent = enemyEntity.getComponent(TransformComponent);
        enemyTransformComponent.position.setX(9);
        enemyTransformComponent.position.setZ(0.5);
        const enemyCharactersTextureComponent = enemyEntity.addComponent(Texture2DRendererComponent);
        enemyCharactersTextureComponent.texture = characterSpriteSheetTexture;
        enemyEntity.addComponent(TypeScriptComponent).bind(EnemyCreatorScript);
    }
    addMarioOnScene(characterSpriteSheetTexture, characterSpriteSize) {
        const playerEntity = this.scene.createEntity("Player");
        playerEntity.addComponent(TypeScriptComponent).bind(PlayerControllerScript);
        const playerCameraComponent = playerEntity.addComponent(CameraComponent);
        playerCameraComponent.camera = new OrthographicCamera(this.graphicsElement.getWidth(), this.graphicsElement.getHeight(), 8);
        playerCameraComponent.primary = true;
        const playerSprite2DRendererComponent = playerEntity.addComponent(Sprite2DRendererComponent);
        const playerIdleSprite = ResourceFactory.createSprite2D(characterSpriteSheetTexture, new Vector2(0, 1), characterSpriteSize);
        playerSprite2DRendererComponent.sprite = playerIdleSprite;
        const playerStateMachineComponent = playerEntity.addComponent(State2DAnimationMachineComponent);
        const idle = new Animation2DSpriteState("Idle");
        const idleFrameTime = 2000;
        idle.addFrame(playerIdleSprite, idleFrameTime);
        playerStateMachineComponent.addState(idle);
        playerStateMachineComponent.setDefaultStateName(idle.getName());
        const run = new Animation2DSpriteState("Run");
        const runFrameTime = 150;
        run.addFrame(ResourceFactory.createSprite2D(characterSpriteSheetTexture, new Vector2(1, 1), characterSpriteSize), runFrameTime);
        run.addFrame(ResourceFactory.createSprite2D(characterSpriteSheetTexture, new Vector2(2, 1), characterSpriteSize), runFrameTime);
        run.addFrame(ResourceFactory.createSprite2D(characterSpriteSheetTexture, new Vector2(3, 1), characterSpriteSize), runFrameTime);
        playerStateMachineComponent.addState(run);
    }
}

;// CONCATENATED MODULE: ./src/game/GameLayer.ts


class GameLayer extends BaseLayer {
    constructor(graphicsElement) {
        super("Game layer");
        this.graphicsElement = graphicsElement;
    }
    attach() {
        const scene = new Scene(this.graphicsElement.getWidth(), this.graphicsElement.getHeight());
        this.level = new Level(scene, this.graphicsElement);
    }
    detach() {
    }
    elementInput(event) {
        if (event.getType() === ElementEventType.RESIZE) {
            this.level.resize(event.getWidth(), event.getHeight());
        }
    }
    keyboardInput(event) {
        this.level.keyboardInput(event);
    }
    mouseInput(event) {
        this.level.mouseInput(event);
    }
    update(time) {
        this.level.update(time);
    }
    render() {
        this.level.render();
    }
    clean() {
        this.level.clean();
    }
}
/* harmony default export */ const game_GameLayer = (GameLayer);

;// CONCATENATED MODULE: ./src/index.ts


const parentElement = document.getElementById("game");
if (!parentElement) {
    throw new Error("Game element nof found");
}
const game = new game_Game(parentElement);
game.pushLayer(new game_GameLayer(game.getGraphicsElement()));
game.init2DRenderer();
game.start();

/******/ })()
;