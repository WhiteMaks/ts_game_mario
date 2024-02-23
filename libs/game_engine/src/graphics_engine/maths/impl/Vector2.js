export class Vector2 {
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
