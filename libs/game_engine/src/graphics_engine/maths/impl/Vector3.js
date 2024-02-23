import { Vector2 } from "./Vector2.js";
/**
 * Класс для работы с векторами
 */
export class Vector3 extends Vector2 {
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
