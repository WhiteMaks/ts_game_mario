import { BaseQueue } from "../structures/impl/BaseQueue.js";
import { MouseEventType } from "./MouseEventType.js";
import { MouseEvent } from "./MouseEvent.js";
/**
 * Класс для работы с событиями мышки
 */
export class Mouse {
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
