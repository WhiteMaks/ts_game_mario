import { ElementEvent } from "./ElementEvent";
import { BaseQueue } from "../structures/impl/BaseQueue";
import { ElementEventType } from "./ElementEventType";
export class Element {
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
