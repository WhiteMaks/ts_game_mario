import { Vector3 } from "./Vector3.js";
/**
 * Класс для работы с векторами
 */
export class Vector4 extends Vector3 {
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
