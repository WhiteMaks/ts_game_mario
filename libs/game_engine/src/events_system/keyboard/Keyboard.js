import { BaseQueue } from "../structures/impl/BaseQueue";
import { KeyboardEventType } from "./KeyboardEventType";
import { KeyboardEvent } from "./KeyboardEvent";
/**
 * Класс для работы с событиями клавиатуры
 */
export class Keyboard {
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
