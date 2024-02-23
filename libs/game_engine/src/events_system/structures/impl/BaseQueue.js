/**
 * Класс реализации базовой очереди
 */
export class BaseQueue {
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
